/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const $tweetContainer = $('#tweets-container');

    //Initial renders of tweets from server
  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET'
    })
    .then(function (tweets) {
      renderTweets(tweets);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  loadTweets();

  const refetchTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET'
    })
    .then(function (tweets) {
      let newTweet = createTweetElement(tweets[tweets.length -1]);
      $tweetContainer.prepend(newTweet);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  $('.tweet-form').submit(function (event) {

    //Gets data from form
    event.preventDefault();
    const dataForAjax = $('.tweet-form').serialize();

    if ($('#tweet-text').val().length > 140) {
      return alert("Message over character limit");
    }

    //Sending to server via POST request
    $.ajax({ 
      method: 'POST', 
      url: '/tweets',
      data: dataForAjax
    })
    .then((tweet) => {
      refetchTweets();
      $('.tweet-form')[0].reset();
    })
    .catch((error) => {
      console.log('error', error);
    })
  });



  const createTweetElement = function(tweetobj) {
    //Takes in a tweet object and formats it into html format
    const avatar = tweetobj.user.avatars;
    const user = tweetobj.user.name;
    const handle = tweetobj.user.handle;
    const content = tweetobj.content.text;
    const dateCreated = timeago.format(tweetobj.created_at);
    
    const $tweet = $(`<article class="tweet">
    <header>
      <div class="tweeter-tagpfp">
        <img src= "${avatar}">
        <span class= "tweeter-name"> ${user} </span>
      </div>
      <span class= "tweeter-tag"> ${handle} </span>
    </header>
    <textarea name="text" class="tweet-text" readonly>
      ${content}
    </textarea>
    <footer> 
      <span class="time-ago">${dateCreated}</span>
      <div class="tweet-options">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  `);

  return $tweet;
  };

  const renderTweets = function(tweets) {
    //function that loops through tweets and calls createTweetElement for each tweet
    let $tweet = {};
    for (const tweet of tweets) {
      $tweet = createTweetElement(tweet);
      $tweetContainer.append($tweet); //Appends return value to tweets container
    }
  }
})