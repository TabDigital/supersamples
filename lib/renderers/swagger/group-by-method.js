var _ = require('lodash');

module.exports = groupByMethod;

function groupByMethod(samples) {
  return _.mapValues(
    samples,
    function(sample) {
      return groupSampleByMethod(sample);
    }
  );
}

var groupSampleByMethod = _.partialRight(
  _.groupBy,
  function(sample) {
    return sample.request.method.toLowerCase();
  }
);
