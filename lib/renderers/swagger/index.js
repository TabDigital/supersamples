var _ = require('lodash');
var fs = require('fs-extra');
var path = require('path');

var pkgInfo = require(process.cwd() + '/package.json');
var groupByPath = require('./group-by-path');
var groupByMethod = require('./group-by-method');
var buildSwagger = require('./build-swagger');

exports.render = function(model, options) {
  var def = {
    swagger: "2.0",
    info: {
      title: pkgInfo.name,
      version: pkgInfo.version,
      termsOfService: '',
      contact: {
        name: pkgInfo.author
      },
      license: {
        name: pkgInfo.license
      }
    }
  }; 

  def.paths = _.compose(
    buildSwagger,
    groupByMethod,
    groupByPath  
  )(model);
  
  var outputFolder = path.dirname(options.outputFile);
  fs.mkdirpSync(outputFolder);
  fs.writeFileSync(options.outputFile, JSON.stringify(def, null, 4));
  console.log('Generated in ' + path.resolve(options.outputFile));
};
