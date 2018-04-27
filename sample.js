const yelp = require('yelp-fusion');
const apiKey = '6GwF55WvV4NKfSLm9mM33DKY2FUtnoMkpwfJjV75uARAvelRO3WOJG9yg8zUQPxi6fNGdVHIwFk7-aoRAW7p0qQ9mYLsnjYmF8IybrzbruGPdos5aeDvGszzTOXiWnYx';
const scraperjs = require('scraperjs');

const searchRequest = {
  location: 'Manchester, UK',
  offset: 51,
  limit: 50
};

let dataStore = [];

const client = yelp.client(apiKey);

client.search(searchRequest).then(response => {
  return response.jsonBody.businesses
}).then(restaurants => {
  let restaurantsURL =[];
  for(let i = 0; i < restaurants.length; i++){
    restaurantsURL.push(restaurants[i].url)
  }
  return restaurantsURL
}).then(resUrls => {
  for(let i = 0; i < resUrls.length; i++){
    scraperjs.StaticScraper.create(resUrls[i])
      .scrape(function($) {
        return $(".biz-website").map(function() {
          return $(this).text().split(" ");
        }).get();
      })
      .then(function(news) {
        const newItems =[]
        for(let i = 0; i < news.length;i++){
          if(news[i].match(/[.co.uk|.com]/gi)){
                let newsItem = news[i].replace("\n", "")
                newItems.push(newsItem)
              }
        }
        console.log(newItems)
      })

  }
}).catch(e => {
  console.log(e);
});

// if(dataStore.)

