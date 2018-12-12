Math.deg2rad = function(d) {
  return d * Math.PI / 180;
};

Math.rad2deg = function (r) {
  return r / Math.PI * 180;
};

Math.rand = function(max, min = 0) {
  if (min > max) {
    buff = max;
    max = min;
    min = buff;
  }

  var diff = max - min;
  var result = Math.floor(Math.random() * diff) + min;
  return result;
};

Math.inRange = function(val, min, max) {
  if (val < min) {
    return false;
  }
  if (val >= max) {
    return false;
  }
  return true;
};

Math.toRange = function(val, min, max) {
  if (val < min) {
    return min;
  }
  if (val >= max) {
    return max - 1;
  }
  return val;
};