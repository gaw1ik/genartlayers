



// Coord System (Axes)
var axesOn_Button = document.getElementById("axesOn_Button");
axesOn_Button.addEventListener("click", function() {
    axesOn = axesOn*-1;
    drawCoordSystem();
});

// Grid
var gridOn_Button = document.getElementById("gridOn_Button");
gridOn_Button.addEventListener("click", function() {
    gridOn = gridOn*-1;
    drawCoordSystem();
});


function drawCoordSystem() {

    ctx4CoordSystem = CTX[8];
    ctx4CoordSystem.clearRect(0,0,artboardW,artboardH);

    var xOrigin = doc1.xOrigin.value;
    var yOrigin = doc1.yOrigin.value;

    drawGrid(xOrigin, yOrigin);
    drawAxes(xOrigin, yOrigin);
    

}