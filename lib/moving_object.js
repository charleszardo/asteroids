(function(){
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function(pos,vel,radius,color, game){
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
    this.game = game;
  }

  MovingObject.prototype.draw = function (c) {

   c.fillStyle = this.color;
   c.beginPath();
   c.arc(this.pos[0],this.pos[1],this.radius,0,2*Math.PI)
   c.fill();
  }

  MovingObject.prototype.move = function(){
    this.game.wrap(this.pos);
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }

  MovingObject.prototype.isCollidedWith = function(otherObject){
    var distance = Math.pow(Math.pow((this.pos[0]-otherObject.pos[0]),2) + Math.pow((this.pos[1]-otherObject.pos[1]),2), 0.5);

    if (distance < this.radius + otherObject.radius){
      return true;
    }
    else{
      return false;
    }

  }

  MovingObject.prototype.collideWith= function(otherObject) {
    this.game.remove(this);
    this.game.remove(otherObject);
  }


})();
