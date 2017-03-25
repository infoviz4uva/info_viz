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
    var canvasWidth = 800,
        cardWidth = canvasWidth / 12,
        canvasWidthTotal = canvasWidth + (cardWidth),
        cardHeight = 20,
        canvasMargin = {top: 0, right: 0, bottom: cardWidth, left: cardWidth},
        canvasHeight = (cardHeight * 35),
        gridSize = Math.floor(canvasWidth / 24);

    var canvas = d3.select(".viz-3")
        .append("svg:svg")
        .attr("width", canvasWidthTotal)
        .attr("height", canvasHeight)
        .attr("class", "heatmap")
        .style("margin-left", function(d) { return ( -cardWidth * 1.5 )})

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
        .attr("y", cardHeight / 2)
        .attr("class","axis-x")

    // Bind events
    bindEvents()
}

// Interactions
function bindEvents() {

    var canvas = document.getElementsByClassName('heatmap')[0],
        cards = canvas.getElementsByClassName('card'),
        axis = canvas.getElementsByClassName('axis-y'),
        activeClass = 'active',
        state = 'cat-all';

    changeStates(state, canvas, cards, axis);

    for (var i = 0; i < cards.length ; i++) {
        cards[i].addEventListener('click',
            function () {
                if (!this.classList.contains(activeClass) && !this.classList.contains('subcategory')) {
                    changeStates(this.classList[this.classList.length - 1], canvas, cards, axis);
                    highlightCategory(this.classList[this.classList.length - 1]);
                }
            }, false);
    }

    function highlightCategory(selector) {
        var $activeCategory = canvas.getElementsByClassName(selector);
        _.map(cards, function (el, i) {
            el.classList.remove(activeClass);
        });
        _.map(axis, function (el, i) {
            el.classList.remove(activeClass);
        });
        _.map($activeCategory, function (el, i) {
            el.classList.add(activeClass);
        });
    }
}

function changeStates(state, canvas, cards, axis) {

    // Add default state
    canvas.id = state;

    var cardHeight = 20,
        categories = ['cat-0', 'cat-13', 'cat-19', 'cat-24', 'cat-31', 'cat-40', 'cat-53', 'cat-73', 'cat-81', 'cat-87', 'cat-105', 'cat-112', 'cat-128', 'cat-135', 'cat-151'];

    // Assigns subcatgories to categoreis
    function filterSubcategories() {

        switch (canvas.id) {
            case 'cat-all':
                repositionVisuals('null', categories);
                break
            case categories[0]:
                repositionVisuals(categories[0], ['cat-0', 'cat-1', 'cat-2', 'cat-3', 'cat-4', 'cat-5', 'cat-6', 'cat-7', 'cat-8', 'cat-9', 'cat-10', 'cat-11', 'cat-12']);
                break
            case categories[1]:
                repositionVisuals(categories[1], ['cat-13', 'cat-14', 'cat-15', 'cat-16', 'cat-17', 'cat-18']);
                break
            case categories[2]:
                repositionVisuals(categories[2], ['cat-19', 'cat-20', 'cat-21', 'cat-22', 'cat-23']);
                break
            case categories[3]:
                repositionVisuals(categories[3], ['cat-24', 'cat-25', 'cat-26', 'cat-27', 'cat-28', 'cat-29', 'cat-30']);
                break
            case categories[4]:
                repositionVisuals(categories[4], ['cat-31', 'cat-32', 'cat-33', 'cat-34', 'cat-35', 'cat-36', 'cat-37', 'cat-38', 'cat-39']);
                break
            case categories[5]:
                repositionVisuals(categories[5], ['cat-40', 'cat-41', 'cat-42', 'cat-43', 'cat-44', 'cat-45', 'cat-46', 'cat-47', 'cat-48', 'cat-49', 'cat-50', 'cat-51', 'cat-52']);
                break
            case categories[6]:
                repositionVisuals(categories[6], ['cat-53', 'cat-54', 'cat-55', 'cat-56', 'cat-57', 'cat-58', 'cat-59', 'cat-60', 'cat-61', 'cat-62', 'cat-63', 'cat-64', 'cat-65', 'cat-66', 'cat-67', 'cat-68', 'cat-69', 'cat-70', 'cat-71', 'cat-72']);
                break
            case categories[7]:
                repositionVisuals(categories[7], ['cat-73', 'cat-74', 'cat-75', 'cat-76', 'cat-77', 'cat-78', 'cat-79', 'cat-80']);
                break
            case categories[8]:
                repositionVisuals(categories[8], ['cat-81', 'cat-82', 'cat-83', 'cat-84', 'cat-85', 'cat-86']);
                break
            case categories[9]:
                repositionVisuals(categories[9], ['cat-87', 'cat-88', 'cat-89', 'cat-90', 'cat-91', 'cat-92', 'cat-93', 'cat-94', 'cat-95', 'cat-96', 'cat-97', 'cat-98', 'cat-99', 'cat-100', 'cat-101', 'cat-102', 'cat-103', 'cat-104']);
                break
            case categories[10]:
                repositionVisuals(categories[10], ['cat-105', 'cat-106', 'cat-107', 'cat-108', 'cat-109', 'cat-110', 'cat-111']);
                break
            case categories[11]:
                repositionVisuals(categories[11], ['cat-112', 'cat-113', 'cat-114', 'cat-115', 'cat-116', 'cat-117', 'cat-118', 'cat-119', 'cat-120', 'cat-121', 'cat-122', 'cat-123', 'cat-124', 'cat-125', 'cat-126', 'cat-127']);
                break
            case categories[12]:
                repositionVisuals(categories[12], ['cat-128', 'cat-129', 'cat-130', 'cat-131', 'cat-132', 'cat-133', 'cat-134']);
                break
            case categories[13]:
                repositionVisuals(categories[13], ['cat-135', 'cat-136', 'cat-137', 'cat-138', 'cat-139', 'cat-140', 'cat-141', 'cat-142', 'cat-143', 'cat-144', 'cat-145', 'cat-146', 'cat-147', 'cat-148', 'cat-149', 'cat-150']);
                break
            case categories[14]:
                repositionVisuals(categories[14], ['cat-151', 'cat-152', 'cat-153', 'cat-154', 'cat-155', 'cat-156', 'cat-157', 'cat-158', 'cat-159', 'cat-160', 'cat-161', 'cat-162', 'cat-163', 'cat-164', 'cat-165']);
                break
            default:
                cat.setAttribute("y", cardHeight * -2); // Hides blocks when they aren't in the category
        }
    }

    // Run filtering
    filterSubcategories();

    // Moves the svg data elements
    function repositionVisuals(categoryid, subcategories) {

        if (categoryid === 'null') {

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

                    block.setAttribute("y", ((position * cardHeight) + cardHeight));
                    percentile.setAttribute("y", ((position * cardHeight) + cardHeight *1.5));
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
                    el.setAttribute("y", ((position * cardHeight) + (cardHeight * 1.5)));
                }

            });

        });

    }

}
