// a function handling window resize events
// this function is also triggered at other times, like when a project is opened




function sizeThisCanvas(canvas, width, height, scale) {
  // Wall Canvas Sizing
  canvas.style.height = height.toString() + "px";
  canvas.style.width = width.toString() + "px";

  // var canvas_Left = (drawCont_width  - canvas4Wall_width ) / 2;
  // var canvas_Top  = (drawCont_height - canvas4Wall_height) / 2;
  var canvas_Left = 0;
  var canvas_Top  = 0;

  canvas.style.left = canvas_Left.toString() + "px";
  canvas.style.top  =  canvas_Top.toString() + "px";

  canvas.height = height * dpr * scale; // HTML
  canvas.width  = width  * dpr * scale; // HTML
}

function sizeThisLayerCanvas(thisCanvas, canvasLeft, canvasTop, canvas_style_width, canvas_style_height, scale) {
  thisCanvas.style.width   = canvas_style_width.toString() + "px";
  thisCanvas.style.height = canvas_style_height.toString() + "px";

  thisCanvas.style.left = canvasLeft.toString() + "px";
  thisCanvas.style.top   = canvasTop.toString() + "px";

  thisCanvas.width  = Math.ceil(canvas_style_width  * dpr * scale); // HTML
  thisCanvas.height = Math.ceil(canvas_style_height * dpr * scale); // HTML
}




function handleResize() {
  //console.log("**Resize**");

  dpr = window.devicePixelRatio; // global

  var scale = 2;

  picW = doc1.pageWidth.value;
  picH = doc1.pageHeight.value;

  // var dpi = doc1.pageDPI.value;

  // //console.log("dpi",dpi)

  var yOffset = doc1.yOffset.value;

  // var canvasZoom = doc1.canvasZoom.value;

  // //console.log(canvasZoom);

  var aspectRatio = picH / picW;

  drawingContainer = document.getElementById("drawing-container");
  // inputContainer = document.getElementById("input-form-container");

  var drawCont_width = +getComputedStyle(drawingContainer)
    .getPropertyValue("width")
    .slice(0, -2);

  var drawCont_height = +getComputedStyle(drawingContainer)
    .getPropertyValue("height")
    .slice(0, -2);

  var drawCont_Pad = doc1.wallPadding.value;


  var drawCont_aspectRatio = drawCont_height/drawCont_width; // 12/16, for instance

  var wallAspectRatio = drawCont_aspectRatio;

  // var wallAspectRatio = doc1.wallHeight.value/doc1.wallWidth.value; // 9/16, for instance

  // if(drawCont_aspectRatio > wallAspectRatio){
  //   var canvas4Wall_width  = drawCont_width;
  //   var canvas4Wall_height = canvas4Wall_width*wallAspectRatio;
  // } else {
  //   var canvas4Wall_height  = drawCont_height;
  //   var canvas4Wall_width   = canvas4Wall_height/wallAspectRatio;
  // }

  var canvas4Wall_height  = drawCont_height;
  var canvas4Wall_width   = drawCont_width;


  var artBoardAspectRatio = picH / picW;

  if(wallAspectRatio < artBoardAspectRatio){
    var canvas_style_height = drawCont_Pad * canvas4Wall_height;
    var canvas_style_width  = canvas_style_height / aspectRatio;
  } else {
    var canvas_style_width   = drawCont_Pad * canvas4Wall_width;
    var canvas_style_height  = canvas_style_width * aspectRatio;
  }


  // get the CSS width and height based on the drawing container


  // // then check to see if the height is met, and if not make adjustements based on height
  // if (canvas_style_height > drawCont_Pad * canvas4Wall_height) {
  //   // get the CSS width and height based on the drawing container
  //   canvas_style_height = drawCont_Pad * canvas4Wall_width;
  //   canvas_style_width = canvas_style_height / aspectRatio;
  // }

  // set the offset position to center it
  var canvasLeft = (drawCont_width - canvas_style_width) / 2;
  var canvasTop = (drawCont_height - canvas_style_height) / 2 - yOffset*canvas4Wall_height;



  // resize all the named canvases
  sizeThisCanvas(canvas4Wall, canvas4Wall_width, canvas4Wall_height, scale);
  sizeThisCanvas(canvas4WallShadow, canvas4Wall_width, canvas4Wall_height, scale);
  sizeThisCanvas(canvas4WallShot, canvas4Wall_width, canvas4Wall_height, scale);
  sizeThisCanvas(canvas4Frame, canvas4Wall_width, canvas4Wall_height, scale);


  // for all of the layer canvases
  for (let i = 0; i < canvases.length; i++) {
    var thisCanvas = canvases[i];

    sizeThisLayerCanvas(thisCanvas, canvasLeft, canvasTop, canvas_style_width, canvas_style_height, scale)

  }

  // set HTML Width/Height of canvas4Export
  sizeThisLayerCanvas(canvas4Export, canvasLeft, canvasTop, canvas_style_width, canvas_style_height, scale)


  // Update the global artboardW and artboardH variables (width and height for calc and draw functions)
  artboardW = canvas0.width;
  artboardH = canvas0.height;

  artboardAR = artBoardAspectRatio;

  drawAll();


  drawWall();

  // var wallShadowHeight  = doc1.wallShadowHeight .value;
  // var wallShadowHWidth  = doc1.wallShadowWidth  .value;
  // var wallShadowEllipseWidth = doc1.wallShadowEllipseWidth  .value;
  // var wallShadowBlur    = doc1.wallShadowBlur   .value;
  // var wallShadowOpacity = doc1.wallShadowOpacity.value;
  // var artboardHeightRatio = doc1.wallPadding.value;
  var yOffset = doc1.yOffset.value;
  var wallPadding = doc1.wallPadding.value;
  drawWallShadow(yOffset,wallPadding);

  drawCoordSystem();

}






