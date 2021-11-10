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

LayerList_Duplicate_Button = document.getElementById("LayerList_Duplicate_Button");
LayerList_Duplicate_Button.addEventListener("click", onDuplLayerButtonClick);


layerOnCharacter = "\u2713";






function addCodeEditor(layer) {

  // var newLayerIndex = layer.ctxIndex;

  // Do the CodeMirror Stuff to convert the text_area to a CodeMirror editor
  // for params edior

  var params_editor = CodeMirror(Tab97CodePanel, {
    lineNumbers: true,
    firstLineNumber: 3,
    mode: "javascript",
    theme: "midnight",
  });
  params_editor.setSize(null,"15vh");
  // params_editor.setValue("// Layer " + newLayerIndex + ": Params");
  params_editor.refresh();

  var CodeMirrors = document.getElementsByClassName("CodeMirror cm-s-midnight");



  
  // params_editor.name = "paramsEditor";
  // for code editor
  var code_editor = CodeMirror(Tab97CodePanel, {
    lineNumbers: true,
    firstLineNumber: 2 + Object.keys(layer.object).length,
    mode: "javascript",
    theme: "midnight",
  });
  code_editor.setSize(null,"50vh");
  // code_editor.setValue("// Layer " + newLayerIndex + ": Draw Function");
  code_editor.refresh();
  // code_editor.name = "codeEditor";






  CodeEditors.push(code_editor);
  ParamsEditors.push(params_editor);

}







// This function adds a Tab Button to the Layers Bar for a particular layer
function addTabButton() {


    // APPEND A LAYER SELECT BUTTON

    var layer_button = document.createElement("BUTTON");
    layer_button.className = "tablinks";

    // tab_button.id = "Tab97" + "_Layer" + newLayerIndex + "_Button";
    // tab_button.tabindex = layerIndex;
    // tab_button.innerText = newLayerIndex + ". " + layer.geometry;
    var tab_bar_layers_container = document.getElementById("tab-bar-layers-container");

    // //console.log("tab_button",tab_button);
    
    // tab_bar_layers_container.insertBefore(tab_button, tab_bar_layers_container.children[Layers.length-newLayerIndex-1] );
    tab_bar_layers_container.appendChild(layer_button);

    // Attach an event listener to the tab button.
    layer_button.addEventListener("click", openTab);




    // APPEND A LAYER VISIBILITY BUTTON

    var layer_vis_button = document.createElement("BUTTON");
    layer_vis_button.className = "layer_vis_button";
    layer_vis_button.innerText = layerOnCharacter;
    //layer_visibility_button.type = "checkbox";
    //layer_visibility_button.checked = 1;

    layer_vis_buttons_container.appendChild(layer_vis_button);

    // Attach an event listener to the tab button.
    layer_vis_button.addEventListener("click", onLayerVisButtonClick);

    //tab_bar_layers_container.appendChild(layer_visibility_button);
    

}






function onLayerVisButtonClick() {

  var layer_vis_button = this;

  var layerIndex = getLayerIndexFromElement(this);

  var visibility = Layers[layerIndex].visible;

  visibility = visibility * -1; 

  Layers[layerIndex].visible = visibility;

  //console.log("layerIndex",layerIndex);

  // Update the Layer visible property to reflect the current state of the button
  if( visibility == -1 ) {
    layer_vis_button.innerText = "";
  } else if ( visibility == 1 ) {
    layer_vis_button.innerText = layerOnCharacter;
  }
  
  var layer = Layers[layerIndex];  
  drawLayer(layer);
  
}







function updateTabButtons() {

  var tab_bar_layers_container = document.getElementById("tab-bar-layers-container");
  // removeAllChildNodes(tab_bar_layers_container);
  
  // for each layer above the newly created layer, update all the layer info, and tab buttons.
  for(let i=0; i<Layers.length; i++) {

    // Grab this layer
    var layerIndex = i;
    var layer = Layers[layerIndex];

    // Update some info about the layer
    layer.ctxIndex = layerIndex;


    // UPDATE THE LAYER SELECT BUTTONS
    var tabIndex = Layers.length-1-i;
    //console.log("tabIndex",tabIndex);
    var tab_button = tab_bar_layers_container.children[tabIndex];
    tab_button.id = "Tab97" + "_Layer" + (i) + "_Button";
    // tab_button.innerText = i + ". " + layer.geometry;
    tab_button.innerText = "[" + i + "]";


    // UPDATE THE LAYER VIS BUTTONS
    var layer_vis_button = layer_vis_buttons_container.children[tabIndex];
    layer_vis_button.id = "Tab97" + "_Layer" + (i) + "_Vis_Button";

    if(Layers[i].visible===undefined) {
      Layers[i].visible = 1;
    }
  
    if( Layers[i].visible== -1 ) {
      layer_vis_button.innerText = "";
    } else if ( Layers[i].visible == 1 ) {
      layer_vis_button.innerText = layerOnCharacter;
    }
    
    

    // HANDLE CODE ERRORS
    if(layer.hasCodeError===1) {
      tab_button.style.color = "red";
      tab_button.style.textDecoration = "line-through";
    } else {
      tab_button.style.color = "var(--clr_tab_button_text)";
      tab_button.style.textDecoration = "none";
    }
    

  }

}




