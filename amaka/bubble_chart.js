d3.queue()
    .defer(d3.json, 'europeFinal.json')
    .await(onDataLoaded);

function onDataLoaded(error, data) {
    if (error) {
        console.log('Error log: ' + error);
    } else {
        handleData(data);
    }
}


var json = {"category": "Videos", "sub_category": "Video Games", "goal": "200", "pledged": "0"};
function handleData (datas) {
  d3.select('svg').remove();
  d3.select("legend").remove();
  var data = datas.data;
  var columns = ["Pledged", "Goal"];
  var keys = columns;
  var picker = document.getElementById('dataCenterPicker');
  var format = d3.timeFormat('%B');
  var dateValue;
  var cardHeight = 30,
    canvasWidth = 900,
    cardWidth = canvasWidth / 12,
    legendHeight = cardHeight * 4,
    legendWidth = cardWidth * 7,
    canvasWidthTotal = canvasWidth + (cardWidth * 2),
    canvasHeight = (cardHeight * 35) + legendHeight,
    gridSize = Math.floor(canvasWidth / 24);
  var svg = d3.select(".viz-2")
    .append("svg:svg")
    .attr("width", canvasWidth - 200)
    .attr("height", canvasHeight/2)
    .attr('class', 'bubs')
    .attr('id', 'chart');

      var tooltip = floatingTooltip('gates_tooltip', 240);


   window.addEventListener('urlHandled', function (e) {
      handleData(datas);
      if(e.detail) {
        json = e.detail;
      }
    });

    drawSlider();
    getData(null, 'mean');

    function drawSlider () {
      var formatDate = d3.timeFormat("%B");
      var x = d3.scaleLinear().range([0, width]);

      // parameters
      var margin = {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50
        },
        width = 700 - margin.left - margin.right,
        height = 300 - margin.bottom - margin.top;

      // scale function
      var timeScale = d3.scaleTime()
        .domain([new Date('2012-01-02'), new Date('2013-01-01')])
        .range([0, width])
        .clamp(true);

      // initial value
      var startValue = timeScale(new Date('2012-03-20'));
      startingValue = new Date('2012-01-20');
      //////////

      // defines brush
      var brush = d3.brushX()
          .extent([[0, 0], [startingValue, 60]])
          .on("start brush end", brushed);

      var sv = svg.append("g")
        .attr('class', 'slide')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("vertical-align", "top")
        // classic transform to position g
        .attr("transform", "translate(" + margin.left + ", 0)");

      sv.append("g")
        .attr("class", "x axis")
      // put in middle of screen
      .attr("transform", "translate(0," + height / 4 + ")")
      // inroduce axis
      .call(d3.axisBottom()
        .scale(timeScale)
        .tickFormat(function(d) {
          return formatDate(d);
        })
        .tickSize(0)
        .tickPadding(5)
        .tickValues([timeScale.domain()[0], timeScale.domain()[1]]))
        .select(".domain")
        .select(function() {
          return this.parentNode.appendChild(this.cloneNode(true));
        })
        .attr("class", "halo");

      var slider = sv.append("g")
        .attr("class", "slider")
        .call(brush);

      slider.select(".background")
        .attr("height", height);

      var handles = slider.append("g")
        .attr("class", "handles");

      handles.append("path")
        .attr("transform", "translate(0," + (height / 4) + ")")
        .attr("d", "M 0 -10 V 10");

      handles.append('text')
        .text(formatDate(startingValue))
        .attr("transform", "translate(" + (-18) + " ," + (height / 4 - 25) + ")")
        .style('display', 'block');

      function brushed() {
        var value = d3.brushSelection(d3.select(".slider").node());

        if (d3.event && d3.event.selection) {
          value = timeScale.invert(d3.mouse(this)[0]);
          brush.extent([[0, 0], [0, 0]]);
          handles.attr("transform", "translate(" + timeScale(value) + ",0)");
          handles.select('text').text(formatDate(value));

          if (d3.event.type === 'end') {

            d3.selectAll("circle").remove();
            d3.select("legend").remove();
            tooltip.hideTooltip();
            dateValue = formatDate(value);
            getData(dateValue, 'mean');
          }  
        }
      }
    }

    function getData (mth, stats) {
      var arr = [];
      var ar = [];
      var a = {};
      var count = 0;
      var countEnd = 1000;
      var b = {};
      var totalGoals = 0;
      var totalPledged = 0;
      var position;
      var sortedArr;
      var diameter = Math.min(canvasWidth, canvasHeight/2) - 80;

      var colorrange = ['#DF4949', '#E27A3F', '#EFC94C', '#9B59B6', '#3498db',
        '#F495A3', '#45B29D', '#293950', '#b60335', '#2d7108', '#320871', 
        '#71182b', '#64dcbe', '#9fdc64', '#9e5f28', '#ec2876', '#013639',
        '#39011d', '#9d00c4', '#771715'];

      var z = d3.scaleOrdinal()
      .range(colorrange);

      d3.select(".viz-2")
        .append('legend')
        .append('div')
        .attr('class', 'filters')
        .html('Sort by: <a class="min" id="min">Min</a> / <a class="mean" id="mean">Mean</a> / <a class="max" id="max">Max</a><br><a id="clear" class="clear">Clear Filters</a>')

      d3.select("legend")
        .append('div')
        .attr('class', 'legendLeft');


      var min = document.getElementById('min');
      var max = document.getElementById('max');
      var mean = document.getElementById('mean');
      var clear = document.getElementById('clear');
      // @v4 strength to apply to the position forces
      var forceStrength = 0.2;
      var bubbles = null;
      var delay = 0;
      function charge(d) {
        return -Math.pow(d.radius, 2.0) * forceStrength;
      }
      // Constants for sizing
      var width = 940;
      var height = 600;
      var center = { x: width / 2, y: height / 2 };

      // Here we create a force layout and
      // @v4 We create a force simulation now and
      //  add forces to it.
      var simulation = d3.forceSimulation()
        .velocityDecay(0.2)
        .force('x', d3.forceX().strength(forceStrength).x(center.x))
        .force('y', d3.forceY().strength(forceStrength).y(center.y))
        .force('charge', d3.forceManyBody().strength(charge))
        .on('tick', ticked);

      // @v4 Force starts up automatically,
      //  which we don't want as there aren't any nodes yet.
      simulation.stop();
    
      min.addEventListener('click', function (e) {
        d3.selectAll("circle").remove();
        d3.select("legend").remove();
        dateValue = dateValue || null;
        getData(dateValue, 'min');
      });
      max.addEventListener('click', function (e) {
        d3.selectAll("circle").remove();
        d3.select("legend").remove();
        dateValue = dateValue || null;
        getData(dateValue, 'max');
      });
      mean.addEventListener('click', function (e) {
        d3.selectAll("circle").remove();
        d3.select("legend").remove();
        dateValue = dateValue || null;
        getData(dateValue, 'mean');
      });
      clear.addEventListener('click', function(e){
        d3.selectAll("circle").remove();
        d3.select("legend").remove();
        d3.select('.slide').remove();
        dateValue = null;
        getData(null, 'mean');
        drawSlider();
      }, false);

      for (var i = 0; i < data.length; i++) {
        var obj = {};
        var cat = json.sub_category;
        if (data[i].category.name.toLowerCase() === cat.toLowerCase()) {
          var date = new Date(1000*data[i].launched_at);
          var month = format(date);

          if (mth && month.toLowerCase() === mth.toLowerCase()) {
            obj.Pledged = data[i].pledged;
            obj.Goal = data[i].goal;
            obj.Category = data[i].category.name;
            obj.Country = data[i].country;
            obj.Month = month;
            arr.push(obj);
            ar[data[i].goal] = ar[data[i].goal] || [];
          } else if (mth === null) {
            obj.Pledged = data[i].pledged;
            obj.Goal = data[i].goal;
            obj.Category = data[i].category.name;
            obj.Country = data[i].country;
            obj.Month = month;
            arr.push(obj);
            ar[data[i].goal] = ar[data[i].goal] || [];
          }
        }
      }

      if (arr.length > 0) {
        sortedArr = arr.sort(function(x, y){
          return d3.ascending(x.Goal, y.Goal);
        });


        a[count + '-' + countEnd] = [];
        b.goals = [];
        b.pledged = [];

        for (var j = 0; j < sortedArr.length; j++) {
          for (key in ar) {
            if (Number(key) === sortedArr[j].Goal) {
              if (Number(key) <= countEnd) {
                b.goals.push(sortedArr[j].Goal);
                b.pledged.push(sortedArr[j].Pledged);
                a[count + '-' + countEnd] = b;

                if (json.goal.split('.0')[0] > count && json.goal.split('.0')[0] < countEnd) {
                  position = count + '-' + countEnd;
                }
              } else {
                b = {};
                b.goals = [];
                b.pledged = [];
                count += 1000;
                countEnd += 1000;
              }
            }
          }
        }

        for (var k in a) {
          var avGoals, avPledged, sumGoals, sumPledged;

          if (a[k].goals) {
            sumGoals = d3.sum(a[k].goals);
            sumPledged = d3.sum(a[k].pledged);
            if (stats === 'mean') {
              avGoals = sumGoals/a[k].goals.length;
              avPledged = sumPledged/a[k].pledged.length;
            } else if (stats === 'min') {
              avGoals = d3.min(a[k].goals);
              avPledged = d3.min(a[k].pledged);
            } else if (stats === 'max') {
              avGoals = d3.max(a[k].goals);
              avPledged = d3.max(a[k].pledged);
            }

            a[k].range = avPledged/avGoals;
            a[k].av_goal = avGoals;
            a[k].av_pledged = avPledged;
            totalGoals += sumGoals;
            totalPledged += sumPledged;
          } 
        }

        statPerc = totalPledged/totalGoals * 100;
        statScore = statPerc/4;

        /* D3 Bubble Chart */      
        var bubble = d3.pack()
            .size([diameter, diameter]) // new data is loaded to bubble layout
            .padding(3);
        var r = d3.hierarchy(processData(a))
          .sum(function(d) { return d.size; })
          .sort(function(a, b) { return b.value - a.value; });

        drawBubbles(a);
      } else {
        d3.select('.slide').remove();
        d3.select("legend").remove();
        d3.select('.bubs')
        .append('text')
        .attr("transform", "translate(300, 100)")
        .style('display', 'block')
        .text('No info to show')
        .attr('class', 'nothing');
        return;
      }

      function showDetail(d) {
        // change outline to indicate hover state.
        d3.select(this).attr('stroke', 'black');
        var content = '<span class="name">Category: </span><span class="value">' +
                      json.category +
                      '</span><br/>' +
                      '<span class="name">Your Goal: </span><span class="value">$' +
                      json.goal +
                      '</span><br/>' +
                      '<span class="name">Goal Range: </span><span class="value">$' +
                      d.data.name +
                      '</span><br/>' +
                      '<span class="name">Average Goal Amount in this Range: </span><span class="value">$' +
                      Math.round(d.data.av_goal) +
                      '</span><br/>' +
                      '<span class="name">Your Pledged Amount: </span><span class="value">$' +
                      json.pledged +
                      '</span><br/>' +
                      '<span class="name">Average Pledged Amount in this Range: </span><span class="value">$' +
                      Math.round(d.data.av_pledged) +
                      '</span><br/>' +
                      '<span class="name">Month: </span><span class="value">' +
                      mth +
                      '</span>';

        tooltip.showTooltip(content, d3.event);
      }

      /*
       * Hides tooltip
       */
      function hideDetail(d) {
        // reset outline
        d3.select(this)
          .attr('stroke', 'none');

        svg.selectAll('.goal'+ position)
          .attr('stroke', '#000000')
          .attr('stroke-width', '4')
          .append("circle")
          .attr('transform', function(d) { return 'translate(5, 5)'; })
          .attr('r', function(d) { return 3; });

        tooltip.hideTooltip();
      }

      function drawBubbles(c) {
        // @v4 strength to apply to the position forces
        var forceStrength = 0.03;
        // generate data with calculated layout values
        var nodes = bubble(r).descendants()
          .filter(function(d) { return !d.children; }); // filter out the outer bubble
        // assign new data to existing DOM 
        nodes = nodes.sort(function(x, y){
          return Number(x.data.name.split('-')[0]) - Number(y.data.name.split('-')[0]);
        });

        var vis = svg.selectAll('circle')
          .data(nodes, function(d) { return d.data.name; });
        // enter data -> remove, so non-exist selections for upcoming data won't stay -> enter new data -> ...
        // To chain transitions, 
        // create the transition on the updating elements before the entering elements 
        // because enter.append merges entering elements into the update selection
        var duration = 500;
        // update - this is created before enter.append. it only applies to updating nodes.
        /*vis.transition()
          .duration(duration)
          .delay(function(d, i) {delay = i * 7; return delay;}) 
          .attr('transform', function(d) { return 'translate(' + d.x/2 + ',' + d.y/2 + ')'; })
          .attr('r', function(d) { return d.r; })
          .style('opacity', 1); // force to 1, so they don't get stuck below 1 at enter()
*/
        // enter - only applies to incoming elements (once emptying data) 
        var bubblesE = vis.enter().append('circle')
          .classed('bubble', true)
          .attr('r', 0)
          .on('mouseover', showDetail)
          .on('mouseout', hideDetail)
          .attr('class', 'graph')
          .attr('transform', function(d) { return 'translate(' + d.x/2 + ',' + d.y/2 + ')'; })
          .attr('r', function(d) { return 0; })
          .style("fill", function(d, i) {
            return z(i); })
          .attr('class', function(d, i) { 
            d3.select('.legendLeft')
            .append('div')
            .attr('data-category', d.data.name)
            .style('fill', z(i))
            .style('background', z(i))
            .attr('class', 'goal' + d.data.name);
            return 'goal' + d.data.name; 
          })
          .transition()
          .duration(duration * 1.2)
          .attr('transform', function(d) { return 'translate(' + d.x/2 + ',' + d.y/2 + ')'; })
          .attr('r', function(d) { return d.r/1.5; })
          .style('opacity', 1);

        d3.selectAll('.goal'+ position)
          .attr('stroke', '#000000')
          .attr('stroke-width', '4')
          .style('stroke', '#000000');

        bubbles = vis.merge(bubblesE);

        simulation.nodes(nodes);

        // Set initial layout to single group.
        groupBubbles();


        // exit
        vis.exit()
          .transition()
          .duration(duration)
          .attr('transform', function(d) { 
            var dy = d.y - diameter/2;
            var dx = d.x - diameter/2;
            var theta = Math.atan2(dy,dx);
            var destX = diameter * (1 + Math.cos(theta) )/ 2;
            var destY = diameter * (1 + Math.sin(theta) )/ 2; 
            return 'translate(' + destX + ',' + destY + ')'; })
          .attr('r', function(d) { return 0; })
          .remove();
      }

      function ticked() {
        bubbles
          .attr('cx', function (d) { return d.x/2; })
          .attr('cy', function (d) { return d.y/2; });
      }

      function groupBubbles() {

        // @v4 Reset the 'x' force to draw the bubbles to the center.
        simulation.force('x', d3.forceX().strength(forceStrength).x(center.x));

        // @v4 We can reset the alpha value and restart the simulation
        simulation.alpha(1).restart();
      }

      function processData(data) {
        if(!data) return;
        var obj = data;
        var newDataSet = [];

        for(var prop in obj) {
          newDataSet.push({name: prop, className: prop.toLowerCase().replace(/ /g,''), size: obj[prop].range, av_pledged: obj[prop].av_pledged, av_goal: obj[prop].av_goal});
        }
        return {children: newDataSet};
      }
    }

}