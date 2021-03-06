// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 50, left: 100},
    width = 960 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;


// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// define the line
var valueline = d3.line()
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y(d.Population); });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var US_LineChart = d3.select("#s2").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("US_TotalPop.csv", function(error, data) {
  if (error) throw error;

  // format the data
  data.forEach(function(d) {
      d.Population = +d.Population;
      d.Year = +d.Year;
  });

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.Year; }));
  y.domain(d3.extent(data, function(d) { return d.Population; }));

  // Add the valueline path.
  US_LineChart.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);

  // Add the X Axis
  US_LineChart.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickFormat(d3.format(".0f")));
      
  // Add the Y Axis
  US_LineChart.append("g")
      .call(d3.axisLeft(y)
      );

// text label for the x axis
US_LineChart.append("text")             
.attr("transform",
      "translate(" + (width/2) + " ," + 
                     (height + margin.top + 20) + ")")
.style("text-anchor", "middle")
.text("Year");

// text label for the y axis
US_LineChart.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - margin.left)
.attr("x",0 - (height / 2))
.attr("dy", "1em")
.style("text-anchor", "middle")
.text("Population");      

});