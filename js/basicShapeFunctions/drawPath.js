
function drawPath(path, lineWidth, hue, sat, lit, alpha, fillMode, close) {

    // console.log("path",path);

    ctxToDrawToNow.beginPath()

    //var x = (x+xCenterOffset)*artboardH;
    //var y = (y+yCenterOffset)*artboardH;

    var x = (path[0][0]+xCenterOffset  ) * artboardH;
    var y = (1-path[0][1]-yCenterOffset) * artboardH;

    ctxToDrawToNow.moveTo(x,y)   

    for(let i=1; i<path.length; i++) {
        
        x = (path[i][0]+xCenterOffset  ) * artboardH;
        y = (1-path[i][1]-yCenterOffset) * artboardH;
        ctxToDrawToNow.lineTo(x,y)
        // //console.log("[x,y]",[x,y])
    }

    if(close==1){
        ctxToDrawToNow.closePath();
    }

    var alpha = alpha/255;
    

    if(fillMode==0) {
        ctxToDrawToNow.fillStyle   = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')'; 
        ctxToDrawToNow.fill();
    } else {
        ctxToDrawToNow.strokeStyle   = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')'; 
        ctxToDrawToNow.lineWidth = lineWidth*artboardH;
        ctxToDrawToNow.stroke()
    }
    
}






function drawPathW(path, lineWidth, hue, sat, lit, alpha, fillMode, close) {

    // console.log("path",path);

    ctxToDrawToNow.beginPath()

    //var x = (x+xCenterOffset)*artboardH;
    //var y = (y+yCenterOffset)*artboardH;

    var x = (path[0][0]+xCenterOffset  ) * artboardW;
    var y = (1-path[0][1]-yCenterOffset) * artboardH;

    ctxToDrawToNow.moveTo(x,y)   

    for(let i=1; i<path.length; i++) {
        
        x = (path[i][0]+xCenterOffset  ) * artboardW;
        y = (1-path[i][1]-yCenterOffset) * artboardH;
        ctxToDrawToNow.lineTo(x,y)
        // //console.log("[x,y]",[x,y])
    }

    if(close==1){
        ctxToDrawToNow.closePath();
    }
    

    if(fillMode==0) {
        ctxToDrawToNow.fillStyle   = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')'; 
        ctxToDrawToNow.fill();
    } else {
        ctxToDrawToNow.strokeStyle   = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')'; 
        ctxToDrawToNow.lineWidth = lineWidth*artboardH;
        ctxToDrawToNow.stroke()
    }
    
}