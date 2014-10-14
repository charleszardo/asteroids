(function () {
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {};
  };

  var Game = Asteroids.game = function (){
    this.asteroidArr = [];

    this.addAsteroids();
    this.ship = new Asteroids.Ship(this.randomPosition(),this);
    this.allObjects = this.asteroidArr.concat([this.ship]);
  }

  Game.DIM_X = 500;
  Game.DIM_Y = 500;
  Game.NUM_ASTEROIDS = 4;

  Game.prototype.addAsteroids = function (){
    while (this.asteroidArr.length < Game.NUM_ASTEROIDS) {
      this.asteroidArr.push(new Asteroids.Asteroid(this.randomPosition(),this))
    }
  }

  Game.prototype.draw = function(c){
    c.clearRect(0,0,Game.DIM_X,Game.DIM_Y);

    for (var i = 0; i < this.allObjects.length;i++){
      this.allObjects[i].draw(c);
    }
  }

  Game.prototype.randomPosition = function (){
    return [Math.random() * 500, Math.random() * 500];
  }

  Game.prototype.moveObjects = function (){
    for (var i = 0; i < this.allObjects.length;i++){
      this.allObjects[i].move();
    }
  }

  Game.prototype.wrap = function (pos) {
    if (pos[0] > Game.DIM_X) {
      pos[0] -= Game.DIM_X;
    }
    else if (pos[0] < 0){
      pos[0] += Game.DIM_X;
    }


    if (pos[1] > Game.DIM_Y) {
      pos[1] -= Game.DIM_Y;
    }
    else if (pos[1] < 0){
      pos[1] += Game.DIM_Y;
    }
  };

  Game.prototype.checkCollisions = function(){
    for (var i=0; i < this.asteroidArr.length-1; i++){
      for (var j=i+1; j < this.asteroidArr.length; j++){
        if (this.asteroidArr[i].isCollidedWith(this.asteroidArr[j])){
          this.asteroidArr[i].collideWith(this.asteroidArr[j]);
          console.log("collision!!!!");
        }
      }
    }
  }

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function(asteroid) {
    var index = this.asteroidArr.indexOf(asteroid);

    this.asteroidArr.splice(index, 1);
  }

  // Game.prototype.allObjects = function() {
  //   return [this.ship].concat(this.asteroidArr);
  // }
})();


