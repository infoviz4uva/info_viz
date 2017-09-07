
function maps(project){
  console.log(project);

    text =  project ;
        d3.json("../data/success_europe_filtered_changedID.json",function(data){
            var list_values = [];
            var countries = {};
            var sum = 0;


           data['data'].forEach(function(element) {
                if (element['category']['name'] === text){
                    countries[element['location']['country']] = (countries[element['location']['country']] || 0) + 1;
                    };
             });


            for (var key in countries) {
            var value = countries[key];
            sum += value
            list_values.push(value);
        }

        // total_projects = 'Topic By Region"' + project + '" in Europe : ' + sum
        // var element = document.getElementById("header");
        // element.innerHTML = total_projects;

        	


            var color = d3.scale.linear()
            .domain([0, 100])
            .range(["#B6D4FF", "blue"]);

    d3.select(".viz-1").append("div").attr("id", "zoomed-hr")
    .style("height",'450px')
    .style("width",'600px')
    .style("position",'relative')
    .transition()
    .duration(800)
    .style("opacity",1);
              


var dataset3 ={};
d3.json("../data/trends.txt",function(data2){
  data2.forEach(function(element2){
    if (countries[element2[0]]){
    dataset3[element2[0]] = {numberOfThings: parseInt(element2[1]), 
    fillColor : color(element2[1]), projects : countries[element2[0]],cont : element2[0]  }}

    else{
      dataset3[element2[0]] = {numberOfThings: parseInt(element2[1]), 
    fillColor : color(element2[1]), projects : 0,cont : element2[0]  }};
  }
  )


    window.DatamapHR = window.Datamap;
    var hires = new DatamapHR({
      scope: 'world',
      fills: {
          defaultFill: '#F5F5F5'},

          geographyConfig: {
            borderColor: '#FDFDFD',
            popupTemplate: function(geography, data) {
              return '<div class="hoverinfo"><strong>' + geography.properties.name + '</strong>' 
              + " <br> Search interest : " +'<strong>'+ data.numberOfThings+ '</strong>'+ '<br>' 
              + 'Number of successful projects  :' + data.projects + '</div>' ;
          },
          highlightFillColor: 'red',
      },


      data: dataset3,
      // done: function() {setTimeout(function(){ alert("Hello"); }, 3000);},

    element: document.getElementById('zoomed-hr'),
    setProjection: function(element) {
        var projection = d3.geo.mercator()
        .center([10, 50])
        .rotate([4.4, 0])
        .scale(600)
        .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
        var path = d3.geo.path()
        .projection(projection);

        return {path: path, projection: projection};
            }

        })


 })





            }); 
        }
