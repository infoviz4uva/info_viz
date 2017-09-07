var json;
var totalScore;
var monthScore, averageScore;
var stopwords = [
                'a',
                'about',
                'above',
                'after',
                'again',
                'against',
                'all',
                'am',
                'an',
                'and',
                'any',
                'are',
                "aren't",
                'as',
                'at',
                'be',
                'because',
                'been',
                'before',
                'being',
                'below',
                'between',
                'both',
                'but',
                'by',
                "can't",
                'cannot',
                'could',
                "couldn't",
                'did',
                "didn't",
                'do',
                'does',
                "doesn't",
                'doing',
                "don't",
                'down',
                'during',
                'each',
                'few',
                'for',
                'from',
                'further',
                'had',
                "hadn't",
                'has',
                "hasn't",
                'have',
                "haven't",
                'having',
                'he',
                "he'd",
                "he'll",
                "he's",
                'her',
                'here',
                "here's",
                'hers',
                'herself',
                'him',
                'himself',
                'his',
                'how',
                "how's",
                'i',
                "i'd",
                "i'll",
                "i'm",
                "i've",
                'if',
                'in',
                'into',
                'is',
                "isn't",
                'it',
                "it's",
                'its',
                'itself',
                "let's",
                'me',
                'more',
                'most',
                "mustn't",
                'my',
                'myself',
                'no',
                'nor',
                'not',
                'of',
                'off',
                'on',
                'once',
                'only',
                'or',
                'other',
                'ought',
                'our',
                'ours',
                'ourselves',
                'out',
                'over',
                'own',
                'same',
                "shan't",
                'she',
                "she'd",
                "she'll",
                "she's",
                'should',
                "shouldn't",
                'so',
                'some',
                'such',
                'than',
                'that',
                "that's",
                'the',
                'their',
                'theirs',
                'them',
                'themselves',
                'then',
                'there',
                "there's",
                'these',
                'they',
                "they'd",
                "they'll",
                "they're",
                "they've",
                'this',
                'those',
                'through',
                'to',
                'too',
                'under',
                'until',
                'up',
                'very',
                'was',
                "wasn't",
                'we',
                "we'd",
                "we'll",
                "we're",
                "we've",
                'were',
                "weren't",
                'what',
                "what's",
                'when',
                "when's",
                'where',
                "where's",
                'which',
                'while',
                'who',
                "who's",
                'whom',
                'why',
                "why's",
                'with',
                "won't",
                'would',
                "wouldn't",
                'you',
                "you'd",
                "you'll",
                "you're",
                "you've",
                'your',
                'yours',
                'yourself',
                'yourselves',
                'zero'
                ];

document.addEventListener("DOMContentLoaded", function() {

    bindNavigation();
    handleUrlRequest();
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
            
                $(data).find('h2.type-24').filter(function(){
                  var data = $(this);
                  title = data.text();

                  var wordArr = title.match(/\w+/g),
                  commonObj = {},
                  uncommonArr = [],
                  word, i;

                  for ( i = 0; i < stopwords.length; i++ ) {
                      commonObj[ stopwords[i].trim() ] = true;
                  }

                  for ( i = 0; i < wordArr.length; i++ ) {
                      word = wordArr[i].trim().toLowerCase();
                      if ( !commonObj[word] ) {
                          uncommonArr.push(word);
                      }
                  }

                  json.title = uncommonArr;
                });

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

                $(data).find('.js-pledged').filter(function(){
                  var data = $(this);
                  pledged = data.html().split("$")[1];

                  json.pledged = pledged;
                });

            if (json.category) {
                var event = new CustomEvent('urlHandled', {
                    'detail': {
                        'title'       : json.title,
                        'country'     : json.country,
                        'category'    : json.category,
                        'sub_category' : json.sub_category,
                        'goal'        : json.goal,
                        'pledged'     : json.pledged,
                        'googletrend' : 'example',
                    }
                });
                window.json = json;
                window.dispatchEvent(event);

                totalScore = Math.round(window.monthScore + window.averageScore);

                document.getElementById('score').innerHTML = totalScore + '/50';

                
            }
        }).then(function () {
            maps(json.category);
            $.ajax({
                url: '/',
                data: JSON.stringify([[json.category], json.title]),
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

    maps("Amsterdam");
}

// Fire functions when the page has loaded
