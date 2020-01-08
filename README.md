# divaservices-utils

This package gathers all shared classes, functions and types between DIVA Services interfaces.
It provides:
* **API**: contains all endpoint requests to the DIVA server and website 
* **Constants**: gathers common constants between interfaces. These are mostly dependent on the JSON description of the entities 
* **Decorators**: transforms XML data to JSON data, for ease of use in interfaces 
* **DivaServices**: contains all utils functions, mostly strings parsing and construction 
* **Validation**: gathers all data validation functions
* **XMLBuilders**: contains functions which transforms data to XML content

### Installing

Using yarn, install this package using:
```
yarn add https://github.com/pyphilia/divaservices-utils
```
### Maintainance

Since git hooks are installed, you will need to satisfy prettier and eslint style codes.
To prettify your code, run 
```
yarn prettier:write
```
And to check your code against eslint:
```
yarn eslint
```
If both commands are run and exited without error, you will be able to commit your changes.

## Running the tests

Run

```
yarn test
```

## Authors

* **Kim Lan Phan Hoang** - *Initial work* - klphanh@gmail.com