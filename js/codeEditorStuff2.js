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
  //   console.log("switchBetweenLayerPanels");
  //   // console.log("this.innerText",this.innerText)
  //   var currentLayer = Tabs[currentLayerIndex];
  
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
  //   console.log("switchToCodePanel")
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

  // get the dict code and evaluate it
  var object_dict_code = fromParams2Code(layer);
  window.eval(object_dict_code);

  // console.log("object_dict_code",object_dict_code);


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
  var draw_function_code = fromDrawFunction2Code(layer);
  window.eval(draw_function_code);

  // finish by recalculating/redrawing everything
  drawTab(layer);

}




function onEvalAlgorithmButtonClick() {

  // get the current layer
  let layer = Tabs[currentLayerIndex];

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
  Tabs[currentLayerIndex].geometry = load_code_name;


  // get the current layer
  let layer = Tabs[currentLayerIndex];


  // get the code editor on the current layer.
  code_editor = CodeEditors[currentLayerIndex];
  params_editor = ParamsEditors[currentLayerIndex];


  // console.log("params_editor.getValue()", params_editor.getValue());
  // Get the algorithm from the code editors.
  var algorithm = {};
  algorithm.params = params_editor.getValue();
  algorithm.drawFunction = code_editor.getValue();

  


  // Convert the algorithm to a JSON object and save to local storage.
  var algorithmJSON = JSON.stringify(algorithm);
  
  localStorage.setItem(ALG_name, algorithmJSON);
  console.log("saved '", ALG_name ,"' to local storage");


  // Evaluate this layer's new algorithm.
  evalAlgorithm(layer);

}




///////////////////////////////////////////////////////////////////
function onLoadAlgorithmButtonClick() {

  // get the current layer.
  var layer = Tabs[currentLayerIndex];

  // var geometry = layer.geometry;
  // if(geometry==""){return;}

  // get the name of the code to be loaded from layerGeomInput and set the layer.geometry equal to it.
  var load_code_name_input = document.getElementById("Tab97_Layer" + currentLayerIndex + "_LayerGeomInput");
  // console.log("load_code_name_input",load_code_name_input);
  var load_code_name = load_code_name_input.value;  
  // console.log("load_code_name",load_code_name);
  layer.geometry = load_code_name;

  console.log("layer.geometry",layer.geometry);

  loadAlgorithm(layer);

}




function loadAlgorithm(layer) {

  // get the layer attibutes.
  var layerIndex = layer.ctxIndex;
  var geometry = layer.geometry;

  

  // get the code editors on the current layer.
  code_editor = CodeEditors[layerIndex];
  params_editor = ParamsEditors[layerIndex];


  // get the algorithm out of local storage and into the editors
  var ALG_name = "ALG_" + geometry;
  var algorithm;

//   try {

    fetch("./" + geometry + ".txt")
    .then(response => {

        if (!response.ok) {


            var algorithmJSON = localStorage.getItem(ALG_name);
            algorithm = JSON.parse(algorithmJSON);
            // params_editor.setValue( algorithm.params );
            // code_editor.setValue( algorithm.drawFunction );
      
            throw "that algorithm wasn't on the server. looked in local storage instead";

            // console.log("hi");
        } else {
            return response.text();
        }
    })
    .then( function(data) {

        console.log("the algorithm was found on the server.");
        var str = data;
        algorithm = JSON.parse( str );
        // console.log( "agorithm", algorithm );


        return("algorithm",algorithm);

    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {

      params_editor.setValue( algorithm.params );
      code_editor.setValue( algorithm.drawFunction );
    
        // console.log("algorithm.params",algorithm.params);

      
        // then once you have them in the editors, use evalAlgorithm to evaluate the algorithm from the editors.
        // this is what formats the code and then brings the Dict and Draw functions into the global space.
        evalAlgorithm(layer);
        // console.log("hey")


        ControlsDict = window[geometry + "Dict"]();




        // update the layer object to be whatever the code name has been defined as.
        // layer.object = window[geometry + "Dict"]();


        // Update the object parameter values to be the default values
        var object = layer.object;
        // console.log("object",object);
        var keys = Object.keys(ControlsDict);

        // console.log("keys",keys);


        for(let i=0; i<keys.length; i++){

            var key = keys[i];

            // console.log("key",key);
            // console.log("object[key].value",object[key].value);

            if(object[key].value === undefined) {

            object[key].value = ControlsDict[key].default;

            // console.log("object[key].value",object[key].value);

            }

        }



        // update the tab button for this layer.
        var tab_button = document.getElementById("Tab97" + "_Layer" + layerIndex + "_Button");
        tab_button.innerText = currentLayerIndex + ". " + layer.geometry;


        // finish by recalculating/redrawing everything
        drawTab(layer);

        // var ControlsCodeToggle = document.getElementById("ControlsCodeToggle");
        if(currentPanelValue==1) {
            makeGUICodePanel(layer);
        } else {
            makeGUIControlsPanel(layer);
        }

    // }

    });
}



