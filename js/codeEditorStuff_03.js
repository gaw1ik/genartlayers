//  //  CODE EDITOR STUFF!!!!


// Controls Button Event Handler
// document.addEventListener("DOMContentLoaded", function () {
//     ControlsCodeToggle = document.getElementById("ControlsCodeToggle");
  
//     ControlsCodeToggle.addEventListener("change", switchBetweenLayerPanels);
//   });
  
  // // Code Button Event Handler
  // document.addEventListener("DOMContentLoaded", function () {
  //   openCodePanel_Button = document.getElementById("openCodePanel_Button");
  
  //   openCodePanel_Button.addEventListener("click", switchBetweenLayerPanels);
  // });



  
  // function switchBetweenLayerPanels() {
  //   //console.log("switchBetweenLayerPanels");
  //   // //console.log("this.innerText",this.innerText)
  //   var currentLayer = Layers[currentLayerIndex];
  
  //   var ControlsCodeToggle = document.getElementById("ControlsCodeToggle");
  //   var ControlsCodeToggle_value = ControlsCodeToggle.value;
  
  //   if(ControlsCodeToggle_value == 1) {
  //     makeGUICodePanel(currentLayer);
  //   } else {
  //     makeGUIControlsPanel(currentLayer);
  //   }
    
  //   // nothing
  // }




  
  // function switchToCodePanel() {
  //   //console.log("switchToCodePanel")
  // }





// Attach event listeners for evaluating and loading code
// BG: Pretty sure I don't need the evalOnly function anymore. It's always save&eval.
// eval_code_button = document.getElementById("eval_code_button");
// eval_code_button.addEventListener("click",onEvalAlgorithmButtonClick);

save_code_button = document.getElementById("save_code_button");
save_code_button.addEventListener("click",onSaveAndEvalAlgorithmButtonClick);

load_code_button = document.getElementById("load_code_button");
load_code_button.addEventListener("click",onLoadAlgorithmButtonClick);




function evalAlgorithm(layer) {

  // get the geometry
  var geometry = layer.geometry;
  var layerIndex = layer.ctxIndex;

  // get the dict code and evaluate it
  // var object_dict_code = fromParams2Code(layer);
  var algText = ParamsEditors[layerIndex].getValue();
  var object_dict_code = fromParamsText2Code(geometry, algText);
  window.eval(object_dict_code);

  // //console.log("object_dict_code",object_dict_code);


  // layer.object = window[geometry + "Dict"]();
  ControlsDict = window[geometry + "Dict"]();


  // For params that are newly added: Make a new dict for the param (object[key]) and set its value to the default.
  // BG: BUT we also need to get rid of params that no longer exist. Like, let's say I change param "alpha" to be called "alpha2". I want to bring in "alpha2", but also get rid of the original "alpha".
  var oldObject = layer.object;
  var newObject = {};
  var keys = Object.keys(ControlsDict);

  for(let i=0; i<keys.length; i++) {
    var key = keys[i];
    newObject[key] = {};
    if(oldObject[key]) {
      newObject[key].value = oldObject[key].value;
    } else {
      newObject[key].value = ControlsDict[key].default;
    }
  }


  layer.object = newObject;


  // get the draw function code and evaluate it
  // var draw_function_code = fromDrawFunction2Code(layer);
  algText = CodeEditors[layerIndex].getValue();
  var draw_function_code = fromDrawFunctionText2Code(geometry, algText);
  window.eval(draw_function_code);

  // finish by recalculating/redrawing everything
  drawTab(layer);

}




function onEvalAlgorithmButtonClick() {

  // get the current layer
  let layer = Layers[currentLayerIndex];

  evalAlgorithm(layer)

}



///////////////////////////////////////////////////////////////////
function onSaveAndEvalAlgorithmButtonClick(){

  // get the code name
  var load_code_name_input = document.getElementById("Tab97_Layer" + currentLayerIndex + "_LayerGeomInput");
  var load_code_name = load_code_name_input.value;
  var ALG_name = "ALG_" + load_code_name;


  // confirmation message stuff.
  var confirmation = confirm("Are you sure you want to overwrite '" + ALG_name +"' ?");
  if(confirmation==false) return;

  // update the Layers object
  Layers[currentLayerIndex].geometry = load_code_name;


  // get the current layer
  let layer = Layers[currentLayerIndex];


  // get the code editor on the current layer.
  code_editor = CodeEditors[currentLayerIndex];
  params_editor = ParamsEditors[currentLayerIndex];


  // //console.log("params_editor.getValue()", params_editor.getValue());
  // Get the algorithm from the code editors.
  var algorithm = {};
  algorithm.params = params_editor.getValue();
  algorithm.drawFunction = code_editor.getValue();

  


  // Convert the algorithm to a JSON object and save to local storage.
  var algorithmJSON = JSON.stringify(algorithm);
  
  localStorage.setItem(ALG_name, algorithmJSON);
  //console.log("saved '", ALG_name ,"' to local storage");


  // Evaluate this layer's new algorithm.
  evalAlgorithm(layer);

}




