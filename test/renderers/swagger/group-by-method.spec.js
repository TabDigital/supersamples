var should = require('should');
var groupByPath = require('../../../lib/renderers/swagger/group-by-path');
var SAMPLES = groupByPath(require('./samples'));

var groupByMethod = require('../../../lib/renderers/swagger/group-by-method');
var build = require('../../../lib/renderers/swagger/build-swagger');

describe('Swagger render groupByMethod', function() {
  it('groups the samples inside each path by request method', function() {
    var result = groupByMethod(SAMPLES);
    result['/v1/foo/bar'].post.should.have.lengthOf(2);   
    result['/v1/hello/world'].get.should.have.lengthOf(1);
  });
});
