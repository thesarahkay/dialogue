// put data into array and convert strings into int
d3.csv("classicsdata.csv", function (data) {
    data.forEach(function(d) {
        d.convo = +d.convo;
        d.total = +d.total;
    });


console.log(data[0]);

// global variables
var wdth = document.getElementById("wrapper").offsetWidth;
var hght = 500;
var margin = 20;


console.log(wdth);

// hover tip information to display
var tip = d3.tip()
        .attr("class", "d3-tip")
//        .style("color", "rgb(231, 120, 55)")
//        .style("color", function (d) { return color(d.nation)})
        .html(function(d) { return (d.title) + "<hr>" + (d.first) + " " + (d.first)
        + "<p style=" + function (d) { return color(d.nation)} + "\">" + (d.percent) + " percent</p><h5>" + (d.nation) + "<br>"+ (d.convo).toLocaleString() + " of " + (d.total).toLocaleString() + " words</h5>"});



// set canvas location
var canvas = d3.select("#chart")
        .append("svg")
        .attr("width", wdth)
        .attr("height", hght)
        .append("g")
        .attr("transform", "translate(0, 0)")
        .call(tip);

// mapping scale
var xScale = d3.scale.linear()
        .domain([0, 620000])  //563000
        .range([20+margin, wdth-margin]);

var yScale = d3.scale.linear()
        .domain([0, 300000])    //226000
        .range([hght-margin, 0+margin]);

// tick marks
var xAxis = d3.svg.axis()
        .ticks(5)
        .scale(xScale);

var yAxis = d3.svg.axis()
        .ticks(3)

        .scale(yScale)
        .orient("left");

// assign color
var color = d3.scale.ordinal()
    .domain(["UK", "Spanish", "French", "Scandinavian", "Greek", "American", "Portuguese", "Russian", "Italian", "Arabic", "German", "Canadian"])
    .range(["rgb(231, 120, 55)", "rgb(38, 127, 124)", "rgb(117, 190, 134)", "rgb(191, 166, 125)", "rgb(136, 87, 72)", "rgb(107, 40, 101)", "rgb(194, 126, 114)", "rgb(171, 56, 69)", "rgb(33, 169, 203)", "rgb(223, 157, 62)", "rgb(149, 149, 41)", "rgb(231, 210, 88)"]);

// draw 50% line: PATH
canvas.append("path")
        .attr("id", "new")
        .attr("stroke-width", 1)
        .attr("d", "M40,480L1120, 5")
        .attr("stroke", "gray");


// 50% line label
canvas.append("text")
        .attr("dy", 11)
        .attr("class", "axis")
        .append("textPath")
        .attr("xlink:href", "#new")
        .attr("startOffset", "50%")
        .text("50% conversation");



// instantiate everything
canvas.selectAll("circle")
        .data(data)
        .enter()
            .append("circle")
            .attr("r", 5)
            .attr("cy", function (d) { return yScale(d.convo) })
            .attr("cx", function (d) { return xScale(d.total) })
            .attr("class", "circle")
            .style("fill", function (d) { return color(d.nation)})
            .style("stroke", function (d) { return color(d.nation)})
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);

// append group for axis
canvas.append("g")
        .attr("transform", "translate(0," + 480 + ")")
        .attr("class", "x axis")
        .call(xAxis);

canvas.append("g")
        .attr("transform", "translate(50, 0)")
        .attr("class", "y axis")
        .call(yAxis);


    })
