/* ============================================================

                                      Touch event handlers for mobile
============================================================ */
var distanceCanvas = document.getElementById("distance-draw-area"); 
distanceCanvas.width = window.innerWidth; 
distanceCanvas.height = window.innerHeight; 
var distanceCtx = distanceCanvas.getContext("2d"); 

var TouchEventHandlersDistance = {
  _touch: false,
  _quickTap: false,
  _lastUpdate: undefined,

  _startX: 0,
  _startY: 0,

  _lastX: 0,
  _lastY: 0,

  _distanceX: 0,
  _distanceY: 0,

  _currentTool: document.getElementById('distanceShape'),
  _toolX: 145, 
  _toolY: 145,
  _drawDelay: false,

  initialize: function() {
    this.bindEvents(); 
  }, 

  bindEvents: function() {
    distanceCanvas.addEventListener('touchstart', this.onTouchStart.bind(this), false); 
    distanceCanvas.addEventListener('touchmove', this.onTouchMove.bind(this), false); 
    distanceCanvas.addEventListener('touchend', this.onTouchEnd.bind(this), false); 
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
    if (_activeShape) {
      new Particle(event.pageX, event.pageY);
    }
  }, 

  onTouchEnd: function(event) {
  },

  onTouchTap: function(event) {
  }
}


TouchEventHandlersDistance.initialize();


var particles = {},
particleIndex = 0,
settings = {
  density: 5,
  particleSize: 5,
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
  distanceCtx.clearRect(settings.leftWall, settings.groundLevel, canvas.width, canvas.height);
  distanceCtx.beginPath();
  distanceCtx.fillStyle="#ffffff";
  // Draws a circle of radius 20 at the coordinates 100,100 on the canvas
  distanceCtx.arc(this.x, this.y, settings.particleSize, 0, Math.PI*2, true); 
  distanceCtx.closePath();
  distanceCtx.fill();
}


setInterval(function() {
  distanceCtx.fillStyle = "rgba(10,10,10,0.8)";
  distanceCtx.fillRect(0, 0, canvas.width, canvas.height);

  for (var i in particles) {
    particles[i].draw();
  }
}, 30);







































