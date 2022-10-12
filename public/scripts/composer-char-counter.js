$(document).ready(function() {
  $('#tweet-text').on("input", function() {
    let inputLength = $(this).val().length;
    if (140 - inputLength >= 0) {
      $('#charcounter').attr('class', 'counter');
      $(this).next().find('.counter').html(140 - inputLength);
    }
    

    if (140 - inputLength < 0) {
      $('#charcounter').attr('class', 'redcounter');
      $(this).next().find('.redcounter').html(140 - inputLength);
    }
  })
});