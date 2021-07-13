function drawRect(ctx, x, y, width, height, lineWidth=0.005, hue=0, sat=0, lit=0, alpha=255, fillMode=0) {

    var x = x*w;
    var y = y*h;
    var width = width * w;
    var height = height * h;

    var alpha = alpha/255;

    ctx.beginPath();

    ctx.rect(x,y,width,height);

    if(fillMode==0) {
        ctx.fillStyle   = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')'; 
        ctx.fill();
    } else {
        ctx.strokeStyle = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')'; 
        ctx.lineWidth = lineWidth*h;
        ctx.stroke()
    }
    
}