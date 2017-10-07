const scrapeIt = require("scrape-it");
var jsonfile = require('jsonfile')
var file = 'data.json'
var n = 1;

var data = { movies: [] }


function scraper(page_number) {
    scrapeIt("http://www.imdb.com/search/title?groups=top_1000&sort=user_rating&view=simple&page=" + page_number + "&ref_=adv_nxt", {
        movies: {
            listItem: ".mode-simple",
            data: {
                title: ".lister-item-header a",
                date: {
                    selector: ".lister-item-year",
                    convert: function (x) {
                        console.log(parseInt(x.substr(x.length-5, x.length-1)));
                        return parseInt(x.substr(x.length-5, x.length-1));
                    }
                },
                rating: ".col-imdb-rating",rating: {
                    selector: ".col-imdb-rating",
                    convert: function (x) {
                        return 10 * x
                    }
                },
                url: {
                    selector: ".lister-item-header a",
                    attr: "href",
                    convert: function (x) {
                        return "http://www.imdb.com" + x
                    }
                }
            }
        }
    }, (err, page) => {
        data.movies.push(...page.movies);
        if (page_number == 20) {

            jsonfile.writeFile("./data.json", data, { spaces: 2 })
        }
    });
}


function scrapeloop() {
    for (var i = 1; i <= 20; i++) {
        (function (index) {
            setTimeout(function () {
                console.log(index);
                scraper(index);
            }, index * 5000);
        })(i);
    }
}

scrapeloop()