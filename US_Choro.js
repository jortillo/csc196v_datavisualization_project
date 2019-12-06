// slider
var slider = document.getElementById("slider");
var output = document.getElementById("year");
var outputPop = document.getElementById("totalpop");
var pop = 282171957;
outputPop.innerHTML = pop;
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    output.innerHTML = this.value;
    updateData()
    updateTotalPop()
    outputPop.innerHTML = pop;
}


function updateTotalPop(){
    if (output.innerHTML == 2000){
        pop = 282171957;
    }
    else if(output.innerHTML == 2001){
        pop = 285081556;
    }
    else if(output.innerHTML == 2002){
        pop = 287803914;
    }
    else if(output.innerHTML == 2003){
        pop = 290326418;
    }
    else if(output.innerHTML == 2004){
        pop = 293045739;
    }
    else if(output.innerHTML == 2005){
        pop = 295753151;
    }
    else if(output.innerHTML == 2006){
        pop = 298593212;
    }
    else if(output.innerHTML == 2007){
        pop = 301579895;
    }
    else if(output.innerHTML == 2008){
        pop = 304374846;
    }
    else if(output.innerHTML == 2009){
        pop = 307006550;
    }
    else if(output.innerHTML == 2010){
        pop = 309326085;
    }
    else if(output.innerHTML == 2011){
        pop = 311580009;
    }
    else if(output.innerHTML == 2012){
        pop = 313874218;
    }
    else if(output.innerHTML == 2013){
        pop = 316057727;
    }
    else if(output.innerHTML == 2014){
        pop = 318386421;
    }
    else if(output.innerHTML == 2015){
        pop = 320742673;
    }
    else if(output.innerHTML == 2016){
        pop = 323071342;
    }
    else if(output.innerHTML == 2017){
        pop = 325147121;
    }
    else if(output.innerHTML == 2018){
        pop = 325147121;
    }
}

var inputValue = null;

//map
var us_map = d3.select("#map");
var path = d3.geoPath();
var population = d3.map();

// Chromatic Scale
var x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

var color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemePurples[8]);
// Create element for legend
var g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("Population");

// Legend markings - 2%, 3%, etc.
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return i ? x : x; })
.tickValues(color.domain()))
.select(".domain")
.remove();
//creates map
// d3.json("states-albers-10m.json", function(error, us) {
// if (error) throw error;

d3.queue()
    .defer(d3.json, "states-albers-10m.json")
    .defer(d3.csv, "population.csv", function(d) {
        population.set(d.id, +d.POPESTIMATE2000);
    })
    .await(ready);

function ready(error, us, pop) {
    console.log(pop);
    if (error) throw error;

    us_map.append("g")
        .attr("class", "states")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
        .attr("d", path)
        .attr("fill", function(d) {
            d.POPESTIMATE2000 = population.get(d.id);
            // Set the color
            return color(d.POPESTIMATE2000);
        })
        .append("title")
        .text(function(d) {
            return d.properties.name + ", Population: " + d.POPESTIMATE2000;
        });

        us_map.append("path")
        .attr("class", "state-borders")
        .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
            return a !== b;
        })));
}

