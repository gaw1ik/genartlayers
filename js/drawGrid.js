function drawGrid() {

    // gridOn = gridOn*-1;

    var gridOn_Button = document.getElementById("gridOn_Button");

    //ctx4CoordSystem = CTX[8];

    var hue = 0;
    var sat = 100;
    var lit = 50;

    var lineWidth = 0.0001;

    
    

    if(gridOn==-1){

        gridOn_Button.style.outline = "none";

        return;

    } else {

        gridOn_Button.style.outline = "solid 1px white";

        

        ctx4CoordSystem.strokeStyle = 'hsl(' + hue + ', ' +  sat + '%, ' + lit + '%'  +')';
        ctx4CoordSystem.fillStyle   = 'hsl(' + hue + ', ' +  sat + '%, ' + lit + '%'  +')';
        ctx4CoordSystem.lineWidth = lineWidth*artboardH;

        ctx4CoordSystem.beginPath();



        var N1 = 10;

        var N = Math.ceil((N1+1)/2);

        for(let i=0; i<N; i++) {

            // horizontal axis
            var x1 = 0;
            var x2 = artboardW;
            var y = (1-yOrigin)*artboardH + i*artboardH/N1;
            ctx4CoordSystem.moveTo(x1, y);
            ctx4CoordSystem.lineTo(x2, y);
            ctx4CoordSystem.stroke();

        }

        for(let i=1; i<N; i++) {

            // horizontal axis
            var x1 = 0;
            var x2 = artboardW;
            var y = (1-yOrigin)*artboardH - i*artboardH/N1;
            ctx4CoordSystem.moveTo(x1, y);
            ctx4CoordSystem.lineTo(x2, y);
            ctx4CoordSystem.stroke();

        }





        var N2 = N1*1/artboardAR;

        var N = Math.ceil((N2+1)/2);

        for(let i=0; i<N; i++) {

            // vertical axis
            var y1 = 0;
            var y2 = artboardH;
            var x = xOrigin*artboardW + i*artboardW/N2;
            ctx4CoordSystem.moveTo(x, y1);
            ctx4CoordSystem.lineTo(x, y2);
            ctx4CoordSystem.stroke();

        }

        for(let i=1; i<N; i++) {

            // vertical axis
            var y1 = 0;
            var y2 = artboardH;
            var x = xOrigin*artboardW - i*artboardW/N2;
            ctx4CoordSystem.moveTo(x, y1);
            ctx4CoordSystem.lineTo(x, y2);
            ctx4CoordSystem.stroke();

        }


    }

    

}




function drawGrid(xOrigin,yOrigin) {

    // gridOn = gridOn*-1;

    var gridOn_Button = document.getElementById("gridOn_Button");

    //ctx4CoordSystem = CTX[8];

    var hue = 0;
    var sat = 100;
    var lit = 50;

    var lineWidth = 0.0002;

    
    

    if(gridOn==-1){

        gridOn_Button.style.outline = "none";

        return;

    } else {

        gridOn_Button.style.outline = "solid 1px white";

        
        ctx4CoordSystem.strokeStyle = 'hsl(' + hue + ', ' +  sat + '%, ' + lit + '%'  +')';
        ctx4CoordSystem.fillStyle   = 'hsl(' + hue + ', ' +  sat + '%, ' + lit + '%'  +')';
        ctx4CoordSystem.lineWidth = lineWidth*artboardH;
        

        ctx4CoordSystem.beginPath();

        var artboardWF = 1/artboardAR;

        // horizontal lines
        var N1 = 10;
        var N = Math.ceil(N1+1);

        var cellSize = 1/N1 * artboardH;

        ctx4CoordSystem.setLineDash([cellSize/20, cellSize/5]);

        var factor = ((1-yOrigin)*artboardH % cellSize*artboardH)/artboardH;

        for(let i=0; i<N; i++) {

            var x1 = 0;
            var x2 = artboardW;
            var y = i*cellSize + factor;
            ctx4CoordSystem.moveTo(x1, y);
            ctx4CoordSystem.lineTo(x2, y);
            ctx4CoordSystem.stroke();

        }




        // vertical lines
        var N2 = N1*1/artboardAR;
        var N = Math.ceil(N2+1);

        factor = (xOrigin*artboardW % cellSize*artboardW)/artboardW;

        // console.log("artboardWF",artboardWF)
        // console.log("factor",factor)

        for(let i=0; i<N; i++) {

            var y1 = 0;
            var y2 = artboardH;
            var x = i*cellSize + factor;
            ctx4CoordSystem.moveTo(x, y1);
            ctx4CoordSystem.lineTo(x, y2);
            ctx4CoordSystem.stroke();

        }


    }

    

}
