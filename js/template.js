var json;

document.addEventListener("DOMContentLoaded", function() {

    bindNavigation();
    handleUrlRequest();
    hideShowViz(0);
    // URL entered event?

});

// Adds click listeners to tabs
function bindNavigation() {

    var tabs = document.querySelectorAll('.cust-tab');

    Array.prototype.forEach.call(tabs, function(tab){

        tab.addEventListener("click", function(){

            // Get the target ID and change into a class (overwriting the framework this way)
            var target = '.'+ tab.hash.substr(1);

            // Scroll to target
            document.querySelector(target).scrollIntoView({
                behavior: 'smooth'
            });

            window.scrollBy(0, -238); // Offsets the fixed nav

        }, false);

    });
}

function handleUrlRequest () {
    $('.submit').on('click', function (e) {
        e.preventDefault();
        var input = $('.url-input');
        json = {};
        $.ajax({
            type: "GET",
            url: $(input).val(),
            data: input.serialize(), // serializes the form's elements.
        }).then(function (data) {
            var title, country, category, sub_category, goal;

                $(data).find('a[href*="places"]').filter(function(){
                  var data = $(this);
                  country = data.text().trim().split(", ").pop();

                  json.country = country;
                });

                 $(data).find('a[href*="ref=category"]:not(.btn--green)').filter(function(){
                  var data = $(this);
                  category = data[0].href.split('/categories/')[1];
                  category = category.split('/', 1)[0];

                  sub_category = data.text().trim();

                  json.category = category.toLowerCase();
                  json.sub_category = sub_category.toLowerCase();
                });

                $(data).find('div.num').filter(function(){
                  var data = $(this);
                  goal = data.attr('data-goal');

                  json.goal = goal;
                });

            if (json.category) {
                var event = new CustomEvent('urlHandled', {
                    'detail': {
                        'country'     : json.country,
                        'category'    : json.category,
                        'subcategory' : json.sub_category,
                        'goal'        : json.goal,
                        'googletrend' : 'example',
                    }
                });
                window.dispatchEvent(event);
                $('.cust-viz.viz-2').html('<iframe class="bubble_chart" src="kickstarter_viz/bubble_chart.html" height="500"></iframe>');
                $('.cust-viz.viz-4').html('<iframe class="bubble_chart" src="kickstarter_viz/trend_graph.html" height="500"></iframe>');
                hideShowViz(1);
            }
        }).then(function () {
            $.ajax({
                url: '/',
                // dataType: "jsonp",
                data: JSON.stringify([json.category]),
                jsonpCallback: 'callback', // this is not relevant to the POST anymore
                success: function (data) {
                    console.log('Success: ');
                },
                error: function (xhr, status, error) {
                    console.log('Error: ' + error.message);
                },
            });
        });
    });
}

function hideShowViz (hideShow) {
    if (hideShow === 0) {
        $('.bubble_chart').hide();
    } else if (hideShow === 1) {
        $('.bubble_chart').show();
    }
}

// Fire functions when the page has loaded
