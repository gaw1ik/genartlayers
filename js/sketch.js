
// functions involved in sketching
// this includes calculate functions and draw functions for each layer
// would be better if this was further generalized so that each layer (c,d,e...) does not need to be explicitly defined here.

function onObjectPropertyInput() {

  var layer = getLayerElementIsOn(this);

  // Update the property and the indicator corresponding to the input that was changed 
  updateObjectProperty(this);
  updateObjectPropertyIndicator(this);

  var propertyName = getPropertyNameFromInput("Property",this)
  var calc = layer.object[propertyName].calc

  // Run CALC. Note that I'm not utilizing the calc VS draw functionality at the moment to keep things simple.
  if(calc==1){
    calcTab(layer);
  } else {  
    drawTab(layer)
  }

}


// function calcTab(layer) {

//   // CALC FIRST
//   // make a new random number generator
//   if(layer.object.seed===undefined) {
//     var seed = 1;
//   } else {
//     seed = layer.object.seed.value;
//   }
//   myrng = new Math.seedrandom(seed);
//   // calculate
//   layer.object = window["calc_" + layer.geometry]( layer.object );


//   // DRAW SECOND
//   // clear canvas
//   // console.log("layer.ctxIndex",layer.ctxIndex);
//   ctx[layer.ctxIndex].clearRect(0, 0, w, h); 


//   // console.log("in calcTab, seed = ", layer.object.seed);
//   // console.log("in calcTab, myrng(1) = ",myrng(1));

//   // draw on canvas
//     // make a new random number generator
//     if(layer.object.seed===undefined) {
//       var seed = 1;
//     } else {
//       seed = layer.object.seed.value;
//     }
//     myrng = new Math.seedrandom(seed);
//   window["draw_" + layer.geometry]( layer.object, ctx[layer.ctxIndex] );

  

// }

function drawTab(layer) {

  // get layer
  // var layer = getLayerElementIsOn(this); 

  // clear canvas
  ctx[layer.ctxIndex].clearRect(0, 0, w, h); 

  // make a new random number generator
  if(layer.object.seed===undefined) {
    var seed = 1;
  } else {
    seed = layer.object.seed.value;
    
  }
  myrng = new Math.seedrandom(seed);
  // console.log("in drawTab, myrng(1) = ",myrng(1));

  // draw on canvas
  window["draw_" + layer.geometry]( ctx[layer.ctxIndex] );
  
}


function updateObjectProperty(input) {

  layer = getLayerElementIsOn(input);  

  var object = layer.object;

  // Update the property that was changed in the layer 
  // var id = input.id;

  // console.log("input.id:",input.id);

  var propertyName = getPropertyNameFromInput("Property",input);

  // console.log("propertyName:",propertyName);

  object[propertyName].value = parseFloat(input.value,10);
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

  
function calcAll() {

  for(let i=0; i<Tabs.length; i++){
    // key = Tabs_Keys[i];

    // var layer =  Tabs[Tabs.length-1-i];
    var layer =  Tabs[i];

    if(layer.geometry=="") {

      // do nothing

    } else {

      calcTab(layer)

      // // make a new random number generator
      // myrng = new Math.seedrandom(layer.object.seed);

      // layer.object = window["calc_" + layer.geometry]( layer.object );
    }

    
  }

}

function drawAll() {
  for(let i=0; i<Tabs.length; i++){
    // key = Tabs_Keys[i];

    // var layer =  Tabs[Tabs.length-1-i];
    var layer =  Tabs[i];

    ctx[i].clearRect(0, 0, w, h); // clear canvas

    if(layer.geometry=="") {
      // do nothing
    } else {

      drawTab(layer)

      // // make a new random number generator
      // myrng = new Math.seedrandom(layer.object.seed);

      // window["draw_" + layer.geometry]( layer.object, ctx[i] );
    }

    

  }

}