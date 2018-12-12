// @TODO: YOUR CODE HERE!

var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 60,
    right: 60,
    bottom: 60,
    left: 60
  };

var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


d3.csv("assets/data/data.csv").then(function(healthData) {
  
    healthData.forEach(function(data) {
        data.smokes= +data.smokes;
        data.age = +data.age;
      });

   
    var xLinearScale = d3.scaleLinear()
      .domain([28, d3.max(healthData, d => d.age)])
      .range([0, chartWidth])

    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(healthData, d => d.smokes)])
        .range([chartHeight, 0]);
        
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .call(leftAxis);

    var circlesGroup = chartGroup.selectAll("circle")
        .data(healthData)
        .enter()
        .append("circle")
        .classed("stateCircle", true)
        .attr("cx", d => xLinearScale(d.age))
        .attr("cy", d => yLinearScale(d.smokes))
        .attr("r", 20)
        .attr("fill", "pink")
        .attr("opacity", ".5");

    var textGroup = chartGroup
        .selectAll(null)
        .data(healthData)
        .enter()
        .append("text")
        .text(d => d.abbr)
        .classed("stateText", true)
        .attr("x", d=> xLinearScale(d.age))
        .attr("y", d=> yLinearScale(d.smokes))
        .attr("font-size", "12px");

    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (chartHeight / 2))
        .attr("dy", "1em")
        .attr("text-anchor", "middle")
        .classed("axis-text", true)
        .text("Smokers");
    
    chartGroup.append("text")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.top + 20})`)
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("fill", "black")
        .text("Age");
});
