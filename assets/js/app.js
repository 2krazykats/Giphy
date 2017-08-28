$(document).ready(function() {

    // VARIABLES
    var topics = ["love","happy","sad","lol","crying","ugh"];
    var limit = 10;


    // FUNCTIONS

    function generateButtons() {

        for(var i=0; i<topics.length; i++) {
            var topicsButton = $("<button>");
            // $("topicsContainer").text(newButton + topics[i]);
            topicsButton.attr("id",`sticker-${i}`);
            topicsButton.addClass("btn btn-primary stickerButton");
            topicsButton.text(topics[i]);
            // console.log(topics[i]);
            $("#topicsContainer").append(topicsButton);
        }
    }


    $("#add-gif").on("click",  function() {
         event.preventDefault();
                //Get the value from the user input
                var newTopic = $("#gif-input").val().trim();

                //Create a button from the input and add them to the topicsContainer div
                var newButton = $("<button>");
                // newButton.attr("id","");
                newButton.addClass("btn btn-primary stickerButton");
                topics.push(newTopic);
                newButton.text(newTopic);
                $("#topicsContainer").append(newButton);

                $("#gif-input").val("");
            });

    function queryGiphy() {

        // for (i=0; i<topics.length; i++) {
            var chosenTopic = $("#topicsContainer").on("click", ".stickerButton", function(){
                    console.log($(this).val());

            });
            var queryURL = "https://api.giphy.com//v1/stickers/search?api_key=dc6zaTOxFJmzC&q="
						+ chosenTopic + "&limit=" + limit;
            $.ajax({
  	          url: queryURL,
  	          method: "GET"
  	        })
  	        .done(function(response) {

                var results = response.data;
            	$('#giphyDisplay').empty();

                for (var i = 0; i < results.length; i++) {

                    var gifDiv = $("<div class='item'>");
                    var rating = results[i].rating;
                    var p = $("<p>").text(`Rating: ${rating}`);

                    var stickerImage = $("<img>");
                    stickerImage.attr("src", results[i].images.fixed_height_small.url);
                    stickerImage.attr("data-still", results[i].images.fixed_height_small_still.url);
            		stickerImage.attr("data-animate", results[i].images.fixed_height_small.url);
                    gifDiv.prepend(p);
                    gifDiv.prepend(stickerImage);

	        	    $("#giphyDisplay").append(gifDiv);
                }

	     });
        // }
    }


    generateButtons();

   $("#topicsContainer").on("click", ".stickerButton", function() {
        event.preventDefault();
        queryGiphy();

	});

    $("#giphyDisplay").on("click", ".item", function(){

            var state = $(this).attr("data-state");
                console.log(this);
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
          }
      });


});
