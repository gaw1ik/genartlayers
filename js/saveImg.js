
// functions involved in saving the image.
// there's a function called combine() which takes each layer and redraws them onto the c-canvas
// then the data from the c-canvas is saved to image using toDataURL

// const { TouchBarScrubber } = require("electron"); // what the hell is this?



// this function combines all the canvas drawings into one layer so that it can be exported as an image
function combine() {

  ctx4Shadow.clearRect(0, 0, w, h); 

 
  // for each layer, draw the image onto canvas4Shadow. (canvas4Shadow is a canvas that used to be used to create the dropshadow effect. Now, I just use it for combining the images for export.)
  for(let i=0; i<Layers.length; i++) {

    
      var layerIndex = i;

      var layer = Layers[layerIndex];

      // make a new random number generator
      if(layer.object.seed===undefined) { var seed = 1; } else { seed = layer.object.seed.value; }
      myrng = new Math.seedrandom(seed);


      // Build the array of param values to pass into the draw function.
      var paramValues = [];
      var object = layer.object;
      var keys = Object.keys(object);

      for(let i=0; i<keys.length; i++) {
          var key = keys[i];
          paramValue = object[key].value;
          paramValues.push(paramValue);
      }

      // //console.log("just drew...");
      // //console.log("layerIndex",layerIndex);
      // //console.log("layer.geometry",layer.geometry);

      ctxToDrawToNow = ctx4Shadow;
      // draw on canvas4Shadow
      window["draw_" + layer.geometry]( object );

  }
  
}




function exportImg(pixWidth) {

  var picW = doc1.pageWidth .value;
  var picH = doc1.pageHeight.value;

  var artboardAspectRatio = picH/picW;


  canvas4Shadow.width  = pixWidth;
  canvas4Shadow.height = pixWidth * artboardAspectRatio;

  w = canvas4Shadow.width;
  h = canvas4Shadow.height;

  combine();

  var link = document.getElementById('save_img_link');
  link.setAttribute('download', 'render.png');
  link.setAttribute('href', canvas4Shadow.toDataURL("image/png").replace("image/png", "image/octet-stream"));
  link.click();

  handleResize();
  
}








function saveDirect(customExtension) {

  // get original so you can reset it after
  // var original_pageDPI = doc1.pageDPI.value;

  var exportDPI = doc1.exportDPI.value;

  var pageWidth = doc1.pageWidth.value;
  var pageHeight = doc1.pageHeight.value;

  // doc1.pageDPI.value = exportDPI;


  // canvas4Shadow.style.width  = canvas4Wall.style.width;
  // canvas4Shadow.style.height = canvas4Wall.style.height;




  // handleResize();

  var resWidth  = exportDPI * pageWidth;
  var resHeight = exportDPI * pageHeight;

  canvas4Shadow.width  = resWidth;
  canvas4Shadow.height = resHeight;

  //console.log(resWidth,"resWidth");
  //console.log(resHeight,"resHeight");

  w = resWidth;
  h = resHeight;

  // canvas4Shadow.width  = w; // HTML
  // canvas4Shadow.height = h; // HTML  

  // canvas4Shadow.style.width  = canvas4Shadow.width  / dpr + 'px'; // CSS
  // canvas4Shadow.style.height = canvas4Shadow.height / dpr + 'px'; // CSS



  combine();

  // imageURL = canvas4Shadow.toDataURL("image/png").replace("image/png", "image/octet-stream");
  imageURL = canvas4Shadow.toDataURL("image/png");
  // data = imageURL.substring(imageURL.indexOf(',') + 1)

  var data = imageURL.replace(/^data:image\/\w+;base64,/, "");

  var buf = Buffer.from(data, 'base64');

  var projectName = document.getElementById("fpath").value;

  fs.writeFileSync('C:/Users/Brian/OneDrive/Documents/Gen Art/Renders/' + projectName + ' - render - ' +  ' - ' + customExtension + '.png', buf)


  // reset to original values
  // doc1.pageDPI.value = original_pageDPI;

  // handleResize();

}


