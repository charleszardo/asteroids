(function(){
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function(pos,game){
    Asteroids.MovingObject.call(this, pos, [10,10], Ship.RADIUS, Ship.COLOR, game);
  }

  Ship.RADIUS = 10;
  Ship.COLOR = "red";
  Asteroids.Util.inherits(Asteroids.MovingObject,Ship);

})();