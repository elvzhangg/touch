

/* ============================================================

                                      Touch event handlers for mobile
============================================================ */
var onboard = document.getElementById("onboard");
var canvas = document.getElementById("flights-draw-area"); 
canvas.width = window.innerWidth; 
canvas.height = window.innerHeight; 
var ctx = canvas.getContext("2d"); 
var undoButton = document.getElementById('undo');

_startTime = _lastTime = performance.now();
animate();
function animate(currentTime) {
  requestAnimationFrame(animate); 
  ctx 
}

var TouchEventHandlers = {
  _touch: false,
  _quickTap: false,
  _lastUpdate: undefined,
  _undoStart: 0, 
  _tapStart: 0,

  _startX: 0,
  _startY: 0,

  _lastX: 0,
  _lastY: 0,

  _distanceX: 0,
  _distanceY: 0,

  _currentTool: document.getElementById('allShape'),
  _toolX: 200, 
  _toolY: 200,
  _drawDelay: true,
  _activeShape: false,

  _cPushArray: [],
  _cStep: -1,

  initialize: function() {
    this.bindEvents(); 
    this.cPush();
  }, 

  bindEvents: function() {
    canvas.addEventListener('touchstart', this.onTouchStart.bind(this), false); 
    canvas.addEventListener('touchmove', this.onTouchMove.bind(this), false); 
    canvas.addEventListener('touchend', this.onTouchEnd.bind(this), false); 
    canvas.addEventListener('touchstart', this.onTouchTap.bind(this), false);
    canvas.addEventListener('touchend', this.onTouchTapEnd.bind(this), false);
    undoButton.addEventListener('touchstart', this.cUndo.bind(this), false);
    undoButton.addEventListener('touchend', this.cUndoEnd.bind(this), false);
  },

  cPush: function() {
    this._cStep++; 
    if (this._cStep < this._cPushArray.length) {
      this._cPushArray.length = this._cStep; 
    }
    this._cPushArray.push(document.getElementById('flights-draw-area').toDataURL());
  },

  cUndo: function(e) {
    e.preventDefault(); 
    this._undoStart = Date.now();
  },

  cUndoEnd: function(e) {
    e.preventDefault();
    if (Date.now() - this._undoStart < 300) {
      if (this._cStep > 0) {
        this._cStep--; 
        var canvasPic = new Image(); 
        canvasPic.src = this._cPushArray[this._cStep]; 
        canvasPic.onload = function() {
          ctx.clearRect(0, 0, canvas.width, canvas.height); 
          ctx.drawImage(canvasPic, 0, 0); 
        }
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
      }
    }
  },

  onTouchStart: function(event) {
    this._touch = true;
    this._lastUpdate = Date.now();

    this._distanceX = 0; 
    this._distanceY = 0; 

    this._startX = event.pageX;
    this._startY = event.pageY;

    this._lastX = event.pageX; 
    this._lastY = event.pageY;

  }, 

  onTouchMove: function(event) {
    event.preventDefault();
    event.stopPropagation();
    var distanceX = Math.abs(this._lastX - event.pageX);
    var distanceY = Math.abs(this._lastY - event.pageY);

    $("#onboard").addClass('fadeOut');
    $(".infoBtn").addClass('fadeIn');
    $(".undoBtn, .toolBtn").addClass('fadeIn');
    // Draw Image
    if (this._drawDelay) {
      if (distanceX > 2 || distanceY > 2) {
        this._lastX = event.pageX; 
        this._lastY = event.pageY;
        // Draw Image
        ctx.beginPath(); 
        ctx.drawImage(this._currentTool, event.pageX - this._toolX/2, event.pageY - this._toolY/2, this._toolX, this._toolY);
        ctx.closePath(); 
        ctx.fill();
      } else {
        this._distanceX += distanceX; 
        this._distanceY += distanceY;
      }
    } else {  // If it's a line image
      this._distanceX += distanceX; 
      this._distanceY += distanceY;

      this._lastX = event.pageX; 
      this._lastY = event.pageY;

      // Draw Image
      ctx.beginPath(); 
      ctx.drawImage(this._currentTool, event.pageX - this._toolX/2, event.pageY - this._toolY/2, this._toolX, this._toolY);
      ctx.closePath(); 
      ctx.fill();
    }
    
  }, 

  onTouchEnd: function(event) {
    this.cPush();
  },

  onTouchTap: function(event) {
    event.preventDefault();
    _tapStart = Date.now();
  }, 
  onTouchTapEnd: function(e) {
    e.preventDefault(); 
    if (Date.now() - _tapStart < 300) {
      // Draw Image
      ctx.beginPath(); 
      ctx.drawImage(this._currentTool, event.pageX - this._toolX/2, event.pageY - this._toolY/2, this._toolX, this._toolY);
      ctx.closePath(); 
      ctx.fill();
      this.cPush();
    }
  }
}

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  TouchEventHandlers.initialize();
} else {
  WebTouchEventHandlers.initialize();
}