function updateCodeEditors() {

  var CodeMirrors = document.getElementsByClassName("CodeMirror cm-s-midnight");

}


// function resetAllCanvasBlursToZero() {
//   for(let i=0; i<Layers.length; i++) {
//     let this_ctx = CTX[i]; 
//     this_ctx.filter = 'none';
//   }
// }














function onAddLayerButtonClick(){

  if(Layers.length>7) {
    alert("this version of genartlayers does not allow more than 8 layers! \nSorry :(");
    return;
  }

  // variables
  var newLayerIndex;

  // if Layers is empty, newLayerIndex should be 0. Otherwise, it's always currentLayerIndex + 1.
  if(Layers.length==0){
    newLayerIndex = 0;
  } else {
    newLayerIndex = currentLayerIndex + 1;
  }

  // create a blank layer dict
  var layer = { ctxIndex:newLayerIndex, geometry:"", object: {}, hasCodeError:0, visible:1 };

  // insert layer into Layers Array at newLayerIndex
  Layers.splice(newLayerIndex, 0, layer);


  // add a new pair of text editors (params and code) to the code panel
  addCodeEditor(layer);

  addTabButton();



  ////////////////////////////////////////////////////////////////////////////////
//   var tabBarLayersContainer = document.getElementById("tab-bar-layers-container");

    // add a tab button for the new layer
    // addTabButton(layer);

//   removeAllChildNodes(tabBarLayersContainer);

  

  updateTabButtons();
  // resetAllCanvasBlursToZero();



  // starting at the index of the newly created layer, move the text from each editor up one layer
  //console.log("newLayerIndex",newLayerIndex)
  for(let i=Layers.length-1; i>newLayerIndex-1; i--) {

    var codeEditorText = CodeEditors[i-1].getValue();
    CodeEditors[i].setValue(codeEditorText);

    //CodeEditors[i].setOption( 'firstLineNumber', 2 + Object.keys(Layers[i].object).length );

    var paramsEditorText = ParamsEditors[i-1].getValue();
    ParamsEditors[i].setValue(paramsEditorText);

    //console.log("text from", i-1, "being put on ", i);

  }

  ParamsEditors[newLayerIndex].setValue("");
  CodeEditors[newLayerIndex].setValue("");
  
  ////////////////////////////////////////////////////////////////////////////////


  // redraw everything.
  drawAll();


  // then open the tab you just created
  document.getElementById("Tab97" + "_Layer" + newLayerIndex + "_Button").click();

}









function onDuplLayerButtonClick(){

  if(Layers.length>7) {
    alert("this version of genartlayers does not allow more than 8 layers! \nSorry :(");
    return;
  }

  // variables
  var newLayerIndex;

  // if Layers is empty, newLayerIndex should be 0. Otherwise, it's always currentLayerIndex + 1.
  if(Layers.length==0){
    newLayerIndex = 0;
  } else {
    newLayerIndex = currentLayerIndex + 1;
  }

  var originalLayer = Layers[currentLayerIndex]
  // create a blank layer dict
  //var duplicateLayer = { ctxIndex:newLayerIndex, geometry:"", object: {}, hasCodeError:0 };
  //duplicateLayer = Object.assign( originalLayer );

  var duplicateLayer = JSON.parse(JSON.stringify(originalLayer));

  // insert layer into Layers Array at newLayerIndex
  Layers.splice(newLayerIndex, 0, duplicateLayer);


  // add a new pair of text editors (params and code) to the code panel
  addCodeEditor(duplicateLayer);

  addTabButton();


  

  updateTabButtons();
  // resetAllCanvasBlursToZero();



  // starting at the index of the newly created layer, move the text from each editor up one layer
  //console.log("newLayerIndex",newLayerIndex)

  for(let i=Layers.length-1; i>newLayerIndex-1; i--) {

    var codeEditorText = CodeEditors[i-1].getValue();
    CodeEditors[i].setValue(codeEditorText);

    //CodeEditors[i].setOption( 'firstLineNumber', 2 + Object.keys(Layers[i].object).length );

    var paramsEditorText = ParamsEditors[i-1].getValue();
    ParamsEditors[i].setValue(paramsEditorText);

    //console.log("text from", i-1, "being put on ", i);

  }

  ParamsEditors[newLayerIndex].setValue(paramsEditorText);
  CodeEditors[newLayerIndex].setValue(codeEditorText);
  
  ////////////////////////////////////////////////////////////////////////////////


  // redraw everything.
  drawAll();


  // then open the tab you just created
  document.getElementById("Tab97" + "_Layer" + newLayerIndex + "_Button").click();

}









