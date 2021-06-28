
function drawBezierPath(bezierPath,xOffset,yOffset,lineWidth,hue,sat,lit,fillMode,referencePointsOn,ctx) {

    // console.log("bezierPath", bezierPath);

    var rMarker = lineWidth;
    var markerLineW = lineWidth;
    var markerHue = hue+180;
    var markerHue2 = 0;

    let path = [];

    let circle = [];

    ctx.beginPath();

    let i = 0;
    x1  = bezierPath[i][0][0]*h + xOffset*w
    y1  = bezierPath[i][0][1]*h + yOffset*h

    ctx.moveTo(x1,y1);

    for(let i=0; i<bezierPath.length; i++) {

        // x1  = bezierPath[i][0][0]*h + xOffset*w
        // y1  = bezierPath[i][0][1]*h + yOffset*h
        xc1 = bezierPath[i][1][0]*h + xOffset*w
        yc1 = bezierPath[i][1][1]*h + yOffset*h
        xc2 = bezierPath[i][2][0]*h + xOffset*w
        yc2 = bezierPath[i][2][1]*h + yOffset*h
        x2  = bezierPath[i][3][0]*h + xOffset*w
        y2  = bezierPath[i][3][1]*h + yOffset*h

        ctx.bezierCurveTo( xc1,yc1, xc2,yc2, x2,y2 );

        // console.log(bezierPath);

    }

    ctx.closePath();

    if(fillMode=="fill") {
        ctx.fillStyle   = 'hsl(' + hue + ', ' +  sat + '%, ' + lit + '%'  +')'; 
        ctx.fill();
    } else {
        ctx.strokeStyle = 'hsl(' + hue + ', ' +  sat + '%, ' + lit + '%'  +')';
        ctx.lineWidth = lineWidth*h;
        ctx.stroke()
    }


    // STUFF FOR DRAWING REFERENCE POINTS
    if(referencePointsOn==0) {
        return;
    }
    // otherwise draw the reference points
    for(let i=0; i<bezierPath.length; i++) {

        x1  = bezierPath[i][0][0];
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
        
        // ctx.ellipse(xc1,yc1,rMarker*h,rMarker*h,0,0,twoPI);
        // ctx.stroke();
        circle = {loc:[xc2,yc2], rad:rMarker};
        drawCircle(circle,0,0,markerLineW,markerHue2,100,lit,"stroke",ctx);
        
        // ctx.ellipse(xc2,yc2,rMarker*h,rMarker*h,0,0,twoPI);
        // ctx.stroke();
        circle = {loc:[x2,y2]  , rad:rMarker};
        drawCircle(circle,0,0,markerLineW,markerHue2,100,lit,"fill",ctx);

        path = [[x2,y2],[xc2,yc2]];
        drawPath(path,0,0,markerLineW,markerHue2,100,lit,"stroke",ctx);

        path = [[x1,y1],[xc1,yc1]];
        drawPath(path,0,0,markerLineW,markerHue,sat,lit,"stroke",ctx);
        
        // ctx.ellipse(x2,y2,rMarker*h,rMarker*h,0,0,twoPI);
        // ctx.stroke();

    }



    
}