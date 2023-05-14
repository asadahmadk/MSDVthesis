var pointCount = 10
var lineCount = 30
var random = d3.randomNormal(30, 25);
var svg = d3.select('svg2');
var NumberLines = d3.range(0, lineCount)
var w = 500,
    h = 100;

var x = d3.scaleLinear()
    .domain([0, pointCount - 1])
    .range([0, w]);

var y = d3.scaleLinear()
    .domain([0, 50])
    .range([0, h]);

var prevData = d3.range(pointCount).map(random); // Путь для первой линии
var data = d3.range(lineCount).map((i) => {

    if (i == 0) {
        return prevData;
    } else {
        var next_data = prevData.map((v, k, e) => {
            // var now = e[k];
            // var next = e[k + 1];
            //     console.log(now) 

            return v + Math.random() * 2;
        });

        prevData = next_data;
        return next_data;
    }
});

var vector = d3.range(lineCount).map((i) => {
    return d3.range(pointCount).map((j) => {
        return data[i][j] < 10 ? 1 : -1;
    });
});

var line = d3.line()
    .x(function (d, i) {
        return x(i);
    })
    .y(function (d, i) {
        return y(d);
    });

var numerPath = svg2.append('g')
    .selectAll("path")
    .data(NumberLines)
    .enter()
    .append('path')

var path = svg2.selectAll('path')
    .datum(data[0])
    .attr("d", line.curve(d3.curveBasis));


function update() {
    var transition = d3.transition()
        .duration(500)
        .ease(d3.easeSin);
    var z = 1

    path.each(function (d, i) {

        data[i] = data[i].map((v, k) => {
            if (vector[i][k] > 0 && v > 50) {
                vector[i][k] = -1
            }
            if (vector[i][k] < 0 && v < 10) {
                vector[i][k] = 1
            }
            return v + z * vector[i][k];
        });

        d3.select(this)
            .datum(data[i])
            .transition(transition)
            .attr("d", line.curve(d3.curveBasis));
    });
}
d3.interval(() => {
    update();
}, 100);
