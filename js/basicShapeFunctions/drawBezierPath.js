
function drawBezierPath(bezierPath,xOffset,yOffset,lineWidth,hue,sat,lit,fillMode,referencePointsOn,ctx) {

    // //console.log("bezierPath", bezierPath);

    var rMarker = lineWidth;
    var markerLineW = lineWidth;
    var markerHue = hue+180;
    var markerHue2 = 0;

    let path = [];

    let circle = [];

    ctx.beginPath();

    let i = 0;
    var x = (  bezierPath[0][0][0]+xCenterOffset) * artboardH;
    var y = (1-bezierPath[0][0][1]-yCenterOffset) * artboardH;

    ctx.moveTo(x1,y1);

    for(let i=0; i<bezierPath.length; i++) {

        // x1  = bezierPath[i][0][0]* + xOffset*artboardW
        // y1  = bezierPath[i][0][1]* + yOffset*
        xc1 = (  bezierPath[i][1][0]+xCenterOffset) * artboardH;
        yc1 = (1-bezierPath[i][1][1]-yCenterOffset) * artboardH;
        xc2 = (  bezierPath[i][2][0]+xCenterOffset) * artboardH;
        yc2 = (1-bezierPath[i][2][1]-yCenterOffset) * artboardH;
        x2  = (  bezierPath[i][3][0]+xCenterOffset) * artboardH;
        y2  = (1-bezierPath[i][3][1]-yCenterOffset) * artboardH;

        ctx.bezierCurveTo( xc1,yc1, xc2,yc2, x2,y2 );

        // //console.log(bezierPath);

    }

    ctx.closePath();

    if(fillMode=="fill") {
        ctx.fillStyle   = 'hsl(' + hue + ', ' +  sat + '%, ' + lit + '%'  +')'; 
        ctx.fill();
    } else {
        ctx.strokeStyle = 'hsl(' + hue + ', ' +  sat + '%, ' + lit + '%'  +')';
        ctx.lineWidth = lineWidth * artboardH;
        ctx.stroke()
    }


    // STUFF FOR DRAWING REFERENCE POINTS
    if(referencePointsOn==0) {
        return;
    }
    // otherwise draw the reference points
    for(let i=0; i<bezierPath.length; i++) {

        x1  = bezierPath[i][0][0]; // all these need repairs. they reference the old drawCircle which took a circle object as argument.
        y1  = bezierPath[i][0][1];
        xc1 = bezierPath[i][1][0];
        yc1 = bezierPath[i][1][1];
        xc2 = bezierPath[i][2][0];
        yc2 = bezierPath[i][2][1];
        x2  = bezierPath[i][3][0];
        y2  = bezierPath[i][3][1];

        // ctx.beginPath();

        circle = {loc:[xc1,yc1], rad:rMarker};
        drawCircle(circle,0,0,markerLineW,markerHue,sat,lit,"stroke",ctx);
        
        // ctx.ellipse(xc1,yc1,rMarker*,rMarker*,0,0,twoPI);
        // ctx.stroke();
        circle = {loc:[xc2,yc2], rad:rMarker};
        drawCircle(circle,0,0,markerLineW,markerHue2,100,lit,"stroke",ctx);
        
        // ctx.ellipse(xc2,yc2,rMarker*,rMarker*,0,0,twoPI);
        // ctx.stroke();
        circle = {loc:[x2,y2]  , rad:rMarker};
        drawCircle(circle,0,0,markerLineW,markerHue2,100,lit,"fill",ctx);

        path = [[x2,y2],[xc2,yc2]];
        drawPath(path,0,0,markerLineW,markerHue2,100,lit,"stroke",ctx);

        path = [[x1,y1],[xc1,yc1]];
        drawPath(path,0,0,markerLineW,markerHue,sat,lit,"stroke",ctx);
        
        // ctx.ellipse(x2,y2,rMarker*,rMarker*,0,0,twoPI);
        // ctx.stroke();

    }



    
}