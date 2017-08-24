$(document).ready(function() {

    // VARIABLES
    var topics = ["love","happy","sad","lol","crying","ugh"];



    // FUNCTIONS

    function generateButtons() {

        var newButton = $("<button>");
        for(var i=0; topics.length; i++) {
            $("topicsContainer").text(newButton + topics[i]);

        }
    }


    var queryURL1 = "https://api.giphy.com//v1/stickers/search?api_key=dc6zaTOxFJmzC&q=love";

    $.ajax({
        url: queryURL1,
        method: "GET"
    })
    .done(function(response){
        console.log(response.data);

    }
)





   $("#runSearch").on("click", function() {

   		var recordsRetrieved = $("#recordsReturn");

        for (i=0; i<topics.length; i++) {
        var queryURL = "https://api.giphy.com//v1/stickers/search?api_key=dc6zaTOxFJmzC&q="
						+ topics[i];;

            }

	      $.ajax({
	          url: queryURL1,
	          method: "GET"
	        })
	        .done(function(response) {
                var results = response.data;

                for (var i = 0; results[i].length; i++) {
                    var gifDiv = $("<div class='item'>");
                    var rating = results[i].rating;
                    var p = $("<p>").text(`Rating: ${Rating}`);

                    var stickerImage = $("<img>");
                    stickerImage.attr("src", response[i].data.images.downsided_small);

                    gifDiv.prepend(p);
                    gifDiv.prepend(stickerImage);

	        	    $("#giphyDisplay").append(gifDiv);
                }
	        });

	        // Limit the number of records to display

	     });
      });
