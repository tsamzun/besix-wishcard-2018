function Firework(p) {
  var colors = ['#0098D9', '#213F99', '#EC1D24', '#FFFFFF'];
  this.color = p.color(colors[p.floor(p.random(colors.length))]);
  this.firework = new Particle(p, p.random(p.width), p.height, this.color, true);
  this.exploded = false;
  this.particles = [];

  this.update = function() {
    if (!this.exploded) {
      this.firework.applyForce(gravity);
      this.firework.update();

      if (this.firework.vel.y >= 0) {
        this.exploded = true;

        this.explode();
      }
    }

    for (var i = this.particles.length-1; i >= 0; i--) {
      this.particles[i].applyForce(gravity);
      this.particles[i].update();

      if (this.particles[i].done()) {
        this.particles.splice(i, 1);
      }
    }

  }

  this.done = function() {
    if (this.exploded && this.particles.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  this.explode = function() {
    for (var i = 0; i < 50; i++) {
      var part = new Particle(p, this.firework.pos.x, this.firework.pos.y, this.color);
      this.particles.push(part);
    }
  }

  this.show = function() {
    if (!this.exploded) {
      this.firework.show();
    }
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].show();
    }
  }
}
