currentLayerIndex = 0;
LayerList_Add_Button = document.getElementById("LayerList_Add_Button");
LayerList_Add_Button.addEventListener("click", onAddLayerButtonClick);

// LayerList_AddToEnd_Button = document.getElementById("LayerList_AddToEnd_Button");
// LayerList_AddToEnd_Button.addEventListener("click", onAddToEndLayerButtonClick);

LayerList_Delete_Button = document.getElementById("LayerList_Delete_Button");
LayerList_Delete_Button.addEventListener("click", onDeleteLayerButtonClick);


LayerList_MoveUp_Button = document.getElementById("LayerList_MoveUp_Button");
LayerList_MoveUp_Button.addEventListener("click", onMoveUpLayerButtonClick);

LayerList_MoveDown_Button = document.getElementById("LayerList_MoveDown_Button");
LayerList_MoveDown_Button.addEventListener("click", onMoveDownLayerButtonClick);






function addCodeEditor(layer) {

  var newLayerIndex = layer.ctxIndex;

  // console.log("newLayerIndex", newLayerIndex);


  // Do the CodeMirror Stuff to convert the text_area to a CodeMirror editor
  // for params edior
  var params_editor = CodeMirror(Tab97CodePanel, {
    // lineNumbers: true,
    mode: "javascript",
    theme: "midnight",
  });
  params_editor.setSize(null,"15vh");
  // params_editor.setValue("// Layer " + newLayerIndex + ": Params");
  params_editor.refresh();
  
  // params_editor.name = "paramsEditor";
  // for code editor
  var code_editor = CodeMirror(Tab97CodePanel, {
    // lineNumbers: true,
    mode: "javascript",
    theme: "midnight",
  });
  code_editor.setSize(null,"50vh");
  // code_editor.setValue("// Layer " + newLayerIndex + ": Draw Function");
  code_editor.refresh();
  // code_editor.name = "codeEditor";


  // add the new code editor to the BIG OL' array of code_editors, CodeEditor.
  // CodeEditors.splice(newLayerIndex, 0, code_editor);
  // ParamsEditors.splice(newLayerIndex, 0, params_editor);

  CodeEditors.push(code_editor);
  ParamsEditors.push(params_editor);

  // if you're adding a new layer in-between existing layers.
  // if(newLayerIndex<Tabs.length-1) {
    // console.log("new layer inserted in between");
    // update the editor text such that the editors on the existing layer that got bumped up have the values of the old layer and the editors on the newly created layer are blank.
    // var code_editor_oldValue = CodeEditors[newLayerIndex].getValue();
    // var params_editor_oldValue = ParamsEditors[newLayerIndex].getValue();

    // CodeEditors[newLayerIndex+1].setValue(code_editor_oldValue);
    // ParamsEditors[newLayerIndex+1].setValue(params_editor_oldValue);
    // console.log("set layer ", newLayerIndex+1 , "old value");

    // CodeEditors[newLayerIndex].setValue("");
    // ParamsEditors[newLayerIndex].setValue("");
    // console.log("set layer ", newLayerIndex, "blanks");
  // }

  // console.log("new params editor placed at layerIndex =",newLayerIndex);
  // console.log("new code editor placed at layerIndex =",newLayerIndex);

}







// This function adds a Tab Button to the Tabs Bar for a particular layer
function addTabButton(layer) {

    var newLayerIndex = layer.ctxIndex;
    // var newLayerIndex = currentLayerIndex + 1;

    // var layer = Tabs[newLayerIndex];    

    // console.log("newLayerIndex",newLayerIndex);
  
    var tab_button = document.createElement("BUTTON");
    tab_button.className = "tablinks";
    tab_button.id = "Tab97" + "_Layer" + newLayerIndex + "_Button";
    // tab_button.tabindex = layerIndex;
    tab_button.innerText = newLayerIndex + ". " + layer.geometry;
    var tab_bar_layers_container = document.getElementById("tab-bar-layers-container");

    
    tab_bar_layers_container.insertBefore(tab_button, tab_bar_layers_container.children[Tabs.length-newLayerIndex-1] );
  //   document.getElementById("tab-bar-layers-container").appendChild(tab_button);
    
    // Attach an event listener to the tab button.
    tab_button.addEventListener("click", openTab);
  
  }







