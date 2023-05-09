// set the dimensions and margins of the graph
const margin = { top: 10, right: 100, bottom: 30, left: 30 },
	width = 900 - margin.left - margin.right,
	height = 550 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg1 = d3.select("#my_dataviz")
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", `translate(${margin.left},${margin.top})`);

//Read the data
d3.csv("https://raw.githubusercontent.com/asadahmadk/MSDVthesis/main/moodData.csv").then(function (data) {


	// List of groups (here I have one group per column)
	const allGroup = ["valence", "energy", "danceability", "tempo"]

	// Reformat the data: we need an array of arrays of {x, y} tuples
	// const dataReady = allGroup.map(function (grpName) { // .map allows to do something for each element of the list
	// 	return {
	// 		name: grpName,
	// 		values: data.map(function (d) {
	// 			return { date: d3.timeParse("%b-%y")(d.date), value: +d[grpName] };
	// 			// return { date: (d.date), value: +d[grpName] };
	// 		})
	// 	};
	// });
	// const dataReady = allGroup.map(function (grpName) { // .map allows to do something for each element of the list
	//     return {
	//         name: grpName,
	//         values: data.map(function (d) {
	//             const value = +d[grpName];
	//             const date = d3.timeParse("%b-%y")(d.date);
	//             if (isNaN(value) || isNaN(date)) { // check if the value or date is NaN
	//                 return null;
	//             }
	//             return { date: date, value: value };
	//         }).filter(d => d != null) // remove any null values
	//     };
	// });
	// I strongly advise to have a look to dataReady with
	// console.log(dataReady)

	// // A color scale: one color for each group
	// const myColor = d3.scaleOrdinal()
	// 	.domain(allGroup)
	// 	.range(d3.schemeSet1);
	// // .range("#6e40aa", "#1ac7c2", "#aff05b", "#ff5e63");

	// // Add X axis --> it is a date format
	// const x = d3.scaleTime()
	// 	// .domain(d3.extent(data, function (d) {
	// 	// 	return d.date;
	// 	// 	// return new Date(d.date);
	// 	// }))
	// 	// .domain([0, 49])
	// 	.domain([new Date(01 / 01 / 2019), new Date(12 / 01 / 2022)])
	// 	.range([0, width]);

	// svg1.append("g")
	// 	.attr("transform", `translate(0, ${height})`)
	// 	.call(d3.axisBottom(x));
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
	// I strongly advise to have a look to dataReady with
	console.log(dataReady)


	// A color scale: one color for each group
	const myColor = d3.scaleOrdinal()
		.domain(allGroup)
		.range(d3.schemeSet1);


	// Add X axis --> it is a date format
	const parseFunc = d3.timeParse("%b-%y")
	const x = d3.scaleTime()
		.domain(d3.extent(data, function (d) { console.log(parseFunc(d.date)); return parseFunc(d.date); }))
		.range([0, width]);
	svg.append("g")
		.attr("transform", `translate(0, ${height})`)
		.call(d3.axisBottom(x));

	// Add Y axis
	const y = d3.scaleLinear()
		.domain([0.4, 0.8])
		.range([height, 0]);
	svg1.append("g")
		.call(d3.axisLeft(y));


	// svg1.append("path")
	//     .datum(data)
	//     .attr("class", "tempo")
	//     .attr("d", tempo)
	//     .attr("stroke", "#FFA500")
	//     .style("stroke-width", 4)
	//     .style("fill", "none");

	// // Add Y axis for temp data
	// const yTempo = d3.scaleLinear()
	//     .domain([110, 130])
	//     .range([height, 0]);
	// svg1.append("g")
	//     .attr("class", "y-tempo-axis")
	//     .attr("transform", `translate(${width}, 0)`)
	//     .call(d3.axisRight(yTempo))

	// // Tooltip
	// const tooltip = d3.select("body")
	//     .append("div")
	//     .attr("class", "tooltip")
	//     .style("opacity", 0);

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

	// Add a label at the end of each line
	svg1
		.selectAll("myLabels")
		.data(dataReady)
		.join('g')
		.append("text")
		.attr("class", d => d.name)
		.datum(d => { return { name: d.name, value: d.values[d.values.length - 1] }; }) // keep only the last value of each time series
		.attr("transform", d => `translate(${x(d.value.date)},${y(d.value.value)})`) // Put the text at the position of the last point
		.attr("x", 12) // shift the text a bit more right
		.text(d => d.name)
		.style("fill", d => myColor(d.name))
		.style("font-size", 15)
	// create a new g element for the rectangles
	const rectGroup = svg1.append("g");

	// add the first rectangle
	rectGroup.append("rect")
		.attr("x", 230)
		.attr("y", 0)
		.attr("width", 60)
		.attr("height", 560)
		.attr("fill", "grey")
		.attr("opacity", "0.4");



	// add the second rectangle
	rectGroup.append("rect")
		.attr("x", 310)
		.attr("y", 0)
		.attr("width", 80)
		.attr("height", 560)
		.attr("fill", "grey")
		.attr("opacity", "0.4");

	// add the third rectangle
	rectGroup.append("rect")
		.attr("x", 490)
		.attr("y", 0)
		.attr("width", 80)
		.attr("height", 560)
		.attr("fill", "grey")
		.attr("opacity", "0.4");

	// add the four rectangle
	rectGroup.append("rect")
		.attr("x", 600)
		.attr("y", 0)
		.attr("width", 70)
		.attr("height", 560)
		.attr("fill", "grey")
		.attr("opacity", "0.4");

	// Add a legend (interactive)
	svg1
		.selectAll("myLegend")
		.data(dataReady)
		.join('g')
		.append("text")
		.attr('x', (d, i) => 30 + i * 60)
		.attr('y', 30)
		.text(d => d.name)
		.style("fill", d => myColor(d.name))
		.style("font-size", 15)
		.on("click", function (event, d) {
			// is the element currently visible ?
			currentOpacity = d3.selectAll("." + d.name).style("opacity")
			// Change the opacity: from 0 to 1 or from 1 to 0
			d3.selectAll("." + d.name).transition().style("opacity", currentOpacity == 1 ? 0 : 1)

		})

})