var margin = {top: 0, right: 0, bottom: 0, left: 0},
            width = 960 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;

var world_map = d3.select("#test")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append('g')
            .attr('class', 'map');
var path = d3.geoPath();
var population = d3.map();
var color = d3.scaleThreshold()
    .domain([100000, 1000000, 10000000, 30000000, 100000000, 200000000, 600000000])
    .range(d3.schemePurples[8]);


    var projection = d3.geoMercator()
    .scale(130)
    .translate( [width / 2, height / 1.5]);

var path = d3.geoPath().projection(projection);

d3.queue()
    .defer(d3.json, "countries-110m.json")
    .defer(d3.csv, "world_population.csv", function(d) {
        population.set(d.id, +d.POP2018);
    })
    .await(ready);

function ready(error, world, pop) {
    console.log(pop);
    if (error) throw error;

    world_map.append("g")
        .attr("class", "countries")
        .selectAll("path")
        .data(topojson.feature(world, world.objects.countries).features)
        .enter().append("path")
        .attr("d", path)
        .attr("fill", function(d) {
            d.POP2018 = population.get(d.id) || 0;
            // Set the color
            return color(d.POP2018);
        })
        .append("title")
        .text(function(d) {
            return d.properties.name + ", Population: " + d.POP2018;
        });

        world_map.append("path")
        .attr("class", "country-borders")
        .attr("d", path(topojson.mesh(world, world.objects.countries, function(a, b) {
            return a !== b;
        })));
}