(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Util = Asteroids.Util = {};

  // Normalize the length of the vector to 1, maintaining direction.
  var dir = Util.dir = function (vec) {
    var norm = Util.norm(vec);
    return Util.scale(vec, 1 / norm);
  };

  // Find distance between two points.
  var dist = Util.dist = function (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  };

  // Find the length of the vector.
  var norm = Util.norm = function (vec) {
    return Util.dist([0, 0], vec);
  };

  // Return a randomly oriented vector with the given length.
  var randomVec = Util.randomVec = function (length) {
    var deg = 2 * Math.PI * Math.random();

    return scale([Math.sin(deg), Math.cos(deg)], length);
  };
	
  var randomVectorOfLength = Asteroids.Util.randomVectorOfLength = function(length) {
    var unitVector = Util.randomUnitVector();
    var x = unitVector[0];
    var y = unitVector[1];
    return [x * length, y * length];
  };
	
  var randomUnitVector = Asteroids.Util.randomUnitVector = function() {
    var randomTheta = Math.random() * 2 * Math.PI;
    var x = Math.cos(randomTheta);
    var y = Math.sin(randomTheta);
    return [x, y];
  };
	
  var perpendicularUnitVels = Asteroids.Util.perpendicularUnitVels = function (vel) {
    var theta = getTheta(vel);
    return [unitize(theta + Math.PI / 2), unitize(theta - Math.PI / 2)];
  };
	
  var scalarMultiply = Asteroids.Util.scalarMultiply = function (vector, scalar) {
    var x = vector[0];
    var y = vector[1];
    return [x * scalar, y * scalar];
  };

  // Scale the length of a vector by the given amount.
  var scale = Util.scale = function (vec, m) {
    return [vec[0] * m, vec[1] * m];
  };

  var inherits = Util.inherits = function (ChildClass, BaseClass) {
    function Surrogate () { this.constructor = ChildClass };
    Surrogate.prototype = BaseClass.prototype;
    ChildClass.prototype = new Surrogate();
  };
})();