var _ = require('lodash');

module.exports = _.compose(
  transformUrl,
  groupByPath
);

function groupByPath(samples) {
  return _.groupBy(samples, function(sample) {
    return sample.request.route;
  });
}

function transformUrl(samples) {
  return _.zipObject(
    _.map(_.pairs(samples), function(sample) {
      return [
        toTemplateUrl(sample[0]),
        sample[1]
      ];
    })
  );
}

function toTemplateUrl(url) {
  url = url || '';

  return url.replace(/:([^/]+)/g, function(match, text, urlId) {
    return '{' + text + '}';
  });
}
