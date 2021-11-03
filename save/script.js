function draw() {
    var canvas = document.getElementById('canvas');
    canvas.width = 4
    canvas.height = 4

    var ctx = canvas.getContext('2d');

    ctx.fillStyle = `rgb(0,0,0,0.00)`
    ctx.fillRect(4, 4, 1, 1);
}

// SAVE YOUR CANVAS
function saveCanvas() {
    var canvas = document.getElementById('canvas');
    var dataURL = canvas.toDataURL();

    var win = window.open();
    win.document.write(`<iframe src="${dataURL}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
}