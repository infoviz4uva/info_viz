d3.queue()

    .defer(d3.csv, 'jessica/data/_failed.csv')
    .defer(d3.csv, 'jessica/data/_succes.csv')
    .await(onDataLoaded);

function onDataLoaded(error, dataSucess, dataFailed) {

    if (error) {
        console.log('Error log: ' + error);
    } else {
        handleData(dataSucess, dataFailed);
    }

};

function handleData(dataFailed, dataSucess){

    var data = d3.merge([dataFailed, dataSucess]);
    structureData(data);
}

function structureData(data) {

    var filteredData = d3.nest()

       // Nest by month
       .key(function(d) {
           var timestampRaw = d.launched_at * 1000, // Data needs '000' appended to be a valid timestamp
               timestampDate = new Date(timestampRaw), // Converts integer into date object
               timestampMonth = timestampDate.getMonth(); // Gets the month from the date object
           return timestampMonth;
       }).sortKeys((a, b) => d3.ascending(+a, +b)) // Sort by numerical value

       // Nest by category
       .key(function(d) {
           d.parentid = d['category/parent_id'];
           return d.parentid;
       }).sortKeys((a, b) => d3.ascending(+a, +b)) // Sort by numerical value

       // Nest by subcategory
       .key(function(d) {
           d.categoryid = d['category/id'];
           return d.categoryid;
       }).sortKeys((a, b) => d3.ascending(+a, +b)) // Sort by numerical value

       // Nest by state (successful / failed)
       .key(function(d) {
           return d['state'];
       })

   .entries(data);

    extendData(filteredData);
}

