$(function() { 
  // Initialize variables
  var $window = $(window);
  var $button = $('button');
  var $nameSearch = $('#nameSearch');
  var $tagSearch = $('#tagSearch');
  var $list = $("#list");
  var $mainPage = $('.main.page');
  var users;
  var albums;
  var photos;
  var enterKey = jQuery.Event("keydown");
  //enterKey.which = 13; //Enter key
  
  function avg(arr){
    return arr.reduce((a,b) => a + b, 0) / arr.length
  }

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
  }

  $.fn.extend({
    toggleText: function(a, b){
        return this.text(this.text() == b ? a : b);
    }
   });

  $nameSearch.on('input',function(){
        var matcher = new RegExp($(this).val(), 'gi');
        $('.listItem').show().not(function(){
            return matcher.test($(this).find('.name').text())
        }).hide();
  })

  $mainPage.show();

  $.when(
    $.getJSON("https://jsonplaceholder.typicode.com/users", function(data) {
		users = data;
    }),
    $.getJSON("https://jsonplaceholder.typicode.com/albums", function(data) {
        albums = data;
    }),
    $.getJSON("https://jsonplaceholder.typicode.com/photos", function(data) {
        photos = data;
    })
  ).then(function() {
    if (users && albums && photos) {
	  for (var i = 0; i < users.length; i++) {
		$list.append("<div class=listItem id='" + users[i].id + "'>" +
                                  "<img src=images/image"+ getRandomIntInclusive(1, 7) +".png height=100% width=10%>" +
                                  "<b class=name style=font-size:250%>" + users[i].username + "</b>" +
                                  "<ul class=expandIcon display=inline-block style=float:right style=position:absolute style=font-size:200%>+</ul>" +
                                  "<ul align=justify>"+ "Email: " + users[i].email+"</ul>" +
                                  "<ul align=justify>" + "id: " + users[i].id +"</ul></div>"+ 
                                  "<div class=expand></div>");
                
	  }         

          $(".expand").slideToggle("slow");


          $(".listItem").click(function(){
          	    $(".username").remove();
          		$(".albumInfo").remove();
               	$(this).next().toggle("slow");
               	$(this).find(".expandIcon").toggleText('+', '-');
				$(this).next().append("<h1 class=username> " + users[this.id - 1].username + "'s albums</h1>");
				$(this).next().append("<div class=albumInfo></div>");
				for (var i = 0; i < albums.length; i++) {
					if(albums[i].userId === parseInt($(this).attr('id')) ){
						$(this).next().children().eq(1).append("<div class=albumInfoItem style=background-image:url(" + photos[albums[i].userId].url+ ")>" +
																	"<p class=albumTitle> " + albums[i].title + "</p>" +
																"</div>");

					}
				}
          });
          
          $('.inputTag').keypress(function (e) {
               if(e.which ==13){
                  $(this).prev().append("<a class=tag font-size; > "+ $(this).val() +" </a>");   
                  $(this).val("");
               }
          });

    }
    else {
	console.log("Error JSON file not found");
    }
    
   });
});


