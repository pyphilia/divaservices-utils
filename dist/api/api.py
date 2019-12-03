import json
import requests
import xml.etree.cElementTree as ET

def get_account_info(api_url_base, filepath="api.json"):

    f= open(filepath,"a+")
    response = requests.get(api_url_base)

    if response.status_code == 200:
        res = json.loads(response.content.decode('utf-8'))
        
        for i in range(len(res)):
          algo = requests.get(res[i]['url'])

          if algo.status_code == 200:
            res[i]['algorithm'] = json.loads(algo.content.decode('utf-8'))
          
        f.write(json.dumps(res))

        f.close()
    else:
        return None

def create_collections_xml(collection_url, filepath="collections.xml"):

    response = requests.get(collection_url)

    root = ET.Element("Collections")
    
    if response.status_code == 200:
        res = json.loads(response.content.decode('utf-8'))['collections']
        for i in range(len(res)):
          collection = ET.SubElement(root, "Collection")

          ET.SubElement(collection, "Id").text = str(i)
          name = res[i]['collection']['name']
          ET.SubElement(collection, "Name").text = name
          url = res[i]['collection']['url']
          ET.SubElement(collection, "Url").text = url
          files = requests.get(url)

          filesJson = json.loads(files.content.decode('utf-8'))
          if files.status_code == 200:
            if filesJson['statusCode'] == 200 or filesJson['statusCode'] == 110:
              filesNode = ET.SubElement(collection, "Files")
              ET.SubElement(collection, "StatusMessage").text = filesJson['statusMessage']

              for f in filesJson['files']:
                fileNode = ET.SubElement(filesNode, "File")
                ET.SubElement(fileNode, "Url").text = f['file']['url']
                ET.SubElement(fileNode, "Identifier").text = f['file']['identifier']

                if len(f['file']['options']):
                  options = ET.SubElement(fileNode, "Options")
                  for option in f['file']['options']:
                    ET.SubElement(options, option.capitalize()).text = str(f['file']['options'][option])

          else:
            ET.SubElement(collection, "Error").text = filesJson['errorType']


        tree = ET.ElementTree(root)
        tree.write(filepath)
    else:
        return None

# def createAlgoServiceFile(json_file, filepath='services.xml'):
#   services = open(filepath,"w")

#   with open(json_file) as f:
#     d = json.load(f)
#     text = ''
#     for index, algo in enumerate(d):
#       text +='<Service>'
#       text += '<Id>' + str(index) + '</Id>'
#       text += '</Service>'

#   services.write(text)
#   services.close()

def create_data_inputs(api_url_base, filepath="inputData.xml"): 
    response = requests.get(api_url_base)
    root = ET.Element("DataTests")
    inputs = set()
    if response.status_code == 200:
        res = json.loads(response.content.decode('utf-8'))

        for i in range(len(res)):
          url = res[i]['url']
          algo = requests.get(url)

          if algo.status_code == 200:
            algoJson = json.loads(algo.content.decode('utf-8'))

            for inp in algoJson['input']:
              # print(inp)
              if 'file' in inp:
                for mimetypes in inp['file']['options']['mimeTypes']['allowed']:
                  # print(mimetypes)
                  inputs.add(mimetypes)
                  # el = ET.SubElement(data, 'Data')
                  # ET.SubElement(el, 'Name').text = inp['file']['name']
                  # output = ET.SubElement(el, 'Output')
                  # ET.SubElement(output, 'Type').text = inp['file']['name']

                  # fileEl = ET.SubElement(output, 'File')
                  # mime = ET.SubElement(fileEl, 'MimeTypes')
                

              if 'folder' in inp:
                  inputs.add('folder')
              #   el = ET.SubElement(data, 'Data')
              #   ET.SubElement(el, 'Name').text = inp['folder']['name']
              #   dataType = ET.SubElement(el, 'Type')
              #   fileEl = ET.SubElement(dataType, 'Folder')
    for inp in inputs: 
      data = ET.SubElement(root, "Data")
      ET.SubElement(data, 'Name').text = inp
      output = ET.SubElement(data, 'Output')

      typeFormat = inp.split('/')
      ET.SubElement(output, 'Type').text = typeFormat[0]
      ET.SubElement(output, 'MimeType').text = inp

    tree = ET.ElementTree(root)
    tree.write(filepath)



