function drawCircle(x, y, rad, lineWidth, hue, sat, lit, alpha, fillMode, ctx) {

    var x = x*w;
    var y = y*h;
    var rad = rad * h;

    var alpha = alpha/255;

    // console.log("x",x);
    // console.log("y",y);
    // console.log("rad",rad);

    ctx.beginPath();

    // console.log("ctx",ctx)

    ctx.ellipse(x,y,rad,rad,0,0,twoPI);

    // console.log("hsla",hue,sat,lit,alpha/255);

    if(fillMode=="fill") {
        ctx.fillStyle   = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')'; 
        ctx.fill();
    } else {
        ctx.strokeStyle = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')'; 
        ctx.lineWidth = lineWidth*h;
        ctx.stroke()
    }
    
}