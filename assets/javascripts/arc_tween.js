var w = 1200,
  aspect = 500/1200,
  x = d3.scale.ordinal().domain(d3.range(3)).rangePoints([0, w], 2);

var fields = [{
  name: "hours",
  value: 1,
  size: 24
}, {
  name: "minutes",
  value: 1,
  size: 60
}, {
  name: "seconds",
  value: 1,
  size: 60
}];

var arc = d3.svg.arc()
  .innerRadius(100)
  .outerRadius(140)
  .startAngle(0)
  .endAngle(function(d) {
    return (d.value / d.size) * 2 * Math.PI;
  });

var svg = d3.select(".clock").append("svg:svg")
  .attr("preserveAspectRatio", "xMidYMid")
  .attr("viewBox", "0,0,1200,500")
  .attr("width", w)
  .attr("height", w * aspect)
  .append("svg:g")
  .attr("transform", "translate(50," + ((w * aspect) / 2) + ")");

// Drop Shadow Filter
var defs = svg.append("defs");

var filter = defs.append("filter")
    .attr("id", "dropshadow")

filter.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 4)
    .attr("result", "blur");
filter.append("feOffset")
    .attr("in", "blur")
    .attr("dx", 2)
    .attr("dy", 2)
    .attr("result", "offsetBlur");

var feMerge = filter.append("feMerge");

feMerge.append("feMergeNode")
    .attr("in", "offsetBlur")
feMerge.append("feMergeNode")
    .attr("in", "SourceGraphic");

d3.select(window).on('resize', resize);

setInterval(function() {
  var now = new Date();

  fields[0].previous = fields[0].value;
  fields[0].value = now.getHours();
  fields[1].previous = fields[1].value;
  fields[1].value = now.getMinutes();
  fields[2].previous = fields[2].value;
  fields[2].value = now.getSeconds();

  var path = svg.selectAll("path")
    .data(fields, function(d) {
      return d.name;
    });

  path.enter().append("g")
    .attr("class", function(d) { return d.name })
    .append("svg:path")
    .attr("filter", "url(#dropshadow)")
    .attr("transform", function(d, i) {
      return "translate(" + (x(i)+i*20 - 70) + ",0)";
    })
    .transition()
    .ease("elastic")
    .duration(750)
    .attrTween("d", arcTween);

  path.transition()
    .ease("elastic")
    .duration(750)
    .attrTween("d", arcTween);

  path.exit().transition()
    .ease("bounce")
    .duration(750)
    .attrTween("d", arcTween)
    ;

}, 1000);
resize();

function appendTime(a) {
  d3.select("text." + a.name).remove();
  d3.select("." + a.name).append("text")
  .attr("class", a.name)
  .attr("filter", "url(#dropshadow)")
  .text(a.value)

  d3.select("text.hours")
    .attr("transform", "translate(150, 45)");
  d3.select("text.minutes")
    .attr("transform", "translate(470, 45)")
  d3.select("text.seconds")
    .attr("transform", "translate(790, 45)")

}

function arcTween(b) {
  appendTime(b)
  var i = d3.interpolate({
    value: b.previous
  }, b);
  return function(t) {
    return arc(i(t));
  };
}

function resize() {
  w = parseInt(d3.select(".clock").style("width"), 10);

  d3.select("svg").attr("width", w);
  d3.select("svg").attr("height", w * aspect)
}