function drawWall()  {

  // // Wall Stuff
  // var hue = doc1.wallHue.value
  // var sat = doc1.wallSat.value
  // var lit = doc1.wallLit.value

  var ctx = ctx4Wall;

  var wallHue = doc1.wallHue.value;
  var wallSat = doc1.wallSat.value;
  var wallLit = doc1.wallLit.value;

  var wall_width  = canvas4Wall.width
  var wall_height = canvas4Wall.height;

  // //console.log("wall_width in draw_wall " , wall_width )
  // //console.log("wall_height in draw_wall" , wall_height)

  var blur = 0.6 * wall_height;
  

  ctx.clearRect(0,0,wall_width,wall_height);

  // ctx.filter = 'blur(' + blur + 'px)';

  // make a new random number generator
  var seed = 1; myrng = new Math.seedrandom(seed);


  // this part draws a rectangle that covers the entire wall.
  ctx.beginPath()
  ctx.rect(-1*wall_width,-1*wall_height,3*wall_width,3*wall_height)
  ctx.fillStyle = 'hsl(' + wallHue + ', ' +  wallSat + '%, ' + wallLit + '%'  +')'
  ctx.fill()

  var variation = 30


  // This part draws the blurry circles. (currently just keeping draw_wall simple and leaving this out).
  // for(i=0; i<3; i++){

  //   ctx.beginPath()
  //   x0 = myrng()*wall_width
  //   y0 = myrng()*wall_height
  //   rad = getRandomFloat(0.2*wall_height,0.5*wall_height)

  //   var wallHue = vary(wallHueCenter,variation);
  //   var wallSat = vary(wallSatCenter,variation);
  //   var wallLit = vary(wallLitCenter,variation);
  
  
  //   ctx.ellipse( x0, y0, rad, rad, 0, 0, Math.PI*2)
  //   ctx.fillStyle = 'hsl(' + wallHue + ', ' +  wallSat + '%, ' + wallLit + '%'  +')'
  //   ctx.fill()
  // }

  // ctx.drawImage(canvas4Wall,0,0,wall_width,wall_height);

  // 



}






