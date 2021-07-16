function updateDocObject() {

  var propertyName = getPropertyNameFromInput("Property",this);

  // //console.log(typeof(propertyName),propertyName);

  doc1[propertyName].value = this.value;

  updateObjectPropertyIndicator(this);

  if (propertyName == "setTheme") {
    // //console.log("1");
    setTheme();
  }

  else if ( propertyName == "pageWidth" || propertyName == "pageHeight" || propertyName == "pageDPI" || propertyName == "canvasZoom" ) {
    // //console.log("2");
    handleResize();
  }

  else if ( propertyName == "wallHue" || propertyName == "wallSat" || propertyName == "wallLit" || propertyName == "wallShadowHeight" || propertyName == "wallShadowWidth" || propertyName=="wallShadowEllipseWidth" || propertyName == "wallShadowBlur" || propertyName == "wallShadowOpacity" || propertyName == "yOffset"  ) {
    // //console.log("3");
    var wallHue = doc1.wallHue.value;
    var wallSat = doc1.wallSat.value;
    var wallLit = doc1.wallLit.value;
    
  
    // var wallShadowHeight  = doc1.wallShadowHeight .value;
    // var wallShadowWidth  = doc1.wallShadowWidth  .value;
    var wallShadowEllipseWidth  = doc1.wallShadowEllipseWidth  .value;
    var wallShadowBlur    = doc1.wallShadowBlur   .value;
    var wallShadowOpacity = doc1.wallShadowOpacity.value;
    var artboardSizeRatio = doc1.wallPadding.value;
    var yOffset = doc1.yOffset.value;
    // drawWallShadow(wallShadowHeight, wallShadowWidth, wallShadowEllipseWidth, wallShadowBlur, wallShadowOpacity, artboardSizeRatio, yOffset, ctx4WallShadow);
    
    drawWallShadow(ctx4WallShadow);
    draw_wall(wallHue,wallSat,wallLit,ctx4Wall);
    handleResize();
  }

  else if ( propertyName == "wallWidth" || propertyName == "wallHeight" || propertyName == "wallPadding" || propertyName=="yOffset") {
    // //console.log("4");
    // var wallWidth = doc1.wallWidth.value;
    // var wallHeight = doc1.wallHeight.value;
    var wallPadding = doc1.wallPadding.value;
    handleResize();
  }

  else if ( propertyName == "frameThickness") {
    handleResize();
  }
}
