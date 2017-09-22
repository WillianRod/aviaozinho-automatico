document.oninput = window.onresize = function(thing) {
  if (thing.srcElement.id == 'field-message') {
    update(thing.srcElement.value);
  }
}

var gradients = [
  ["#007991", "#78ffd6"],
  ["#56CCF2", "#2F80ED"],
  ["#F2994A", "#F2C94C"],
  ["#4AC29A", "#BDFFF3"],
  ["#B2FEFA", "#0ED2F7"],
  ["#D66D75", "#E29587"],
  ["#20002c", "#cbb4d4"],
  ["#C33764", "#1D2671"],
  ["#34e89e", "#0f3443"],
  ["#6190E8", "#A7BFE8"],
  ["#D38312", "#A83279"],
  ["#00c6ff", "#0072ff"]
]

var gradient = gradients[Math.floor(Math.random() * gradients.length)];

function update(text) {
    document.getElementById('previewCanvas').height = document.getElementById('previewCanvas').width;
    gradient = gradients[Math.floor(Math.random() * gradients.length)];
    const canvas = document.getElementById('previewCanvas');
    const img = document.getElementById('logo');
    const ctx = canvas.getContext('2d');
    var grd = ctx.createLinearGradient(0,0, canvas.width, canvas.height);
    grd.addColorStop(0, gradient[0]);
    grd.addColorStop(1, gradient[1]);
    ctx.fillStyle = grd;
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = "white";
    paint_centered_wrap(canvas, 0, 0, canvas.width, canvas.height, text, 48, 2);
    var downsacle = (canvas.width*8)/1080;
    var logoX = (canvas.width / 2) - (img.width / downsacle / 2);
    ctx.drawImage(img, logoX, 20, img.width / downsacle, img.height / downsacle);
}

paint_centered_wrap = function(canvas, x, y, w, h, text, fh, spl) {
  var Paint = {
    RECTANGLE_STROKE_STYLE : 'black',
    RECTANGLE_LINE_WIDTH : 0,
    VALUE_FONT : fh + 'px Arial Black',
    VALUE_FILL_STYLE : 'red'
  }
  var split_lines = function(ctx, mw, font, text1) {
    mw = mw - 10;
    ctx2d.font = font;
    var text = text1.toUpperCase();
    var words = text.split(' ');
    var new_line = words[0];
    var lines = [];
    for(var i = 1; i < words.length; ++i) {
      if (ctx.measureText(new_line + " " + words[i]).width < mw) {
        new_line += " " + words[i];
      } else {
        lines.push(new_line);
        new_line = words[i];
      }
    }
    lines.push(new_line);
    return lines;
  }
  var ctx2d = canvas.getContext('2d');
  if (ctx2d) {
    var lines = split_lines(ctx2d, w, Paint.VALUE_FONT, text);
    var both = lines.length * (fh + spl);
    if (both >= h) {
      // AREA TWO SMALL
    } else {
      var ly = (h - both)/2 + y + spl*lines.length;
      var lx = 0;
      for (var j = 0, ly; j < lines.length; ++j, ly+=fh+spl) {
        lx = x+w/2-ctx2d.measureText(lines[j]).width/2;
        ctx2d.fillText(lines[j], lx, ly);
      }
    }
  } else {
    // Do something meaningful
  }
}