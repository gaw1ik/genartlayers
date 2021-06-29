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


  // Add a code editor to Tab97InnerPanel

  // first: add a text_area to the Tab97CodePanel for the PARAMS
  var text_area_params = document.createElement("TEXTAREA");
  text_area_params.id = "text_area_params" + "_Layer" + newLayerIndex;
  // console.log("text_area",text_area);
  text_area_params.style.display = "none";
  // Append it to Tab97InnerPanel
  var Tab97CodePanel = document.getElementById("Tab97CodePanel");
  Tab97CodePanel.appendChild(text_area_params);

  // add a break so you can see the line between the two
  var breaky = document.createElement("BR");
  Tab97CodePanel.appendChild(breaky);

  // first: add a text_area to the Tab97CodePanel
  var text_area_code = document.createElement("TEXTAREA");
  text_area_code.id = "text_area_code" + "_Layer" + newLayerIndex;
  // console.log("text_area",text_area);
  text_area_code.style.display = "none";
  // Append it to Tab97InnerPanel
  Tab97CodePanel.appendChild(text_area_code);


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
  // for code editor
  var code_editor = CodeMirror.fromTextArea(text_area_code, {
    lineNumbers: true,
    mode: "javascript",
    theme: "midnight",
    // autoRefresh:true,
  });
  code_editor.setSize(null,"50vh");
  code_editor.refresh();


  // add the new code editor to the BIG OL' array of code_editors, CodeEditor.
  CodeEditors.splice(newLayerIndex, 0, code_editor);
  ParamsEditors.splice(newLayerIndex, 0, params_editor);

  // console.log("new params editor placed at layerIndex =",newLayerIndex);
  // console.log("new code editor placed at layerIndex =",newLayerIndex);

}


// Add Tab Button to the Tabs Bar for a particular layer
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

  Tabs.splice(newLayerIndex, 0, layer); // insert layer into Layers Array at newLayerIndex (gobal variable)

  addCodeEditor(layer);

  
  updateLayers();


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

  Tabs.splice(currentLayerIndex, 1);

  // add the new code editor to the BIG OL' array of code_editors, CodeEditor.
  CodeEditors.splice(currentLayerIndex, 1);
  ParamsEditors.splice(currentLayerIndex, 1);
  var id = "text_area_params_Layer" + currentLayerIndex;
  var text_area_params = document.getElementById(id);
  id = "text_area_code_Layer" + currentLayerIndex;
  var text_area_code = document.getElementById(id);
  text_area_code.remove();
  text_area_params.remove();
  
  // clear the canvas on the layer that was just deleted
  ctx[currentLayerIndex].clearRect(0,0,w,h);

  updateLayers();

  console.log("Tab97" + "_Layer" + (currentLayerIndex-1) + "_Button");
  // Unless the layer you are deleting is the 0th layer, open the tab below the one you just deleted.
  if(currentLayerIndex>0){
    document.getElementById("Tab97" + "_Layer" + (currentLayerIndex-1) + "_Button").click();
  }

}






function updateLayers() {

  var tabBarLayersContainer = document.getElementById("tab-bar-layers-container");
  removeAllChildNodes(tabBarLayersContainer);

  var nLayers = Tabs.length;

  // for each layer, update all the layer info and GUI components like: the layerIndex, the name, etc.
  for(let i=0; i<nLayers; i++) {

    // Grab this layer
    var layerIndex = nLayers - i - 1;
    var layer = Tabs[layerIndex];

    // Update some info about the layer
    layer.ctxIndex = layerIndex;

    addTabButton(layer);

  }

}
