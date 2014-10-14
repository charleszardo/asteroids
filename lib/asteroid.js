(function(){
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {};
  }


  var Asteroid = Asteroids.Asteroid = function(pos, game){
    Asteroids.MovingObject.call(this, pos, Asteroids.Util.randomVec(), Asteroid.RADIUS, Asteroid.COLOR, game);
  }
  Asteroid.COLOR = "blue";
  Asteroid.RADIUS = 4;

  Asteroids.Util.inherits(Asteroids.MovingObject,Asteroid);




})();