var _ = require('lodash');
var url = require('url');

module.exports = buildSwagger;

function buildSwagger(samples) {
  return _.mapValues(samples, function(method, path) {
    return _.mapValues(method, function(group) {
      return _.reduce(group, makeOperationObject(path), {});
    });
  });
};

var cleanup = _.compose(
  _.compact,
  _.uniq
);

var makeOperationObject = _.curry(function (path, acc, item) {
  acc = _.defaults(acc, {
    summary: '',
    description: '',
    consumes: [],
    produces: [],
    responses: {},
    parameters: []
  });

  acc.consumes = cleanup(acc.consumes.concat([item.request.headers['content-type']]));
  acc.produces = cleanup(acc.produces.concat([item.response.headers['content-type']]));

  if (item.response.status < 300) {
    acc.parameters = uniqParamaters(
      acc.parameters.concat(
        buildParamParameter(path)  
      ).concat(
        buildQueryParameter(item.request) 
      ).concat(
        buildBodyParameter(item.request)
      )
    );
  }

  acc.responses[item.response.status] = {
    description: item.summary,
    schema: generateSchema(item.response.body),
    headers: _.mapValues(item.response.headers, generateSchema)
  };

  return acc;
});

function uniqParamaters(parameters) {
  return _.uniq(parameters, function(param) {
    return param.in + '-' + param.name;
  });
}

function buildBodyParameter(request) {
  var body = request.data;
  return [{
    'in': 'body',
    name: 'payload',
    schema: generateSchema(body)
  }];
}

function buildQueryParameter(request) {
  var query = url.parse(request.path, true).query || {};
  return _.map(_.pairs(query), function(pair) {
    return {
      'in': 'query',
      name: pair[0],
      type: type(pair[1])
    }
  });
}

function buildParamParameter(path) {
  var TEMPLATE_URL_PARAM = /\{([^\/\}]+)\}/g;
  var keys = path.match(TEMPLATE_URL_PARAM);
  
  return _.map(keys, function(key) {
    return {
      'in': 'path',
      name: key.replace(/\{|\}/g, ''),
      type: 'string'
    };
  });
}

function generateSchema(value) {
  if (!value) {
    return {};
  }
  var t = type(value);
  if (t === 'object') {
    return generateObjectSchema(value);
  }
  if (t === 'array') {
    return generateArraySchema(value);
  }
  return {
    type: t
  };
}

function generateObjectSchema(obj) {
  return {
    type: 'object',
    properties: _.mapValues(obj, generateSchema)
  };
}

function generateArraySchema(arr) {
  return {
    type: 'array',
    items: _.first(_.map(arr, generateSchema))
  };
}

function type(value) {
  var TYPES = [
    'number',
    'string',
    'array',
    'boolean',
    'null',
    'object'
  ];
  var type;

  return _(TYPES).filter(function(type) {
    var isType = _['is' + _.capitalize(type)];
    return isType(value);
  }).value()[0];
}
