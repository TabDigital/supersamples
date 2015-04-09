var should = require('should');
var groupByPath = require('../../../lib/renderers/swagger/group-by-path');
var SAMPLES = require('./samples');

describe('Swagger renderer groupByPath', function() {
  it('should groups the the samples by urls', function() {
    var result = groupByPath(SAMPLES);
    
    result.should.have.property('/v1/foo/bar');
    result['/v1/foo/bar'].should.have.lengthOf(2);
    result.should.have.property('/v1/hello/world');
    result['/v1/hello/world'].should.have.lengthOf(1);
  });

  it('transforms the template urls', function() {
    var result = groupByPath(SAMPLES);
    result.should.have.property('/v1/{something}/special');
  });
});