///////////////////////////////////////////////////////////////////
function onLoadAlgorithmButtonClick() {

  // get the current layer.
  var layer = Layers[currentLayerIndex];


  // get the name of the code to be loaded from layerGeomInput and set the layer.geometry equal to it.
  var load_code_name_input = document.getElementById("Tab97_Layer" + currentLayerIndex + "_LayerGeomInput");

  var load_code_name = load_code_name_input.value;  

  layer.geometry = load_code_name;

//   //console.log("layer.geometry",layer.geometry);

  loadAlgorithm(layer);

}




function isAlgIncluded(geometry) {

  var algIsIncluded = 0;

  for(let i=0; i<includedAlgNames.length; i++ ) {
      var thisAlgName = includedAlgNames[i];

      if( thisAlgName==geometry ) {
          algIsIncluded = 1;
      }
  }

  return algIsIncluded;
}





function loadAlgorithm(layer) {

  // get the layer attibutes.
  var layerIndex = layer.ctxIndex;
  var geometry = layer.geometry;

  

  // get the code editors on the current layer.
  var code_editor = CodeEditors[layerIndex];
  var params_editor = ParamsEditors[layerIndex];


  // get the algorithm out of local storage and into the editors
//   var ALG_name = "ALG_" + geometry;
  var algorithm;

//   try {

  algIsIncluded = isAlgIncluded(geometry);


  // if the algorithm is determined to be an included algorithm, fetch it from the server, otherwise get it out of local storage instead.
  if(algIsIncluded==1) {

      fetch("./" + "ALG_" + geometry + ".txt")
      .then(response => {
  
          return response.text();
          
      })
      .then( data => {
  
          
          algorithm = JSON.parse( data );  
          
          params_editor.setValue( algorithm.params );
          code_editor.setValue( algorithm.drawFunction );
  
          // return(algorithm);
  
      });

  } else if (algIsIncluded==0) {

      //console.log("the algorithm was found in local storage.");

      // get the algorithm out of local storage.
      var algorithmJSON = localStorage.getItem("ALG_" + geometry);
      algorithm = JSON.parse(algorithmJSON);

      //console.log("layerIndex",layerIndex);
      //console.log("algorithm.params",algorithm.params);

      params_editor.setValue( algorithm.params );
      code_editor.setValue( algorithm.drawFunction );

  } else {

    //console.log("algorithm included was neither 1 or 0. (something went very wrong.)")

  }


    
  // then once you have them in the editors, use evalAlgorithm to evaluate the algorithm from the editors.
  // this is what formats the code and then brings the Dict and Draw functions into the global space.


  ControlsDict = window[geometry + "Dict"]();



  // Update the object parameter values to be the default values
  var object = layer.object;

  var keys = Object.keys(ControlsDict);

  // if the object doesn't exist yet go through and make a default version of the object based on the ControlsDict. (this is for when you load in a new algorithm mid-project).
  if( Object.keys(object).length === 0 ) {

      
      for(let i=0; i<keys.length; i++) {

          var key = keys[i];

          object[key] = {value:undefined};
          object[key].value = ControlsDict[key].default;

          // console.log("key",key)

      }

  }

    // if the object does exist go through and assign existing parameter values and set up any non-existing parameters to the default. (this is for when you load in a project that references algorithms that were updated within projects that weren't subsequently saved after said algorithm update).
    if( Object.keys(object).length !== 0 ) {

      for(let i=0; i<keys.length; i++) {

          var key = keys[i];

          if(object[key]===undefined) {
            object[key] = {};
            object[key].value = ControlsDict[key].default;
          }
          

          // console.log("key",key);

      }

  }
  // //console.log("object",object);
  

  // //console.log("keys",keys);


  // // set the layer object's parameter values to be the default if they aren't defined yet.
  // for(let i=0; i<keys.length; i++){

  //     var key = keys[i];

  //     // //console.log("key",key);
  //     // //console.log("object[key].value",object[key].value);

  //     if(object[key].value === undefined) {

  //         // make a blank object[key], and the set its value to the default value for this algorithm.
  //         object[key] = {};
  //         object[key].value = ControlsDict[key].default;

  //         // //console.log("object[key].value",object[key].value);

  //     }

  // }



  // updateTabButtons();


  // finish by recalculating/redrawing everything
  drawTab(layer);

  // var ControlsCodeToggle = document.getElementById("ControlsCodeToggle");
  if(currentPanelValue==1) {
      makeGUICodePanel(layer);
  } else {
      makeGUIControlsPanel(layer);
  }

}