function saveDirectPix(pixLongDimension, customExtension) {

  var pageWidth = doc1.pageWidth.value;
  var pageHeight = doc1.pageHeight.value;


  var artboardAspectRatio = pageHeight/pageWidth;


  if(pageWidth > pageHeight) {
    resWidth = pixLongDimension;
    resHeight = pixLongDimension * artboardAspectRatio;
  } else {
    resHeight = pixLongDimension;
    resWidth = pixLongDimension / artboardAspectRatio;
  }

  //console.log("artboard dimensions:",resWidth, " x ", resHeight);

  resWidth = Math.ceil(resWidth);
  resHeight = Math.ceil(resHeight);

  canvas4Shadow.width = resWidth;
  canvas4Shadow.height =resHeight;  

  w = resWidth;
  h = resHeight;


  /////////////////

  combine();

  ////////////////


  // imageURL = canvas4Shadow.toDataURL("image/png").replace("image/png", "image/octet-stream");
  imageURL = canvas4Shadow.toDataURL("image/png");
  // data = imageURL.substring(imageURL.indexOf(',') + 1)

  var data = imageURL.replace(/^data:image\/\w+;base64,/, "");

  var buf = Buffer.from(data, 'base64');

  var projectName = document.getElementById("fpath").value;

  fs.writeFileSync('C:/Users/Brian/OneDrive/Documents/Gen Art/Renders/' + projectName + ' - render - ' +  ' - ' + customExtension + '.png', buf)


}









// for just exporting a single layer
function exportOneLayer(layerIndex,extensionName) {

  

  // get original so you can reset it after
  var original_pageDPI = doc1.pageDPI.value;

  var exportDPI = doc1.exportDPI.value / dpr;

  doc1.pageDPI.value = exportDPI;

  handleResize();

  // combine();

  imageURL = canvases[layerIndex].toDataURL("image/png");

  var data = imageURL.replace(/^data:image\/\w+;base64,/, "");

  var buf = Buffer.from(data, 'base64');

  var projectName = document.getElementById("fpath").value;

  fs.writeFileSync('C:/Users/Brian/OneDrive/Documents/Gen Art/' + projectName +  '/render - ' + projectName + ' - ' + extensionName + '.png', buf)

  // reset to original values
  doc1.pageDPI.value = original_pageDPI;

  //console.log("export done");

  handleResize();



}








