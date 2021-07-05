currentLayerIndex = 0;
LayerList_Add_Button = document.getElementById("LayerList_Add_Button");
LayerList_Add_Button.addEventListener("click", onAddLayerButtonClick);

// LayerList_AddToEnd_Button = document.getElementById("LayerList_AddToEnd_Button");
// LayerList_AddToEnd_Button.addEventListener("click", onAddToEndLayerButtonClick);

LayerList_Delete_Button = document.getElementById("LayerList_Delete_Button");
LayerList_Delete_Button.addEventListener("click", onDeleteLayerButtonClick);


// LayerList_MoveUp_Button = document.getElementById("LayerList_MoveUp_Button");
// LayerList_MoveUp_Button.addEventListener("click", onMoveUpLayerButtonClick);

// LayerList_MoveDown_Button = document.getElementById("LayerList_MoveDown_Button");
// LayerList_MoveDown_Button.addEventListener("click", onMoveDownLayerButtonClick);






function addCodeEditor(layer) {

  var newLayerIndex = layer.ctxIndex;

  console.log("newLayerIndex", newLayerIndex);


  // Add a code editor and append it to Tab97CodePanel
  var text_area_params = document.createElement("TEXTAREA");
  text_area_params.name = "textAreaParams";
  text_area_params.id = "text_area_params" + "_Layer" + newLayerIndex;
  // text_area_params.style.display = "none";
  var Tab97CodePanel = document.getElementById("Tab97CodePanel");
  if(newLayerIndex<Tabs.length-1) {
    Tab97CodePanel.appendChild(text_area_params);
  } else {
    var referenceNode = document.getElementById("text_area_params_Layer" + (newLayerIndex+1) );
    Tab97CodePanel.insertBefore(text_area_params,referenceNode);
  }
  // 



  // Add a params editor and append it to Tab97CodePanel
  var text_area_code = document.createElement("TEXTAREA");
  text_area_code.name = "textAreaCode";
  text_area_code.id = "text_area_code" + "_Layer" + newLayerIndex;
  // text_area_code.style.display = "none";
  if(newLayerIndex<Tabs.length-1) {
    Tab97CodePanel.appendChild(text_area_code);
  } else {
    var referenceNode = document.getElementById("text_area_code_Layer" + (newLayerIndex+1) );
    Tab97CodePanel.insertBefore(text_area_code,referenceNode);
  }



  // updateLayers();


  // Do the CodeMirror Stuff to convert the text_area to a CodeMirror editor
  // for params edior
  var params_editor = CodeMirror.fromTextArea(text_area_params, {
    lineNumbers: true,
    mode: "javascript",
    theme: "midnight",
    // autoRefresh:true,
  });
  params_editor.setSize(null,"15vh");
  params_editor.refresh();
  
  // params_editor.name = "paramsEditor";
  // for code editor
  var code_editor = CodeMirror.fromTextArea(text_area_code, {
    lineNumbers: true,
    mode: "javascript",
    theme: "midnight",
    // autoRefresh:true,
  });
  code_editor.setSize(null,"50vh");
  code_editor.refresh();
  // code_editor.name = "codeEditor";


  // add the new code editor to the BIG OL' array of code_editors, CodeEditor.
  CodeEditors.splice(newLayerIndex, 0, code_editor);
  ParamsEditors.splice(newLayerIndex, 0, params_editor);

  // if you're adding a new layer in-between existing layers.
  if(newLayerIndex<Tabs.length-1) {
    console.log("new layer inserted in between");
    // update the editor text such that the editors on the existing layer that got bumped up have the values of the old layer and the editors on the newly created layer are blank.
    // var code_editor_oldValue = CodeEditors[newLayerIndex].getValue();
    // var params_editor_oldValue = ParamsEditors[newLayerIndex].getValue();

    // CodeEditors[newLayerIndex+1].setValue(code_editor_oldValue);
    // ParamsEditors[newLayerIndex+1].setValue(params_editor_oldValue);
    // console.log("set layer ", newLayerIndex+1 , "old value");

    CodeEditors[newLayerIndex].setValue("");
    ParamsEditors[newLayerIndex].setValue("");
    console.log("set layer ", newLayerIndex, "blanks");
  }

  // console.log("new params editor placed at layerIndex =",newLayerIndex);
  // console.log("new code editor placed at layerIndex =",newLayerIndex);

}









function onAddLayerButtonClick(){

  // variables
  var newLayerIndex;

  // if Layers is empty, newLayerIndex should be 0. Otherwise, it's always currentLayerIndex + 1.
  if(Tabs.length==0){
    newLayerIndex = 0;
  } else {
    newLayerIndex = currentLayerIndex + 1;
  }

  // create a blank layer dict
  var layer = { ctxIndex:newLayerIndex, geometry:"", object: {} };

  // insert layer into Layers Array at newLayerIndex
  Tabs.splice(newLayerIndex, 0, layer);


  addCodeEditor(layer);

  // updateLayers();
  

  // then open the tab you just created
  document.getElementById("Tab97" + "_Layer" + newLayerIndex + "_Button").click();

}





