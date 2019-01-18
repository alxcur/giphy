

$(document).ready(function(){

//initial array 
var colors = ["red", "coral", "lime green", "gold", "blue", "honeydew", "heliotrope", "magenta", "cyan", "seaweed", "turquoise", "violet-red", "pink", "yellow", "orchid", "aquamarine", "mint", "beige", "rose", "silver", "mustard", "amethyst", "burgundy", "carrot", "chartreuse", "cinnabar", "grey", "cotton candy", "salmon", "champange", "denim", "indigo", "lavender"]
GIFArea = " "
	
//button

//function for displaying tv show data
function renderButtons() {
	
//deleting the color buttons prior to adding new color buttons
$("#colors-view").empty();
	
//looping through the array of colors
for (var i=0; i < colors.length; i++) {
	
//dynamically generate buttons for each color in the array.
//this code $("<button>") is all jquery needs to create the start and end tag. (<button></button>)
var a = $('<button>');

//Adding a class
a.addClass('color');
	
//adding a data-attribute with a value of the television at index i
a.attr('data-name', colors[i]);
	
//providing the button's text with a value of the color at index i
a.text(colors[i]);

//adding the button the html
$("#colors-view").append(a);
}
s=
$("#color-input").focus();
}

renderButtons();
	
//============CLICK BUTTON/ LISTENERS==================================
//this function handles events where one button is clicked
$("#add-color").on('click', function() {
	
//event.preventDefault() prevents the form from trying to submit itself
//we're using a form so that the user can hit enter instread of clicking the button
event.preventDefault();
	
//This line will grab the text from the input box
var color = $("#color-input").val().trim();
	
//this color from the textbox is then added to our array
colors.push(color);
	
//calling renderButtons which handles the processing of our color array
renderButtons();
	
});
	
//==============DISPLAY INFO==============================
$(document).on('click', 'button',  function() {

// Deleting the colors prior to adding new colors
// (this is necessary otherwise we will have repeat buttons)

$('#GIFArea').empty(); 
var b = $(this).attr('data-name');		
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + b + "&api_key=dc6zaTOxFJmzC&limit=12";  
console.log(queryURL); 
	
//standard ajax call to get request
$.ajax({
url: queryURL,
method: 'GET'
})

//after the data comes back from the API
.done(function(response) {
console.log(response);

var results = response.data;
for (var i = 0; i < results.length; i++) {

//creating a div with the class item
var gifDiv = $('<div class="item">');

//storing the result items rating        
var rating = results[i].rating;

//creating an element to have the rating displayed
var r = $('<p>').text();

//creating a image tag
var gifImage = $('<img>');

//giving the image tag an src attribute of a property pulled off the result item
gifImage.attr('src', results[i].images.fixed_height_still.url)
.attr('data-still', results[i].images.fixed_height_still.url)
.attr('data-animate', results[i].images.fixed_height.url)
.attr('data-state', "still")
.addClass("showImage");

//displaying the rating & image
gifDiv.append(r)
.append(gifImage);	                    
	
//prepending data not necessary since cleared             	  
$('#GIFArea').prepend(gifDiv);
}
	
});
});
	
//====================Still and Animate Image ==================================
// Listens for a click on any image (dynamic)
// $('.showImage').on('click', function(){ --> won't work here
$(document).on('click', '.showImage',  function() {
var state = $(this).data('state');

//If the clicked image's state is still, update its src attribute to what its data-animate value is
if (state == "still") {
console.log("still image works");

// Then, set the image's data-state to animate
$(this).attr('src', $(this).data('animate'))
.data('state', 'animate');
} else {
			
//  else set src to the data-still value
console.log("animated image works");
$(this).attr('src', $(this).data('still'))
.data('state', 'still');               
}
});
});