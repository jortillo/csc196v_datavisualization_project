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

var whiteline = d3.line()
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y(d.white); });

var blackline = d3.line()
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y(d.black); });

var aianline = d3.line()
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y(d.aian); });

var asianline = d3.line()
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y(d.asian); });

var nhpiline = d3.line()
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y(d.nhpi); });

var multipleline = d3.line()
    .x(function(d) { return x(d.Year); })
    .y(function(d) { return y(d.multiple); });


// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var US_Projection = d3.select("#s6").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

          updateLine();

// Get the data
function updateLine(){
    d3.selectAll("#linetest").remove();
    d3.selectAll("#linetest.text").remove();
    
d3.csv("US_PopProjection2019-2060.csv", function(error, data) {
  if (error) throw error;

  // format the data
  data.forEach(function(d) {
      d.Population = +d.Population;
      d.Year = +d.Year;
      d.white = +d.white;
      d.black = +d.black;
      d.aian = +d.aian;
      d.asian = +d.asian;
      d.nhpi = +d.nhpi;
      d.multiple = +d.multiple;
  });

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.Year; }));
  if(document.getElementById("totalR").checked == true){
  y.domain(d3.extent(data, function(d) { return d.Population; }));
  }
  else if(document.getElementById("whiteR").checked == true){
 
    y.domain(d3.extent(data, function(d) { return d.white; }));
    }
    else if(document.getElementById("blackR").checked == true){
 
        y.domain(d3.extent(data, function(d) { return d.black; }));
        }
        else if(document.getElementById("aianR").checked == true){
 
            y.domain(d3.extent(data, function(d) { return d.aian; }));
            }
            else if(document.getElementById("asianR").checked == true){
 
                y.domain(d3.extent(data, function(d) { return d.asian; }));
                }
                else if(document.getElementById("nhpiR").checked == true){
 
                    y.domain(d3.extent(data, function(d) { return d.nhpi; }));
                    }
                    else if(document.getElementById("multipleR").checked == true){
 
                        y.domain(d3.extent(data, function(d) { return d.multiple; }));
                        }
 

  // Add the valueline path.
  US_Projection.append("path")
      .data([data])
      .attr("class", "line")
      .attr("id", "linetest")
      .attr("d", valueline);

  US_Projection.append("path")
      .data([data])
      .attr("class", "line")
      .attr("id", "linetest")
      .attr("d", whiteline);

  US_Projection.append("path")
      .data([data])
      .attr("class", "line")
      .attr("id", "linetest")
      .attr("d", blackline);

  US_Projection.append("path")
      .data([data])
      .attr("class", "line")
      .attr("id", "linetest")
      .attr("d", aianline);

  US_Projection.append("path")
      .data([data])
      .attr("class", "line")
      .attr("id", "linetest")
      .attr("d", asianline);

  US_Projection.append("path")
      .data([data])
      .attr("class", "line")
      .attr("id", "linetest")
      .attr("d", nhpiline);

  US_Projection.append("path")
      .data([data])
      .attr("class", "line")
      .attr("id", "linetest")
      .attr("d", multipleline);

  // Add the X Axis
  US_Projection.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickFormat(d3.format(".0f")));
      
  // Add the Y Axis
  US_Projection.append("g")
  .attr("id", "linetest")
      .call(d3.axisLeft(y)
      );

// text label for the x axis
US_Projection.append("text")             
.attr("transform",
      "translate(" + (width/2) + " ," + 
                     (height + margin.top + 20) + ")")
.style("text-anchor", "middle")
.text("Year");

// text label for the y axis
US_Projection.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - margin.left)
.attr("x",0 - (height / 2))
.attr("dy", "1em")
.style("text-anchor", "middle")
.text("Population");      

});
}