function onAddToEndLayerButtonClick() {

  // var newLayerIndex = currentLayerIndex;

  var layer = { name:"", canvas:"", algorithm:"", geometry:"", inputs:[], ctxIndex:0, object: {} };

  Tabs.splice(Tabs.length, 0, layer); // insert layer into Layers Array at currentLayerIndex (gobal variable)

  // layer = Tabs[layerIndex];

  // document.getElementById("Tab97"+"_Layer"+currentLayerIndex+"_Button").click();
  
  updateLayers();

  // document.getElementById("Tab97"+"_Layer"+0+"_Button").click();
}





function onMoveUpLayerButtonClick() {

  var currentLayer = Tabs[currentLayerIndex];

  var otherLayer;

  if( currentLayerIndex==0 ) {
    // otherLayer = { name:"", canvas:"", geometry:"", inputs:[], ctxIndex:0, tabIndex:0, object: {} }; // make a new layer
    // Tabs.splice(0,0,currentLayer); // insert new layer at start of Layers array
    // Tabs[1] = otherLayer;
    // currentLayerIndex = 0;
  } else {
    otherLayer = Tabs[currentLayerIndex-1];
    Tabs[currentLayerIndex-1] = currentLayer;
    Tabs[currentLayerIndex] = otherLayer;
    currentLayerIndex = currentLayerIndex - 1;
  }

  updateLayers();

  // document.getElementById("Tab97"+"_Layer"+currentLayerIndex+"_Button").click();

}


function onMoveDownLayerButtonClick() {

  var currentLayer = Tabs[currentLayerIndex];

  var otherLayer;

  if( currentLayerIndex+1<Tabs.length) {
    otherLayer = Tabs[currentLayerIndex+1];
    Tabs[currentLayerIndex+1] = currentLayer;
    Tabs[currentLayerIndex] = otherLayer;
    currentLayerIndex = currentLayerIndex+1;
  } else {
    // otherLayer = { name:"", canvas:"", geometry:"", inputs:[], ctxIndex:0, tabIndex:0, object: {} };
    // Tabs[currentLayerIndex+1] = currentLayer;
    // Tabs[currentLayerIndex] = otherLayer;
  }



  

  // document.getElementById("Tab97"+"_Layer"+currentLayerIndex+"_Button").click();

  updateLayers();

}




function onDeleteLayerButtonClick(){

  // remove the current layer from Tabs.
  Tabs.splice(currentLayerIndex, 1);


  var CodeMirrors = document.getElementsByClassName("CodeMirror cm-s-midnight");

  // remove the code mirror elements corresponding to this layer
  var this_params_editor = CodeMirrors[2*currentLayerIndex];
  var this_code_editor = CodeMirrors[2*currentLayerIndex+1];
  this_params_editor.remove();
  this_code_editor.remove();

  // remove the references n CodeEditors and ParamsEditors.
  CodeEditors.splice(currentLayerIndex, 1);
  ParamsEditors.splice(currentLayerIndex, 1);


  // remove the text areas corresponding to the params and code editors for the current layer
  var text_area_params = document.getElementById("text_area_params_Layer" + currentLayerIndex);
  text_area_params.remove();
  var text_area_code = document.getElementById("text_area_code_Layer" + currentLayerIndex);
  text_area_code.remove();
  
  
  // clear the canvas on the layer that was just deleted
  ctx[currentLayerIndex].clearRect(0,0,w,h);

  // update layers function
  updateLayers();


  // Open the tab below the one you just deleted (unless the layer you are deleting is the 0th layer, in which case - do nothing).
  if(currentLayerIndex>0){
    document.getElementById("Tab97" + "_Layer" + (currentLayerIndex-1) + "_Button").click();
  }

}





// This function adds a Tab Button to the Tabs Bar for a particular layer
function addTabButton(layer) {

  var layerIndex = layer.ctxIndex;
  
  
  // console.log("layerIndex",layerIndex);
  // console.log("layer.geometry",layer.geometry);


  var tabs_button = document.createElement("BUTTON");
  tabs_button.className = "tablinks";
  tabs_button.id = "Tab97" + "_Layer" + layerIndex + "_Button";
  // tabs_button.tabindex = layerIndex;
  tabs_button.innerText = layerIndex + ". " + layer.geometry;
  document.getElementById("tab-bar-layers-container").appendChild(tabs_button);
  
  // Attach an event listener to the tab button.
  tabs_button.addEventListener("click", openTab);

}





function updateLayers() {

  var tabBarLayersContainer = document.getElementById("tab-bar-layers-container");
  removeAllChildNodes(tabBarLayersContainer);

  var nLayers = Tabs.length;

  // for each layer, update all the layer info, text areas, and tab buttons.
  for(let i=0; i<nLayers; i++) {

    // Grab this layer
    var layerIndex = nLayers - i - 1;
    var layer = Tabs[layerIndex];

    // Update some info about the layer
    layer.ctxIndex = layerIndex;


    // // update all the text areas to have the correct id
    // var textAreasParams = document.getElementsByName("textAreaParams");
    // var text_area_params = textAreasParams[layerIndex];
    // text_area_params.id = "text_area_params_Layer" + layerIndex;

    // var textAreasCode = document.getElementsByName("textAreaCode");
    // var text_area_code = textAreasCode[layerIndex];
    // text_area_code.id = "text_area_code_Layer" + layerIndex;


    addTabButton(layer);

  }

}
