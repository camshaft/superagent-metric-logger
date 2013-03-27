

module.exports = function(request, options) {
  return function metricLogger (req, next) {
    request.metric.profile("http-request");
    next(null, function(res, prev) {
      request.metric.profile("http-request", options);
      prev();
    });
  }
};