function combineOntoWall(wallWidth,wallHeight,wallHue,wallSat,wallLit,artboardSizeRatio,resWidth,resHeight,yOffset) {

  var original_wallWidth = doc1.wallWidth  .value;
  var original_wallHeight = doc1.wallHeight  .value;
  var original_wallPadding = doc1.wallPadding  .value;
  var original_wallShadowWidth = doc1.wallShadowWidth  .value;
  var original_wallShadowHeight = doc1.wallShadowHeight  .value;
  var original_wallShadowBlur = doc1.wallShadowBlur  .value;
  var original_wallShadowOpacity = doc1.wallShadowOpacity  .value;

  doc1.wallWidth  .value = wallWidth ;
  doc1.wallHeight .value = wallHeight;
  doc1.wallPadding.value = artboardSizeRatio;

  handleResize()

  // // Wall and Shadow Canvas Stuff
  // canvas4WallShot.style.width  = canvas4Wall.style.width;
  // canvas4WallShot.style.height = canvas4Wall.style.height;
  canvas4WallShot.width  = resWidth ;
  canvas4WallShot.height = resHeight;

  // // Wall and Shadow Canvas Stuff
  // canvas4Wall.style.width  = canvas4Wall.style.width;
  // canvas4Wall.style.height = canvas4Wall.style.height;
  canvas4Wall.width  = resWidth ;
  canvas4Wall.height = resHeight;



  draw_wall(wallHue,wallSat,wallLit,ctx4Wall);

  //
  // var wallShadowHeight  = doc1.wallShadowHeight .value;
  // var wallShadowWidth  = doc1.wallShadowWidth  .value;
  // var wallShadowBlur    = doc1.wallShadowBlur   .value;
  // var wallShadowOpacity = doc1.wallShadowOpacity.value;

  // drawWallShadow(wallShadowHeight, wallShadowWidth, wallShadowBlur, wallShadowOpacity, artboardSizeRatio, yOffset, ctx4WallShadow) ;
  drawWallShadow(ctx4WallShadow);
  //


  // // // Frame Canvas Stuff
  // canvas4Frame.style.width  = canvas4Wall.style.width;
  // canvas4Frame.style.height = canvas4Wall.style.height;
  // canvas4Frame.width  = resWidth ;
  // canvas4Frame.height = resHeight;

  var lineWidth = doc1.frameThickness.value; // inches
  drawFrame(artboardSizeRatio, lineWidth, yOffset, ctx4Frame);

  var canvas4WallWidth  = canvas4Wall.width
  var canvas4WallHeight = canvas4Wall.height



  ////////////////// artboard stuff
  var pageHeight = doc1.pageHeight.value;
  var pageWidth  = doc1.pageWidth.value;
  // artboardAspectRatio = doc1.pageHeight.value / doc1.pageWidth.value;
  if(pageHeight<pageWidth){
    var artboardWidthFrac  = artboardSizeRatio;
    var artboardHeightFrac = artboardSizeRatio * canvas4Shadow.height / canvas4Shadow.width;
  } else {
    var artboardHeightFrac  = artboardSizeRatio;
    var artboardWidthFrac = artboardSizeRatio * canvas4Shadow.width / canvas4Shadow.height;
  }


  // // Combine Canvas stuff (canvas4Shadow)
  // canvas4Shadow.style.width  = canvas4Wall.style.width  * artboardWidthFrac ;
  // canvas4Shadow.style.height = canvas4Wall.style.height * artboardHeightFrac;

  var x0 = (0.5-artboardWidthFrac /2)           * resWidth;
  var y0 = (0.5-artboardHeightFrac/2 - yOffset) * resHeight;

  artboardWidth  = artboardWidthFrac  * resWidth;
  artboardHeight = artboardHeightFrac * resHeight;

  canvas4Shadow.width  = artboardWidth;
  canvas4Shadow.height = artboardHeight;

  w = artboardWidth;
  h = artboardHeight;

  combine();






  //////////////// draw em' all onto the canvas4WallShot

  ctx4WallShot.drawImage(canvas4Wall      ,  0,  0, resWidth, resHeight);
  ctx4WallShot.drawImage(canvas4WallShadow,  0,  0, resWidth, resHeight);
  
  ctx4WallShot.drawImage(canvas4Shadow    , x0, y0, artboardWidth, artboardHeight  );
  ctx4WallShot.drawImage(canvas4Frame     ,  0,  0, resWidth, resHeight);

  // //console.log("WALL")
  //console.log("canvas4WallWidth",canvas4WallWidth)
  //console.log("canvas4WallHeight",canvas4WallHeight)
  // //console.log("ARTBOARD")
  // //console.log("x0",x0)
  // //console.log("y0",y0)
  //console.log("artboardWidth",artboardWidth)
  //console.log("artboardHeight",artboardHeight)

}



    // imageURL = canvas4WallShot.toDataURL("image/png");

    // var data = imageURL.replace(/^data:image\/\w+;base64,/, "");

    // var buf = Buffer.from(data, 'base64');

    // var projectName = document.getElementById("fpath").value;

    // fs.writeFileSync('C:/Users/Brian/OneDrive/Documents/Gen Art/Renders/' + projectName + '  - wall render - ' + customExtension + '.png', buf)


    // // // reset everything
    // doc1.wallWidth  .value = original_wallWidth
    // doc1.wallHeight  .value = original_wallHeight;
    // doc1.wallPadding  .value = original_wallPadding;
    // doc1.wallShadowWidth  .value = original_wallShadowWidth;
    // doc1.wallShadowHeight  .value = original_wallShadowHeight;
    // doc1.wallShadowBlur  .value = original_wallShadowBlur;
    // doc1.wallShadowOpacity  .value = original_wallShadowOpacity;

    // ctx4WallShot.clearRect(0,0,resWidth,resHeight);



