/**
 * Module dependencies
 */
var metric = require("metric-log");

module.exports = function(parent, options, metricName) {
  if (typeof options === "string") {
    metricName = options;
    options = {};
  };

  var root = metric.context(options);

  if(parent) root.use(parent);

  return function metricLogger (req, next) {
    var end = root.profile("response_time", {
      api: metricName || req.url,
      method:req.method
    });

    next(null, function(res, prev) {
      end({code: res.status, lib: "superagent"});
      prev();
    });
  }
};
