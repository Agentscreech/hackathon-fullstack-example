$('.put-form').on('submit', function(e) {
  e.preventDefault();
  var scoreElement = $(this);
  var scoreUrl = scoreElement.attr('action');
  var scoreData = scoreElement.serialize();
  console.log(scoreUrl);
  console.log(scoreData);
  $.ajax({
    method: 'PUT',
    url: scoreUrl,
    data: scoreData
  }).done(function(data) {
    // get data returned from the PUT route
    console.log(data);

    // do stuff when the PUT action is complete
    // teamElement.remove();

    // or, you can redirect to another page
    window.location = '/archery-game/scoreboard';
  });
});
$('.admin-put').on('submit', function(e) {
  e.preventDefault();
  var scoreElement = $(this);
  var scoreUrl = scoreElement.attr('action');
  var scoreData = scoreElement.serialize();
  $.ajax({
    method: 'PUT',
    url: scoreUrl,
    data: scoreData
  }).done(function(data) {
    // get data returned from the PUT route

    // do stuff when the PUT action is complete
    // teamElement.remove();

    // or, you can redirect to another page
    window.location = '/admin-panel';
  });
});

$('.delete-link').on('click', function(e) {
    e.preventDefault();
    console.log('delete pressed');
    var element = $(this);
    var score = element.attr('href');
    console.log(score);
    $.ajax({
        method: 'DELETE',
        url: score
    }).done(function(data) {
        // get data returned from the DELETE route
        console.log(data);

        // do stuff when the DELETE action is complete
        // element.remove();

        // or, you can redirect to another page
        window.location = '/admin-panel';
    });
});
