//  //  CODE EDITOR STUFF!!!!


// Controls Button Event Handler
document.addEventListener("DOMContentLoaded", function () {
    ControlsCodeToggle = document.getElementById("ControlsCodeToggle");
  
    ControlsCodeToggle.addEventListener("change", switchBetweenLayerPanels);
  });
  
  // // Code Button Event Handler
  // document.addEventListener("DOMContentLoaded", function () {
  //   openCodePanel_Button = document.getElementById("openCodePanel_Button");
  
  //   openCodePanel_Button.addEventListener("click", switchBetweenLayerPanels);
  // });
  
  function switchBetweenLayerPanels() {
    console.log("switchBetweenLayerPanels");
    // console.log("this.innerText",this.innerText)
    var currentLayer = Tabs[currentLayerIndex];
  
    var ControlsCodeToggle = document.getElementById("ControlsCodeToggle");
    var ControlsCodeToggle_value = ControlsCodeToggle.value;
  
    if(ControlsCodeToggle_value == 1) {
      makeGUICodePanel(currentLayer);
    } else {
      makeGUIControlsPanel(currentLayer);
    }
    
    // nothing
  }
  
  // function switchToCodePanel() {
  //   console.log("switchToCodePanel")
  // }





// Attach event listeners for evaluating and loading code
eval_code_button = document.getElementById("eval_code_button");
eval_code_button.addEventListener("click",onEvalAlgorithmButtonClick);

save_code_button = document.getElementById("save_code_button");
save_code_button.addEventListener("click",onSaveAndEvalAlgorithmButtonClick);

load_code_button = document.getElementById("load_code_button");
load_code_button.addEventListener("click",onLoadAlgorithmButtonClick);




function evalAlgorithm(layer) {

  var geometry = layer.geometry;

  var object_dict_code = fromParams2Code(layer);
  window.eval(object_dict_code);

  layer.object = window[geometry + "Dict"]();

  var draw_function_code = fromDrawFunction2Code(layer);
  window.eval(draw_function_code);

}




function onEvalAlgorithmButtonClick() {

  // get the current layer
  let layer = Tabs[currentLayerIndex];

  evalAlgorithm(layer)

}




function onSaveAndEvalAlgorithmButtonClick(){

  // confirmation message stuff.
  var confirmation = confirm("Are you sure you want to overwrite '" + fpath +"' ?");
  if(confirmation==false) return;

  // get the current layer
  let layer = Tabs[currentLayerIndex];


  // get the code name
  var load_code_name_input = document.getElementById("Tab97_Layer" + currentLayerIndex + "_LayerGeomInput");
  var load_code_name = load_code_name_input.value;


  // get the code editor on the current layer.
  code_editor = CodeEditors[currentLayerIndex];
  params_editor = ParamsEditors[currentLayerIndex];


  // Get the algorithm from the code editors.
  var algorithm = {};
  algorithm.params = params_editor.getValue();
  algorithm.drawFunction = code_editor.getValue();


  // Convert the algorithm to a JSON object and save to local storage.
  var algorithmJSON = JSON.stringify(algorithm);
  localStorage.setItem(load_code_name, algorithmJSON);
  console.log("saved", load_code_name ," to local storage");


  // Evaluate this layer's new algorithm.
  evalAlgorithm(layer);

}





function onLoadAlgorithmButtonClick() {

  // get the current layer.
  var layer = Tabs[currentLayerIndex];

  // get the layer index.
  var layerIndex = currentLayerIndex;

  // get the name of the code to be loaded from layerGeomInput.
  var load_code_name_input = document.getElementById("Tab97_Layer" + layerIndex + "_LayerGeomInput");
  var load_code_name = load_code_name_input.value;  
  console.log("load_code_name",load_code_name);

  // set the layer geoemtry to the code name
  layer.geometry = load_code_name;


  // get the code editors on the current layer.
  code_editor = CodeEditors[layerIndex];
  params_editor = ParamsEditors[layerIndex];


  // get the algorithm out of local stoarge and into the editors
  var algorithmJSON = localStorage.getItem(load_code_name);
  var algorithm = JSON.parse(algorithmJSON);
  params_editor.setValue( algorithm.params );
  code_editor.setValue( algorithm.drawFunction );

  // then once you have them in the editors, use evalAlgorithm to evaluate the algorithm from the editors.
  // this is what formats the code and then brings the Dict and Draw functions into the global space.
  evalAlgorithm(layer);


  // update the layer object to be whatever the code name has been defined as.
  layer.object = window[load_code_name + "Dict"]();


  // update the tab button for this layer.
  var tab_button = document.getElementById("Tab97" + "_Layer" + layerIndex + "_Button");
  tab_button.innerText = currentLayerIndex + ". " + layer.geometry;


  // finish by recalculating/redrawing everything
  // calcAll();


}