function saveAsPNG(canvas, fileDirectory, customExtension) {

  var imageURL = canvas.toDataURL("image/png");

  var data = imageURL.replace(/^data:image\/\w+;base64,/, "");

  var buf = Buffer.from(data, 'base64');

  var projectName = document.getElementById("fpath").value;

  // fs.writeFileSync('C:/Users/Brian/OneDrive/Documents/Gen Art/Renders/' + projectName + '  - wall render - ' + customExtension + '.png', buf);

  fs.writeFileSync(fileDirectory + projectName + customExtension + '.png', buf);


}






//////////////////////////////////////////// WALL SHOT EXPORT FUNCTIONS

function exportDesktopWallShot() {
  wallWidth = 16
  wallHeight = 9
  wallHue = doc1.wallHue.value
  wallSat = 20
  wallLit = 30
  artboardHeightRatio = 0.7
  yOffset = 0.03
  resWidth = 1920
  resHeight = 1080
  //console.log("HI")
  exportWallShot(wallWidth,wallHeight,wallHue,wallSat,wallLit,artboardHeightRatio,resWidth,resHeight,yOffset)
}


function exportPhoneWallShot() {
  wallWidth = 9
  wallHeight = 16
  wallHue = doc1.wallHue.value
  wallSat = 20
  wallLit = 30
  artboardHeightRatio = 0.88
  yOffset = -0.1
  resWidth = 1080
  resHeight = 1920
  //console.log("HI")
  exportWallShot(wallWidth,wallHeight,wallHue,wallSat,wallLit,artboardHeightRatio,resWidth,resHeight,yOffset)
}


function exportIGWallShot(versionNumber) {

  wallWidth = doc1.wallWidth.value;
  wallHeight = doc1.wallHeight.value;

  wallHue = doc1.wallHue.value;
  wallSat = doc1.wallSat.value;
  wallLit = doc1.wallLit.value;

  artboardHeightRatio = doc1.wallPadding.value;
  yOffset = doc1.yOffset.value;

  resWidth = 1080;
  resHeight = 1080;

  combineOntoWall(wallWidth,wallHeight,wallHue,wallSat,wallLit,artboardHeightRatio,resWidth,resHeight,yOffset);

  var fileDirectory = 'C:/Users/Brian/OneDrive/Documents/Gen Art/Renders/';

  var fileExtension = ' - ig wall render - ' + versionNumber;

  saveAsPNG(canvas4WallShot, fileDirectory, fileExtension);

  ctx4WallShot.clearRect(0,0,resWidth,resHeight);

}


function exportIGWallShot4Slideshow(versionNumber) {

  var wallWidth = doc1.wallWidth.value;
  var wallHeight = doc1.wallHeight.value;

  var wallHue = doc1.wallHue.value;
  var wallSat = doc1.wallSat.value;
  var wallLit = doc1.wallLit.value;

  var artboardHeightRatio = doc1.wallPadding.value;
  var yOffset = doc1.yOffset.value;

  var resWidth = 800;
  var resHeight = 800;

  combineOntoWall(wallWidth,wallHeight,wallHue,wallSat,wallLit,artboardHeightRatio,resWidth,resHeight,yOffset);

  var fileDirectory = 'C:/Users/Brian/Desktop/slideshow/';

  var fileExtension = ' - ig wall render (for slideshow) - ' + versionNumber;

  saveAsPNG(canvas4WallShot, fileDirectory, fileExtension);

  ctx4WallShot.clearRect(0,0,resWidth,resHeight);

}


