$(document).ready(function() {
  $('#tweet-text').on("input", function() {
    let inputLength = $(this).val().length; //Gets character amount in form
    
    if (140 - inputLength >= 0) { //Function for if above character limit, text renders black (styled in css)
      $('#charcounter').attr('class', 'counter');
      $(this).next().find('.counter').html(140 - inputLength);
    }
    

    if (140 - inputLength < 0) { //Function for if over character limit, text renders red (styled in css)
      $('#charcounter').attr('class', 'redcounter');
      $(this).next().find('.redcounter').html(140 - inputLength);
    }
  })
});