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


    generateButtons();

    $("#add-gif").on("click", ".stickerButton",  function() {
                //Get the value from the user input
                var newTopic = $("#gif-input").val().trim();

                //Create a button from the input and add them to the topicsContainer div
                var newButton = $("<button>");
                // newButton.attr("id","");
                newButton.addClass("btn btn-primary stickerButton");
                topics.push(newTopic);
                newButton.text(newTopic);
                $("#topicsContainer").append(newButton);
            });

    function queryGiphy() {

        for (i=0; i<topics.length; i++) {
        var queryURL = "https://api.giphy.com//v1/stickers/search?api_key=dc6zaTOxFJmzC&q="
						+ topics[i] + "&limit=" + limit;
            $.ajax({
  	          url: queryURL,
  	          method: "GET"
  	        })
  	        .done(function(response) {

                var results = response.data;
            	$('#giphyDisplay').empty();

                for (var i = 0; i < results[i].length; i++) {

                    var gifDiv = $("<div class='item'>");
                    var rating = results[i].rating;
                    var p = $("<p>").text(`Rating: ${rating}`);

                    var stickerImage = $("<img>");
                    stickerImage.attr("src", response[i].data.images.downsided_still);

                    gifDiv.prepend(p);
                    gifDiv.prepend(stickerImage);

                    console.log(gifDiv);
                    console.log(rating);

	        	    $("#giphyDisplay").append(gifDiv);
                }

	     });
        }
    }


//     var queryURL1 = "https://api.giphy.com//v1/stickers/search?api_key=dc6zaTOxFJmzC&q=love&limit=10";
//
//     $.ajax({
//         url: queryURL1,
//         method: "GET"
//     })
//     .done(function(response){
//         console.log(response.data);
//
//     }
// )

   $("#sticker-0").on("click", function() {
        event.preventDefault();
            queryGiphy();
	        });

      });
