import { createXml2jsPromise } from "./utils";

/**
 * This file contains a decorator to traslate the
 * given webservices xml file to an equivalent JSON file
 */

const experimentDecorator = async xml => {
  const data = await createXml2jsPromise(xml);

  console.log("TCL: data.Experiment", data.Experiment)
  const {
    Information,
    Id : [id],
    Inputs: [Inp],
    Outputs: [Out],
  } = data.Experiment;


  const {
    Name : [name],
    Author: [author],
    Type,
    Datetime: [datetime],
  } = Information[0];
  // const author = Author.length ? Author[0] : 1111;

  const {
    Name: [typeName],
    Key: [key]
  } = Type[0];

  /* Inputs */
  const inputs = {parameters: {}, data: {}}
  
  if(Inp.Parameter){
    for(const param of Inp.Parameter){
      inputs.parameters[param.Name[0]] = param.Value[0];
    }
  }
  if(Inp.Data){
    for(const d of Inp.Data){
      inputs.data[d.Name[0]] = d.Value[0];
    }
  }


  /* Outputs */
  const outputs = {files: [], data: {}}
  
  for(const param of Out.File){
    console.log("TCL: param", param)
    const {Name: [name], Options: [Opt], Type, Url: [url], 'Mime-type': [mimeType]} = param;
    const type = Type ? Type[0] : 'unknown';
    const file = {name, type, url, mimeType};
    file.options = {}
    for(const [k, [v]] of Object.entries(Opt)){
      file.options[k] = v
    }

    outputs.files.push(file);
  }
  // for(const d of Inp.Data){
  //   outputs.data[d.Name[0]] = d.Value[0];
  // }

  return {
    id: parseInt(id),
    information: {
      name, author, datetime, type: { name: typeName, key: parseInt(key)}
    },
    inputs,
    outputs,
  };
};

export default experimentDecorator;