// Function to add totals to the data
function extendData(data){

    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        categoryNames = {
            "0": {
                "name":"Art",
                "id" : "0",
            },
            "1": {
                "name":"Comics",
                "id":"13",
            },
            "2": {
                "name":"Dance",
                "id":"19",
            },
            "3": {
                "name":"Design",
                "id":"24",
            },
            "4": {
                "name":"Fashion",
                "id":"31",
            },
            "5": {
                "name":"Food",
                "id":"40",
            },
            "6": {
                "name":"Film & Video",
                "id":"53",
            },
            "7": {
                "name":"Games",
                "id":"73",
            },
            "8": {
                "name":"Journalism",
                "id":"81",
            },
            "9": {
                "name":"Music",
                "id":"87",
            },
            "10": {
                "name":"Photography",
                "id":"105",
            },
            "11": {
                "name":"Technology",
                "id":"112",
            },
            "12": {
                "name":"Theater",
                "id":"128",
            },
            "13": {
                "name":"Publishing",
                "id":"135",
            },
            "14": {
                "name":"Crafts",
                "id":"151",
            },
        }
        subcategoryNames = {
            "0": {
                "name":"Art"
            },
            "1": {
                "name":"Conceptual Art"
            },
            "2": {
                "name":"Digital Art"
            },
            "3": {
                "name":"Illustration"
            },
            "4": {
                "name":"Painting"
            },
            "5": {
                "name":"Performance Art"
            },
            "6": {
                "name":"Sculpture"
            },
            "7": {
                "name":"Public Art"
            },
            "8": {
                "name":"Mixed Media"
            },
            "9": {
                "name":"Ceramics"
            },
            "10": {
                "name":"Installations"
            },
            "11": {
                "name":"Textiles"
            },
            "12": {
                "name":"Video Art"
            },
            "13": {
                "name":"Comics"
            },
            "14": {
                "name":"Anthologies"
            },
            "15": {
                "name":"Comic Books"
            },
            "16": {
                "name":"Events"
            },
            "17": {
                "name":"Graphic Novels"
            },
            "18": {
                "name":"Webcomics"
            },
            "19": {
                "name":"Dance"
            },
            "20": {
                "name":"Performances"
            },
            "21": {
                "name":"Residencies"
            },
            "22": {
                "name":"Spaces"
            },
            "23": {
                "name":"Workshops"
            },
            "24": {
                "name":"Design"
            },
            "25": {
                "name":"Graphic Design"
            },
            "26": {
                "name":"Product Design"
            },
            "27": {
                "name":"Architecture"
            },
            "28": {
                "name":"Civic Design"
            },
            "29": {
                "name":"Interactive Design"
            },
            "30": {
                "name":"Typography"
            },
            "31": {
                "name":"Fashion"
            },
            "32": {
                "name":"Accessories"
            },
            "33": {
                "name":"Apparel"
            },
            "34": {
                "name":"Childrenswear"
            },
            "35": {
                "name":"Couture"
            },
            "36": {
                "name":"Footwear"
            },
            "37": {
                "name":"Jewelry"
            },
            "38": {
                "name":"Pet Fashion"
            },
            "39": {
                "name":"Ready-to-wear"
            },
            "40": {
                "name":"Food"
            },
            "41": {
                "name":"Bacon"
            },
            "42": {
                "name":"Community Gardens"
            },
            "43": {
                "name":"Cookbooks"
            },
            "44": {
                "name":"Drinks"
            },
            "45": {
                "name":"Events"
            },
            "46": {
                "name":"Farms"
            },
            "47": {
                "name":"Farmer’s Markets"
            },
            "48": {
                "name":"Food Trucks"
            },
            "49": {
                "name":"Restaurants"
            },
            "50": {
                "name":"Small Batch"
            },
            "51": {
                "name":"Spaces"
            },
            "52": {
                "name":"Vegan"
            },
            "53": {
                "name":"Film & Video"
            },
            "54": {
                "name":"Animation"
            },
            "55": {
                "name":"Documentary"
            },
            "56": {
                "name":"Narrative Film"
            },
            "57": {
                "name":"Shorts"
            },
            "58": {
                "name":"Webseries"
            },
            "59": {
                "name":"Action"
            },
            "60": {
                "name":"Comedy"
            },
            "61": {
                "name":"Drama"
            },
            "62": {
                "name":"Experimental"
            },
            "63": {
                "name":"Festivals"
            },
            "64": {
                "name":"Fantasy"
            },
            "65": {
                "name":"Horror"
            },
            "66": {
                "name":"Movie Theaters"
            },
            "67": {
                "name":"Music Videos"
            },
            "68": {
                "name":"Romance"
            },
            "69": {
                "name":"Science Fiction"
            },
            "70": {
                "name":"Thrillers"
            },
            "71": {
                "name":"Television"
            },
            "72": {
                "name":"Family"
            },
            "73": {
                "name":"Games"
            },
            "74": {
                "name":"Tabletop Games "
            },
            "75": {
                "name":"Video games"
            },
            "76": {
                "name":"Gaming Hardware"
            },
            "77": {
                "name":"Live Games"
            },
            "78": {
                "name":"Mobile Games"
            },
            "79": {
                "name":"Playing Cards"
            },
            "80": {
                "name":"Puzzles"
            },
            "81": {
                "name":"Journalism"
            },
            "82": {
                "name":"Audio"
            },
            "83": {
                "name":"Photo"
            },
            "84": {
                "name":"Print"
            },
            "85": {
                "name":"Video"
            },
            "86": {
                "name":"Web"
            },
            "87": {
                "name":"Music"
            },
            "88": {
                "name":"Classical Music"
            },
            "89": {
                "name":"Country & Folk"
            },
            "90": {
                "name":"Electronic Music"
            },
            "91": {
                "name":"Hip-Hop"
            },
            "92": {
                "name":"Indie Rock"
            },
            "93": {
                "name":"Jazz"
            },
            "94": {
                "name":"Pop"
            },
            "95": {
                "name":"Rock"
            },
            "96": {
                "name":"World Music"
            },
            "97": {
                "name":"Metal"
            },
            "98": {
                "name":"Blues"
            },
            "99": {
                "name":"Chiptune"
            },
            "100": {
                "name":"Faith"
            },
            "101": {
                "name":"Kids"
            },
            "102": {
                "name":"Latin"
            },
            "103": {
                "name":"Punk"
            },
            "104": {
                "name":"R&B"
            },
            "105": {
                "name":"Photography"
            },
            "106": {
                "name":"Animals"
            },
            "107": {
                "name":"Fine Art"
            },
            "108": {
                "name":"Nature"
            },
            "109": {
                "name":"People"
            },
            "110": {
                "name":"Places"
            },
            "111": {
                "name":"Photobooks"
            },
            "112": {
                "name":"Technology"
            },
            "113": {
                "name":"Software"
            },
            "114": {
                "name":"Hardware"
            },
            "115": {
                "name":"3D Printing"
            },
            "116": {
                "name":"Apps"
            },
            "117": {
                "name":"Camera Equipment"
            },
            "118": {
                "name":"DIY Electronics"
            },
            "119": {
                "name":"Fabrication Tools"
            },
            "120": {
                "name":"Flight"
            },
            "121": {
                "name":"Gadgets"
            },
            "122": {
                "name":"Robots"
            },
            "123": {
                "name":"Sound"
            },
            "124": {
                "name":"Space Exploration"
            },
            "125": {
                "name":"Wearables"
            },
            "126": {
                "name":"Web"
            },
            "127": {
                "name":"Makerspaces"
            },
            "128": {
                "name":"Theater"
            },
            "129": {
                "name":"Experimental"
            },
            "130": {
                "name":"Festivals"
            },
            "131": {
                "name":"Immersive"
            },
            "132": {
                "name":"Musicals"
            },
            "133": {
                "name":"Plays"
            },
            "134": {
                "name":"Spaces"
            },
            "135": {
                "name":"Publishing"
            },
            "136": {
                "name":"Art Books"
            },
            "137": {
                "name":"Children’s Books"
            },
            "138": {
                "name":"Fiction"
            },
            "139": {
                "name":"Nonfiction"
            },
            "140": {
                "name":"Periodicals"
            },
            "141": {
                "name":"Poetry"
            },
            "142": {
                "name":"Radio & Podcasts"
            },
            "143": {
                "name":"Academic"
            },
            "144": {
                "name":"Anthologies"
            },
            "145": {
                "name":"Calendars"
            },
            "146": {
                "name":"Literary Journals"
            },
            "147": {
                "name":"Translations"
            },
            "148": {
                "name":"Young Adult"
            },
            "149": {
                "name":"Zines"
            },
            "150": {
                "name":"Academic"
            },
            "151": {
                "name":"Crafts"
            },
            "152": {
                "name":"Candles"
            },
            "153": {
                "name":"Crochet"
            },
            "154": {
                "name":"DIY"
            },
            "155": {
                "name":"Embroidery"
            },
            "156": {
                "name":"Glass"
            },
            "157": {
                "name":"Knitting"
            },
            "158": {
                "name":"Letterpress"
            },
            "159": {
                "name":"Pottery"
            },
            "160": {
                "name":"Printing"
            },
            "161": {
                "name":"Quilts"
            },
            "162": {
                "name":"Stationary"
            },
            "163": {
                "name":"Taxidermy"
            },
            "164": {
                "name":"Weaving"
            },
            "165": {
                "name":"Woodworking"
            },
        };

    // Set dataset variables
    var dsMonthNames = [];

    // Array of flat data
    var extendedData = [];

    // Loop through months
    //-------------------
    _.map(data, function (month, i) {

        // Assign month name
        month.monthname = monthNames[i];
        month.monthnum = i;

        // Push month names to array
        dsMonthNames.push(month.monthname);

        // Loop through categories
        //-------------------
        _.map(month.values, function (category, categoryIndex) {

            var categoryFailed     = 0,
                categorySuccessful = 0,
                categoryTotal      = 0,
                categoryPercentage = 0;

            // Loop through subcategories
            //-------------------
            _.map(category.values, function (subcategory, i) {

                var subcategoryFailed     = 0,
                    subcategorySuccessful = 0,
                    subcategoryTotal      = 0,
                    subcategoryPercentage = 0;

                // Loop through states
                //-------------------
                _.map(subcategory.values, function (state) {

                    // Assign totals to subcategories
                    if (state.key === 'successful') {
                        subcategorySuccessful = state.values.length;
                    }

                    if (state.key === 'failed') {
                        subcategoryFailed = state.values.length;
                    }

                    subcategory.type = "subcategory";
                    subcategory.monthname = month.monthname;
                    subcategory.monthnum = month.monthnum;
                    subcategory.categorynum = state.values[0].categoryid;
                    subcategory.categoryname = subcategoryNames[subcategory.categorynum].name;
                    subcategory.failed = subcategoryFailed;
                    subcategory.successful = subcategorySuccessful;
                    subcategory.total = subcategoryFailed + subcategorySuccessful;
                    subcategory.percentile = ((subcategorySuccessful / (subcategoryFailed + subcategorySuccessful)) * 100).toFixed(2);

                });

                // Adds total per category
                if (i === 0) {
                    category.type = "category";
                    category.monthname = month.monthname;
                    category.monthnum = month.monthnum;
                    category.categorynum = categoryNames[categoryIndex].id;
                    category.categoryname = categoryNames[categoryIndex].name;
                    extendedData.push(category);
                }

                // Push data to flat list
                extendedData.push(subcategory);

                // Assign totals to categories
                categoryFailed = categoryFailed + subcategory.failed;
                categorySuccessful = categorySuccessful + subcategory.successful;
                categoryTotal = categoryTotal + subcategory.total;

                category.failed = categoryFailed;
                category.successful = categorySuccessful;
                category.total = categoryTotal;
                category.percentile = ((categorySuccessful / (categoryFailed + categorySuccessful)) * 100).toFixed(2);

            });

        });
    });

    // Send data to visualisation
    createVisualisation(extendedData);

}

