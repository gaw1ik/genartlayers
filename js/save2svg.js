function save2svg(layerIndex,customExtension) {

    //Create a new mock canvas context. Pass in your desired width and height for your svg document.
    var ctx4svg = new C2S(artboardW,artboardH);


    var layer = Layers[layerIndex];

    // draw on SVG "canvas"

    // make a new random number generator
    if(layer.object.seed===undefined) {
        var seed = 1;
      } else {
        seed = layer.object.seed.value;
      }
      myrng = new seedrandom(seed);
    
    // draw
    window["draw_" + layer.geometry]( layer.object, ctx4svg );




    
    //serialize your SVG
    var mySerializedSVG = ctx4svg.getSerializedSvg(); //true here, if you need to convert named to numbered entities.





    var projectName = document.getElementById("fpath").value;

    fs.writeFileSync('C:/Users/Brian/OneDrive/Documents/Gen Art/Renders/' + projectName + ' - ' + customExtension + '.svg', mySerializedSVG)

    
    //If you really need to you can access the shadow inline SVG created by calling:
    // var svg = ctx.getSvg();

}