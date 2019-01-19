

$(document).ready(function(){

//initial array 
var colors = ["red", "coral", "lime green", "gold", "blue", "honeydew", "heliotrope", "magenta", "cyan", "seaweed", "turquoise", "violet-red", "pink", "yellow", "orchid", "aquamarine", "mint", "beige", "rose", "silver", "mustard", "amethyst", "burgundy", "carrot", "chartreuse", "cinnabar", "grey", "cotton candy", "salmon", "champange", "denim", "indigo", "lavender"]
GIFArea = " "
	
//button

function renderButtons() {
	
$("#colors-view").empty();
for (var i=0; i < colors.length; i++) {
var a = $('<button>');
a.addClass('color');
a.attr('data-name', colors[i]);
a.text(colors[i]);

//adding the button the html
$("#colors-view").append(a);
}
s=
$("#color-input").focus();
}
renderButtons();
	
//BUTTON 
$("#add-color").on('click', function() {
event.preventDefault();
var color = $("#color-input").val().trim();

colors.push(color);
	renderButtons();	
});
	
//DISPLAY INFO
$(document).on('click', 'button',  function() {
$('#GIFArea').empty(); 
var b = $(this).attr('data-name');		
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + b + "&api_key=dc6zaTOxFJmzC&limit=12";  
console.log(queryURL); 
	
$.ajax({
url: queryURL,
method: 'GET'
})

.done(function(response) {
console.log(response);

var results = response.data;
    for (var i = 0; i < results.length; i++) {
var gifDiv = $('<div class="item">');
var rating = results[i].rating;
var r = $('<p>').text("rating: " + rating);
var gifImage = $('<img>');

gifImage.attr('src', results[i].images.fixed_height_still.url)
.attr('data-still', results[i].images.fixed_height_still.url)
.attr('data-animate', results[i].images.fixed_height.url)
.attr('data-state', "still")
.addClass("showImage");

//rating & image
gifDiv.append(r)
.append(gifImage);	                    
	
$('#GIFArea').prepend(gifDiv);
}
	
});
});
	
//GIF STOP AND GO

$(document).on('click', '.showImage',  function() {
var state = $(this).data('state');

if (state == "still") {
console.log("still image works");

$(this).attr('src', $(this).data('animate'))
.data('state', 'animate');
} else {
			
console.log("animated image works");
$(this).attr('src', $(this).data('still'))
.data('state', 'still');               
}
});
});