// Create visualization
function createVisualisation(data) {

    // Create Canvas
    var cardHeight = 30,
        canvasWidth = 900,
        cardWidth = canvasWidth / 12,
        legendHeight = cardHeight * 4,
        legendWidth = cardWidth * 7,
        canvasWidthTotal = canvasWidth + (cardWidth * 2),
        canvasHeight = (cardHeight * 35) + legendHeight,
        gridSize = Math.floor(canvasWidth / 24);

    var canvas = d3.select(".viz-3")
        .append("svg:svg")
        .attr("width", canvasWidthTotal)
        .attr("height", canvasHeight)
        .attr("class", "heatmap")
        .style("margin-left", function(d) { return ( -cardWidth * 1.5 )})

    // Create the legend
    var legend = canvas.append("g")
        .attr("class","legend")
        .call(function(parent){

            /* Title */
            parent.append("text")
                .text("Legend: Success rate")
                .attr("y", cardHeight * 0.5)
                .attr("x", ((canvasWidthTotal - legendWidth) + cardWidth))
                .attr("class", "legend-index maintitle");

            /* Category index */
            parent.append("text")
                .text("Category")
                .attr("y", cardHeight * 1.5)
                .attr("x", function() {
                    return (cardWidth - 10) + legendWidth;
                })
                .attr("class", "legend-index title");

            /* Subcategory index */
            parent.append("text")
                .text("Subcategory")
                .attr("x", function() {
                    return (cardWidth - 10) + legendWidth;
                })
                .attr("y", cardHeight * 2.5)
                .attr("class", "legend-index title");

            for (var i = 0; i < 6 ; i++) {

                parent.append("rect")
                    .attr("x", function() {
                        return  (i * cardWidth) + cardWidth + legendWidth;
                    })
                    .attr("y", cardHeight)
                    .attr("width", cardWidth)
                    .attr("height", cardHeight)
                    .attr("class", "legend-index category")
                    .style("opacity", function() {
                        return ((i * 0.20) + 0.05);
                    });
                parent.append("text")
                    .text(function(){
                        return (i * 20) + '%';
                    })
                    .attr("x", function() {
                        return  (i * cardWidth) + (cardWidth * 1.5) + legendWidth;
                    })
                    .attr("y", cardHeight * 1.5)
                    .attr("class", "legend-index percentile")


                /* Subcategory index */
                parent.append("rect")
                    .attr("x", function() {
                        return  (i * cardWidth) + cardWidth + legendWidth;
                    })
                    .attr("y", cardHeight * 2)
                    .attr("width", cardWidth)
                    .attr("height", cardHeight)
                    .attr("class", "legend-index subcategory")
                    .style("opacity", function() {
                        return ((i * 0.20) + 0.05);
                    });
                parent.append("text")
                    .text(function(){
                        return (i * 20) + '%';
                    })
                    .attr("x", function() {
                        return  (i * cardWidth) + (cardWidth * 1.5) + legendWidth;
                    })
                    .attr("y", cardHeight * 2.5)
                    .attr("class", "legend-index percentile")
            }
        });

    // Create each element
    var cards = canvas.selectAll(".cards")
    .data(data, function(d) {
        return d.monthnum, d.categorynum;
    });

    cards.enter()
        .append("g")
        .attr("class", function(d) {
            return d.type + ' card cat-' + d.categorynum
        })
        .attr("data-percentile", function(d) {
            return Math.round(d.percentile)
        })
        .call(function(parent){
            parent.append("rect")
                .attr("x", function(d) { return (d.monthnum * cardWidth) + (cardWidth * 2); })
                .attr("y", function(d) { return (d.categorynum * cardHeight) + (cardHeight); })
                .attr("width", cardWidth)
                .attr("height", cardHeight)
                .attr("class", "block")
                .style("opacity", function(d) { return (d.percentile / 100)})
            parent.append("text")
                .text(function(d){ return Math.round(d.percentile) + "%"; })
                .attr("class", "percentile")
                .attr("x", function(d) { return (d.monthnum * cardWidth) + (cardWidth * 2.5); })
                .attr("y", function(d) { return (d.categorynum * cardHeight) + (cardHeight); })
        });


    // Create the y axis
    var categoryNames = [];
    cards.enter()
        .append("text")
        .text(function(d, i) {

            // Check if the category has already b
            if (categoryNames.indexOf(d.categorynum) === -1) {
                categoryNames.push(d.categorynum)
                return d.categoryname;
            }

        })
        .attr("x", function(d) { return (cardWidth * 2) - 5; })
        .attr("y", function(d) { return (d.categorynum * cardHeight) + (cardHeight * 1.5); })
        .attr("class", function(d) {
            return d.type + ' axis-y cat-' + d.categorynum
        })

    // Create the x axis
    var monthNames = [],
        month = canvas.selectAll(".month")
    .data(data, function(d) {
        monthNames.push(d.monthname);
        return
    }),
    monthNames = _.uniqBy(monthNames);
    canvas.selectAll(".month")
        .data(monthNames)
        .enter()
        .append("text")
        .text(function(d) {
            return d;
        })
        .attr("x", function(d, i) {
            return (cardWidth * i) + (cardWidth * 2.5);
        })
        .attr("y", legendHeight + (cardHeight / 2))
        .attr("class","axis-x");

    // Bind events
    bindEvents(cardHeight, legendHeight, monthNames);
}

