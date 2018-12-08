var animals = ["dogs", "cats", "rats", "ferrets"];


// buttons //
function gifButtons(){
    $("#gifButtonsContainer").empty();
    for (var i = 0; i < animals.length; i++) {
        var button = $("<button>");
        button.addClass("animal");
        button.attr("data-animal", animals[i]);
        button.text(animal[i]);
        $("#gifButtonsContainer").append(button);
    }
};

// on click function for new buttons // 
function newButtons(){
    $("#addAnimal").on("click", function(){
        event.preventDefault();
        var animal = $("#animalInput").val().trim();
        if (animal == "") {
            return false;
        }
        animals.push(animal);

        gifButtons();
        return false;
    });
}

// main part of the page //

$(document).ready(function (){
    $(document).on("click", "button", function (){
        var animals = $(this).attr("data-animal");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animals + "&api_key=LGj4FHgJTf3phxLdnoyHfG9HgQV7GSBf";
        
        $.ajax({
            url:queryURL,
            method: "GET"
        })
        .then(function (response){
            $("#gifImages").empty();
            var results = response.data;
            if (results == ""){
                alert("There is no gif for this button");
            }

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                gifDiv.addClass("gifDiv");
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);
                var gifImage = $("<img>");
                gifImage.attr("class", 'gifyImage');
                gifImage.attr("src", results[i].images.fixed_height.url);
                gifImage.attr("data-animate", results[i].images.fixed_height.url);
                gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                gifImage.data('state', 'animate');
                gifImage.data('state', 'still');
                gifDiv.append(gifImage);
                $("#gifImages").prepend(gifDiv);
            }
        });
    });

    $(document).on("click", 'gifyImage', function(event){
        var clickedImage = $(event.target);
        if(clickedImage.data('state') === "animate"){
            clickedImage.data('state', "still");
            clickedImage.attr('src', clickedImage.data('still'));
        }

        else{
            clickedImage.data('state', "animate");
            clickedImage.attr('src', clickedImage.data('animate'));
        }
    });
    newButtons();
});