class MouseTracker {
  constructor(el) {
    this._el = el;
    this.x = 0;
    this.y = 0;
    this.l = false;
    this.r = false;

    el.addEventListener('mousemove', this._track.bind(this));
    el.addEventListener('mouseup', this._track.bind(this));
    el.addEventListener('mousedown', this._track.bind(this));
  }

  _track(e) {
    var rect = this._el.getBoundingClientRect();
    this.x = e.clientX - rect.left;
    this.y = e.clientY - rect.top;
    this.l = !!(e.buttons & 1);
    this.r = !!(e.buttons & 2);
  }
}

export default MouseTracker;