function updateData() {
    us_map.exit()
    if(document.getElementById("male").checked == true) {
    updateDataMale()
    }
    else if(document.getElementById("female").checked == true) {
    updateDataFemale()
    }
    else if (output.innerHTML == "2018" && document.getElementById("both").checked == true) {

// Remake Chromatic Scale
x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemePurples[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();

        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2018);
            })
            /*.defer(d3.csv,"population.csv", function(d){
              return{
                pop2000: population.set(d.id, d.POPESTIMATE2000),
              }
            })*/
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2018 = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2018);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2018;
                });

                us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2017 && document.getElementById("both").checked == true) {
        // Remake Chromatic Scale
x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemePurples[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2017);
            })
            /*.defer(d3.csv,"population.csv", function(d){
              return{
                pop2000: population.set(d.id, d.POPESTIMATE2000),
              }
            })*/
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2017 = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2017);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2017;
                });

                us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2016 && document.getElementById("both").checked == true) {
// Remake Chromatic Scale
x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemePurples[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2016);
            })
            /*.defer(d3.csv,"population.csv", function(d){
              return{
                pop2000: population.set(d.id, d.POPESTIMATE2000),
              }
            })*/
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2016 = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2016);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2016;
                });

                us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2015 && document.getElementById("both").checked == true) {
        // Remake Chromatic Scale
x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemePurples[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2015);
            })
            /*.defer(d3.csv,"population.csv", function(d){
              return{
                pop2000: population.set(d.id, d.POPESTIMATE2000),
              }
            })*/
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2015 = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2015);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2015;
                });

                us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2014 && document.getElementById("both").checked == true) {
        // Remake Chromatic Scale
x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemePurples[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2014);
            })
            /*.defer(d3.csv,"population.csv", function(d){
              return{
                pop2000: population.set(d.id, d.POPESTIMATE2000),
              }
            })*/
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2014 = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2014);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2014;
                });

                us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2013 && document.getElementById("both").checked == true) {
                  // Remake Chromatic Scale
x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemePurples[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2012);
            })
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2013);
            })
            /*.defer(d3.csv,"population.csv", function(d){
              return{
                pop2000: population.set(d.id, d.POPESTIMATE2000),
              }
            })*/
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2013 = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2013);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2013;
                });

                us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2012 && document.getElementById("both").checked == true) {
        // Remake Chromatic Scale
x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemePurples[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2012);
            })
            /*.defer(d3.csv,"population.csv", function(d){
              return{
                pop2000: population.set(d.id, d.POPESTIMATE2000),
              }
            })*/
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2012 = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2012);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2012;
                });

                us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2011 && document.getElementById("both").checked == true) {
        // Remake Chromatic Scale
x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemePurples[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2011);
            })
            /*.defer(d3.csv,"population.csv", function(d){
              return{
                pop2000: population.set(d.id, d.POPESTIMATE2000),
              }
            })*/
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2011 = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2011);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2011;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2010 && document.getElementById("both").checked == true) {
        // Remake Chromatic Scale
x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemePurples[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2010);
            })
            /*.defer(d3.csv,"population.csv", function(d){
              return{
                pop2000: population.set(d.id, d.POPESTIMATE2000),
              }
            })*/
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2010 = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2010);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2010;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2009 && document.getElementById("both").checked == true) {
        // Remake Chromatic Scale
x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemePurples[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2009);
            })
            /*.defer(d3.csv,"population.csv", function(d){
              return{
                pop2000: population.set(d.id, d.POPESTIMATE2000),
              }
            })*/
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2009 = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2009);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2009;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2008 && document.getElementById("both").checked == true) {
        // Remake Chromatic Scale
x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemePurples[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2008);
            })
            /*.defer(d3.csv,"population.csv", function(d){
              return{
                pop2000: population.set(d.id, d.POPESTIMATE2000),
              }
            })*/
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2008 = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2008);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2008;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2007 && document.getElementById("both").checked == true) {
        // Remake Chromatic Scale
x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemePurples[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2007);
            })
            /*.defer(d3.csv,"population.csv", function(d){
              return{
                pop2000: population.set(d.id, d.POPESTIMATE2000),
              }
            })*/
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2007 = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2007);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2007;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2006 && document.getElementById("both").checked == true) {
        // Remake Chromatic Scale
x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemePurples[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2006);
            })
            /*.defer(d3.csv,"population.csv", function(d){
              return{
                pop2000: population.set(d.id, d.POPESTIMATE2000),
              }
            })*/
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2006 = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2006);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2006;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2005 && document.getElementById("both").checked == true) {
        // Remake Chromatic Scale
x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemePurples[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2005);
            })
            /*.defer(d3.csv,"population.csv", function(d){
              return{
                pop2000: population.set(d.id, d.POPESTIMATE2000),
              }
            })*/
            .await(ready);

        function ready(error, us, pop ) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2005 = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2005);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2005;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2004 && document.getElementById("both").checked == true) {
        // Remake Chromatic Scale
x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemePurples[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2004);
            })
            /*.defer(d3.csv,"population.csv", function(d){
              return{
                pop2000: population.set(d.id, d.POPESTIMATE2000),
              }
            })*/
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2004 = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2004);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2004;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2003 && document.getElementById("both").checked == true) {
        // Remake Chromatic Scale
x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemePurples[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2003);
            })
            /*.defer(d3.csv,"population.csv", function(d){
              return{
                pop2000: population.set(d.id, d.POPESTIMATE2000),
              }
            })*/
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2003 = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2003);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2003;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2002 && document.getElementById("both").checked == true) {
        // Remake Chromatic Scale
x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemePurples[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2002);
            })
            /*.defer(d3.csv,"population.csv", function(d){
              return{
                pop2000: population.set(d.id, d.POPESTIMATE2000),
              }
            })*/
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2002 = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2002);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2002;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2001 && document.getElementById("both").checked == true) {
        // Remake Chromatic Scale
x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemePurples[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2001);
            })
            /*.defer(d3.csv,"population.csv", function(d){
              return{
                pop2000: population.set(d.id, d.POPESTIMATE2000),
              }
            })*/
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2001 = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2001);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2001;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2000 && document.getElementById("both").checked == true) {
        // Remake Chromatic Scale
x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemePurples[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2000);
            })
            /*.defer(d3.csv,"population.csv", function(d){
              return{
                pop2000: population.set(d.id, d.POPESTIMATE2000),
              }
            })*/
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2000 = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2000);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2000;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    }
}
function updateDataMale() {
    if (output.innerHTML == "2018" && document.getElementById("male").checked == true)  {
    // Update Chromatic Scale
 x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemeBlues[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();

        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2018_MALE);
            })

            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2018_MALE = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2018_MALE);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2018_MALE;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2017 && document.getElementById("male").checked == true) {
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2017_MALE);
            })

            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2017_MALE = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2017_MALE);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2017_MALE;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2016 && document.getElementById("male").checked == true) {
         // Update Chromatic Scale
 x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemeBlues[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings 
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2016_MALE);
            })
            
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2016_MALE = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2016_MALE);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2016_MALE;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2015 && document.getElementById("male").checked == true) {
       // Update Chromatic Scale
 x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemeBlues[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2015_MALE);
            })
           
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2015_MALE = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2015_MALE);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2015_MALE;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2014 && document.getElementById("male").checked == true) {
       // Update Chromatic Scale
 x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemeBlues[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings 
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2014_MALE);
            })
            
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2014_MALE = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2014_MALE);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2014_MALE;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2013 && document.getElementById("male").checked == true) {
       // Update Chromatic Scale
 x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemeBlues[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings 
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2013_MALE);
            })
           
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2013_MALE = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2013_MALE);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2013_MALE;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2012 && document.getElementById("male").checked == true) {
       // Update Chromatic Scale
 x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemeBlues[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings 
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2012_MALE);
            })
           
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2012_MALE = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2012_MALE);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2012_MALE;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2011 && document.getElementById("male").checked == true) {
       // Update Chromatic Scale
 x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemeBlues[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2011_MALE);
            })
            
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2011_MALE = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2011_MALE);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2011_MALE;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2010 && document.getElementById("male").checked == true) {
       // Update Chromatic Scale
 x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemeBlues[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings 
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2010_MALE);
            })
            
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2010_MALE = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2010_MALE);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2010_MALE;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2009 && document.getElementById("male").checked == true) {
       // Update Chromatic Scale
 x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemeBlues[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings 
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2009_MALE);
            })
         
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2009_MALE = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2009_MALE);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2009_MALE;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2008 && document.getElementById("male").checked == true) {
       // Update Chromatic Scale
 x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemeBlues[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings 
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2008_MALE);
            })
            
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2008_MALE = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2008_MALE);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2008_MALE;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2007 && document.getElementById("male").checked == true) {
       // Update Chromatic Scale
 x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemeBlues[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings 
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2007_MALE);
            })
            
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2007_MALE = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2007_MALE);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2007_MALE;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2006 && document.getElementById("male").checked == true) {
       // Update Chromatic Scale
 x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemeBlues[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings 
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2006_MALE);
            })
            
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2006_MALE = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2006_MALE);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2006_MALE;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2005 && document.getElementById("male").checked == true) {
       // Update Chromatic Scale
 x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemeBlues[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings 
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2005_MALE);
            })
           
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2005_MALE = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2005_MALE);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2005_MALE;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2004 && document.getElementById("male").checked == true) {
       // Update Chromatic Scale
 x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemeBlues[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings 
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2004_MALE);
            })
           
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2004_MALE = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2004_MALE);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2004_MALE;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2003 && document.getElementById("male").checked == true) {
       // Update Chromatic Scale
 x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemeBlues[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings 
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2003_MALE);
            })
            
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2003_MALE = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2003_MALE);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2003_MALE;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2002 && document.getElementById("male").checked == true) {
       // Update Chromatic Scale
 x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemeBlues[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings 
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2002_MALE);
            })
            
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2002_MALE = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2002_MALE);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2002_MALE;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2001 && document.getElementById("male").checked == true) {
       // Update Chromatic Scale
 x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemeBlues[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings 
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2001_MALE);
            })
           
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2001_MALE = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2001_MALE);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2001_MALE;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2000 && document.getElementById("male").checked == true) {
       // Update Chromatic Scale
 x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemeBlues[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2000_MALE);
            })
           
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2000_MALE = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2000_MALE);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2000_MALE;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    }
}
function updateDataFemale() {
    if (output.innerHTML == "2018" && document.getElementById("female").checked == true)  {
    // Update Chromatic Scale
 x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemeRdPu[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();

        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2018_F);
            })

            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2018_F = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2018_F);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2018_F;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2017 && document.getElementById("female").checked == true) {
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2017_F);
            })

            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2017_F = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2017_F);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2017_F;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2016 && document.getElementById("female").checked == true) {
         // Update Chromatic Scale
 x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemeRdPu[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings 
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2016_F);
            })
            
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2016_F = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2016_F);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2016_F;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2015 && document.getElementById("female").checked == true) {
       // Update Chromatic Scale
 x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemeRdPu[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2015_F);
            })
           
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2015_F = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2015_F);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2015_F;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2014 && document.getElementById("female").checked == true) {
       // Update Chromatic Scale
 x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemeRdPu[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings 
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2014_F);
            })
            
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2014_F = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2014_F);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2014_F;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2013 && document.getElementById("female").checked == true) {
       // Update Chromatic Scale
 x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemeRdPu[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings 
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2013_F);
            })
           
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2013_F = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2013_F);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2013_F;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2012 && document.getElementById("female").checked == true) {
       // Update Chromatic Scale
 x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemeRdPu[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings 
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2012_F);
            })
           
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2012_F = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2012_F);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2012_F;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2011 && document.getElementById("female").checked == true) {
       // Update Chromatic Scale
 x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemeRdPu[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2011_F);
            })
            
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2011_F = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2011_F);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2011_F;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2010 && document.getElementById("female").checked == true) {
       // Update Chromatic Scale
 x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemeRdPu[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings 
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2010_F);
            })
            
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2010_F = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2010_F);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2010_F;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2009 && document.getElementById("female").checked == true) {
       // Update Chromatic Scale
 x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemeRdPu[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings 
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2009_F);
            })
         
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2009_F = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2009_F);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2009_F;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2008 && document.getElementById("female").checked == true) {
       // Update Chromatic Scale
 x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemeRdPu[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings 
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2008_F);
            })
            
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2008_F = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2008_F);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2008_F;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2007 && document.getElementById("female").checked == true) {
       // Update Chromatic Scale
 x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemeRdPu[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings 
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2007_F);
            })
            
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2007_F = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2007_F);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2007_F;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2006 && document.getElementById("female").checked == true) {
       // Update Chromatic Scale
 x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemeRdPu[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings 
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2006_F);
            })
            
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2006_F = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2006_F);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2006_F;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2005 && document.getElementById("female").checked == true) {
       // Update Chromatic Scale
 x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemeRdPu[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings 
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2005_F);
            })
           
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2005_F = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2005_F);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2005_F;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2004 && document.getElementById("female").checked == true) {
       // Update Chromatic Scale
 x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemeRdPu[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings 
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2004_F);
            })
           
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2004_F = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2004_F);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2004_F;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2003 && document.getElementById("female").checked == true) {
       // Update Chromatic Scale
 x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemeRdPu[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings 
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2003_F);
            })
            
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2003_F = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2003_F);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2003_F;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2002 && document.getElementById("female").checked == true) {
       // Update Chromatic Scale
 x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemeRdPu[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings 
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2002_F);
            })
            
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2002_F = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2002_F);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2002_F;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2001 && document.getElementById("female").checked == true) {
       // Update Chromatic Scale
 x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemeRdPu[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings 
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2001_F);
            })
           
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2001_F = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2001_F);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2001_F;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    } else if (output.innerHTML == 2000 && document.getElementById("female").checked == true) {
       // Update Chromatic Scale
 x = d3.scaleLinear()
.domain([600000, 40000000])
.rangeRound([400, 1050]);

 color = d3.scaleThreshold()
    .domain([600000, 3000000, 6000000, 9000000, 15000000, 25000000, 30000000, 35000000])
    .range(d3.schemeRdPu[8]);
// Create element for legend
g = us_map.append("g")
.attr("class", "key")
.attr("transform", "translate(-150,15)");

// Legend color scale
g.selectAll("rect")
.data(color.range().map(function(d) {
d = color.invertExtent(d);
if (d[0] == null) d[0] = x.domain()[0];
if (d[1] == null) d[1] = x.domain()[1];
return d;
}))
.enter().append("rect")
.attr("height", 8)
.attr("x", function(d) { return x(d[0]); })
.attr("width", function(d) { return x(d[1]) - x(d[0]); })
.attr("fill", function(d) { return color(d[0]); });

// Legend title 
g.append("text")
.attr("class", "caption")
.attr("x", x.range()[0])
.attr("y", -6)
.attr("fill", "#000")
.attr("text-anchor", "start")
.attr("font-weight", "bold")
.text("");

// Legend markings
g.call(d3.axisBottom(x)
.tickSize(13)
.tickFormat(function(x, i) { return ""; })
.tickValues(color.domain()))
.select(".domain")
.remove();
        d3.queue()
            .defer(d3.json, "states-albers-10m.json")
            .defer(d3.csv, "population.csv", function(d) {
                population.set(d.id, +d.POPESTIMATE2000_F);
            })
           
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            us_map.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", function(d) {
                    d.POPESTIMATE2000_F = population.get(d.id);
                    // Set the color
                    return color(d.POPESTIMATE2000_F);
                })
                .append("title")
                .text(function(d) {
                    return d.properties.name + ", Population: " + d.POPESTIMATE2000_F;
                });

            us_map.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }
    }
}