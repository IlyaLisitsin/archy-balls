class Vec2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(vec) {
    return new Vec2(this.x + vec.x, this.y + vec.y);
  }

  sub(vec) {
    return new Vec2(this.x - vec.x, this.y - vec.y);
  }

  mul(val) {
    return new Vec2(this.x * val, this.y * val);
  }

  div(val) {
    return new Vec2(this.x / val, this.y / val);
  }

  len() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  norm() {
    return this.div(this.len());
  }
}

export default Vec2;