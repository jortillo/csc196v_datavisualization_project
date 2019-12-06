        // slider
        var sliderPie = document.getElementById("sliderPie");
        var outputPie = document.getElementById("yearPie");
        outputPie.innerHTML = sliderPie.value; // Display the default slider value

        // Update the current slider value (each time you drag the slider handle)
        sliderPie.oninput = function() {
            outputPie.innerHTML = sliderPie.value;
            updateRaceChart()
        }
        var inputValue = null;

        var width = 360;
        var height = 360;
        var radius = Math.min(width, height) / 2;
        var donutWidth = 75;
        var legendRectSize = 18;
        var legendSpacing = 4;

        var colorD = d3.scale.category10();

        var donutChart = d3.select('#chart')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + (width / 2) +
                ',' + (height / 2) + ')');

        var arc = d3.arc()
            .innerRadius(radius - donutWidth)
            .outerRadius(radius);

        var tooltip = d3.select('#s5')
            .append('div')
            .attr('class', 'tooltip');

        tooltip.append('div')
            .attr('class', 'race');

        tooltip.append('div')
            .attr('class', 'population');

        tooltip.append('div')
            .attr('class', 'percent');

        var raceInitial = d3.csv('racePop.csv', function(error, dataset) {
            dataset.forEach(function(d) {
                d.Population = +d.pop2000;

            });

            var pie = d3.layout.pie()
                .value(function(d) {
                    return d.Population;
                })
                .sort(null);

            var path = donutChart.selectAll('path')
                .data(pie(dataset))
                .enter()
                .append('path')
                .attr('d', arc)
                .attr('fill', function(d, i) {
                    return colorD(d.data.Race);
                });

            path.on('mouseover', function(d) {
                var total = d3.sum(dataset.map(function(d) {
                    return d.Population;
                }));
                var percent = Math.round(1000 * d.data.Population / total) / 10;
                tooltip.select('.race').html(d.data.Race);
                tooltip.select('.population').html(d.data.Population);
                tooltip.select('.percent').html(percent + '%');
                tooltip.style('display', 'block');
            });

            path.on('mouseout', function() {
                tooltip.style('display', 'none');
            });

            path.on('mousemove', function(d) {
                tooltip.style('top', (d3.event.pageY + 10) + 'px')
                    .style('left', (d3.event.pageX + 10) + 'px');
            });

            var legend = d3.select("#s5-chart").append("svg")
                .attr("class", "legend")
                .attr("width", radius * 2)
                .attr("height", radius * 2)
                .selectAll("g")
                .data(colorD.domain().slice().reverse())
                .enter().append("g")
                .attr("transform", function(d, i) {
                    return "translate(0," + i * 20 + ")";
                });

            legend.append("rect")
                .attr("width", 18)
                .attr("height", 18)
                .style("fill", colorD);

            legend.append("text")
                .attr("x", 24)
                .attr("y", 9)
                .attr("dy", ".35em")
                .text(function(d) {
                    return d;
                });
        });

        function updateRaceChart() {
            
            donutChart.remove().exit()
            var file;
            if(document.getElementById("bothHis").checked == true){
                file = "racePop.csv";
            }
            else if(document.getElementById("His").checked == true){
                file = "Hispanic-racePop.csv";
            }
            else if(document.getElementById("NonHis").checked == true){
                file = "NonHispanic-racePop.csv";
            }
            d3.csv(file, function(error, dataset) {
                dataset.forEach(function(d) {
                    if (outputPie.innerHTML == "2000") {
                        d.Population = +d.pop2000;
                    } else if (outputPie.innerHTML == "2001") {
                        d.Population = +d.pop2001;
                    } else if (outputPie.innerHTML == "2002") {
                        d.Population = +d.pop2002;
                    } else if (outputPie.innerHTML == "2003") {
                        d.Population = +d.pop2003;
                    } else if (outputPie.innerHTML == "2004") {
                        d.Population = +d.pop2004;
                    } else if (outputPie.innerHTML == "2005") {
                        d.Population = +d.pop2005;
                    } else if (outputPie.innerHTML == "2006") {
                        d.Population = +d.pop2006;
                    } else if (outputPie.innerHTML == "2007") {
                        d.Population = +d.pop2007;
                    } else if (outputPie.innerHTML == "2008") {
                        d.Population = +d.pop2008;
                    } else if (outputPie.innerHTML == "2009") {
                        d.Population = +d.pop2009;
                    } else if (outputPie.innerHTML == "2010") {
                        d.Population = +d.pop2010;
                    } else if (outputPie.innerHTML == "2011") {
                        d.Population = +d.pop2011;
                    } else if (outputPie.innerHTML == "2012") {
                        d.Population = +d.pop2012;
                    } else if (outputPie.innerHTML == "2013") {
                        d.Population = +d.pop2013;
                    } else if (outputPie.innerHTML == "2014") {
                        d.Population = +d.pop2014;
                    } else if (outputPie.innerHTML == "2015") {
                        d.Population = +d.pop2015;
                    } else if (outputPie.innerHTML == "2016") {
                        d.Population = +d.pop2016;
                    } else if (outputPie.innerHTML == "2017") {
                        d.Population = +d.pop2017;
                    } else if (outputPie.innerHTML == "2018") {
                        d.Population = +d.pop2018;
                    }
                });
                var donutChart = d3.select('#chart')
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height)
                    .append('g')
                    .attr('transform', 'translate(' + (width / 4.67) +
                        ',' + (height / 2.94) + ')');

                var arc = d3.arc()
                    .innerRadius(radius - donutWidth)
                    .outerRadius(radius);
                var pie = d3.layout.pie()
                    .value(function(d) {
                        return d.Population;
                    })
                    .sort(null);
                var pie = d3.layout.pie()
                    .value(function(d) {
                        return d.Population;
                    })
                    .sort(null);

                var path = donutChart.selectAll('path')
                    .data(pie(dataset))
                    .enter()
                    .append('path')
                    .attr('d', arc)
                    .attr('fill', function(d, i) {
                        return colorD(d.data.Race);
                    });

                path.on('mouseover', function(d) {
                    var total = d3.sum(dataset.map(function(d) {
                        return d.Population;
                    }));
                    var percent = Math.round(1000 * d.data.Population / total) / 10;
                    tooltip.select('.race').html(d.data.Race);
                    tooltip.select('.population').html(d.data.Population);
                    tooltip.select('.percent').html(percent + '%');
                    tooltip.style('display', 'block');
                });

                path.on('mouseout', function() {
                    tooltip.style('display', 'none');
                });

                path.on('mousemove', function(d) {
                    tooltip.style('top', (d3.event.pageY + 10) + 'px')
                        .style('left', (d3.event.pageX + 10) + 'px');
                });
                legend.exit().remove();
                var legend = d3.select("#s5-chart").append("svg")
                    .attr("class", "legend")
                    .attr("width", radius * 2)
                    .attr("height", radius * 2)
                    .selectAll("g")
                    .data(colorD.domain().slice().reverse())
                    .enter().append("g")
                    .attr("transform", function(d, i) {
                        return "translate(0," + i * 20 + ")";
                    });

                legend.append("rect")
                    .attr("width", 18)
                    .attr("height", 18)
                    .style("fill", colorD);

                legend.append("text")
                    .attr("x", 24)
                    .attr("y", 9)
                    .attr("dy", ".35em")
                    .text(function(d) {
                        return d;
                    });
            });
        }

        /*        var race2001 = d3.csv('racePop.csv', function(error, dataset) {
            dataset.forEach(function(d) {
                d.Population = +d.pop2001;
            });

        var race2002 = d3.csv('racePop.csv', function(error, dataset) {
            dataset.forEach(function(d) {
                d.Population = +d.pop2002;
            });

        var race2003 = d3.csv('racePop.csv', function(error, dataset) {
            dataset.forEach(function(d) {
                d.Population = +d.pop2003;
            });

        var race2004 = d3.csv('racePop.csv', function(error, dataset) {
            dataset.forEach(function(d) {
                d.Population = +d.pop2004;
            });

        var race2005 = d3.csv('racePop.csv', function(error, dataset) {
            dataset.forEach(function(d) {
                d.Population = +d.pop2005;
            });

        var race2006 = d3.csv('racePop.csv', function(error, dataset) {
            dataset.forEach(function(d) {
                d.Population = +d.pop2006;
            });

        var race2007 = d3.csv('racePop.csv', function(error, dataset) {
            dataset.forEach(function(d) {
                d.Population = +d.pop2007;
            });

        var race2008 = d3.csv('racePop.csv', function(error, dataset) {
            dataset.forEach(function(d) {
                d.Population = +d.pop2008;
            });

        var race2009 = d3.csv('racePop.csv', function(error, dataset) {
            dataset.forEach(function(d) {
                d.Population = +d.pop2009;
            });

        var race2010 = d3.csv('racePop.csv', function(error, dataset) {
            dataset.forEach(function(d) {
                d.Population = +d.pop2010;
            });

        var race2011 = d3.csv('racePop.csv', function(error, dataset) {
            dataset.forEach(function(d) {
                d.Population = +d.pop2011;
            });

        var race2012 = d3.csv('racePop.csv', function(error, dataset) {
            dataset.forEach(function(d) {
                d.Population = +d.pop2012;
            });

        var race2013 = d3.csv('racePop.csv', function(error, dataset) {
            dataset.forEach(function(d) {
                d.Population = +d.pop2013;
            });

        var race2014 = d3.csv('racePop.csv', function(error, dataset) {
            dataset.forEach(function(d) {
                d.Population = +d.pop2014;
            });

        var race2015 = d3.csv('racePop.csv', function(error, dataset) {
            dataset.forEach(function(d) {
                d.Population = +d.pop2015;
            });

        var race2016 = d3.csv('racePop.csv', function(error, dataset) {
            dataset.forEach(function(d) {
                d.Population = +d.pop2016;
            });

        var race2017 = d3.csv('racePop.csv', function(error, dataset) {
            dataset.forEach(function(d) {
                d.Population = +d.pop2017;
            });

        var race2018 = d3.csv('racePop.csv', function(error, dataset) {
            dataset.forEach(function(d) {
                d.Population = +d.pop2018;
            });*/