
$(document).ready(function() {
	react_to_window();
});

var stellarActivated= false;
$(window).resize(function() {
	react_to_window();
});

function react_to_window() {
	if ($(window).width() <=992) {
		if (stellarActivated == true) {
			$(window).data('plugin_stellar').destroy();
			stellarActivated = false;
			}
		} else {
			if (stellarActivated == false) {
					$.stellar({
						horizontalScrolling: false,
						verticalOffset: 0,
						horizontalOffset: 0,
						hideDistantElements: false
	  				});
					$(window).data('plugin_stellar').init();
					stellarActivated = true;
			}
		}
}

$(function() {
  $('a').smoothScroll(900);
});

(function($) {
  $(function() {
    $('.toggle-overlay').click(function() {
      $('aside').toggleClass('open');
    });
  });
})(jQuery);

  // Look for .hamburger
  var hamburger = document.querySelector(".hamburger");
  // On click
  hamburger.addEventListener("click", function() {
    // Toggle class "is-active"
    hamburger.classList.toggle("is-active");
    // Do something else, like open/close menu
  });
  
  $(window).scroll(function() {
	var windscroll = $(window).scrollTop();
  	if (windscroll >= $("#intro").height()-50){
      $('.hamburger-inner').addClass('violet');
    }
  	else {
  		$('.hamburger-inner').removeClass('violet');
	}   
});  