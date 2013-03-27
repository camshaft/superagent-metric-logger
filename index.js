

module.exports = function(request, options) {
  return function metricLogger (req, next) {
    var metric = request.metric.context({url: req.url, method: req.method}).use(options);
    metric.profile("http-request-time");
    next(null, function(res, prev) {
      metric.profile("http-request-time", {code: res.status, lib: "superagent"});
      prev();
    });
  }
};
