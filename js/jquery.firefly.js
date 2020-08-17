/*
 * FireFly v1.1.1 - jQuery plugin
 *
 * An updated version of Dharmveer Motyar's firefly plugin.
 * Creates an effect of fireflys flying around your page.
 *
 * @example  $.firefly()
 *
 *           // to stop and start
 *           $.firefly.stop()
 *           $.firefly.start()
 *
 * Copyright © 2011 Matt 'Dirty Monkey' Stevens, http://www.dirtymonkey.co.uk
 * License: http://www.opensource.org/licenses/mit-license.php
 */
(function($){
    /*
     * default settings
     */
    var defaults = {
		
        // base64 encoded to cut down requests,
        // doesn't work in IE <= 7.0 and I'm not bothered to be honest
        images: [  
      'p-1',
      'p-2',
      'p-3',
      'p-4',
      'p-5',
      'p-6',
      'p-7',
      'p-8',
      'p-9',
      'p-10',
      'p-11',
      'p-12',
      'p-13',
      'p-14',
      'p-15',
      'p-16',
      'p-17',
      'p-18',
       ],
        total:   25,   // anything over a few hundred is gonna crawl
        boundary: 70,  // avoid the edge of the window
        fast:     30,    // fastest spark (a lower number is faster)
        slow:     30,    // slowest spark (a higher number is slower)
        limit:    3600, // stop after this many seconds (one hour)
    }

  $.firefly = function(settings) {
    $.firefly.settings = $.extend({}, defaults, settings);
    $.firefly.eleHeight = $($.firefly.settings.on).height();
    $.firefly.eleWidth = $($.firefly.settings.on).width();
    if($.firefly.settings.on!=='document.body'){
      var off = $($.firefly.settings.on).offset();
      $.firefly.offsetTop = off.top;
      $.firefly.offsetLeft = off.left;
      $.firefly.eleHeight = $($.firefly.settings.on).height();
      $.firefly.eleWidth = $($.firefly.settings.on).width();
    }
    else{
      $.firefly.offsetTop = 0;
      $.firefly.offsetLeft = 0;
      $.firefly.eleHeight = $(document.body).height();
      $.firefly.eleWidth = $(document.body).width();

    }

     for (var i = 0; i < $.firefly.settings.total; i++){
       $.firefly.fly($.firefly.create($.firefly.settings.particles[i]));
    }
    return;
  };

    // shortcuts
    var ff, ffs, x, y, old_x, old_y, start, timer_handle, delay_handle, sparks = []


    // init
    // initializes and starts everything
    $.firefly = function(settings){
        ff = $.firefly
        ffs = $.extend({}, defaults, settings)
        ff.calibrate()  // get size of window
        ff.make()       // load the spark images
        ff.start()      // start moving them
        ff.check_time() // start timer
    }


    // create
    // creates every spark and inserts it into the DOM
    $.firefly.make = function(){
        for (i = 0; i < ffs.total; i++)
            sparks[i] = ff.create(ffs.images[ff.random(0,ffs.images.length-1)])
    }


    // start
    // records start time, watches window resize and begins movement
    $.firefly.start = function(){
        start = parseInt((new Date).getTime()/1000)
        $(window).bind('resize.firefly', function(){
            ff.delay(ff.resized, 250)
        })
        for (i = 0; i < sparks.length; i++) ff.move(sparks[i])
    }


    // reset
    // stop and remove all fireflies, then create and start them again
    $.firefly.reset = function(){
        for (i = 0; i < ffs.total; i++)
            sparks[i].remove()

        $.firefly()
    }


    // delay
    // utility function to prevent the resize event from being fired multiple times
    $.firefly.delay = function(callback, milliseconds){
        clearTimeout(delay_handle)
        delay_handle = setTimeout(callback, milliseconds);
    }


    // resized
    // event handler to deal with window resizing
    $.firefly.resized = function(e){
        ff.calibrate();
        (x < old_x || y < old_y) && ff.reset()
    }


    // stop
    // freezes a spark in its current position
    $.firefly.stop = function(){
        $(window).unbind('resize.firefly')
        for (i = 0; i < sparks.length; i++) $(sparks[i]).stop(true)
    }


    // remove
    // removes a spark from the DOM
    $.firefly.remove = function() {
        for (i = 0; i < ffs.total; i++) $('img[src="'+ffs.images[i]+'"]').remove();
    }


    // create
    // inserts a spark into the DOM at a random position

	    $.firefly.create = function(img){
         var spark = $('<figure></figure>').addClass('particle ' +img).hide()
        $("header").append(spark)

        spark.css({'position': 'absolute',
                    'z-index':  ff.random(0, 25),
                    'top':      ff.random(ffs.boundary, y - ffs.boundary),
                    'left':     ff.random(ffs.boundary, x - ffs.boundary)
                    })

        return spark.show()
    }
 

    // move
    // animate to a random position, within the boundaries
    $.firefly.move = function(image){
        image.animate({top:  ff.random(ffs.boundary,y-ffs.boundary),  // x coordinate
                       left: ff.random(ffs.boundary,x-ffs.boundary)}, // y coordinate
                       ff.random(ffs.slow,ffs.fast) * 1000,           // speed
                       function(){ff.move(image)})                    // callback
    }


    // check_time
    // check every second whether or not we have passed the time limit
    $.firefly.check_time = function(){
        if (parseInt((new Date).getTime()/1000) > (start+ffs.limit)) {
            ff.stop()
        } else {
            window.setTimeout('$.firefly.check_time()', 1000)
        }
    }


    // calibrate
    // get the dimensions of the window
    $.firefly.calibrate = function(){
        old_x = x
        old_y = y

        x = $(window).width()
        y = $(window).height()
    }


    // random
    // return a random number between a and b
    $.firefly.random = function(a,b){
        return Math.floor(Math.random()*(b-a+1)+a)
    }
})(jQuery)
