/* ============================================================

                                      Touch event handlers for mobile
============================================================ */
var homeArea = document.getElementById("home");
var canvas = document.getElementById("flights-draw-area"); 
canvas.width = window.innerWidth; 
canvas.height = window.innerHeight; 
var ctx = canvas.getContext("2d"); 

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

  _startX: 0,
  _startY: 0,

  _lastX: 0,
  _lastY: 0,

  _distanceX: 0,
  _distanceY: 0,

  _currentTool: document.getElementById('flightShape'),
  _toolX: 100, 
  _toolY: 100,
  _drawDelay: false,
  _activeShape: false,

  initialize: function() {
    this.bindEvents(); 
  }, 

  bindEvents: function() {
    canvas.addEventListener('touchstart', this.onTouchStart.bind(this), false); 
    home.addEventListener('touchmove', this.onTouchMove.bind(this), false); 
    canvas.addEventListener('touchend', this.onTouchEnd.bind(this), false); 
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

    this._distanceX += distanceX; 
    this._distanceY += distanceY;

    this._lastX = event.pageX; 
    this._lastY = event.pageY;

    // Draw Image
    if(_activeShape && _currentShape === "distance") {
      new Particle(event.pageX, event.pageY);
    } else if (_activeShape) {
      ctx.beginPath(); 
      ctx.drawImage(this._currentTool, event.pageX - this._toolX/2, event.pageY - this._toolY/2, this._toolX, this._toolY);
      ctx.closePath(); 
      ctx.fill();
    } 
    
  }, 

  onTouchEnd: function(event) {
  },

  onTouchTap: function(event) {
    // Draw Image
    ctx.beginPath(); 
    ctx.drawImage(this._currentTool, event.pageX - this._toolX/2, event.pageY - this._toolY/2, this._toolX, this._toolY);
    ctx.closePath(); 
    ctx.fill();
  }
}

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  TouchEventHandlers.initialize();
} else {
  WebTouchEventHandlers.initialize();
}








var particles = {},
particleIndex = 0,
settings = {
  density: 5,
  particleSize: 3,
  startingX: canvas.width / 2,
  startingY: canvas.height / 4,
  gravity: 0.5
};


function Particle(_x, _y) {
  // Establish starting positions and velocities
  this.x = _x;
  this.y = _y;

  // Determine original X-axis speed based on setting limitation
  this.vx = Math.random() * 20 - 10;
  this.vy = Math.random() * 20 - 5;

  // Add new particle to the index
  // Object used as it's simpler to manage that an array
  particleIndex ++;
  particles[particleIndex] = this;
  this.id = particleIndex;
  this.life = 0;
  this.maxLife = 100;
}

// Some prototype methods for the particle's "draw" function
Particle.prototype.draw = function() {
  this.x += this.vx;
  this.y += this.vy;

  // Adjust for gravity
  this.vy += settings.gravity;

  // Age the particle
  this.life++;

  // If Particle is old, it goes in the chamber for renewal
  if (this.life >= 20) {
    delete particles[this.id];
  }

  // Create the shapes
  ctx.clearRect(settings.leftWall, settings.groundLevel, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.fillStyle="#ffffff";
  // Draws a circle of radius 20 at the coordinates 100,100 on the canvas
  ctx.arc(this.x, this.y, settings.particleSize, 0, Math.PI*2, true); 
  ctx.closePath();
  ctx.fill();
}


setInterval(function() {
  for (var i in particles) {
    particles[i].draw();
  }
}, 30);





