function drawWallShadow(yOffset, wallPadding)  {

  var ctx = ctx4WallShadow;

  // bring in properties
  var wallShadowHeight  = doc1.wallShadowHeight .value;
  var wallShadowWidth  = doc1.wallShadowWidth  .value;
  var wallShadowEllipseWidth = doc1.wallShadowEllipseWidth  .value;
  var wallShadowBlur    = doc1.wallShadowBlur   .value;
  var wallShadowOpacity = doc1.wallShadowOpacity.value;
  // var wallPadding = doc1.wallPadding.value;
  //var yOffset = doc1.yOffset.value;


  var wall_width  = canvas4WallShadow.width;
  var wall_height = canvas4WallShadow.height;

  //console.log("wall_width",wall_width)
  //console.log("wall_height",wall_height)

  //console.log("wallPadding",wallPadding)


  // // Shadow stuff
  ctx.clearRect(0,0,wall_width,wall_height);


  var wallAspectRatio = wall_height / wall_width;

  var artBoardAspectRatio = doc1.pageHeight.value / doc1.pageWidth.value;

  // if(wallAspectRatio < artBoardAspectRatio) {
  //   var artboardHeight = wallPadding * wall_height;
  //   var artboardWidth  = artboardHeight / artBoardAspectRatio;
  // } else {
  //   // //console.log("<")
  //   var artboardWidth  = wallPadding * wall_width;
  //   var artboardHeight = artboardWidth * artBoardAspectRatio;
  // }

  //console.log("artboardW in drawWallShadow",artboardW)
  //console.log("artboardH in drawWallShadow",artboardH)


  var shadow_height = wallShadowHeight * artboardH;
  var shadow_width  = wallShadowWidth  * artboardW;
  var blur          = wallShadowBlur   * artboardH;
  var opacity       = wallShadowOpacity   ;

  //console.log("shadow_height",shadow_height)
  //console.log("shadow_width",shadow_width)



  var shadow_ellipse_width  = wallShadowEllipseWidth  *  artboardW;
  var shadow_ellipse_height = wallShadowEllipseWidth *  artboardH;


  var x0 = ( 0.5         *wall_width  - shadow_width /2);
  var y0 = ((0.5-yOffset)*wall_height - shadow_height/2);

  ctx.filter = 'blur(' + blur + 'px)' + 'opacity(' + opacity + '%)';


  ctx.beginPath()
  ctx.rect(x0,y0,shadow_width,shadow_height)

  

  var hue = doc1.wallHue.value
  var lit = 0;
  var sat = 0;

  ctx.fillStyle = 'hsl(' + hue + ', ' +  sat + '%, ' + lit + '%'  +')'
  ctx.fill()

  ctx.beginPath()
  ctx.ellipse(0.5*wall_width,(0.5-yOffset)*wall_height, shadow_ellipse_width/2,shadow_ellipse_height/2, 0,0,twoPI);
  ctx.fill()

}
















function drawFrame(artboardHeightRatio, lineWidth, yOffset, ctx)  {

  if(lineWidth==0){return;} // don't draw anything if the frame width is set to zero

  var wall_width  = canvas4Wall.width;
  var wall_height = canvas4Wall.height;

  // // Shadow stuff
  ctx.clearRect(0,0,wall_width,wall_height);

  var wallAspectRatio = doc1.wallHeight.value / doc1.wallWidth.value;

  var artBoardAspectRatio = doc1.pageHeight.value / doc1.pageWidth.value;

  

  if(wallAspectRatio < artBoardAspectRatio) {
    var artboardHeight = artboardHeightRatio * wall_height;
    var artboardWidth  = artboardHeight / artBoardAspectRatio;
  } else {
    // //console.log("<")
    var artboardWidth  = artboardHeightRatio * wall_width;
    var artboardHeight = artboardWidth * artBoardAspectRatio;
  }

  var x0 = ( (0.5)         * wall_width  - artboardWidth /2);
  var y0 = ( (0.5-yOffset) * wall_height - artboardHeight/2);


  var dpi = artboardWidth / doc1.pageWidth.value;

  // //console.log("wall_width",wall_width)
  // //console.log("artboardWidth",artboardWidth)
  // //console.log("dpi",dpi)

  // mat
  matThickness = 0;

  var matThickPix = matThickness*dpi;

  ctx.beginPath();

  ctx.rect(x0, y0, artboardWidth, matThickPix);
  ctx.rect(x0+artboardWidth-matThickPix, y0, matThickPix, artboardHeight);
  ctx.rect(x0, y0+artboardHeight-matThickPix, artboardWidth, matThickPix);
  ctx.rect(x0, y0, matThickPix, artboardHeight);

  var hue = 0;
  var sat = 0;
  var lit = 100;

  ctx.fillStyle = 'hsl(' + hue + ', ' +  sat + '%, ' + lit + '%'  +')';
  ctx.fill();



  // frame
  ctx.beginPath()
  ctx.moveTo(x0, y0);
  ctx.lineTo(x0+artboardWidth, y0);
  ctx.lineTo(x0+artboardWidth, y0+artboardHeight);
  ctx.lineTo(x0, y0+artboardHeight);
  ctx.closePath();

  var hue = 0;
  var sat = 0;
  var lit = 10;

  ctx.strokeStyle = 'hsl(' + hue + ', ' +  sat + '%, ' + lit + '%'  +')'
  wall_width
  ctx.lineWidth = lineWidth * dpi;
  ctx.stroke()






}




