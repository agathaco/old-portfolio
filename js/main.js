
(function($) { 
  /*
  * Plugin defaults 
  */
  var defaults = {
    particles : [],
    total : 18,
    ofTop: 0,
    ofLeft: 0,
    on:'document.body',
    //twinkle: 0.2
  };
  
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

  /*
  * Public Functions
  */

  $.firefly.createparticles = function(img){
    var spark = $('<figure></figure>').addClass('particle '+img).hide()
      $(document.body).append(spark);
       return spark.css({
                    //'position':'absolute',
                    //'z-index': -1*$.firefly.random(20), //under all the stuff
                  y: ($.firefly.offsetTop + $.firefly.random(($.firefly.eleHeight-50))),  //offsets
                  x: ($.firefly.offsetLeft + $.firefly.random(($.firefly.eleWidth-50))) //offsets
                  }).show();
        }
  }
  


  $.firefly.fly = function(sp) {
      $(sp).animate({
        'top': ($.firefly.offsetTop + $.firefly.random(($.firefly.eleHeight-50))),  //offsets
        'left': ($.firefly.offsetLeft + $.firefly.random(($.firefly.eleWidth-50)))
      }, $.firefly.randomSpeed(65000,70000),'linear',function(){  $.firefly.fly(sp) } );
  };

  $.firefly.stop = function(sp) {
    $(sp).stop();
  };

  $.firefly.random = function(max) {
    return Math.ceil(Math.random() * max) - 1;
  }
  $.firefly.randomSpeed = function(min,max) {
    return Math.ceil(Math.random() * (max - min) + min);
  }
  // set twinkle.
  $.firefly.opacity = function(min)
  {
          op= Math.random();
          if(op < min)
                  return 0;
          else
                  return 1;
  }   
})(jQuery);

  $.firefly({
    particles : [
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
      'p-18'],
    total : 18,
    on: '.hero'
  });
  

    
   
  



 
      function animate() {
        // if the animation is not 100% then request another frame

        if (percent < 100) {
          requestAnimationFrame(animate);
        }

        // redraw all guages with the current percent
        drawAll(percent);

      }
      
      $(target).parent().find('.circle__percentile-text').html(percent+'<span>%</span>');
      $(target).parent().find('.circle__percentile-fill').height(percent+'%');
      animate();
      
    } else {
  
      var ctx;
      var quart = Math.PI / 2;
      var PI2 = Math.PI * 2;
      var percent = 0;
      
      var guages = [];
      
      guages.push({
          x: 76,
          y: 76, 
          radius: 74,
          start: 0,
          end: 100,
          color: "blue"
      });

      var canvas = $(target)[0];
      
      ctx = canvas.getContext("2d");

      function drawAll(percent) {
        // clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // draw all the guages

        for (var i = 0; i < guages.length; i++) {
          render(guages[i], percent);
        }
      }


      function animate() {
        // if the animation is not 100% then request another frame

        if (percent < 100) {
          requestAnimationFrame(animate);
        }

        // redraw all guages with the current percent
        drawAll(percent);

      }
      
      var i = 0;
      function f() {
        percent++;
        
        $(target).parent().find('.circle__percentile-text').html(percent+'<span>%</span>');
        $(target).parent().find('.circle__percentile-fill').height(percent+'%');
        animate();
        
        if(i === progress-1){
          countChartBool[target] = true;
          if (callback && typeof(callback) === "function") {
            callback();
          }
        }
        
        i++;
        if( i < progress ){
          setTimeout( f, (800/progress));
        }
      }
      f();
        
    }
   
  }
  
  
 