// Interactions
function bindEvents(cardHeight, legendHeight, monthNames) {


    var canvas = document.getElementsByClassName('heatmap')[0],
        cards = canvas.getElementsByClassName('card'),
        axis = canvas.getElementsByClassName('axis-y'),
        activeClass = 'active';

    changeStates('cat-all', canvas, cards, axis, cardHeight, legendHeight);

    for (var i = 0; i < cards.length ; i++) {
        cards[i].addEventListener('click',
            function () {
                if (!this.classList.contains('subcategory')) {
                    changeStates(this.classList[this.classList.length - 1], canvas, cards, axis, cardHeight, legendHeight);
                    highlightCategory(this.classList[this.classList.length - 1]);
                } else {
                    highlightCategory(this.classList[this.classList.length - 1]);
                }
            }, false);
    }

    function highlightCategory(selector) {
        var $activeCategory = canvas.getElementsByClassName(selector);
        _.map(cards, function (el) {
            el.classList.remove(activeClass);
        });
        _.map(axis, function (el) {
            el.classList.remove(activeClass);
        });
        _.map($activeCategory, function (el) {
            el.classList.toggle(activeClass);
        });
    }

    // Listen to global URL change event
    window.addEventListener('urlHandled', function (e) {

        if(e.detail) {

            var category = e.detail.category,
                subcategory = e.detail.subcategory;

            // Filters string to category ID to match data
            switch(category) {
                case 'art':
                    switch(subcategory){
                        case 'conceptual art':{
                            var category      = 'cat-0',
                                subcategory   = 'cat-1';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'digital art':{
                            var category      = 'cat-0',
                                subcategory   = 'cat-2';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'illustration':{
                            var category      = 'cat-0',
                                subcategory   = 'cat-3';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'painting':{
                            var category      = 'cat-0',
                                subcategory   = 'cat-4';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'performance art':{
                            var category      = 'cat-0',
                                subcategory   = 'cat-5';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'scuplture':{
                            var category      = 'cat-0',
                                subcategory   = 'cat-6';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'public art':{
                            var category      = 'cat-0',
                                subcategory   = 'cat-7';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'mixed media':{
                            var category      = 'cat-0',
                                subcategory   = 'cat-8';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'ceramics':{
                            var category      = 'cat-0',
                                subcategory   = 'cat-9';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'installations':{
                            var category      = 'cat-0',
                                subcategory   = 'cat-10';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'textiles':{
                            var category      = 'cat-0',
                                subcategory   = 'cat-11';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'video art':{
                            var category      = 'cat-0',
                                subcategory   = 'cat-12';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        default:
                            var category      = 'cat-0',
                                subcategory   = 'cat-0';
                            console.log("ERROR: heatmap -subcategory '"+ subcategory + "' not recognized");
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                    }
                    break
                case 'comics':
                    switch(subcategory){
                        case 'anthologies':{
                            var category      = 'cat-13',
                                subcategory   = 'cat-14';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'comic books':{
                            var category      = 'cat-13',
                                subcategory   = 'cat-15';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'events':{
                            var category      = 'cat-13',
                                subcategory   = 'cat-16';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'graphic novels':{
                            var category      = 'cat-13',
                                subcategory   = 'cat-17';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'webcomics':{
                            var category      = 'cat-13',
                                subcategory   = 'cat-18';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        default:
                            var category      = 'cat-13',
                                subcategory   = 'cat-13';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            console.log("ERROR: heatmap -subcategory '"+ subcategory + "' not recognized");
                            break
                    }
                    break
                case 'dance':
                    switch(subcategory){
                        case 'performances':{
                            var category      = 'cat-19',
                                subcategory   = 'cat-20';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'residencies':{
                            var category      = 'cat-19',
                                subcategory   = 'cat-21';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'spaces':{
                            var category      = 'cat-19',
                                subcategory   = 'cat-22';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'workshops':{
                            var category      = 'cat-19',
                                subcategory   = 'cat-23';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        default:
                            var category      = 'cat-19',
                                subcategory   = 'cat-19';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                                console.log("ERROR: heatmap -subcategory '"+ subcategory + "' not recognized");
                            break
                    }
                    break
                case 'design':
                    switch(subcategory){
                        case 'graphic design':{
                            var category      = 'cat-24',
                                subcategory   = 'cat-25';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'product design':{
                            var category      = 'cat-24',
                                subcategory   = 'cat-26';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'architecture ':{
                            var category      = 'cat-24',
                                subcategory   = 'cat-27';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'civic design':{
                            var category      = 'cat-24',
                                subcategory   = 'cat-28';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'interactive design':{
                            var category      = 'cat-24',
                                subcategory   = 'cat-29';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'typography':{
                            var category      = 'cat-24',
                                subcategory   = 'cat-30';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        default:
                            var category      = 'cat-24',
                                subcategory   = 'cat-24';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            console.log("ERROR: heatmap -subcategory '"+ subcategory + "' not recognized");
                            break
                    }
                    break
                case 'fashion':
                    switch(subcategory){
                        case 'accessories ':{
                            var category      = 'cat-31',
                            subcategory   = 'cat-32';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'apparel':{
                            var category      = 'cat-31',
                            subcategory   = 'cat-33';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'childrenswear':{
                            var category      = 'cat-31',
                            subcategory   = 'cat-34';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'couture':{
                            var category      = 'cat-31',
                            subcategory   = 'cat-35';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'footwear':{
                            var category      = 'cat-31',
                            subcategory   = 'cat-36';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'jewelry':{
                            var category      = 'cat-31',
                            subcategory   = 'cat-37';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'pet fashion':{
                            var category      = 'cat-31',
                            subcategory   = 'cat-38';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'ready-to-wear':{
                            var category      = 'cat-31',
                            subcategory   = 'cat-39';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        default:
                            var category      = 'cat-31',
                            subcategory   = 'cat-31';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            console.log("ERROR: heatmap -subcategory '"+ subcategory + "' not recognized");
                            break
                    }
                    break
                case 'food':
                    switch(subcategory){
                        case 'bacon':{
                            var category      = 'cat-40',
                                subcategory   = 'cat-41';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'community gardens':{
                            var category      = 'cat-40',
                                subcategory   = 'cat-42';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'cookbooks':{
                            var category      = 'cat-40',
                                subcategory   = 'cat-43';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'drinks':{
                            var category      = 'cat-40',
                                subcategory   = 'cat-44';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'events':{
                            var category      = 'cat-40',
                                subcategory   = 'cat-45';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'farms':{
                            var category      = 'cat-40',
                                subcategory   = 'cat-46';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'farmer\'s markets':{
                            var category      = 'cat-40',
                                subcategory   = 'cat-47';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'food trucks':{
                            var category      = 'cat-40',
                                subcategory   = 'cat-48';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'restaurants':{
                            var category      = 'cat-40',
                                subcategory   = 'cat-49';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'small batch':{
                            var category      = 'cat-40',
                                subcategory   = 'cat-50';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'spaces':{
                            var category      = 'cat-40',
                                subcategory   = 'cat-51';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'vegan':{
                            var category      = 'cat-40',
                                subcategory   = 'cat-52';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        default:
                            var category      = 'cat-40',
                                subcategory   = 'cat-40';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            console.log("ERROR: heatmap -subcategory '"+ subcategory + "' not recognized");
                            break
                    }
                    break
                case 'film%20&%20video':
                    switch(subcategory){
                        case 'animation':{
                            var category      = 'cat-53',
                                subcategory   = 'cat-54';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'documentary':{
                            var category      = 'cat-53',
                                subcategory   = 'cat-55';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'narrative film':{
                            var category      = 'cat-53',
                                subcategory   = 'cat-56';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'shorts':{
                            var category      = 'cat-53',
                                subcategory   = 'cat-57';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'webseries':{
                            var category      = 'cat-53',
                                subcategory   = 'cat-58';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'action':{
                            var category      = 'cat-53',
                                subcategory   = 'cat-59';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'comedy':{
                            var category      = 'cat-53',
                                subcategory   = 'cat-60';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'drama':{
                            var category      = 'cat-53',
                                subcategory   = 'cat-61';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'experimental':{
                            var category      = 'cat-53',
                                subcategory   = 'cat-62';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'festivals':{
                            var category      = 'cat-53',
                                subcategory   = 'cat-63';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'fantasy':{
                            var category      = 'cat-53',
                                subcategory   = 'cat-64';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'horror':{
                            var category      = 'cat-53',
                                subcategory   = 'cat-65';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'movie theaters':{
                            var category      = 'cat-53',
                                subcategory   = 'cat-66';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'music videos':{
                            var category      = 'cat-53',
                                subcategory   = 'cat-67';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'romance':{
                            var category      = 'cat-53',
                                subcategory   = 'cat-68';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'science fiction':{
                            var category      = 'cat-53',
                                subcategory   = 'cat-69';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'thrillers':{
                            var category      = 'cat-53',
                                subcategory   = 'cat-70';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case ' television':{
                            var category      = 'cat-53',
                                subcategory   = 'cat-71';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'family':{
                            var category      = 'cat-53',
                                subcategory   = 'cat-72';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        default:
                            var category      = 'cat-53',
                                subcategory   = 'cat-53';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            console.log("ERROR: heatmap -subcategory '"+ subcategory + "' not recognized");
                            break
                    }
                    break
                case 'games':
                    switch(subcategory){
                        case 'tabletop games ':{
                            var category      = 'cat-73',
                                subcategory   = 'cat-74';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'video games ':{
                            var category      = 'cat-73',
                                subcategory   = 'cat-75';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'gaming hardware':{
                            var category      = 'cat-73',
                                subcategory   = 'cat-76';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'live games':{
                            var category      = 'cat-73',
                                subcategory   = 'cat-77';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'mobile games':{
                            var category      = 'cat-73',
                                subcategory   = 'cat-78';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'playing cards':{
                            var category      = 'cat-73',
                                subcategory   = 'cat-79';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'puzzles':{
                            var category      = 'cat-73',
                                subcategory   = 'cat-80';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        default:
                            var category      = 'cat-73',
                                subcategory   = 'cat-73';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            console.log("ERROR: heatmap -subcategory '"+ subcategory + "' not recognized");
                            break
                    }
                    break
                case 'journalism':
                    switch(subcategory){
                        case 'audio':{
                            var category      = 'cat-81',
                                subcategory   = 'cat-82';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'photo':{
                            var category      = 'cat-81',
                                subcategory   = 'cat-83';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'print':{
                            var category      = 'cat-81',
                                subcategory   = 'cat-84';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'video':{
                            var category      = 'cat-81',
                                subcategory   = 'cat-85';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'web':{
                            var category      = 'cat-81',
                                subcategory   = 'cat-86';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        default:
                            var category      = 'cat-81',
                                subcategory   = 'cat-81';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            console.log("ERROR: heatmap -subcategory '"+ subcategory + "' not recognized");
                            break
                    }
                    break
                case 'music':
                    switch(subcategory){
                        case 'classical music':{
                            var category      = 'cat-87',
                                subcategory   = 'cat-88';

                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);                            break
                        }
                        case 'country & folk':{
                            var category      = 'cat-87',
                                subcategory   = 'cat-89';

                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);                            break
                        }
                        case 'electronic music':{
                            var category      = 'cat-87',
                                subcategory   = 'cat-90';

                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);                            break
                        }
                        case 'hip-hop':{
                            var category      = 'cat-87',
                                subcategory   = 'cat-91';

                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);                            break
                        }
                        case 'indie rock':{
                            var category      = 'cat-87',
                                subcategory   = 'cat-92';

                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);                            break
                        }
                        case 'jazz':{
                            var category      = 'cat-87',
                                subcategory   = 'cat-93';

                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);                            break
                        }
                        case 'pop':{
                            var category      = 'cat-87',
                                subcategory   = 'cat-94';

                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);                            break
                        }
                        case 'rock':{
                            var category      = 'cat-87',
                                subcategory   = 'cat-95';

                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);                            break
                        }
                        case 'world music':{
                            var category      = 'cat-87',
                                subcategory   = 'cat-96';

                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);                            break
                        }
                        case 'metal':{
                            var category      = 'cat-87',
                                subcategory   = 'cat-97';

                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);                            break
                        }
                        case 'blues':{
                            var category      = 'cat-87',
                                subcategory   = 'cat-98';

                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);                            break
                        }
                        case 'chiptune':{
                            var category      = 'cat-87',
                                subcategory   = 'cat-99';

                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);                            break
                        }
                        case 'faith':{
                            var category      = 'cat-87',
                            subcategory   = 'cat-100';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'kids':{
                            var category      = 'cat-87',
                            subcategory   = 'cat-101';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'latin':{
                            var category      = 'cat-87',
                            subcategory   = 'cat-012';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'punk':{
                            var category      = 'cat-87',
                            subcategory   = 'cat-103';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'r&b':{
                            var category      = 'cat-87',
                            subcategory   = 'cat-104';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        default:
                            var category      = 'cat-87',
                                subcategory   = 'cat-87';

                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            console.log("ERROR: heatmap -subcategory '"+ subcategory + "' not recognized");
                            break
                    }
                    break
                case 'photography':
                    switch(subcategory){
                        case 'animals':{
                            var category      = 'cat-105',
                                subcategory   = 'cat-106';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'fine art':{
                            var category      = 'cat-105',
                                subcategory   = 'cat-107';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'nature':{
                            var category      = 'cat-105',
                                subcategory   = 'cat-108';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'people':{
                            var category      = 'cat-105',
                                subcategory   = 'cat-109';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'places ':{
                            var category      = 'cat-105',
                                subcategory   = 'cat-110';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'photobooks':{
                            var category      = 'cat-105',
                                subcategory   = 'cat-111';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        default:
                            var category      = 'cat-105',
                                subcategory   = 'cat-105';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            console.log("ERROR: heatmap -subcategory '"+ subcategory + "' not recognized");
                            break
                    }
                    break
                case 'technology':
                    switch(subcategory){
                        case 'software':{
                            var category      = 'cat-112',
                                subcategory   = 'cat-113';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'hardware':{
                            var category      = 'cat-112',
                                subcategory   = 'cat-114';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case ' 3d printing':{
                            var category      = 'cat-112',
                                subcategory   = 'cat-115';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'apps':{
                            var category      = 'cat-112',
                                subcategory   = 'cat-116';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'camera equipment':{
                            var category      = 'cat-112',
                                subcategory   = 'cat-117';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'diy electronics':{
                            var category      = 'cat-112',
                                subcategory   = 'cat-118';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'fabrication tools':{
                            var category      = 'cat-112',
                                subcategory   = 'cat-119';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'flight':{
                            var category      = 'cat-112',
                                subcategory   = 'cat-120';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'gadgets':{
                            var category      = 'cat-112',
                                subcategory   = 'cat-121';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'robots':{
                            var category      = 'cat-112',
                                subcategory   = 'cat-122';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'sound':{
                            var category      = 'cat-112',
                                subcategory   = 'cat-123';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'space exploration':{
                            var category      = 'cat-112',
                                subcategory   = 'cat-124';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'wearables':{
                            var category      = 'cat-112',
                                subcategory   = 'cat-125';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'web':{
                            var category      = 'cat-112',
                                subcategory   = 'cat-126';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'makerspaces':{
                            var category      = 'cat-112',
                                subcategory   = 'cat-127';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        default:
                            var category      = 'cat-112',
                                subcategory   = 'cat-112';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            console.log("ERROR: heatmap -subcategory '"+ subcategory + "' not recognized");
                            break
                    }
                    break
                case 'theater':
                    switch(subcategory){
                        case 'experimental ':{
                            var category      = 'cat-128',
                                subcategory   = 'cat-129';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'festivals':{
                            var category      = 'cat-128',
                                subcategory   = 'cat-130';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'immersive':{
                            var category      = 'cat-128',
                                subcategory   = 'cat-131';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'musicals':{
                            var category      = 'cat-128',
                                subcategory   = 'cat-132';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'plays':{
                            var category      = 'cat-128',
                                subcategory   = 'cat-133';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'spaces':{
                            var category      = 'cat-128',
                                subcategory   = 'cat-134';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        default:
                            var category      = 'cat-128',
                                subcategory   = 'cat-128';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            console.log("ERROR: heatmap -subcategory '"+ subcategory + "' not recognized");
                            break
                    }
                    break
                case 'publishing':
                    switch(subcategory){
                        case 'art books':{
                            var category      = 'cat-135',
                                subcategory   = 'cat-136';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'children\'s books':{
                            var category      = 'cat-135',
                                subcategory   = 'cat-137';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'fiction':{
                            var category      = 'cat-135',
                                subcategory   = 'cat-138';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'nonfiction':{
                            var category      = 'cat-135',
                                subcategory   = 'cat-139';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'periodicals':{
                            var category      = 'cat-135',
                                subcategory   = 'cat-140';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'poetry':{
                            var category      = 'cat-135',
                                subcategory   = 'cat-141';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'radio & podcasts':{
                            var category      = 'cat-135',
                                subcategory   = 'cat-142';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'academic':{
                            var category      = 'cat-135',
                                subcategory   = 'cat-143';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'anthologies':{
                            var category      = 'cat-135',
                                subcategory   = 'cat-144';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'calendars':{
                            var category      = 'cat-135',
                                subcategory   = 'cat-145';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'literary journals':{
                            var category      = 'cat-135',
                                subcategory   = 'cat-146';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'translations':{
                            var category      = 'cat-135',
                                subcategory   = 'cat-147';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'young adult':{
                            var category      = 'cat-135',
                                subcategory   = 'cat-148';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'zines':{
                            var category      = 'cat-135',
                                subcategory   = 'cat-149';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'academic':{
                            var category      = 'cat-135',
                                subcategory   = 'cat-150';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        default:
                            var category      = 'cat-135',
                                subcategory   = 'cat-135';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            console.log("ERROR: heatmap -subcategory '"+ subcategory + "' not recognized");
                            break
                    }
                    break
                case 'crafts':
                    switch(subcategory){
                        case 'candles ':{
                            var category      = 'cat-151',
                                subcategory   = 'cat-152';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'crochet':{
                            var category      = 'cat-151',
                                subcategory   = 'cat-153';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'diy ':{
                            var category      = 'cat-151',
                                subcategory   = 'cat-154';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'embroidery':{
                            var category      = 'cat-151',
                                subcategory   = 'cat-155';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'glass ':{
                            var category      = 'cat-151',
                                subcategory   = 'cat-156';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'knitting':{
                            var category      = 'cat-151',
                                subcategory   = 'cat-157';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'letterpress ':{
                            var category      = 'cat-151',
                                subcategory   = 'cat-158';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'pottery':{
                            var category      = 'cat-151',
                                subcategory   = 'cat-159';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'printing':{
                            var category      = 'cat-151',
                                subcategory   = 'cat-160';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'quilts':{
                            var category      = 'cat-151',
                                subcategory   = 'cat-161';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'stationary':{
                            var category      = 'cat-151',
                                subcategory   = 'cat-162';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'taxidermy':{
                            var category      = 'cat-151',
                                subcategory   = 'cat-163';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'weaving':{
                            var category      = 'cat-151',
                                subcategory   = 'cat-164';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        case 'woodworking ':{
                            var category      = 'cat-151',
                                subcategory   = 'cat-165';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            break
                        }
                        default:
                            var category      = 'cat-151',
                                subcategory   = 'cat-151';
                            changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                            highlightCategory(subcategory);
                            console.log("ERROR: heatmap -subcategory '"+ subcategory + "' not recognized");
                            break
                    }
                    break
                default:
                    var category      = 'cat-all',
                        subcategory   = 'cat-all';
                    changeStates(category, canvas, cards, axis, cardHeight, legendHeight);
                    highlightCategory(subcategory);
                    console.log("ERROR: heatmap -category '"+ category + "' not recognized");
                    break
            }

            // Updates main template
            updateTemplate(e.detail.category, e.detail.subcategory, monthNames);
        }

    }, false);
}

function updateTemplate(category, subcategory, monthNames) {

    var templateSection  = document.getElementById('info-3');
        activeCards      = document.querySelectorAll('.heatmap .card.active'),
        yAxisLabels      = document.querySelectorAll('.heatmap .axis-x'),
        currentMonth     = new Date().getMonth(),
        percentiles      = [],
        monthAverage     = 0;

    _.map(activeCards, function (el) {
        var xCoordinate = el.querySelector('rect').getAttribute('x'),
            monthOrder  = (xCoordinate / 75) - 2;

            if (monthOrder === currentMonth) {
                monthAverage = el.dataset.percentile;
            }

        percentiles.push(parseInt(el.dataset.percentile));
    });

    // Adds up average over the year for active category
    var totalAverage = percentiles.reduce(function(a, b) { return a + b; }, 0),
        yearAverage  = Math.round(totalAverage / percentiles.length);

    // Boldens month label
    yAxisLabels[currentMonth].classList.add('active');

    // Update the text
    var infoEl   = templateSection.querySelector('.cust-info'),
        textEl    = templateSection.querySelector('.mdl-card__supporting-text'),
        infoCopy = '',
        textCopy  = '';

    if (monthAverage < yearAverage) {
        infoCopy = '<span class="fail">' + (monthAverage - yearAverage).toString() + '%</span>',
        textCopy = 'We recommend waiting for a month with a higher average success rate.';
        if(textEl.classList.contains('success')) {
            textEl.classList.remove('success');
        }
        textEl.classList.add('fail');
    } else if (monthAverage === yearAverage) {
        infoCopy = '<span>Neutral</span>',
        textCopy = 'Now is a safe time as it is exactly average, however if you have time, we recommend waiting for a month with a higher average success rate.';
        if(textEl.classList.contains('success')) {
            textEl.classList.remove('success');
        }
        if (textEl.classList.contains('fail')) {
            textEl.classList.remove('fail');
        }
    } else {
        infoCopy = '<span class="success">+' + (monthAverage - yearAverage).toString() + '%</span>',
        textCopy = 'This is a good time to launch your project.'
        if(textEl.classList.contains('fail')) {
            textEl.classList.remove('fail');
        }
        textEl.classList.add('success');
    }

    averageCopy = '<ul><li>The average for <strong>'+monthNames[currentMonth]+'</strong> is <strong>'+ monthAverage+'%</strong></li><li>The yearly average for <strong>' + subcategory + '</strong> is <strong>'+  yearAverage + '%</strong>.</li></ul>';

    // Updates text
    infoEl.innerHTML = infoCopy + averageCopy;
    textEl.innerHTML = textCopy;

    // Adds class when active
    templateSection.classList.add('active');

}

function changeStates(state, canvas, cards, axis, cardHeight, legendHeight) {

    // Update canvas state
    canvas.id = state;

    var categories = ['cat-0', 'cat-13', 'cat-19', 'cat-24', 'cat-31', 'cat-40', 'cat-53', 'cat-73', 'cat-81', 'cat-87', 'cat-105', 'cat-112', 'cat-128', 'cat-135', 'cat-151'];

    // Assigns subcategories to categoreis
    function filterSubcategories(cardHeight, legendHeight) {

        switch (canvas.id) {
            case categories[0]:
                var subcategories = ['cat-0', 'cat-1', 'cat-2', 'cat-3', 'cat-4', 'cat-5', 'cat-6', 'cat-7', 'cat-8', 'cat-9', 'cat-10', 'cat-11', 'cat-12'];
                resizeCanvas(subcategories.length + categories.length, cardHeight, legendHeight);
                repositionVisuals(categories[0], subcategories);
                break
            case categories[1]:
                var subcategories = ['cat-13', 'cat-14', 'cat-15', 'cat-16', 'cat-17', 'cat-18'];
                resizeCanvas(subcategories.length + categories.length, cardHeight, legendHeight);
                repositionVisuals(categories[1], subcategories);
                break
            case categories[2]:
                var subcategories = ['cat-19', 'cat-20', 'cat-21', 'cat-22', 'cat-23'];
                resizeCanvas(subcategories.length + categories.length, cardHeight, legendHeight);
                repositionVisuals(categories[2], subcategories);
                break
            case categories[3]:
                var subcategories = ['cat-24', 'cat-25', 'cat-26', 'cat-27', 'cat-28', 'cat-29', 'cat-30'];
                resizeCanvas(subcategories.length + categories.length, cardHeight, legendHeight);
                repositionVisuals(categories[3], subcategories);
                break
            case categories[4]:
                var subcategories = ['cat-31', 'cat-32', 'cat-33', 'cat-34', 'cat-35', 'cat-36', 'cat-37', 'cat-38', 'cat-39'];
                resizeCanvas(subcategories.length + categories.length, cardHeight, legendHeight);
                repositionVisuals(categories[4], subcategories);
                break
            case categories[5]:
                var subcategories = ['cat-40', 'cat-41', 'cat-42', 'cat-43', 'cat-44', 'cat-45', 'cat-46', 'cat-47', 'cat-48', 'cat-49', 'cat-50', 'cat-51', 'cat-52'];
                resizeCanvas(subcategories.length + categories.length, cardHeight, legendHeight);
                repositionVisuals(categories[5], subcategories);
                break
            case categories[6]:
                var subcategories = ['cat-53', 'cat-54', 'cat-55', 'cat-56', 'cat-57', 'cat-58', 'cat-59', 'cat-60', 'cat-61', 'cat-62', 'cat-63', 'cat-64', 'cat-65', 'cat-66', 'cat-67', 'cat-68', 'cat-69', 'cat-70', 'cat-71', 'cat-72'];
                resizeCanvas(subcategories.length + categories.length, cardHeight, legendHeight);
                repositionVisuals(categories[6], subcategories);
                break
            case categories[7]:
                var subcategories = ['cat-73', 'cat-74', 'cat-75', 'cat-76', 'cat-77', 'cat-78', 'cat-79', 'cat-80'];
                resizeCanvas(subcategories.length + categories.length, cardHeight, legendHeight);
                repositionVisuals(categories[7], subcategories);
                break
            case categories[8]:
                var subcategories = ['cat-81', 'cat-82', 'cat-83', 'cat-84', 'cat-85', 'cat-86'];
                resizeCanvas(subcategories.length + categories.length, cardHeight, legendHeight);
                repositionVisuals(categories[8], subcategories);
                break
            case categories[9]:
                var subcategories = ['cat-87', 'cat-88', 'cat-89', 'cat-90', 'cat-91', 'cat-92', 'cat-93', 'cat-94', 'cat-95', 'cat-96', 'cat-97', 'cat-98', 'cat-99', 'cat-100', 'cat-101', 'cat-102', 'cat-103', 'cat-104'];
                resizeCanvas(subcategories.length + categories.length, cardHeight, legendHeight);
                repositionVisuals(categories[9], subcategories);
                break
            case categories[10]:
                var subcategories = ['cat-105', 'cat-106', 'cat-107', 'cat-108', 'cat-109', 'cat-110', 'cat-111'];
                resizeCanvas(subcategories.length + categories.length, cardHeight, legendHeight);
                repositionVisuals(categories[10], subcategories);
                break
            case categories[11]:
                var subcategories = ['cat-112', 'cat-113', 'cat-114', 'cat-115', 'cat-116', 'cat-117', 'cat-118', 'cat-119', 'cat-120', 'cat-121', 'cat-122', 'cat-123', 'cat-124', 'cat-125', 'cat-126', 'cat-127'];
                resizeCanvas(subcategories.length + categories.length, cardHeight, legendHeight);
                repositionVisuals(categories[11], subcategories);
                break
            case categories[12]:
                var subcategories = ['cat-128', 'cat-129', 'cat-130', 'cat-131', 'cat-132', 'cat-133', 'cat-134'];
                resizeCanvas(subcategories.length + categories.length, cardHeight, legendHeight);
                repositionVisuals(categories[12], subcategories);
                break
            case categories[13]:
                var subcategories = ['cat-135', 'cat-136', 'cat-137', 'cat-138', 'cat-139', 'cat-140', 'cat-141', 'cat-142', 'cat-143', 'cat-144', 'cat-145', 'cat-146', 'cat-147', 'cat-148', 'cat-149', 'cat-150'];
                resizeCanvas(subcategories.length + categories.length, cardHeight, legendHeight);
                repositionVisuals(categories[13], subcategories);
                break
            case categories[14]:
                var subcategories = ['cat-151', 'cat-152', 'cat-153', 'cat-154', 'cat-155', 'cat-156', 'cat-157', 'cat-158', 'cat-159', 'cat-160', 'cat-161', 'cat-162', 'cat-163', 'cat-164', 'cat-165'];
                resizeCanvas(subcategories.length + categories.length, cardHeight, legendHeight);
                repositionVisuals(categories[14], subcategories);
                break
            default:
                var subcategories = categories;
                resizeCanvas(categories.length, cardHeight, legendHeight);
                repositionVisuals('cat-all', subcategories);
                return
        }
    }

    // Run filtering
    filterSubcategories(cardHeight, legendHeight);

    // Moves the svg data elements
    function repositionVisuals(categoryid, subcategories) {

        if (!legendHeight) {
            console.log('ERROR');
            return;
        }

        if (categoryid === 'cat-all') {

            var totalCategories = d3.merge([categories, subcategories]),
                totalCategories = _.uniqBy(totalCategories);

        } else {
            var indexToSplit = categories.indexOf(categoryid);
            var first = categories.slice(0, indexToSplit);
            var second = categories.slice(indexToSplit + 1);

            var totalCategories = first.concat(subcategories).concat(second);
        }

        // Loop through cards
        _.map(cards, function (el) {

            var block = el.querySelectorAll('.block')[0],
                percentile = el.querySelectorAll('.percentile')[0];

            // Hide all elements by default
            block.setAttribute("y", -cardHeight);
            percentile.setAttribute("y", -cardHeight);

            // Loops through [subcategories] if element is part of the main category
            Array.prototype.forEach.call(totalCategories, function(c, i){

                // Gets the position from the position in the loop
                var position = i;

                // If it contains the correct class, move it into view
                if (el.classList.contains(c)) {

                    var block = el.querySelectorAll('.block')[0],
                        percentile = el.querySelectorAll('.percentile')[0];

                    block.setAttribute("y", ((position * cardHeight) + cardHeight + legendHeight));
                    percentile.setAttribute("y", ((position * cardHeight) + (cardHeight *1.5) + legendHeight));
                }

            });

        });

        // Loop through axis
        _.map(axis, function (el) {

            // Hide all elements by default
            el.setAttribute("y", -cardHeight);

            // Loops through [subcategories] if element is part of the main category
            Array.prototype.forEach.call(totalCategories, function(c, i){

                // Gets the position from the position in the loop
                var position = i;

                // If it contains the correct class, move it
                if (el.classList.contains(c)) {
                    el.setAttribute("y", ((position * cardHeight) + (cardHeight * 1.5) + legendHeight));
                }

            });
        });
    }

}

function resizeCanvas(barCount, cardHeight, legendHeight) {
    var canvas = document.querySelectorAll('.heatmap')[0];
    canvas.setAttribute('height', (barCount * cardHeight) + (cardHeight * 2) + legendHeight);
}
