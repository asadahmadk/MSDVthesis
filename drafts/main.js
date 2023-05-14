// set the dimensions and margins of the graph
const margin = { top: 10, right: 30, bottom: 30, left: 60 },
	width = 900 - margin.left - margin.right,
	height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg1 = d3.select("#my_dataviz")
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", `translate(${margin.left},${margin.top})`);


//Read the data
d3.csv("https://raw.githubusercontent.com/asadahmadk/MSDVthesis/main/moodData.csv",

	// When reading the csv, I must format variables:
	function (d) {
		return {
			date: d3.timeParse("%b-%y")(d.date), valence: d.valence,
			energy: d.energy, danceability: d.danceability, tempo: d.tempo
		}
	}).then(

		// Now I can use this dataset:
		function (data) {

			// Add X axis --> it is a date format
			const x = d3.scaleTime()
				.domain(d3.extent(data, function (d) { return d.date; }))
				.range([0, width]);
			svg1.append("g")
				.attr("transform", `translate(0, ${height})`)
				.call(d3.axisBottom(x));

			// Add Y axis
			const y = d3.scaleLinear()
				.domain([0.4, 0.8])
				.range([height, 0]);

			// Tooltip
			const tooltip = d3.select("body")
				.append("div")
				.attr("class", "tooltip")
				.style("opacity", 0);

			// Add legend
			const legend = svg1.append("g")
				.attr("class", "legend")
				.attr("transform", `translate(${width - 120}, 10)`);

			// Add legend rectangles
			legend.append("rect")
				.attr("x", 0)
				.attr("y", 0)
				.attr("width", 10)
				.attr("height", 10)
				.attr("fill", "#6e40aa");

			legend.append("rect")
				.attr("x", 0)
				.attr("y", 20)
				.attr("width", 10)
				.attr("height", 10)
				.attr("fill", "#1ac7c2");
			legend.append("rect")
				.attr("x", 0)
				.attr("y", 40)
				.attr("width", 10)
				.attr("height", 10)
				.attr("fill", "#aff05b");

			legend.append("rect")
				.attr("x", 0)
				.attr("y", 60)
				.attr("width", 10)
				.attr("height", 10)
				.attr("fill", "#ff5e63");

			// Add legend text
			legend.append("text")
				.attr("x", 20)
				.attr("y", 10)
				.text("Valence")
				.style("font-size", "12px")
				.attr("alignment-baseline", "middle");

			legend.append("text")
				.attr("x", 20)
				.attr("y", 30)
				.text("Energy")
				.style("font-size", "12px")
				.attr("alignment-baseline", "middle");

			legend.append("text")
				.attr("x", 20)
				.attr("y", 50)
				.text("Danceability")
				.style("font-size", "12px")
				.attr("alignment-baseline", "middle");

			legend.append("text")
				.attr("x", 20)
				.attr("y", 70)
				.text("Tempo")
				.style("font-size", "12px")
				.attr("alignment-baseline", "middle");

			// create a new g element for the rectangles
			const rectGroup = svg1.append("g");

			// add the first rectangle
			rectGroup.append("rect")
				.attr("x", 230)
				.attr("y", 0)
				.attr("width", 60)
				.attr("height", 560)
				.attr("fill", "grey");

			// add the second rectangle
			rectGroup.append("rect")
				.attr("x", 310)
				.attr("y", 0)
				.attr("width", 80)
				.attr("height", 560)
				.attr("fill", "grey");

			// add the third rectangle
			rectGroup.append("rect")
				.attr("x", 490)
				.attr("y", 0)
				.attr("width", 80)
				.attr("height", 560)
				.attr("fill", "grey");

			// add the four rectangle
			rectGroup.append("rect")
				.attr("x", 600)
				.attr("y", 0)
				.attr("width", 70)
				.attr("height", 560)
				.attr("fill", "grey");

			const line = d3.line()
				.x(d => xScale(d.x))
				.y(d => yScale(d.y))


			svg1.append("g")
				.call(d3.axisLeft(y));
			console.log(data)
			// Add the line
			svg1.append("path")
				.datum(data)
				.attr("fill", "none")
				.attr("stroke", "#6e40aa")
				.attr("stroke-width", 2.5)
				.attr("d", d3.line()
					.x(function (d) { return x(d.date) })
					.y(function (d) { return y(d.valence) })
					.curve(d3.curveCardinal)
				)
				// .on("mouseenter", function (event, d) {
				// 	console.log(d)
				// 	// Show the tooltip when the user hovers over the path
				// 	tooltip.transition()
				// 		.duration(200)
				// 		.style("opacity", .9);
				// 	tooltip.html("Valence: " + d.valence)
				// 		.style("left", (event.pageX + 10) + "px")
				// 		.style("top", (event.pageY - 28) + "px");
				// })
				.on("mousemove", function (event, d) {
					// Get the x-position of the mouse pointer
					const mouseX = x.invert(d3.pointer(event)[0]);
					const mouseY = y.invert(d3.pointer(event)[0]);


					// Find the index of the data point closest to the mouse pointer
					const bisectIndex = d3.bisectLeft(data, mouseX, mouseY, 1);
					const dataLeft = data[bisectIndex - 1];
					const dataRight = data[bisectIndex];
					const closestDataPoint = mouseX - dataLeft.date > dataRight.date - mouseX ? dataRight : dataLeft;

					// Show the tooltip with the value of the closest data point
					tooltip.transition()
						.duration(200)
						.style("opacity", .9);
					tooltip.html("Valence: " + closestDataPoint.valence)
						.style("left", (event.pageX + 10) + "px")
						.style("top", (event.pageY - 28) + "px");

				})
				// .on("mouseout", function (d) {
				// 	// Hide the tooltip when the user moves the mouse away from the path
				// 	tooltip.transition()
				// 		.duration(500)
				// 		.style("opacity", 0);
				// })
				.transition()
				.duration(5000)
				.ease(d3.easeLinear)
				.attrTween("stroke-dasharray",
					function () {
						const length = this.getTotalLength();
						return d3.interpolate(`0,${length}`, `${length},${length}`);

					});


			//energyline
			svg1.append("path")
				.datum(data)
				.attr("fill", "none")
				.attr("stroke", "#1ac7c2")
				.attr("stroke-width", 2.5)
				.attr("d", d3.line()
					.x(function (d) { return x(d.date) })
					.y(function (d) { return y(d.energy) })
					.curve(d3.curveCardinal)
				)
				.on("mousemove", function (event, d) {
					// Get the x-position of the mouse pointer
					const mouseX = x.invert(d3.pointer(event)[0]);

					// Find the index of the data point closest to the mouse pointer
					const bisectIndex = d3.bisectLeft(data, mouseX, 1);
					const dataLeft = data[bisectIndex - 1];
					const dataRight = data[bisectIndex];
					const closestDataPoint = mouseX - dataLeft.date > dataRight.date - mouseX ? dataRight : dataLeft;

					// Show the tooltip with the value of the closest data point
					tooltip.transition()
						.duration(200)
						.style("opacity", .9);
					tooltip.html("Energy: " + closestDataPoint.energy)
						.style("left", (event.pageX + 10) + "px")
						.style("top", (event.pageY - 28) + "px");
				})
				.transition()
				.duration(5000)
				.ease(d3.easeLinear)
				.attrTween("stroke-dasharray", function () {
					const length = this.getTotalLength();
					return d3.interpolate(`0,${length}`, `${length},${length}`);

				}
				);

			//danceabilityline
			svg1.append("path")
				.datum(data)
				.attr("fill", "none")
				.attr("stroke", "#aff05b")
				.attr("stroke-width", 2.5)
				.attr("d", d3.line()
					.x(function (d) { return x(d.date) })
					.y(function (d) { return y(d.danceability) })
					.curve(d3.curveCardinal)
				)
				.on("mousemove", function (event, d) {
					// Get the x-position of the mouse pointer
					const mouseX = x.invert(d3.pointer(event)[0]);

					// Find the index of the data point closest to the mouse pointer
					const bisectIndex = d3.bisectLeft(data, mouseX, 1);
					const dataLeft = data[bisectIndex - 1];
					const dataRight = data[bisectIndex];
					const closestDataPoint = mouseX - dataLeft.date > dataRight.date - mouseX ? dataRight : dataLeft;

					// Show the tooltip with the value of the closest data point
					tooltip.transition()
						.duration(200)
						.style("opacity", .9);
					tooltip.html("Danceability: " + closestDataPoint.danceability)
						.style("left", (event.pageX + 10) + "px")
						.style("top", (event.pageY - 28) + "px");
				})
				.transition()
				.duration(5000)
				.ease(d3.easeLinear)
				.attrTween("stroke-dasharray", function () {
					const length = this.getTotalLength();
					return d3.interpolate(`0,${length}`, `${length},${length}`);
				});

			// Add Y axis for temp data
			const yTempo = d3.scaleLinear()
				.domain([110, 130])
				.range([height, 0]);
			svg1.append("g")
				.attr("class", "y-tempo-axis")
				.attr("transform", `translate(${width}, 0)`)
				.call(d3.axisRight(yTempo))

			// Add the tempo line
			svg1.append("path")
				.datum(data)
				.attr("fill", "none")
				.attr("stroke", "#ff5e63")
				.attr("stroke-width", 2.5)
				.attr("d", d3.line()
					.x(function (d) { return x(d.date) })
					.y(function (d) { return yTempo(d.tempo) })
					.curve(d3.curveCardinal)
				)
				.on("mousemove", function (event, d) {
					// Get the x-position of the mouse pointer
					const mouseX = x.invert(d3.pointer(event)[0]);

					// Find the index of the data point closest to the mouse pointer
					const bisectIndex = d3.bisectLeft(data, mouseX, 1);
					const dataLeft = data[bisectIndex - 1];
					const dataRight = data[bisectIndex];
					const closestDataPoint = mouseX - dataLeft.date > dataRight.date - mouseX ? dataRight : dataLeft;

					// Show the tooltip with the value of the closest data point
					tooltip.transition()
						.duration(200)
						.style("opacity", .9);
					tooltip.html("Tempo: " + closestDataPoint.tempo)
						.style("left", (event.pageX + 10) + "px")
						.style("top", (event.pageY - 28) + "px");
				})
				.transition()
				.duration(5000)
				.ease(d3.easeLinear)
				.attrTween("stroke-dasharray", function () {
					const length = this.getTotalLength();
					return d3.interpolate(`0,${length}`, `${length},${length}`);
				});


			svg1.append("g")
				.call(yAxis);

			svg1.append("g")
				.call(xAxis);


			return svg1.node();

		})







