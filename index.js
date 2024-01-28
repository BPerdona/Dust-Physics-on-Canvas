// Const
const row = 600
const coll = 600
const squareSize = 4

// data
var data = []
var ctx = document.getElementById("canvas").getContext("2d");
var color = 80


//FirstPopulate
for (let i = 0; i < row/squareSize; i++) {
    data[i] = []
    for (let j = 0; j < coll/squareSize; j++) {
        data[i][j] = 0
    }
}

//Mouse Click
var isDrawing = false

document.getElementById("canvas").addEventListener('mousedown',(ev)=>{
    isDrawing = true
    
    let mouseX = Math.floor(ev.offsetX/squareSize)
    let mouseY = Math.floor(ev.offsetY/squareSize)

    addSand(mouseX, mouseY)
})

document.getElementById("canvas").addEventListener('mousemove',(ev)=>{
    if(isDrawing){
        let mouseX = Math.floor(ev.offsetX/squareSize)
        let mouseY = Math.floor(ev.offsetY/squareSize)
    
        addSand(mouseX, mouseY)
    }
})

document.getElementById("canvas").addEventListener('mouseup',(ev)=>{
    isDrawing=false
})

function nextGen(data){
    for (let i = data.length -1; i >= 0; i--) {
        for (let j = data.length -1; j >= 0; j--) {
            if(j<data.length-1 && data[i][j]!=0 && data[i][j+1]==0){
                // Next
                data[i][j+1] = data[i][j]
                data[i][j] = 0
            }
            else if(data[i][j]!=0 && data[i][j+1]!=0){

                // Stop dust in the corner
                if(i-1<0 || i+1>data.length-1){
                    continue
                }

                // Dust Split
                const rightD = data[i-1][j+1]
                const leftD = data[i+1][j+1]

                if(rightD!=0 && leftD!=0)
                    continue

                else if(rightD==0 && leftD==0){

                    const random = Math.round(Math.random())
                    random==1 ? data[i-1][j+1] = data[i][j] : data[i+1][j+1] = data[i][j]

                    // Free espace
                    data[i][j] = 0
                    continue
                }
                else if(rightD==0){
                    data[i-1][j+1] = data[i][j]
                    // Free space
                    data[i][j] = 0
                }
                else if(leftD==0){
                    data[i+1][j+1] = data[i][j]
                    // Free space
                    data[i][j] = 0
                }
            }
        }
    }
}

function draw(ctx, data, squareSize) {
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length; j++) {
            if(data[j][i]==0){
                ctx.fillStyle = "black"
                ctx.fillRect(j*squareSize, i*squareSize, squareSize, squareSize);
            }else{
                ctx.fillStyle = "rgb("+data[j][i]+" "+data[j][i]+" "+data[j][i]+")"
                ctx.fillRect(j*squareSize, i*squareSize, squareSize, squareSize);
            }
        }
    }
    color+=0.4
    if(color>=255){
        color=80
    }
}

function addSand(mouseX, mouseY){
    if(data[mouseX][mouseY]!=0)
        return
    data[mouseX][mouseY] = color

    if(mouseX-2!=0 && mouseY-2!=0){
        data[mouseX-1][mouseY] = color
        data[mouseX][mouseY-1] = color
        data[mouseX-1][mouseY-1] = color
        data[mouseX-2][mouseY] = color
        data[mouseX][mouseY-2] = color
        data[mouseX-2][mouseY-2] = color
    }
    if(mouseX+2!=data.length && mouseY+2!=data.length){
        data[mouseX+1][mouseY] = color
        data[mouseX][mouseY+1] = color
        data[mouseX+1][mouseY+1] = color
        data[mouseX+2][mouseY] = color
        data[mouseX+2][mouseY+2] = color
    }
}

setInterval(function () {
    draw(ctx, data, squareSize)
    nextGen(data)
}, 30);