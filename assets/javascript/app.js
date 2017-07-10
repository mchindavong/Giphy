$(document).ready(function() {
var topics = [];

function displayDisneyMovie() {

var movie = $(this).data("search");
  console.log(movie);

var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC&limit=10";
  console.log(queryURL);

  $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          var results = response.data;
          console.log(results);
          for (var i = 0; i < results.length; i++) {
          
          var showDiv = $("<div class='col-md-4'>");

          var rating = results[i].rating;
          var defaultAnimatedSrc = results[i].images.fixed_height.url;
          var staticSrc = results[i].images.fixed_height_still.url;
          var showImage = $("<img>");
          var p = $("<p>").text("Rating: " + rating);

          showImage.attr("src", staticSrc);
          showImage.addClass("disneyGiphy");
          showImage.attr("data-state", "still");
          showImage.attr("data-still", staticSrc);
          showImage.attr("data-animate", defaultAnimatedSrc);
          showDiv.append(p);
          showDiv.append(showImage);
          $("#gifArea").prepend(showDiv);

        }
  });
}

  $("#addMovie").on("click", function(event) {
        event.preventDefault();
        var newMovie = $("#disneyInput").val().trim();
        topics.push(newMovie);
        console.log(topics);
        $("#disneyInput").val('');
        displayButtons();
      });

 
  function displayButtons() {
    $("#myButtons").empty();
    for (var i = 0; i < topics.length; i++) {
      var a = $('<button class="btn btn-primary">');
      a.attr("id", "show");
      a.attr("data-search", topics[i]);
      a.text(topics[i]);
      $("#myButtons").append(a);
    }
  }


  displayButtons();


  $(document).on("click", "#show", displayDisneyMovie);


  $(document).on("click", ".disneyGiphy", pausePlayGifs);


  function pausePlayGifs() {
     var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
  }
}

});