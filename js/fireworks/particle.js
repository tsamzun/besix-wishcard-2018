function Particle(p, x, y, color, firework) {
  this.pos = p.createVector(x,y);
  this.firework = firework;
  this.life = 255;
  this.color = color;

  if (this.firework) {
    this.vel = p.createVector(p.random(-2, 2),p.random(-18,-10));
  } else {
    this.vel = p5.Vector.random2D();
    this.vel.mult(p.random(2,15));
  }
  this.acc = p.createVector(0,0);

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.update = function() {
    if (!this.firework) {
      this.vel.mult(0.96);
      this.life -= 4;
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.done = function() {
    if (this.life < 0) {
      return true;
    } else {
      return false;
    }
  }

  this.show = function() {
    p.push();
    if (!this.firework) {
      p.stroke(p.red(this.color), p.green(this.color), p.blue(this.color), this.life);
      p.strokeWeight(4);
    } else {
      p.stroke(this.color);
      p.strokeWeight(8);
    }
    p.point(this.pos.x,this.pos.y);
    p.pop();
  }

}