function updateTabButtons() {

  var tab_bar_layers_container = document.getElementById("tab-bar-layers-container");
  
  // for each layer above the newly created layer, update all the layer info, and tab buttons.
  for(let i=0; i<Tabs.length; i++) {

    // Grab this layer
    var layerIndex = i;
    var layer = Tabs[layerIndex];

    // Update some info about the layer
    layer.ctxIndex = layerIndex;

    // update the tab buttons
    var tabIndex = Tabs.length-1-i;
    var tab_button = tab_bar_layers_container.children[tabIndex];
    tab_button.id = "Tab97" + "_Layer" + (i) + "_Button";
    tab_button.innerText = i + ". " + layer.geometry;

  }

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


  // add a new pair of text editors (params and code) to the code panel
  addCodeEditor(layer);



  ////////////////////////////////////////////////////////////////////////////////
//   var tabBarLayersContainer = document.getElementById("tab-bar-layers-container");

    // add a tab button for the new layer
    addTabButton(layer);

//   removeAllChildNodes(tabBarLayersContainer);

  

  updateTabButtons();



  // starting at the index of the newly created layer, move the text from each editor up one layer
  console.log("newLayerIndex",newLayerIndex)

  for(let i=Tabs.length-1; i>newLayerIndex; i--) {

    var codeEditorText = CodeEditors[i-1].getValue();
    CodeEditors[i].setValue(codeEditorText);

    var paramsEditorText = ParamsEditors[i-1].getValue();
    ParamsEditors[i].setValue(paramsEditorText);

    console.log("text from", i-1, "being put on ", i);

  }

  ParamsEditors[newLayerIndex].setValue("");
  CodeEditors[newLayerIndex].setValue("");
  
  ////////////////////////////////////////////////////////////////////////////////


  // redraw everything.
  drawAll();


  // then open the tab you just created
  document.getElementById("Tab97" + "_Layer" + newLayerIndex + "_Button").click();

}











