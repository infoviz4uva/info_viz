var months,
    monthKeys,
    monthParse = d3v4.timeParse("%Y-%m");
d3v4.select(".viz-4").append("svg")
    .attr('width', 900)
    .attr('height', 500)
    .attr('class', 'trend-graph');
var svg = d3v4.select('.trend-graph'),
    margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = svg.attr("width") - margin.left - margin.right,
    height = svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3v4.scaleTime()
    .range([0, width]);

var y = d3v4.scaleLinear()
    .range([height, 0]);

var voronoi = d3v4.voronoi()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.value); })
    .extent([[-margin.left, -margin.top], [width + margin.right, height + margin.bottom]]);

var line = d3v4.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.value); });

d3v4.tsv("../data/file1.txt", type, function(error, data) {
  if (error) throw error;


  x.domain(d3v4.extent(months));
  y.domain([0, d3v4.max(data, function(c) { return d3v4.max(c.values, function(d) { return d.value; }); })]).nice();

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3v4.axisBottom(x));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3v4.axisLeft(y).ticks(10, "%"))
    .append("text")
      .attr("x", 4)
      .attr("y", 0.5)
      .attr("dy", "0.32em")
      .style("text-anchor", "start")
      .style("fill", "#000")
      .style("font-weight", "bold")
      .text("Search Index over time");

  g.append("g")
      .attr("class", "cities")
    .selectAll("path")
    .data(data)
    .enter().append("path")
      .attr("d", function(d) { d.line = this; return line(d.values); });

  var focus = g.append("g")
      .attr("transform", "translate(-100,-100)")
      .attr("class", "focus");

  focus.append("circle")
      .attr("r", 3.5);

  focus.append("text")
      .attr("y", -10);

  var voronoiGroup = g.append("g")
      .attr("class", "voronoi");

  voronoiGroup.selectAll("path")
    .data(voronoi.polygons(d3v4.merge(data.map(function(d) { return d.values; }))))
    .enter().append("path")
      .attr("d", function(d) { return d ? "M" + d.join("L") + "Z" : null; })
      .on("mouseover", mouseover)
      .on("mouseout", mouseout);

  function mouseover(d) {
    d3v4.select(d.data.city.line).classed("city--hover", true);
    d.data.city.line.parentNode.appendChild(d.data.city.line);
    focus.attr("transform", "translate(" + x(d.data.date) + "," + y(d.data.value) + ")");
    focus.select("text").text(d.data.city.name);
  }

  function mouseout(d) {
    d3v4.select(d.data.city.line).classed("city--hover", false);
    focus.attr("transform", "translate(-100,-100)");
  }
});

function type(d, i, columns) {
  if (!months) monthKeys = columns.slice(1), months = monthKeys.map(monthParse);
  var c = {name: d.name.replace(/ (msa|necta div|met necta|met div)$/i, ""), values: null};
  c.values = monthKeys.map(function(k, i) { return {city: c, date: months[i], value: d[k] / 100}; });
  return c;
}