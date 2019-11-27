

       //map
        var svg = d3.select("svg");
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
var g = svg.append("g")
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
            /*.defer(d3.csv,"population.csv", function(d){
              return{
                pop2000: population.set(d.id, d.POPESTIMATE2000),
              }
            })*/
            .await(ready);

        function ready(error, us, pop) {
            console.log(pop);
            if (error) throw error;

            svg.append("g")
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

            svg.append("path")
                .attr("class", "state-borders")
                .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) {
                    return a !== b;
                })));
        }