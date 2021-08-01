
function drawPath(path, lineWidth, hue, sat, lit, fillMode, close) {

    // console.log("path",path);

    ctxToDrawToNow.beginPath()

    x = path[0][0]*h
    y = path[0][1]*h
    ctxToDrawToNow.moveTo(x,y)   

    for(let i=1; i<path.length; i++) {
        
        x = path[i][0]*h
        y = path[i][1]*h
        ctxToDrawToNow.lineTo(x,y)
        // //console.log("[x,y]",[x,y])
    }

    if(close==1){
        ctxToDrawToNow.closePath();
    }
    

    if(fillMode==0) {
        ctxToDrawToNow.fillStyle   = 'hsl(' + hue + ', ' +  sat + '%, ' + lit + '%'  +')'; 
        ctxToDrawToNow.fill();
    } else {
        ctxToDrawToNow.strokeStyle = 'hsl(' + hue + ', ' +  sat + '%, ' + lit + '%'  +')';
        ctxToDrawToNow.lineWidth = lineWidth*h;
        ctxToDrawToNow.stroke()
    }
    
}