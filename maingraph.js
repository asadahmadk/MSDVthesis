// set the dimensions and margins of the graph
const margin = { top: 10, right: 100, bottom: 30, left: 30 },
	width = 1000 - margin.left - margin.right,
	height = 550 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg1 = d3.select("#my_dataviz")
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", `translate(${margin.left},${margin.top})`);
const tooltip = d3.select("#tooltip")
	.append("div")
	.attr("class", "tooltip")
	.style("opacity", 0);


//Read the data
d3.csv("https://raw.githubusercontent.com/asadahmadk/MSDVthesis/main/moodData%20copy%203.csv").then(function (data) {


	// List of groups (here I have one group per column)
	const allGroup = ["valence", "energy", "danceability", "tempo"]

	const dataReady = allGroup.map(function (grpName) { // .map allows to do something for each element of the list
		return {
			name: grpName,
			values: data.map(function (d) {
				const value = +d[grpName];
				const parseFunc = d3.timeParse("%b-%y")
				const date = parseFunc(d.date);
				if (isNaN(value) || isNaN(date)) { // check if the value or date is NaN
					return null;
				}
				return { date: date, value: value };
			}).filter(d => d != null) // remove any null values
		};
	});
	// console.log(dataReady)


	// A color scale: one color for each group
	const myColor = d3.scaleOrdinal()
		.domain(allGroup)
		.range(["#6e40aa",
			"#1ac7c2",
			"#aff05b",
			"#ff5e63"]);


	// Add X axis --> it is a date format
	const parseFunc = d3.timeParse("%b-%y")
	const x = d3.scaleTime()
		.domain(d3.extent(data, function (d) {
			// console.log(parseFunc(d.date)); 
			return parseFunc(d.date);
		}))
		.range([0, width]);
	svg1.append("g")
		.attr("transform", `translate(0, ${height})`)
		.call(d3.axisBottom(x));

	// Add Y axis
	const y = d3.scaleLinear()
		.domain([0.4, 0.8])
		.range([height, 0]);
	svg1.append("g")
		.call(d3.axisLeft(y));

	// svg1.select(".x-tempo-axis").remove();

	// Add Y axis for tempo data
	const yTempo = d3.scaleLinear()
		.domain([110, 130])
		.range([height, 0]);
	svg1.append("g")
		.attr("class", "y-tempo-axis")
		.attr("transform", `translate(${width}, 0)`)
		.call(d3.axisRight(yTempo))

	const xTempo = d3.scaleLinear()
		.domain([0, data.length - 1])
		.range([0, width]);

	svg1.selectAll(".dot-tempo")
		.attr("cx", function (d, i) {
			return xTempo(i);
		});

	// Add the lines
	const line = d3.line()
		.x(d => x(+d.date))
		.y(d => y(+d.value))
	svg1.selectAll("myLines")
		.data(dataReady)
		.join("path")
		.attr("class", d => d.name)
		.attr("d", d => line(d.values))
		.attr("stroke", d => myColor(d.name))
		.style("stroke-width", 3)
		.style("fill", "none")

	// Add the points
	svg1
		// First we need to enter in a group
		.selectAll("myDots")
		.data(dataReady)
		.join('g')
		.style("fill", d => myColor(d.name))
		.attr("class", d => d.name)


		// Second we need to enter in the 'values' part of this group
		.selectAll("myPoints")
		.data(d => d.values)
		.join("circle")
		.attr("cx", d => x(d.date))
		.attr("cy", d => y(d.value))
		.attr("r", 5)
		.attr("stroke", "white")
		.on("mousemove", function (d) {
			tooltip.transition()
				.duration(200)
				.style("opacity", .9);
			tooltip.html("Value: " + d.value + "Date: " + d3.parseFunc)
				.style("left", (d3.event.pageX + 20) + "px")
				.style("top", (d3.event.pageY - 28) + "px");
		})
		.on("mouseout", function (d) {
			tooltip.transition()
				.duration(500)
				.style("opacity", 0);
		});


	const rectGroup = svg1.append("g");

	// add the first rectangle
	rectGroup.append("rect")
		.attr("x", 230)
		.attr("y", 0)
		.attr("width", 60)
		.attr("height", 510)
		.attr("fill", "grey")
		.attr("opacity", "0.25");

	// add the second rectangle
	rectGroup.append("rect")
		.attr("x", 310)
		.attr("y", 0)
		.attr("width", 80)
		.attr("height", 510)
		.attr("fill", "grey")
		.attr("opacity", "0.25");

	// add the third rectangle
	rectGroup.append("rect")
		.attr("x", 490)
		.attr("y", 0)
		.attr("width", 80)
		.attr("height", 510)
		.attr("fill", "grey")
		.attr("opacity", "0.25");

	// add the four rectangle
	rectGroup.append("rect")
		.attr("x", 600)
		.attr("y", 0)
		.attr("width", 70)
		.attr("height", 510)
		.attr("fill", "grey")
		.attr("opacity", "0.25");

	// Add circles
	svg1.selectAll("circle")
		.data(dataReady)
		.enter()
		.append("circle")
		.attr("class", d => d.name)
		.attr("cx", d => x(d.date))
		.attr("cy", d => y(d.value))
		.attr("r", 5)
		.style("fill", d => myColor(d.name))
		.attr("stroke", "white");

	svg1.append("path")
		.datum(dataReady)
		.attr("fill", "none")
		.attr("stroke", "#ff5e63")
		.attr("stroke-width", 2.5)
		.attr("d", d3.line()
			.x(function (d) { return x(d.date) })
			.y(function (d) { return yTempo(d.tempo) })
			.curve(d3.curveCardinal)
		)

	// Add a legend (interactive)
	svg1
		.selectAll("myLegend")
		.data(dataReady)
		.join('g')
		.append("text")
		.attr('x', (d, i) => 20 + i * 90)
		.attr('y', 30)
		.text(d => d.name)
		.style("fill", d => myColor(d.name))
		.style("font-size", 12)
		.on("click", function (event, d) {
			// is the element currently visible ?
			currentOpacity = d3.selectAll("." + d.name).style("opacity")
			// Change the opacity: from 0 to 1 or from 1 to 0
			d3.selectAll("." + d.name).transition().style("opacity", currentOpacity == 1 ? 0 : 1)

		})

})