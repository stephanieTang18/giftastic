$(document).ready(function() {

    //Initial array
    var animals = ["cat", "dog", "tiger", "lion",];
    
    //Clears the button area
    function renderButtons() {
        $("#buttons").empty(); 
    
    //Creates a button for every item in the initial array
        for (var i = 0; i < animals.length; i++) {
            console.log(animals[i]);
            var button = $("<button>");
            button.html(animals[i]);
            button.addClass("btn btn-outline-dark");
            button.attr("data-name", animals[i]);
            button.attr("id","animal-button");
            $("#buttons").append(button);
        }
    }
    
    // Adds every new animal the user inputs to the array of animals
    $("#submitButton").on("click", function(event) {
        event.preventDefault();
        var newAnimal = $("#userInput").val().trim();
            //Prevents animals buttons being duplicated
            if (animals.indexOf(newAnimal) === -1) {
                animals.push(newAnimal);
                renderButtons();
            }
            else{
                alert("This animal has already been added to the list!")
            }
        
    });
    
    //Displays the gifs each time the Animal button is clicked
    $(document).on("click", "#animal-button", displayGifs);
    
    //Function to display gifs
    function displayGifs() {
    
        //Empties the gif container from any previous images
        $("#images").empty();
    
        var animal = $(this).attr("data-name");
        console.log(animal);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=ifiiIU1sMaCVrH2hfhu7npMqAOZ9iMA3";
    
        //Ajax call to get response
        $.ajax({
            url: queryURL,            
            method: "GET"
        }).then(function(response) {
            console.log(response);
    
            //Variable to store the response data
            var response = response.data;
    
            //For loop to go through the responses 
            //Creates the divs with still images and paragraph for each rating and title
            for (var i = 0; i < 10; i++) {
                var gifDiv = $("<div>");
                gifDiv.addClass("gifDiv");
                
                var rating = response[i].rating;
                var ratingP = $("<p>").html("Rating: " + rating);
                ratingP.addClass("text-center");
    
                var title = response[i].title;
                var titleP = $("<p>").html( "Title: " + title);
                titleP.addClass("text-center");
    
                var gifImage = $("<img>");
                gifImage.addClass("gif");
                gifImage.attr("src", response[i].images.fixed_height_still.url);
                gifImage.attr("data-still", response[i].images.fixed_height_still.url);
                gifImage.attr("data-animate", response[i].images.fixed_height.url);
                gifImage.attr("data-state", "still");
    
                //Places the imagas and rating data in a div
                gifDiv.append(gifImage);
                gifDiv.prepend(ratingP);
                gifDiv.prepend(titleP);
                
                //Prints each image with rating in the container
                $("#images").prepend(gifDiv);
            }
        });
    }
    
    //Changes the state of the gifs upon clicking of the image
    $(document).on("click", ".gif", function() {
        var state = $(this).attr("data-state");
    
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
    
    renderButtons();
    
    });