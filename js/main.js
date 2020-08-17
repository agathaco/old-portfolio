var canvas = document.querySelector("canvas");
var header = document.querySelector("header");
var c = canvas.getContext("2d");

canvas.height = header.offsetHeight * 1.5;
canvas.width = header.offsetWidth;

var numParticles = 80;

var colorArray = [
    "#FFED89",
    "#F4B677",
    "#F296AB",
    "#D962DB",
    "#858CDD",
    "#14B4D1"
];

window.addEventListener("resize", function() {
    canvas.height = header.offsetHeight * 2;
    canvas.width = header.offsetWidth;
    init();
});

function Circle(x, y, dx, dy, r) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.minRadius = r;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.opacity = Math.random().toFixed(1) - 0.1;
    this.blur = Math.floor(Math.random() * 10)
    this.draw = function() {
        c.beginPath();
        c.globalAlpha = this.opacity; // random opacity
        c.fillStyle = this.color;
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        c.fill();

    };
    this.update = function() {
        if (this.x + this.r > innerWidth || this.x - this.r < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.r > innerHeight || this.y - this.r < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    };
}

var circleArray = [];

function init() {
    circleArray = [];
    for (var i = 1; i < numParticles; i++) {
        var r = Math.random() * 8;
        var x = Math.random() * (window.innerWidth - r * 2) + r;
        var y = Math.random() * (window.innerHeight - r * 2) + r;
        var dx = (Math.random() - 0.5) * 0.6;
        var dy = (Math.random() - 0.5) * 0.6;
        circleArray.push(new Circle(x, y, dx, dy, r));
    }
}
init();

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 1; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

animate();

$(function() {
    $('#contactform').parsley();
});


// $(function() {
//   $('.toggle-overlay').click(function() {
//     $('aside').toggleClass('open');
//   });
//   $('aside a').click(function() {
//     $('aside').removeClass('open');
//     $('button.hamburger').removeClass('is-active');
//   });
// // Look for .hamburger
// var hamburger = document.querySelector(".hamburger");
// // On click
// hamburger.addEventListener("click", function() {
//   // Toggle class "is-active"
//   hamburger.classList.toggle("is-active");
//   // Do something else, like open/close menu
// });
//  });


// $('#about, #work').waypoint(function(direction) {
//  if (direction === 'down') {
//    $('.hamburger-inner').addClass('violet');
//    } else if (direction === 'up') {
//      $('.hamburger-inner').removeClass('violet');
//    }
// }, {     offset: '0',
//      triggerOnce: false
//    });

// $('#intro, #skills, #contact').waypoint(function(direction) {
//  if (direction === 'down') {
//    $('.hamburger-inner').removeClass('violet');
//  } else if (direction === 'up'){
//    $('.hamburger-inner').addClass('violet');
//  }
// }, {
//    offset: '0',
//    triggerOnce: false
// });


//Get the modal
var modal = document.getElementById('myModal');
var modalcontent = $(".modal-content");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    location.reload();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modalcontent) {
        modal.style.display = "none";
        location.reload();
    }
}

var $contactForm = $('#contactform');
$contactForm.submit(function(e) {
    e.preventDefault();
    $.ajax({
        url: '//formspree.io/hello@agathecocco.com',
        method: 'POST',
        data: $(this).serialize(),
        dataType: 'json',
        success: function(data) {

            //$contactForm.append('<p>Thanks for your email. I will be in touch shortly.</p>');
            modal.style.display = "table";

        }
    });
});