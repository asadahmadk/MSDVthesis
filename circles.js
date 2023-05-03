var svg = d3.select("#circles")
    .append("svg")
    .attr("width", 1000)
    .attr("height", 200);
var circleProps = [
    { cx: 120, cy: 100, r: 50, color: "#6e40aa" },
    { cx: 350, cy: 100, r: 50, color: "#1ac7c2" },
    { cx: 575, cy: 100, r: 50, color: "#aff05b" },
    { cx: 800, cy: 100, r: 50, color: "#ff5e63" }
];
var circles = svg.selectAll("circle")
    .data(circleProps)
    .enter()
    .append("circle");
circles.attr("cx", function (d) { return d.cx; })
    .attr("cy", function (d) { return d.cy; })
    .attr("r", function (d) { return d.r; })
    .attr("fill", function (d) { return d.color; });
var circles = svg.selectAll("circle")
    .data(circleProps)
    .enter()
    .append("circle");