function onDeleteLayerButtonClick(){

  if(Layers.length==1) {
    return;
  }


    // clear the canvases on the layer that was just deleted and all above it.
    for(let i=currentLayerIndex; i<Layers.length; i++){
      CTX[i].clearRect(0,0,artboardW,artboardH);
    }



    // remove the current layer from Layers.
    Layers.splice(currentLayerIndex, 1);
  
  
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
    layer_vis_buttons_container.children[currentLayerIndex].remove();

    updateTabButtons();
    // resetAllCanvasBlursToZero();

    // for(let i=currentLayerIndex+1; i<Layers.length; i++) {

    //   var codeEditorText = CodeEditors[i+1].getValue();
    //   CodeEditors[i].setValue(codeEditorText);
  
    //   var paramsEditorText = ParamsEditors[i+1].getValue();
    //   ParamsEditors[i].setValue(paramsEditorText);
  
    //   //console.log("text from", i-1, "being put on ", i);
  
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

  Layers.splice(Layers.length, 0, layer); // insert layer into Layers Array at currentLayerIndex (gobal variable)

  // layer = Layers[layerIndex];

  // document.getElementById("Tab97"+"_Layer"+currentLayerIndex+"_Button").click();
  
  updateLayers();

  // document.getElementById("Tab97"+"_Layer"+0+"_Button").click();
}














function onMoveUpLayerButtonClick() {

  if( currentLayerIndex==Layers.length-1 ){
    return;
  }

  // get the current layers as they are before the swap occurs.
  var layerBelow = Layers[currentLayerIndex  ];
  var layerAbove = Layers[currentLayerIndex+1];




  // if there are currently zero or one layers, just don't do anything when this button is pressed. Otherwise, swap the current layer with the layer above it.
  if( Layers.length==1 || Layers.length==0 ) {
    // do nothing
  } else {


    // update the Layers object to reflect the change.
    Layers[currentLayerIndex+1] = layerBelow;
    Layers[currentLayerIndex  ] = layerAbove;


    // handle the swapping for the editors.
    var layerBelowCodeEditorValue = CodeEditors[currentLayerIndex  ].getValue();
    var layerAboveCodeEditorValue = CodeEditors[currentLayerIndex+1].getValue();
  
    CodeEditors[currentLayerIndex+1].setValue(layerBelowCodeEditorValue);
    CodeEditors[currentLayerIndex  ].setValue(layerAboveCodeEditorValue);

    //CodeEditors[currentLayerIndex+1].setOption( 'firstLineNumber', 2 + Object.keys(layerBelow.object).length );
    //CodeEditors[currentLayerIndex  ].setOption( 'firstLineNumber', 2 + Object.keys(layerAbove.object).length );
  
    var layerBelowParamsEditorValue = ParamsEditors[currentLayerIndex  ].getValue();
    var layerAboveParamsEditorValue = ParamsEditors[currentLayerIndex+1].getValue();
  
    ParamsEditors[currentLayerIndex+1].setValue(layerBelowParamsEditorValue);
    ParamsEditors[currentLayerIndex  ].setValue(layerAboveParamsEditorValue);


    // finally, update the current layer index to be one more than what it is now.
    currentLayerIndex = currentLayerIndex + 1;

  }


  // update the tab buttons to reflect the change
  updateTabButtons();
  // resetAllCanvasBlursToZero();


  // redraw everything
  drawAll();


  // click the tab button corresponding to the layer that was just moved up to select it.
  document.getElementById("Tab97"+"_Layer" + currentLayerIndex + "_Button").click();

}











function onMoveDownLayerButtonClick() {

  if( currentLayerIndex==0 ){
    return;
  }

  // get the current layers as they are before the swap occurs.
  var layerBelow = Layers[currentLayerIndex-1];
  var layerAbove = Layers[currentLayerIndex  ];


  // if there are currently zero or one layers, just don't do anything when this button is pressed. Otherwise, swap the current layer with the layer above it.
  if( Layers.length==1 || Layers.length==0 ) {

    // do nothing

  } else {

    // update the Layers object to reflect the change.
    Layers[currentLayerIndex-1] = layerAbove;
    Layers[currentLayerIndex  ] = layerBelow;


    // handle the swapping for the editors.
    var layerBelowCodeEditorValue = CodeEditors[currentLayerIndex-1].getValue();
    var layerAboveCodeEditorValue = CodeEditors[currentLayerIndex  ].getValue();
  
    CodeEditors[currentLayerIndex  ].setValue(layerBelowCodeEditorValue);
    CodeEditors[currentLayerIndex-1].setValue(layerAboveCodeEditorValue);

    //CodeEditors[currentLayerIndex  ].setOption( 'firstLineNumber', 2 + Object.keys(layerBelow.object).length );
    //CodeEditors[currentLayerIndex-1].setOption( 'firstLineNumber', 2 + Object.keys(layerAbove.object).length );
  
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
  //resetAllCanvasBlursToZero();
  drawAll();


  // click the tab button corresponding to the layer that was just moved up to select it.
  document.getElementById("Tab97"+"_Layer" + currentLayerIndex + "_Button").click();

}


























function updateLayers() {

  var tabBarLayersContainer = document.getElementById("tab-bar-layers-container");
  removeAllChildNodes(tabBarLayersContainer);

  var nLayers = Layers.length;

  // for each layer, update all the layer info, text areas, and tab buttons.
  for(let i=0; i<nLayers; i++) {

    // Grab this layer
    var layerIndex = nLayers - i - 1;
    var layer = Layers[layerIndex];

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