function onDeleteLayerButtonClick(){


    // clear the canvases on the layer that was just deleted and all above it.
    for(let i=currentLayerIndex; i<Tabs.length; i++){
      ctx[i].clearRect(0,0,w,h);
    }



    // remove the current layer from Tabs.
    Tabs.splice(currentLayerIndex, 1);
  
  
    // remove the code mirror elements corresponding to this layer
    var CodeMirrors = document.getElementsByClassName("CodeMirror cm-s-midnight");
    var this_params_editor = CodeMirrors[2*currentLayerIndex];
    var this_code_editor = CodeMirrors[2*currentLayerIndex+1];
    this_params_editor.remove();
    this_code_editor.remove();
  
    // remove the references n CodeEditors and ParamsEditors.
    CodeEditors.splice(currentLayerIndex, 1);
    ParamsEditors.splice(currentLayerIndex, 1);
  
  
    // // remove the text areas corresponding to the params and code editors for the current layer
    // var text_area_params = document.getElementById("text_area_params_Layer" + currentLayerIndex);
    // text_area_params.remove();
    // var text_area_code = document.getElementById("text_area_code_Layer" + currentLayerIndex);
    // text_area_code.remove();
    
    

  
    // // update layers function
    // updateLayers();




    ////////////////////////////////////////////////////////////////////////////////
    var tab_bar_layers_container = document.getElementById("tab-bar-layers-container");

    tab_bar_layers_container.children[currentLayerIndex].remove();

    updateTabButtons();

    // for(let i=currentLayerIndex+1; i<Tabs.length; i++) {

    //   var codeEditorText = CodeEditors[i+1].getValue();
    //   CodeEditors[i].setValue(codeEditorText);
  
    //   var paramsEditorText = ParamsEditors[i+1].getValue();
    //   ParamsEditors[i].setValue(paramsEditorText);
  
    //   console.log("text from", i-1, "being put on ", i);
  
    // }
  ////////////////////////////////////////////////////////////////////////////////


  
  
    // Open the tab below the one you just deleted (unless the layer you are deleting is the 0th layer, in which case - do nothing).
    if(currentLayerIndex>0){
      document.getElementById("Tab97" + "_Layer" + (currentLayerIndex-1) + "_Button").click();
    }

    // redraw everything.
    drawAll();
  
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

  // get the current layers as they are before the swap occurs.
  var layerBelow = Tabs[currentLayerIndex  ];
  var layerAbove = Tabs[currentLayerIndex+1];


  // if there are currently zero or one layers, just don't do anything when this button is pressed. Otherwise, swap the current layer with the layer above it.
  if( Tabs.length==1 || Tabs.length==0 ) {
    // do nothing
  } else {


    // update the Layers object to reflect the change.
    Tabs[currentLayerIndex+1] = layerBelow;
    Tabs[currentLayerIndex  ] = layerAbove;


    // handle the swapping for the editors.
    var layerBelowCodeEditorValue = CodeEditors[currentLayerIndex  ].getValue();
    var layerAboveCodeEditorValue = CodeEditors[currentLayerIndex+1].getValue();
  
    CodeEditors[currentLayerIndex+1].setValue(layerBelowCodeEditorValue);
    CodeEditors[currentLayerIndex  ].setValue(layerAboveCodeEditorValue);
  
    var layerBelowParamsEditorValue = ParamsEditors[currentLayerIndex  ].getValue();
    var layerAboveParamsEditorValue = ParamsEditors[currentLayerIndex+1].getValue();
  
    ParamsEditors[currentLayerIndex+1].setValue(layerBelowParamsEditorValue);
    ParamsEditors[currentLayerIndex  ].setValue(layerAboveParamsEditorValue);


    // finally, update the current layer index to be one more than what it is now.
    currentLayerIndex = currentLayerIndex + 1;

  }


  // update the tab buttons to reflect the change
  updateTabButtons();


  // redraw everything
  drawAll();


  // click the tab button corresponding to the layer that was just moved up to select it.
  document.getElementById("Tab97"+"_Layer" + currentLayerIndex + "_Button").click();

}











function onMoveDownLayerButtonClick() {

  // get the current layers as they are before the swap occurs.
  var layerBelow = Tabs[currentLayerIndex  ];
  var layerAbove = Tabs[currentLayerIndex-1];


  // if there are currently zero or one layers, just don't do anything when this button is pressed. Otherwise, swap the current layer with the layer above it.
  if( Tabs.length==1 || Tabs.length==0 ) {

    // do nothing

  } else {

    // update the Layers object to reflect the change.
    Tabs[currentLayerIndex-1] = layerBelow;
    Tabs[currentLayerIndex  ] = layerAbove;


    // handle the swapping for the editors.
    var layerBelowCodeEditorValue = CodeEditors[currentLayerIndex-1].getValue();
    var layerAboveCodeEditorValue = CodeEditors[currentLayerIndex  ].getValue();
  
    CodeEditors[currentLayerIndex  ].setValue(layerBelowCodeEditorValue);
    CodeEditors[currentLayerIndex-1].setValue(layerAboveCodeEditorValue);
  
    var layerBelowParamsEditorValue = ParamsEditors[currentLayerIndex-1].getValue();
    var layerAboveParamsEditorValue = ParamsEditors[currentLayerIndex  ].getValue();
  
    ParamsEditors[currentLayerIndex  ].setValue(layerBelowParamsEditorValue);
    ParamsEditors[currentLayerIndex-1].setValue(layerAboveParamsEditorValue);


    // finally, update the current layer index to be one more than what it is now.
    currentLayerIndex = currentLayerIndex - 1;

  }


  // update the tab buttons to reflect the change
  updateTabButtons();


  // redraw everything
  drawAll();


  // click the tab button corresponding to the layer that was just moved up to select it.
  document.getElementById("Tab97"+"_Layer" + currentLayerIndex + "_Button").click();

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
