function drawEllipse(ellipse,xOffset,yOffset,lineWidth,hue,sat,lit,fillMode,ctx) {

    var x = ellipse.loc[0] * h + xOffset*w;
    var y = ellipse.loc[1] * h + yOffset*h;
    var r1 = ellipse.rad1 * h;
    var r2 = ellipse.rad2 * h;
    var thetaR_rotation = ellipse.thetaR_rotation;

    ctx.beginPath();

    ctx.ellipse(x, y, r1, r2, thetaR_rotation, 0, Math.PI*2);

    if(fillMode=="fill") {
        ctx.fillStyle   = 'hsl(' + hue + ', ' +  sat + '%, ' + lit + '%'  +')'; 
        ctx.fill();
    } else {
        ctx.strokeStyle = 'hsl(' + hue + ', ' +  sat + '%, ' + lit + '%'  +')';
        ctx.lineWidth = lineWidth*h;
        ctx.stroke()
    }
    
}