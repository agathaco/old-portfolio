
	
$(document).ready(function(){
	$('.is-right').insertBefore('.is-left');
  });

if ($(window).width() > 768) {
	$.stellar({
		horizontalScrolling: false,
		verticalOffset: 0,
		horizontalOffset: 0,
		hideDistantElements: false
	  });
}


$(document).ready(function() {
	react_to_window();
});

var stellarActivated= false;
$(window).resize(function() {
	react_to_window();
});

function react_to_window() {
	if ($(window).width() <=768) {
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