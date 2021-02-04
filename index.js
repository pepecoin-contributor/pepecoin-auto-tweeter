const Twit = require("twit");

const twit = new Twit(require("config.js"));

const searchQuery = { q: "#pepecoins", count: 100, result_type: "recent" };

const retweetLatest = () => {
  twit.get("search/tweets", searchQuery, (error, data) => {
    console.log(error, data);
    
    if (!error) {
      // ...then we grab the ID of the tweet we want to retweetwit...
      let retweetId = data.statuses[0].id_str;
      // ...and then we tell Twitter we want to retweet it!
      twit.post("statuses/retweet/" + retweetId, {}, (error, response) => {
        if (response) {
          console.log("Success! Check your bot, it should have retweeted something.");
        }
        if (error) {
          console.log("There was an error with Twitter:", error);
        }
      });
    } else {
      console.log("There was an error with your hashtag search:", error);
    }
  });
}

retweetLatest();

setInterval(retweetLatest, 1000 * 60 * 30);