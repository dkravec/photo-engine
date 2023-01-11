var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var canvasBig = document.getElementById('canvasBig');
var ctxBig = canvasBig.getContext('2d');

// SAVE YOUR CANVAS
function saveCanvas() {
    var canvas = document.getElementById('canvas');
    var dataURL = canvas.toDataURL();

    var win = window.open();
    win.document.write(`<iframe src="${dataURL}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
}

// SAVE YOUR BIG CANVAS
function saveCanvasBig() {
    var canvas = document.getElementById('canvasBig');
    var dataURL = canvas.toDataURL();

    var win = window.open();
    win.document.write(`<iframe src="${dataURL}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
}

// IMAGE STRUCTURE (4 pixels)
var image = [
    {
        x: 0,
        y: 0,
      //  colour: "rgb(168, 33, 107)"
        colour: "rgb(173, 106, 120)"
      // colour: "rgb(255,0,0)"
    },
    {
        x: 1,
        y: 0,
       colour: "rgb(241, 24, 76)"
       //colour: "rgb(46, 149, 153)"
       // colour: "rgb(0, 255, 247)"
    },
    {
        x: 0,
        y: 1,
        colour: "rgb(241, 24, 76)"
    },
    {
        x: 1,
        y: 1,
        colour: "rgb(255, 0, 247)"
    }
]

startUpDraw()

function startUpDraw() {
    var largestX = 0
    var largestY = 0

    for (i=0;i<image.length; i++) {
        pixel=image[i]

        if (pixel.x>largestX-1) largestX = pixel.x + 1
        if (pixel.y>largestY-1) largestY = pixel.y + 1
    }
    canvas.width=largestX
    canvas.height=largestY
    console.log(largestX)
    console.log(largestY)
    ctx = canvas.getContext('2d');

    for (const pixel of image) {
        draw(pixel.x, pixel.y, pixel.colour)
    }
}

getData()

function getData() {
    var allColours =[]

    const width = canvas.width
    const height = canvas.height
    currentWidth = 0
    currentHeight = 0
    ctx = canvas.getContext('2d');
    console.log(`${width}, ${height}`)

    for (indexX = 0; indexX < width; indexX++) {
        for (indexY = 0; indexY < height; indexY++) {
            ctx = canvas.getContext('2d');

            console.log(`${indexX}, ${indexY}`)

            var p = ctx.getImageData(indexX, indexY, 1, 1).data; 
            var data = {
                "r" : p[0],
                "g" : p[1],
                "b" : p[2],
                "x" : indexX,
                "y" : indexY
            }
            if (p[indexX+1]) {
                console.log(p[indexX+1])
                var p = ctx.getImageData(indexX+1, indexY, 1, 1).data; 
                
                var dataPlus = {
                    "r" : p[0],
                    "g" : p[1],
                    "b" : p[2],
                    "x" : indexX+2,
                    "y" : indexY
                }
                console.log(p)

                console.log(dataPlus)
                var newPixel = ColourBetween(`rgb(${data.r}, ${data.g}, ${data.b})`,`rgb(${dataPlus.r}, ${dataPlus.g}, ${dataPlus.b})`)
                
                newPixel.x = indexX+1
                newPixel.y = indexY

                const pixels = {

                }

                const dataPlusRGB = `rgb(${dataPlus.r},${dataPlus.g}, ${dataPlus.b})`
                console.log(dataPlusRGB)

                draw(newPixel.x, newPixel.y, `rgb(${newPixel.r},${newPixel.g}, ${newPixel.b})`)
                draw(dataPlus.x, newPixel.y, `rgb(${dataPlus.r},${dataPlus.g}, ${dataPlus.b})`)
            }
            
            allColours.push(data)
        }
    }

    console.log(allColours)
}

// colour math https://sighack.com/post/averaging-rgb-colors-the-right-way

// ColourBetween(image[0].colour, image[1].colour)

// GETS 2 PIXELS, AND GETS NEW RGB VALUES
function ColourBetween(colour1, colour2) {
    const rgbArray1 = removeDefaultRGB(colour1)
    const rgbArray2 = removeDefaultRGB(colour2)

    const r = newValue(rgbArray1[0], rgbArray2[0])
    const g = newValue(rgbArray1[1], rgbArray2[1])
    const b = newValue(rgbArray1[2], rgbArray2[2])

    const newRGBArray = [ r, g, b ]

    const PixelData = {r,g,b,x:0,y:0}
    console.log({
        pixel1: `rgb(${rgbArray1[0]}, ${rgbArray1[1]}, ${rgbArray1[2]})`, 
        newpixel: `rgb(${newRGBArray[0]}, ${newRGBArray[1]}, ${newRGBArray[2]})`, 
        pixel2: `rgb(${rgbArray2[0]}, ${rgbArray2[1]}, ${rgbArray2[2]})`

    }) // pixel 1
    // console.log(newRGBArray) // new calcuated pixel
   // console.log(rgbArray2) // pixel 2
    return PixelData

}

// CREATES NEW VALUE
function newValue(val1, val2) {
    if (!isNaN(val1)) val1 = parseFloat(val1)
    if (!isNaN(val2)) val2 = parseFloat(val2)

    const addVals = val1*val1 + val2*val2
    const newVal = addVals / 2

    return Math.floor(Math.sqrt(newVal))
}

// REMOVES DEFAULT RGB FORMATING FOR CALCUATIONS
function removeDefaultRGB(colour) {
    if (colour.startsWith('rgb(')) colour = colour.replace('rgb(','').replace(')','')

    for (index = 0; index<3;index++) {
        if (colour.includes(',')) colour = colour.replace(',',' ')
    }

    return colour.split(/[ ]+/)
}

function draw(xCoord, yCoord, ColourRGB) {
    const resizevar = 80

    ctx.fillStyle = ColourRGB

    ctx.fillRect(xCoord, yCoord, 1, 1);

    ctxBig.fillStyle = ColourRGB
    ctxBig.fillRect(xCoord*resizevar, yCoord*resizevar, 1*resizevar, 1*resizevar);

}

