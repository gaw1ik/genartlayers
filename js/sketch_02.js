
// functions involved in sketching
// this includes calculate functions and draw functions for each layer
// would be better if this was further generalized so that each layer (c,d,e...) does not need to be explicitly defined here.

function onObjectPropertyInput() {

  var layer = getLayerElementIsOn(this);

  // Update the property and the indicator corresponding to the input that was changed 
  updateObjectProperty(this);
  updateObjectPropertyIndicator(this);

  // var propertyName = getPropertyNameFromInput("Property",this)
  // var calc = layer.object[propertyName].calc

  drawLayer(layer);

}



function drawLayer(layer) {

  xCenterOffset = 1/artboardAR * doc1.xOrigin.value;
  yCenterOffset = doc1.yOrigin.value;

  //xCenterOffset = 0;
  //yCenterOffset = 0;

  // if noDrawMode, don't draw anything and return immediately...
  if(noDrawMode == 1) {return;}

  // get layerIndex
  ctxIndex = layer.ctxIndex; 
  ctxToDrawToNow = CTX[ctxIndex]; 

  

  // clear canvas
  CTX[layer.ctxIndex].clearRect(0, 0, artboardW, artboardH); 

  // make a new random number generator
  if(layer.object.seed === undefined) {
    var seed = 1;
  } else {
    seed = layer.object.seed.value; 
  }

  myrng = new Math.seedrandom(seed);
  // //console.log("in drawLayer, myrng(1) = ",myrng(1));


  // Build the array of param values to pass into the draw function.
  var object = layer.object;



  // console.log("ctxIndex",ctxIndex)
  // console.log("Layers.length-1-ctxIndex",Layers.length-1-ctxIndex)

  var tab_buttons = document.getElementsByClassName("tablinks");
  var tab_button = tab_buttons[Layers.length-1-ctxIndex];

  try{
    //console.warn("No error caught after executing drawFunction")
    window["draw_" + layer.geometry]( object );
    tab_button.style.textDecoration = "none";
  } catch(error) {
    //console.warn("Caught Error after executing drawFunction")
    console.error(error)
    tab_button.style.textDecoration = "line-through";
  }
  
  
}



function blurCanvas(blur) {

  var blurPX = (blur*artboardH);

  var image = canvases[ctxIndex];
  
  CTX[ctxIndex].drawImage(image, 0, 0, artboardW, artboardH);
  
  CTX[ctxIndex].filter = "blur(" + blurPX.toString() + 'px)';

}







function updateObjectProperty(input) {

  layer = getLayerElementIsOn(input);  

  var object = layer.object;

  // //console.log("input.id:",input.id);

  var propertyName = getPropertyNameFromInput("Property",input);

  // console.log("propertyName",propertyName);

  object[propertyName].value = parseFloat(input.value, 10);

}



function updateObjectPropertyIndicator(input) {
  // Stuff for handling the value indicator on the inputs
  var inputLabel_Node = input.previousElementSibling;
  var inputLabel = inputLabel_Node.innerText;
  var lastIndex = inputLabel.lastIndexOf("(");

  if (lastIndex != -1) { // if it had the parenthesis
    var inputLabelBase = inputLabel.substring(0, lastIndex);
    inputLabel = inputLabelBase + "(" + input.value + ")";
    inputLabel_Node.innerText = inputLabel;
  }
}

  
// function calcAll() {

//   for(let i=0; i<Layers.length; i++){
//     // key = Tabs_Keys[i];

//     // var layer =  Layers[Layers.length-1-i];
//     var layer =  Layers[i];

//     if(layer.geometry=="") {

//       // do nothing

//     } else {

//       calcTab(layer)

//       // // make a new random number generator
//       // myrng = new Math.seedrandom(layer.object.seed);

//       // layer.object = window["calc_" + layer.geometry]( layer.object );
//     }

    
//   }

// }

function drawAll() {

  for(let i=0; i<Layers.length; i++){
    // key = Tabs_Keys[i];

    // var layer =  Layers[Layers.length-1-i];
    var layer =  Layers[i];

    CTX[i].clearRect(0, 0, artboardW, artboardH); // clear canvas

    if(layer.geometry=="") {
      // do nothing
    } else {

      drawLayer(layer);

    }

  }

}