def create_services_xml(api_url_base, filepath="services.xml"):

    response = requests.get(api_url_base)

    root = ET.Element("Services")

    if response.status_code == 200:
        res = json.loads(response.content.decode('utf-8'))
        
        for i in range(len(res)):
          url = res[i]['url']
          algo = requests.get(url)
          service = ET.SubElement(root, "Service")

          if algo.status_code == 200:
            algoJson = json.loads(algo.content.decode('utf-8'))

            ET.SubElement(service, 'Id').text = str(i)

            general = algoJson['general']
            information = ET.SubElement(service, 'Information')
            ET.SubElement(information, 'Name').text = general['name']
            ET.SubElement(information, 'Description').text = general['description']
            # ET.SubElement(information, 'Developer').text = general['developer']
            # ET.SubElement(information, 'Affilation').text = general['affiliation']
            # ET.SubElement(information, 'Email').text = general['email']
            ET.SubElement(information, 'Author').text = general['author']
            if('DOI' in general):
              ET.SubElement(information, 'DOI').text = str(general['DOI'])
            if('license' in general):
              ET.SubElement(information, 'License').text = general['license']
            if('type' not in general):
              general['type'] = 'other'
            ET.SubElement(information, 'Category').text = general['type']
            if 'ownsCopyright' in general:
              ET.SubElement(information, 'Ownership').text = general['ownsCopyright']
            ET.SubElement(information, 'ExpectedRuntime').text = str(general['expectedRuntime'])
            # ET.SubElement(information, 'Executions').text = str(general['executions'])

            api = ET.SubElement(service, 'API')
            ET.SubElement(api, 'BaseURL').text = url 


            inputs = ET.SubElement(api, 'Inputs')

            for inp in algoJson['input']:
              # print(inp)
              if 'file' in inp:
                el = ET.SubElement(inputs, 'Data')
                if(not inp['file']['options']['required']):
                  el.attrib['Status'] = 'Optional'

                ET.SubElement(el, 'Name').text = inp['file']['name']
                ET.SubElement(el, 'Description').text = inp['file']['description']
                dataType = ET.SubElement(el, 'MimeTypes')
                ET.SubElement(dataType, 'Default').text = inp['file']['options']['mimeTypes']['default']
                
                for mimetypes in inp['file']['options']['mimeTypes']['allowed']:
                  ET.SubElement(dataType, 'Allowed').text = mimetypes

              if 'folder' in inp:
                el = ET.SubElement(inputs, 'Data')
                if(not inp['folder']['options']['required']):
                  el.attrib['Status'] = 'Optional'

                ET.SubElement(el, 'Name').text = inp['folder']['name']
                ET.SubElement(el, 'Description').text = inp['folder']['description']
                # dataType = ET.SubElement(el, 'Type')
                # fileEl = ET.SubElement(dataType, 'Folder')
                mime = ET.SubElement(el, 'MimeTypes')
                ET.SubElement(mime, 'Default').text = 'folder'
                ET.SubElement(mime, 'Allowed').text = 'folder'
                # for mimetypes in inp['folder']['options']['mimeTypes']['allowed']:
                #   ET.SubElement(mime, 'Allowed').text = mimetypes

              elif 'outputfolder' in inp:
                continue

              elif 'number' in inp:
                # print(inp['number'])
                el = ET.SubElement(inputs, 'Parameter')
                if(not inp['number']['options']['required']):
                  el.attrib['Status'] = 'Optional'

                ET.SubElement(el, 'Name').text = inp['number']['name']
                ET.SubElement(el, 'Description').text = inp['number']['description']

                dataType = ET.SubElement(el, 'Type')
                options = inp['number']['options']
                if 'min' in options or 'max' in options or 'steps' in options:
                  stepType = ET.SubElement(dataType, 'StepNumberType')
                  if 'min' in options:
                    ET.SubElement(stepType, 'Min').text = str(options['min'])
                  if 'max' in options:
                    ET.SubElement(stepType, 'Max').text = str(options['max'])
                  if 'steps' in options:
                    ET.SubElement(stepType, 'Step').text = str(options['steps'])
                  ET.SubElement(stepType, 'Default').text = str(options['default'])

              elif 'select' in inp:
                # print(inp['select'])
                el = ET.SubElement(inputs, 'Parameter')
                if(not inp['select']['options']['required']):
                  el.attrib['Status'] = 'Optional'

                ET.SubElement(el, 'Name').text = inp['select']['name']
                ET.SubElement(el, 'Description').text = inp['select']['description']

                dataType = ET.SubElement(el, 'Type')
                enumType = ET.SubElement(dataType, 'EnumeratedType')
                options = inp['select']['options']
                for value in options['values']:
                  ET.SubElement(enumType, 'Value').text = str(value)
                ET.SubElement(enumType, 'Default').text = str(options['default'])
            
            outputs = ET.SubElement(api, 'Outputs')

            for out in algoJson['output']:
              if 'file' in out:
                output = ET.SubElement(outputs, 'Output')
                ET.SubElement(output, 'Name').text = out['file']['name']
                ET.SubElement(output, 'Description').text = out['file']['description']
                # typeEl = ET.SubElement(output, 'Type')
                # fileEl = ET.SubElement(typeEl, 'File')
                mimetypes = ET.SubElement(output, 'MimeTypes')
                ET.SubElement(mimetypes, 'Default').text = out['file']['options']['mimeTypes']['default']
                for types in out['file']['options']['mimeTypes']['allowed']:
                  ET.SubElement(mimetypes, 'Allowed').text = types
              if 'folder' in out:
                output = ET.SubElement(outputs, 'Output')
                ET.SubElement(output, 'Name').text = out['folder']['name']
                if 'description' in out['folder']:
                  ET.SubElement(output, 'Description').text = out['folder']['description']
                mimetypes = ET.SubElement(output, 'MimeTypes')
                ET.SubElement(mimetypes, 'Default').text = 'folder'
                ET.SubElement(mimetypes, 'Allowed').text = 'folder'

        tree = ET.ElementTree(root)
        tree.write(filepath)
    else:
        return None

create_services_xml('http://134.21.72.190:8080/', '../public/services.xml')