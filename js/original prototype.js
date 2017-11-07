/* ============================================================

                                      TRANSITIONS
============================================================ */
var home = document.getElementById('home'); 
var draw = document.getElementById('draw'); 
var breakdown = document.getElementById('breakdown');
var transitionCircle = document.getElementById('transition-circle');

var drawButton = document.getElementById('draw-button');
drawButton.addEventListener('click', function(e) {
  e.preventDefault();
  draw.className = 'show-draw-section draw-section'
});

var exitButton = document.getElementById('exit'); 
exitButton.addEventListener('click', function(e) {
  e.preventDefault();
  draw.className = 'draw-section';
  ctx.clearRect(0, 0, canvas.width, canvas.height); 
});

// SHOWING THE BREAKDOWN 
var scene = document.getElementById('scene'); 
scene.addEventListener('click', function(e) {
  e.preventDefault(); 
  setTimeout( function() {
    breakdown.className = "breakdown-section show-breakdown-section";
  }, 200 );
  transitionCircle.className = "show-circle transition-circle";
})

// CLOSE THE BREAKDOWN 
var clsoeBreakdown = document.getElementById('close-breakdown'); 
clsoeBreakdown.addEventListener('click', function(e) {
  e.preventDefault(); 
  transitionCircle.className = "transition-circle";
  setTimeout( function() {
    breakdown.className = "breakdown-section";
  }, 200 );
})

// OPEN BREAKDOWN WITH FINISH
var breakdownFinish = document.getElementById('finish-info'); 
breakdownFinish.addEventListener('click', function(e) {
  e.preventDefault(); 
  setTimeout( function() {
    breakdown.className = "breakdown-section show-breakdown-section";
  }, 200 );
  transitionCircle.className = "show-circle transition-circle";
})

/* ============================================================

                                      HOME DATE FUNCTION
============================================================ */
// Get today's date and display it to the #today html element
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
var today = document.getElementById("today"); 
var todayUpdate = document.getElementById("today-update"); 

var d = new Date();
today.innerHTML = monthNames[d.getMonth()] + " " + d.getDate();
todayUpdate.innerHTML = monthNames[d.getMonth()] + " " + d.getDate();

/* ============================================================

                                      Touch event handlers
============================================================ */
var canvas = document.getElementById("draw-area"); 
canvas.width = window.innerWidth; 
canvas.height = window.innerHeight; 
var ctx = canvas.getContext("2d"); 
var undoButton = document.getElementById('undo');

var TouchEventHandlers = {
  _touch: false,
  _quickTap: false,
  _lastUpdate: undefined,

  _startX: 0,
  _startY: 0,

  _lastX: 0,
  _lastY: 0,

  _distanceX: 0,
  _distanceY: 0,

  _currentTool: document.getElementById('steps'),
  _toolX: 145, 
  _toolY: 145,
  _drawDelay: false,

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
    canvas.addEventListener('click', this.onTouchTap.bind(this), false);
    undoButton.addEventListener('click', this.cUndo.bind(this), false);
  }, 

  cPush: function() {
    this._cStep++; 
    if (this._cStep < this._cPushArray.length) {
      cPushArray.length = cStep; 
    }
    this._cPushArray.push(document.getElementById('draw-area').toDataURL());
  },

  cUndo: function() {
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
    // hide side bar on touch
    var sidebar = document.getElementById('side-bar');
    sidebar.className = 'side-bar hide-bar';
    var exit = document.getElementById('exit');
    exit.className = 'exit hide-exit';

    event.preventDefault();
    event.stopPropagation();
    var distanceX = Math.abs(this._lastX - event.pageX);
    var distanceY = Math.abs(this._lastY - event.pageY);

    // If it's just a circle image
    if (this._drawDelay) {
      if (distanceX > 50 || distanceY > 50) {
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
    // show side bar on touch end
    var sidebar = document.getElementById('side-bar');
    sidebar.className = 'side-bar';
    var exit = document.getElementById('exit');
    exit.className = 'exit';
    this.cPush();
  },

  onTouchTap: function(event) {
    // Draw Image
    ctx.beginPath(); 
    ctx.drawImage(this._currentTool, event.pageX - this._toolX/2, event.pageY - this._toolY/2, this._toolX, this._toolY);
    ctx.closePath(); 
    ctx.fill();
    this.cPush();
  }
}

/* ============================================================

                                      Side Bar Logic
============================================================ */
var shapes = document.getElementsByClassName("shape"); 
var currentTool = 'shape1';

// Tool changer logic
for (var i = 0; i < shapes.length; i++) {
  shapes[i].addEventListener('click', function(e) {
    var current = document.getElementById(currentTool); 
    current.className = 'shape';
    this.className += ' active-tool';
    currentTool = this.getAttribute('id');
    TouchEventHandlers._currentTool = document.getElementById(this.getAttribute('data-img'));
    TouchEventHandlers._toolX = this.getAttribute('data-x'); 
    TouchEventHandlers._toolY = this.getAttribute('data-y');
    TouchEventHandlers._drawDelay = JSON.parse(this.getAttribute('data-delay'));
  });
}

TouchEventHandlers.initialize();


/* ============================================================

                                      FINISH DRAWING
============================================================ */
var finalDrawing; 
var finishButton = document.getElementById('finish');
var homeFinish = document.getElementById('home-finish')

finishButton.addEventListener('click', function(e) {
  e.preventDefault(); 
  finalDrawing = document.getElementById('draw-area').toDataURL();
  homeFinish.className = 'home-finish show-home-finish'
  draw.className = 'draw-section';
  home.className = 'hide-home-section home-section';

  homeFinish.style.backgroundImage = "url(" + finalDrawing +")";
}); 



var scene = document.getElementById('scene');
var parallax = new Parallax(scene);






















