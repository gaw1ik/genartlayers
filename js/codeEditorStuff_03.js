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


function evaluate(text) {
  window.eval(text)
}


function evalAlgorithm(layer) {

  // get the geometry
  var geometry = layer.geometry;
  var layerIndex = layer.ctxIndex;

  // get the dict code and evaluate it
  // var object_dict_code = fromParams2Code(layer);
  var algText = ParamsEditors[layerIndex].getValue();
  var object_dict_code = fromParamsText2Code(geometry, algText);


  // try {
  //   var layer_button = document.getElementById("Tab97_Layer" + currentLayerIndex + "_Button");
  //   layer_button.style.color = "var(--clr_text)";
  //   layer.hasCodeError = 0;
    window.eval(object_dict_code);      
  // } catch(err) {
  //   console.log("there was an error evaluating the algorithm");
  //   console.error(err);
  //   layer.hasCodeError = 1;
  //   layer_button.style.color = "red";
  // }

  

  // //console.log("object_dict_code",object_dict_code);

  // layer.object = window[geometry + "Dict"]();
  ControlsDict = window[geometry + "Dict"]();


  /*
   For params that are newly added: Make a new dict for the param (object[key]) and set its value to the default.
   BG: BUT we also need to get rid of params that no longer exist. Like, let's say I change param "alpha" to be called "alpha2". I want to bring in "alpha2", but also get rid of the original "alpha".
  */
  var oldObject = layer.object;
  var newObject = {};
  var keys = Object.keys(ControlsDict);

  for(let i=0; i<keys.length; i++) {
    var key = keys[i];
    
    //if it's a header then just skip it.
    var className = ControlsDict[key].class;

    if(className==="text") {

      // do nothing
      // console.log("header detected")

    } else {

      // create a key for the new object
      newObject[key] = {};

      // If the old Object has this key, keep that value. Otherwise, if the key is new, set its value to the default.
      if(oldObject[key]) {
        newObject[key].value = oldObject[key].value;
      } else {
        newObject[key].value = ControlsDict[key].default;
      }

    }
  }


  layer.object = newObject;


  // get the draw function code and evaluate it
  // var draw_function_code = fromDrawFunction2Code(layer);
  algText = CodeEditors[layerIndex].getValue();
  var draw_function_code = fromDrawFunctionText2Code(geometry, algText);
  

  // try {
  //   var layer_button = document.getElementById("Tab97_Layer" + currentLayerIndex + "_Button");
  //   layer_button.style.color = "var(--clr_text)";
  //   layer.hasCodeError = 0;
    window.eval(draw_function_code);  
    
  // } catch(err) {
  //   console.log("there was an error evaluating the algorithm");
  //   console.error(err);
  //   layer.hasCodeError = 1;
  //   layer_button.style.color = "red";
  // }
  

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


  // Catch when users try to save over included algorithm names. If so, alert the user and return immediately.
  if( includedAlgNames.some((name) => name === load_code_name) ) {
    console.warn("'" + load_code_name + "' is the name of an included algorithm. Please choose a different name and try saving again.");
    alert("'" + load_code_name + "' is the name of an included algorithm. Please choose a different name and try saving again.");
    return;
  }

  // confirmation message stuff.
  //var confirmation = confirm("Are you sure you want to overwrite '" + ALG_name +"' ?");
  //if(confirmation==false) return;

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
  try {
    var layer_button = document.getElementById("Tab97_Layer" + currentLayerIndex + "_Button");
    //layer_button.style.color = "var(--clr_text)";
    layer_button.style.textDecoration = "none";
    layer.hasCodeError = 0;
    evalAlgorithm(layer);     
  } catch(err) {
    console.log("there was an error evaluating the algorithm");
    console.error(err);
    layer.hasCodeError = 1;
    //layer_button.style.color = "red";
    layer_button.style.textDecoration = "line-through";
  }
  

}




