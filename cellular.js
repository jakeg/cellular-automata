var JAKE = (function(JAKE) {
  'use strict';

  var canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  var ctx = canvas.getContext('2d');
  var redraw = true;
  var zoom = 1;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var width = Math.ceil(canvas.width/zoom);
  var height = Math.ceil(canvas.height/zoom);
  var pct_active = 5; // approx

  // seed our top row
  var seed = [];
  var val;
  for (var x=0; x<width; x++) {
    val = Math.round(Math.random() * 1/pct_active * 100) ? 1 : 0;
    // val = Math.round(width/2) == x ? 1 : 0; // sierpinski's triangle
    seed.push(val);
  }

  draw();

  function draw() {

    var start = Date.now();

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.scale(zoom, zoom);

    // our seed row
    for (var x=0; x<width; x++) {
      ctx.fillStyle = seed[x] ? 'red' : 'blue';
      ctx.fillRect(x, 0, 1, 10);
    }

    ctx.fillStyle = 'rgba(0, 100, 0, 255)';
    ctx.fillRect(0, 10, width, 2);

    var last = seed;
    var current = [];

    // for each row, use 'exclusive or' of blocks above and to the right/left of it
    var left;
    var right;
    for (var y=12; y<height; y++) {
      current = [];
      for (var x=0; x<width; x++) {
        left = (x === 0 ? 0 : last[x - 1]); // off-screen counted as 0
        right = (x === width - 1 ? 0 : last[x + 1]); // as above
        current.push(left ^ right);
        ctx.fillStyle = current[x] ? 'white' : 'black';
        ctx.fillRect(x, y, 1, 1);
      }
      last = current.slice(0);
    }

    ctx.restore();

    var end = Date.now();

    console.log('Taken: ' + (end - start) + 'ms');
  }

  return JAKE;

})(JAKE);