function exportWallShotAsShown(customExtension) {
  wallWidth = doc1.wallWidth.value
  wallHeight = doc1.wallHeight.value
  wallHue = doc1.wallHue.value
  wallSat = doc1.wallSat.value
  wallLit = doc1.wallLit.value
  artboardHeightRatio = doc1.wallPadding.value
  yOffset = doc1.yOffset.value
  resWidth = 1080 * (wallWidth/wallHeight);
  resHeight = 1080
  exportWallShot(wallWidth,wallHeight,wallHue,wallSat,wallLit,artboardHeightRatio,resWidth,resHeight,yOffset,customExtension)
}


function exportDesktopWallShot2() {
  wallWidth = doc1.wallWidth.value
  wallHeight = doc1.wallHeight.value
  wallHue = doc1.wallHue.value
  wallSat = doc1.wallSat.value
  wallLit = doc1.wallLit.value
  artboardHeightRatio = doc1.wallPadding.value
  yOffset = doc1.yOffset.value
  resWidth = 800 * (wallWidth/wallHeight);
  resHeight = 800
  exportWallShot(wallWidth,wallHeight,wallHue,wallSat,wallLit,artboardHeightRatio,resWidth,resHeight,yOffset)
}




// function exportIGWallShot() {

//   // var dpi_export = doc1.exportDPI.value;

//   var dpr = window.devicePixelRatio;


//   // Set to Desktop Pixel Dimensions
//   wallWidth  = 1080
//   wallHeight = 1080

//   // Wall and Shadow Canvas Stuff
//   canvas4Wall.style.width  = wallWidth / dpr;
//   canvas4Wall.style.height = wallHeight / dpr;
//   canvas4Wall.width  = wallWidth;
//   canvas4Wall.height = wallHeight;

//   canvas4WallShadow.style.width  = wallWidth / dpr;
//   canvas4WallShadow.style.height = wallHeight / dpr;
//   canvas4WallShadow.width  = wallWidth;
//   canvas4WallShadow.height = wallHeight;
  

//   // draw the wall
//   var wallHue = doc1.wallHue.value;
//   var wallSat = doc1.wallSat.value;
//   var wallLit = doc1.wallLit.value;
//   draw_wall(wallHue,wallSat,wallLit,ctx4Wall);


//   // The Art Board Stuff
//   var artboardHeight  = wallHeight * 0.7;
//   var artboardAspectRatio = doc1.pageWidth.value/doc1.pageHeight.value;
//   var artboardWidth = artboardHeight * artboardAspectRatio;

//   var artboardStyleHeight = artboardHeight / dpr;
//   var artboardStyleWidth  = artboardWidth  / dpr;

  
//   canvas4Shadow.style.width   = artboardStyleWidth .toString() + 'px';
//   canvas4Shadow.style.height  = artboardStyleHeight.toString() + 'px';

//   canvas4Shadow.width  = artboardWidth ;
//   canvas4Shadow.height = artboardHeight;

//   // reset w and h to the current HTML dimensions of the artboard canvases
//   w = canvas4Shadow.width;
//   h = canvas4Shadow.height;

//   //
//   var wallShadowHeight  = doc1.wallShadowHeight .value;
//   var wallShadowHWidth  = doc1.wallShadowWidth  .value;
//   var wallShadowBlur    = doc1.wallShadowBlur   .value;
//   var wallShadowOpacity = doc1.wallShadowOpacity.value;

//   drawWallShadow(wallShadowHeight, wallShadowHWidth, wallShadowBlur, wallShadowOpacity, ctx4WallShadow) 
//   //

//   ctx4Wall.drawImage(canvas4WallShadow, 0, 0, wallWidth, wallHeight);

  
//   combine();

//   // var artboardHeight  = wallHeight * 0.7;

//   x0 = (wallWidth  - artboardWidth )/2;
//   y0 = (wallHeight - artboardHeight)/2;

//   ctx4Wall.drawImage(canvas4Shadow,x0,y0,artboardWidth,artboardHeight);

//   var link = document.getElementById('save_img_link');
//   link.setAttribute('download', 'render.png');
//   link.setAttribute('href', canvas4Wall.toDataURL("image/png").replace("image/png", "image/octet-stream"));
//   link.click();
// }