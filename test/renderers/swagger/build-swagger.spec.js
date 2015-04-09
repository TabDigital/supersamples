var _ = require('lodash');
var isValid = require('is-my-json-valid');
var should = require('should');

var build = require('../../../lib/renderers/swagger/build-swagger');
var gm = require('../../../lib/renderers/swagger/group-by-method');
var gp = require('../../../lib/renderers/swagger/group-by-path');
var samples = require('./samples');

var SAMPLES = _.compose(
  gm,
  gp
)(samples);

describe('Swagger JSON builder', function() {

  it('transforms the response body to json schema', function() {
    var result = build(SAMPLES); 

    isValid(
      result['/v1/foo/bar'].post.responses[200].schema
    )(SAMPLES['/v1/foo/bar'].post[0].response.body).should.be.true;
  });

  it('transforms the response headers to json schema', function() {
    var result = build(SAMPLES); 

    isValid(
      result['/v1/foo/bar'].post.responses[200].headers
    )(SAMPLES['/v1/foo/bar'].post[0].response.header).should.be.true;
  });

  it('transforms some of the request body to parameters', function() {
    var result = build(SAMPLES); 

    result['/v1/foo/bar']
      .post
      .parameters
      .should.containEql({
        'name': 'arr',
        'in': 'body',
        'schema': {
          'type': 'array',
          'items': []
        }
      });
  });

  it('transforms some of the request queries to parameters', function() {
    var result = build(SAMPLES); 

    result['/v1/foo/bar']
      .post
      .parameters
      .should.containEql({
        'name': 'foo',
        'in': 'query',
        'type': 'string'
      });
  });

  it('transforms the parameters in the url', function() {
    var result = build(SAMPLES); 

    result['/v1/{something}/special']
      .get
      .parameters
      .should.containEql({
        'name': 'something',
        'in': 'param',
        'type': 'string'
      });
  });
});
