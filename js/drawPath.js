
function drawPath(path,xOffset,yOffset,lineWidth,hue,sat,lit,fillMode,close,ctx) {

    // console.log("ctx",ctx);

    ctx.beginPath()

    x = path[0][0]*h + xOffset*w
    y = path[0][1]*h + yOffset*h
    ctx.moveTo(x,y)   

    for(let i=1; i<path.length; i++) {
        
        x = path[i][0]*h + xOffset*w
        y = path[i][1]*h + yOffset*h
        ctx.lineTo(x,y)
        // console.log("[x,y]",[x,y])
    }

    if(close==1){
        ctx.closePath();
    }
    

    if(fillMode=="fill") {
        ctx.fillStyle   = 'hsl(' + hue + ', ' +  sat + '%, ' + lit + '%'  +')'; 
        ctx.fill();
    } else {
        ctx.strokeStyle = 'hsl(' + hue + ', ' +  sat + '%, ' + lit + '%'  +')';
        ctx.lineWidth = lineWidth*h;
        ctx.stroke()
    }
    
}