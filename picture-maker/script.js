// /* // PICTURE MAKER CODE
var width
var height 

// */ // PICTURE MAKER CODE
function resizeCanvas() {
    width = 2000
    height = 2000

    document.getElementById("canvas").width=width
    document.getElementById("canvas").height=height
    return addColours()
}

function addColours() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    for (indexX = 0; indexX < width; indexX++) {
        for (indexY = 0; indexY < height; indexY++) {
            ctx.fillStyle = pickColour()
            ctx.fillRect(indexX, indexY, 1, 1 );
        }
    }
}

function pickColour() {
    const r = colourNumber()
    const g = colourNumber()
    const b = colourNumber()

    const colour = `rgb(${r}, ${g}, ${b})`
    return colour
}

function colourNumber(){
    return Math.floor(0 + Math.random()*(255 + 1 - 0))
}