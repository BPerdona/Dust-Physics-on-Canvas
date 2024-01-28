// Const
const row = 400
const coll = 400
const squareSize = 8

// data
var data = []
var ctx = document.getElementById("canvas").getContext("2d");
// var color = 1


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
            if(j<data.length-1 && data[i][j]==1 && data[i][j+1]!=1){
                // Next
                data[i][j] = 0
                data[i][j+1] = 1
            }
            else if(data[i][j]==1 && data[i][j+1]==1){

                // Stop dust in the corner
                if(i-1<0 || i+1>data.length-1){
                    continue
                }

                // Dust Split
                const rightD = data[i-1][j+1]
                const leftD = data[i+1][j+1]

                if(rightD==1 && leftD==1)
                    continue

                else if(rightD==0 && leftD==0){

                    // Free espace
                    data[i][j] = 0
                    const random = Math.round(Math.random())
                    random==1 ? data[i-1][j+1] = 1 : data[i+1][j+1] = 1
                    continue
                }
                else if(rightD==0){
                    // Free space
                    data[i][j] = 0
                    data[i-1][j+1] = 1
                }
                else if(leftD==0){
                    // Free space
                    data[i][j] = 0
                    data[i+1][j+1] = 1
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
                ctx.fillStyle = "rgb("+color+" 165 0)"
                ctx.fillRect(j*squareSize, i*squareSize, squareSize, squareSize);
            }
        }
    }
    // color++
    // if(color>=255){
    //     color=1
    // }
}

function addSand(mouseX, mouseY){
    data[mouseX][mouseY] = 1

    if(mouseX-1!=0 && mouseY-1!=0){
        data[mouseX-1][mouseY] = 1
        data[mouseX][mouseY-1] = 1
    }
    if(mouseX+1!=data.length && mouseY+1!=data.length){
        data[mouseX+1][mouseY] = 1
        data[mouseX][mouseY+1] = 1
    }
}

setInterval(function () {
    draw(ctx, data, squareSize)
    nextGen(data)
}, 30);