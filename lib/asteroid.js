(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (options) {
		// this.sizeClass = options.sizeClass || 1;
		this.sizeClass = Math.floor(Math.random() * 5) + 1;
		console.log(this.sizeClass);
		this.craters = [];
		
    options.color = Asteroid.COLOR;
    options.pos = options.pos || options.game.randomPosition();
    // options.radius = Asteroid.RADIUS;
		options.radius = Asteroid.RADII[this.sizeClass - 1];
    options.vel = options.vel || Asteroids.Util.randomVec(Asteroid.SPEED);

    Asteroids.MovingObject.call(this, options);
		
		// this.craterize();
  };
	
  var Crater = Asteroids.Crater = function (baseRadius) {
    var craterRadius = baseRadius / (Math.random() * 2 + 3);
    var offset = (baseRadius - craterRadius - 15) * Math.random() + 13;

    this.pos = Asteroids.Util.randomVectorOfLength(offset);
    this.radius = craterRadius;
    this.color = Asteroid.randomGray();
  };
	
  Asteroid.prototype.craterize = function () {
    var numCraters = Math.floor(Math.random() * 3 + 3);
    var baseRadius = this.radius;
    for (var i = 0; i < numCraters; i++) {

      this.craters.push(new Crater(baseRadius));
    }
  };
	
	Asteroid.prototype.split = function () {
    if (this.sizeClass > 1) {
      var newSize = this.sizeClass - 1;
      var unitVels = Asteroids.Util.perpendicularUnitVels(this.vel);
      var vel1 = Asteroids.Util.scalarMultiply(unitVels[0], Asteroid.VELOCITIES[newSize]);
      var vel2 = Asteroids.Util.scalarMultiply(unitVels[1], Asteroid.VELOCITIES[newSize]);

      var opts1 = {
        sizeClass: newSize,
        pos: this.pos,
        vel: vel1,
        color: Asteroid.randomGray(),
        game: window.game,
        wrappable: true,
        driftOmega: 0.15
      };

      var opts2 = {
        sizeClass: newSize,
        vel: vel2,
        pos: this.pos,
        color: Asteroid.randomGray(),
        game: window.game,
        wrappable: true,
        driftOmega: 0.15
      };

      window.game.asteroids.push(new Asteroid(opts1));
      window.game.asteroids.push(new Asteroid(opts2));
    }
  };
	
  Asteroid.randomGray = function () {
    var char = function(){
      return Math.floor(Math.random() * 7) + 60;
    };
    return '#' + char() + char() + char();
  };
	
	Asteroid.RADII = [20, 30, 40, 50, 60];
	Asteroid.VELOCITIES = [4, 3, 2];
  Asteroid.COLOR = "#505050";
  Asteroid.RADIUS = 25;
  Asteroid.SPEED = 4;

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    } 
  };
})();