///////////////////////////////////////////////////////////////////
function onLoadAlgorithmButtonClick() {

  // get the current layer.
  var layer = Layers[currentLayerIndex];


  // get the name of the code to be loaded from layerGeomInput and set the layer.geometry equal to it.
  var load_code_name_input = document.getElementById("Tab97_Layer" + currentLayerIndex + "_LayerGeomInput");

  var newAlgName = load_code_name_input.value;  

  // layer.geometry = load_code_name;

  // console.log("layer.geometry",layer.geometry);
  try{
    var layer_button = document.getElementById("Tab97_Layer" + currentLayerIndex + "_Button");
    swapAlgorithmOnLayer(newAlgName, layer);
  } catch(error) {
    console.log("the algorithm " + "'" + newAlgName + "'" + " that you just tried to bring in has an error in it.")
    console.error(error);
    layer.hasCodeError = 1;
    //layer_button.style.color = "red";
    layer_button.style.textDecoration = "line-through";
  }
  

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





function assignAlgorithmToLayer(algName, layer) {


  // get the layer attibutes.
  var layerIndex = layer.ctxIndex;
  // var geometry = layer.geometry;

  

  // get the code editors on the current layer.
  var code_editor = CodeEditors[layerIndex];
  var params_editor = ParamsEditors[layerIndex];


  // get the algorithm out of local storage and into the editors
  // var ALG_name = "ALG_" + geometry;
  var algorithm;



// if the algorithm is determined to be an included algorithm, fetch it from the server, otherwise get it out of local storage instead.
  var algIsIncluded = isAlgIncluded(algName);

  
  if(algIsIncluded==1) {

      fetch("./" + "ALG_" + algName + ".txt")
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

      // get the algorithm out of local storage.
      var algorithmJSON = localStorage.getItem("ALG_" + algName);

      // if the algorithm doesn't exist in local storage, alert the user and return immediately.
      if(algorithmJSON===null) {

        console.warn("The algorithm '" + algName + "' does not exist.");
        alert(       "The algorithm '" + algName + "' does not exist.");
        return;

      }

      algorithm = JSON.parse(algorithmJSON);

      //console.log("layerIndex",layerIndex);
      //console.log("algorithm.params",algorithm.params);

      params_editor.setValue( algorithm.params );
      code_editor.setValue( algorithm.drawFunction );

  } else {

    console.error("algorithm included was neither 1 or 0. (something went very wrong.)")

  }

  layer.geometry = algName;


    
  // then once you have them in the editors, use evalAlgorithm to evaluate the algorithm from the editors.
  // this is what formats the code and then brings the Dict and Draw functions into the global space.


  ControlsDict = window[algName + "Dict"]();



  // Update the object parameter values to be the default values
  var object = layer.object;

  object.layerIndex = layerIndex;

  var keys = Object.keys(ControlsDict);

  // If the object isn't populated yet, that means user is loading an algorithm onto a blank layer. Go through and make a default version of the object based on the ControlsDict. (this is for when you load in a new algorithm mid-project).
  if( Object.keys(object).length === 0 ) {

      
      for(let i=0; i<keys.length; i++) {

        var key = keys[i];

        // if it's a header, skip it... otherwise add the parameter and give it the default value.
        var className = ControlsDict[key].class;

        if(className==="text") {
          // do nothing
        } else {
          object[key] = {value:undefined};
          object[key].value = ControlsDict[key].default;
        }

      }

  }

  /*
    If the object is already populated, that means the user is either loading a project or swapping algorithms on a layer. 
    Actually, this should only apply to loading a project, because the "swapAlgorithm()" function handles swapping. 
    Go through and assign existing parameter values and set up any non-existing parameters to the default*
    ALSO check for vestigial parameters and delete any that exist.
    *this is for when you load in a project that references algorithms that were updated within projects that weren't subsequently saved after said algorithm update.
  */
  if( Object.keys(object).length !== 0 ) {


      for(let i=0; i<keys.length; i++) {

          var key = keys[i];

          var className = ControlsDict[key].class;

          if(className==="header") {
            // do nothing
          } else{

            if(object[key]===undefined) {
              object[key] = {};
              object[key].value = ControlsDict[key].default;
            }

          }          

          // console.log("key",key);

      }


      /* 
      One additional check to make sure there aren't any vestigial* parameters that came through with the saved project.

      *Vestigial parameters are parameters that are no longer part of an algorithm, but might remain in a project's saved file if, for instance, the user
      removes a parameter from an algorithm, but then doesn't update all the projects which use that algorithm. In that case, the vestigial parameter remains
      in those projects, and without this step to remove them, can cause problems further down the line.
      */

      var objectKeys = Object.keys(object);

      for(let i=0; i<objectKeys.length; i++) {

        let objectKey = objectKeys[i];

        // if the objectKey doesn't exist in the ControlsDict then remove that key from the object...
        if( ControlsDict[objectKey]===undefined && objectKey!="layerIndex") {

          delete object[objectKey];
          console.warn("deleted the key '" + objectKey + "' from the object on layer " + layerIndex + " because that parameter was determined to be vestigial.")

        }

      }


  }


  // finish by recalculating/redrawing everything
  // drawTab(layer);

  // Then make the GUI for this layer.
  if(currentPanelValue==1) {
      makeGUICodePanel(layer);
  } else {
      makeGUIControlsPanel(layer);
  }

}




function swapAlgorithmOnLayer(algName, layer) {

  // get the layer attibutes.
  var layerIndex = layer.ctxIndex;
  //var geometry = layer.geometry;

  
  // get the code editors on the current layer.
  var code_editor = CodeEditors[layerIndex];
  var params_editor = ParamsEditors[layerIndex];


  // get the algorithm out of local storage and into the editors
  // var ALG_name = "ALG_" + geometry;
  var algorithm;


  algIsIncluded = isAlgIncluded(algName);


  // if the algorithm is determined to be an included algorithm, fetch it from the server, otherwise get it out of local storage instead.
  if(algIsIncluded==1) {

      fetch("./" + "ALG_" + algName + ".txt")
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
      var algorithmJSON = localStorage.getItem("ALG_" + algName);

      // if the algorithm doesn't exist in local storage, alert the user and return immediately.
      if(algorithmJSON===null) {

        console.warn("The algorithm '" + algName + "' does not exist.");
        alert(       "The algorithm '" + algName + "' does not exist.");

        // reset the alg name to be whatever it was before
        var load_code_name_input = document.getElementById("Tab97_Layer" + currentLayerIndex + "_LayerGeomInput");
        load_code_name_input.value = layer.geometry;
        
        return;

      }


      algorithm = JSON.parse(algorithmJSON);

      //console.log("layerIndex",layerIndex);
      //console.log("algorithm.params",algorithm.params);

      params_editor.setValue( algorithm.params );
      code_editor.setValue( algorithm.drawFunction );

  } else {

    console.log("algorithm included was neither 1 or 0. (something went very wrong.)")

  }

  layer.geometry = algName;

    



  ControlsDict = window[algName + "Dict"]();



  // Empty out the existing layer object
  var object = {};

  //object.layerIndex = layerIndex;

  //console.log("object.layerIndex",object.layerIndex);

  

  var keys = Object.keys(ControlsDict);


  for(let i=0; i<keys.length; i++) {

      var key = keys[i];

      var className = ControlsDict[key].class;

      if(className==="text") {
        // do nothing
      } else {
        object[key] = {value:undefined};
        object[key].value = ControlsDict[key].default;
      }

      // console.log("key",key)

  }

  layer.object = object;
 

  // finish by recalculating/redrawing everything
  drawTab(layer);

  // var ControlsCodeToggle = document.getElementById("ControlsCodeToggle");
  if(currentPanelValue==1) {
      makeGUICodePanel(layer);
  } else {
      makeGUIControlsPanel(layer);
  }

}