/* ============================================================

                                      Breakdown Events
============================================================ */

var _startTime;
var _previousBreakdown = "stepsOnly";
$(".detailbtn").on("touchstart", function(e) {
  // e.preventDefault();
  _startTime = Date.now();
});

var _isMovingd = false; 
$('.detailbtn').on('touchmove', function(e) {
  _isMovingd = true;
})

$(".detailbtn").on("touchend", function(e) {
  e.preventDefault();
  if (Date.now() - _startTime < 300 && !_isMovingd) {
    $(".detailbtn").each(function() {
      $(this).removeClass("showBreakdownDetail");
    });
    $(this).addClass("showBreakdownDetail");
    
    $("." + _previousBreakdown).removeClass("showBreakdownImg");
    var img = $(this).data("img");
    $("." + img).addClass("showBreakdownImg");

    var data = $(this).data("health"); 
    $(".health-data").hide().html(data).fadeIn();

    _previousBreakdown = img;
  }

  _isMovingd = false;
});

var _startInfoTime;
$(".infoBtn").on("touchstart", function(e){
  e.preventDefault();
  _startInfoTime = Date.now();
}); 

$('.infoBtn').on('touchend', function(e) {
  if (Date.now() - _startInfoTime < 300) {
    $(".title").toggleClass("disableMouse");
    $(".infoBtn").toggleClass("infoBtnBackground");
    $(".openInfo").toggleClass("hideInfoIcon"); 
    $(".undoBtn, .toolBtn").toggleClass("fadeIn"); 
    $(".closeInfo").toggleClass("showInfoIcon"); 
    $('.breakdown').toggleClass('showBreakdown');
  }
})


var _toolBtnStart;
var tools = ['.all', '.stairs', '.steps', '.distance'];
var toolKit = [document.getElementById('allShape'), document.getElementById('stairsShape'), document.getElementById('stepsShape'), document.getElementById('distanceShape')];
var currentTool = 0;
$(".toolBtn").on("touchstart", function(e){
  e.preventDefault();
  _startInfoTime = Date.now();
}); 

$('.toolBtn').on('touchend', function(e) {
  if (Date.now() - _startInfoTime < 300) {
    $(tools[currentTool]).removeClass('activeTool'); 
    currentTool++; 
    if (currentTool > 3) {
      currentTool = 0; 
    }
    $(tools[currentTool]).addClass('activeTool');
    TouchEventHandlers._currentTool = toolKit[currentTool];
  }
})

/* ============================================================

                                      OPEN THE CALENDAR VIEW
============================================================ */
var _startGalleryTime;
$(".title").on("touchstart", function(e){
  e.preventDefault();
  _startInfoTime = Date.now();
}); 

var _openGallery = 0;
$('.title').on('touchend', function(e) {
  var img = document.getElementById('flights-draw-area').toDataURL();
  if (_openGallery % 2) {
    $(this).html("Today");
  } else {
    $(this).html("History");
  }
  _openGallery++;
  $('.todayDrawing').attr('src', img);
  $('#flights-draw-area').toggleClass('openGallery');
  $('.title').toggleClass('galleryTitle');
  $('body').toggleClass('galleryBody');
  $('.gallery').toggleClass('closeGallery');
  $('.galleryNav').toggleClass('closeGallery');
  $('.todayDrawingContainer').toggleClass('shrinkDrawing'); 
  $(".undoBtn, .toolBtn").toggleClass("fadeIn"); 
  $(".infoBtn").toggleClass("fadeIn");
});

var _healthToday;
$(".todaysHealth").on("touchstart", function(e){
  _healthToday = Date.now();
}); 

var _isMoving = false; 
$('.todaysHealth').on('touchmove', function(e) {
  _isMoving = true;
})

$('.todaysHealth').on('touchend', function(e) {
  if (Date.now() - _healthToday < 300 && !_isMoving) {
    if (_openGallery % 2) {
      $('.title').html("Today");
    } else {
      $('.title').html("History");
    }
    _openGallery++;
    $('#flights-draw-area').toggleClass('openGallery');
    $('.title').toggleClass('galleryTitle');
    $('body').toggleClass('galleryBody');
    $('.gallery').toggleClass('closeGallery');
    $('.galleryNav').toggleClass('closeGallery');
    $('.todayDrawingContainer').toggleClass('shrinkDrawing'); 
    $(".undoBtn, .toolBtn").toggleClass("fadeIn"); 
    $(".infoBtn").toggleClass("fadeIn");
  }
  _isMoving = false;
})

















