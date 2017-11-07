/* ============================================================

                                      HOME DATE FUNCTION
============================================================ */
// Get today's date and display it to the #today html element
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
var today = document.getElementById("today"); 

var d = new Date();
today.innerHTML = monthNames[d.getMonth()] + " " + d.getDate();

/* ============================================================

                                      TRANSITIONS
============================================================ */
var flightDraw = document.getElementById('flightDraw');

/* ============================================================

                                      TOUCH HANDLER
============================================================ */
// DOM elements
var shapes = document.getElementsByClassName("shape");
var sounds = document.getElementsByClassName("sound");
var titles = document.getElementsByClassName("title");
var home = document.getElementById("home");

// Variables
var _lastUpdate;
var _activeShape = false;
var _currentShape;

/* ============================================================

                                      FLIGHTS
============================================================ */

$('#flights').bind('touchstart', function(e) {
  e.preventDefault();
  _lastUpdate = Date.now();

  $('.distance').addClass('animateDistance'); 
  $('.sleep').addClass('animateSleep'); 
  $('.steps').addClass('animateSteps'); 
  $('.bottom-bar').addClass('animateToday');
  $('.title').addClass('animateTitle');

  divMouseDown = setTimeout(function() {
    _activeShape = true; 
    _currentShape = "flights";
  }, 600);
}); 

$('.home-section').bind('touchmove', function(e) {
  if (_activeShape && _currentShape === "flights") {
    $('#flights').addClass('activeShape');
    $("#flights").css({
      "top": e.pageY - 75 + "px",
      "left": e.pageX - 75 + "px",
    })
  }

  if (_activeShape && _currentShape === "steps") {
    $('#steps').addClass('activeShape');
    $("#steps").css({
      "top": e.pageY - 75 + "px",
      "left": e.pageX - 75 + "px",
    })
  }

  if (_activeShape && _currentShape === "sleep") {
    $('#sleep').addClass('activeShape');
    $("#sleep").css({
      "top": e.pageY - 75 + "px",
      "left": e.pageX - 75 + "px",
    })
  }

  if (_activeShape && _currentShape === "distance") {
    $('#distance').addClass('activeShape');
    $("#distance").css({
      "top": e.pageY - 75 + "px",
      "left": e.pageX - 75 + "px",
    })
  }
})

$('#flights').bind('touchend', function() {
  _activeShape = false;
  $('.distance').removeClass('animateDistance'); 
  $('.sleep').removeClass('animateSleep'); 
  $('.steps').removeClass('animateSteps'); 
  $('.bottom-bar').removeClass('animateToday');
  $('.title').removeClass('animateTitle');
  $('#flights').removeAttr('style');
  $('#flights').removeClass('activeShape');
  clearTimeout(divMouseDown);
})


/* ============================================================

                                      DISTANCE
============================================================ */
$('#distance').bind('touchstart', function(e) {
  e.preventDefault();
  _lastUpdate = Date.now();

  $('.flights').addClass('animateFlights'); 
  $('.sleep').addClass('animateSleep'); 
  $('.steps').addClass('animateSteps'); 
  $('.bottom-bar').addClass('animateToday');
  $('.title').addClass('animateTitle');

  divMouseDown = setTimeout(function() {
    _activeShape = true; 
    _currentShape = "distance" 
  }, 600);
}); 


$('#distance').bind('touchend', function() {
  _activeShape = false;
  $('.flights').removeClass('animateFlights'); 
  $('.sleep').removeClass('animateSleep'); 
  $('.steps').removeClass('animateSteps'); 
  $('.bottom-bar').removeClass('animateToday');
  $('.title').removeClass('animateTitle');
  $('#distance').removeAttr('style');
  $('#distance').removeClass('activeShape').animate();
  clearTimeout(divMouseDown);
})

/* ============================================================

                                      STEPS
============================================================ */

$('#steps').bind('touchstart', function(e) {
  e.preventDefault();
  _lastUpdate = Date.now();

  $('.distance').addClass('animateDistance'); 
  $('.sleep').addClass('animateSleep'); 
  $('.flights').addClass('animateFlights'); 
  $('.bottom-bar').addClass('animateToday');
  $('.title').addClass('animateTitle');

  divMouseDown = setTimeout(function() {
    _activeShape = true; 
    _currentShape = "steps";
  }, 600);
}); 

$('#steps').bind('touchend', function() {
  _activeShape = false;
  $('.distance').removeClass('animateDistance'); 
  $('.sleep').removeClass('animateSleep'); 
  $('.flights').removeClass('animateFlights'); 
  $('.bottom-bar').removeClass('animateToday');
  $('.title').removeClass('animateTitle');
  $('#steps').removeAttr('style');
  $('#steps').removeClass('activeShape');
  clearTimeout(divMouseDown);
})

/* ============================================================

                                      SLEEP
============================================================ */

$('#sleep').bind('touchstart', function(e) {
  e.preventDefault();
  _lastUpdate = Date.now();

  $('.distance').addClass('animateDistance'); 
  $('.flights').addClass('animateFlights'); 
  $('.steps').addClass('animateSteps'); 
  $('.bottom-bar').addClass('animateToday');
  $('.title').addClass('animateTitle');

  divMouseDown = setTimeout(function() {
    _activeShape = true; 
    _currentShape = "sleep";
  }, 600);
}); 


$('#sleep').bind('touchend', function() {
  _activeShape = false;
  $('.distance').removeClass('animateDistance'); 
  $('.flights').removeClass('animateFlights'); 
  $('.steps').removeClass('animateSteps'); 
  $('.bottom-bar').removeClass('animateToday');
  $('.title').removeClass('animateTitle');
  $('#sleep').removeAttr('style');
  $('#sleep').removeClass('activeShape');
  clearTimeout(divMouseDown);
})





















