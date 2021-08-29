function drawAxes(xOrigin,yOrigin) {

    // axesOn = axesOn*-1;

    var axesOn_Button = document.getElementById("axesOn_Button");

    var hue = 0;
    var sat = 80;
    var lit = 40;

    var lineWidth = 0.01;

    var radY = lineWidth*5*artboardH;

    

    if(axesOn==-1){

        axesOn_Button.style.outline = "none";

        return;

    } else {

        axesOn_Button.style.outline = "solid 1px white";

        
        ctx4CoordSystem.strokeStyle = 'hsl(' + hue + ', ' +  sat + '%, ' + lit + '%'  +')';
        ctx4CoordSystem.fillStyle   = 'hsl(' + hue + ', ' +  sat + '%, ' + lit + '%'  +')';
        ctx4CoordSystem.lineWidth = lineWidth*artboardH;
        ctx4CoordSystem.setLineDash([]);

        ctx4CoordSystem.beginPath();

        // vertical axis
        ctx4CoordSystem.moveTo(xOrigin*artboardW, 0+radY            );
        ctx4CoordSystem.lineTo(xOrigin*artboardW, artboardH   );
        ctx4CoordSystem.stroke();
        // axis arrow
        ctx4CoordSystem.beginPath();
        ctx4CoordSystem.ellipse(xOrigin*artboardW, radY, radY/5, radY, 0, PI, 0);
        ctx4CoordSystem.fill();


      
        // horizontal axis
        ctx4CoordSystem.beginPath();
        ctx4CoordSystem.moveTo(0            , (1-yOrigin)*artboardH); 
        ctx4CoordSystem.lineTo(artboardW -radY   , (1-yOrigin)*artboardH);
        ctx4CoordSystem.stroke();
        // axis arrow
        ctx4CoordSystem.beginPath();
        ctx4CoordSystem.ellipse(artboardW-radY, (1-yOrigin)*artboardH, radY/5, radY, PIo2, PI, 0);
        ctx4CoordSystem.fill();


    }

    

}
