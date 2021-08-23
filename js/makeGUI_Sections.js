////////////////////////////////////////////////////////////////////

//// i think this function is deprecated
function onLayerGeomInput() {

  var layerIndex = getNamedIndexOfElement("Layer",this);
  var layer = Layers[layerIndex];

  layer.geometry = this.value;

  // update the layer button's inner text
  var layerButton = document.getElementById("Tab97" + "_Layer" + layerIndex + "_Button");
  //console.log("Tab97" + "_Layer" + layerIndex + "_Button");
  layerButton.innerText = layerIndex + ". " + layer.geometry;

  // //console.log("layer",layer);

  // update the layer geometry to match the change
  layer.geometry = this.value;
  // layer.geometry = 
  TabModule_Name = this.value;

  //   //console.log("TabModule_Name:", TabModule_Name);

  // make new module object
  if(TabModule_Name=="") {
    // do nothing
  } else {
    layer.object = window[TabModule_Name + "Dict"]();
  }

  makeGUIControlsPanel(layer);

  

  calcAll();
  drawAll();
}



// Event listeners for the panel buttons
var controls_panel_button = document.getElementById("controls_panel_button");
var code_panel_button = document.getElementById("code_panel_button");

controls_panel_button.addEventListener("click",onCodePanelButtonClick);
code_panel_button.addEventListener("click",onCodePanelButtonClick);


//
function onControlsPanelButtonClick() {
  currentPanelValue = 0;
  var className = this.className;
  this.className = this.className + ".active";
}


//
function onCodePanelButtonClick() {

  var controls_panel_button = document.getElementById("controls_panel_button");
  controls_panel_button.className = controls_panel_button.className.replace(" active", ""); 

  var code_panel_button = document.getElementById("code_panel_button");
  code_panel_button.className = code_panel_button.className.replace(" active", ""); 

  if( this.id == "controls_panel_button" ) {
    currentPanelValue = 0;
  } else if (this.id == "code_panel_button") {
    currentPanelValue = 1;
  }

  this.className = this.className + " active";


  var currentLayer = Layers[currentLayerIndex];


  if(currentPanelValue == 1) {
    makeGUICodePanel(currentLayer);
  } else {
    makeGUIControlsPanel(currentLayer);
  }


  // // hide/show save_code_button (not sure if I like this yet)
  // var save_code_button = document.getElementById("save_code_button");

  // if(currentPanelValue == 0) {
  //   save_code_button.style.display = "none";
  // } else {
  //   save_code_button.style.display = "block";
  // }


}











////////////////////////////////////////////////////////////////////
function makeGUICodePanel(layer) {

  // First, remove all the headers on the code editors (we'll add them back in where they are needed)
  var editor_headers = document.getElementsByClassName("editor_header");
  for(let i=editor_headers.length-1; i>=0; i--) {
    var element = editor_headers[i];
    element.remove();
  }


  var layerIndex = layer.ctxIndex;


  // make the Controls Panel invisible.
  let Tab97ControlsPanel = document.getElementById("Tab97ControlsPanel");
  Tab97ControlsPanel.style.display = "none";

  // make the Code Panel visible.
  let Tab97CodePanel = document.getElementById("Tab97CodePanel");
  Tab97CodePanel.style.display = "block";


  
  // Set display to every CodeMirror Element to "none" and then set the one corresponding to the current layer to "block"
  var CodeMirrors = document.getElementsByClassName("CodeMirror cm-s-midnight");
  for(let i=0; i<CodeMirrors.length; i++){
    CodeMirrors[i].style.display = "none";
  }  


  // this layer's params editor
  var params_editor_element = CodeMirrors[2*layerIndex];
  params_editor_element.style.display = "block";
  var params_editor_object = ParamsEditors[layerIndex];
  params_editor_object.refresh();



  // this layer's code editor
  var drawFunction_editor_element = CodeMirrors[2*layerIndex+1];
  drawFunction_editor_element.style.display = "block";
  var drawFunction_editor_object = CodeEditors[layerIndex]; 
  drawFunction_editor_object.refresh();


  /////////////////// ADD HEADERS TO THE CODE EDITORS
  // add header to the params editor
  let params_header = document.createElement("H5");
  params_header.innerText = "Parameters Editor";
  params_header.className = "editor_header";
  params_header = Tab97CodePanel.insertBefore( params_header, params_editor_element );
  // add header to the drawFunction editor
  let drawFunction_header = document.createElement("H5");
  drawFunction_header.innerText = "drawFunction() Editor";
  drawFunction_header.className = "editor_header";
  drawFunction_header = Tab97CodePanel.insertBefore( drawFunction_header, drawFunction_editor_element );


  var tabNameExtension = "Tab97";  

  var object = layer.object;

  var tabElement = document.getElementById("Tab97");
  
  var layerGeomInputs = document.getElementsByName("LayerGeomInput");
  var layerGeomInput = layerGeomInputs[0];
  var layerGeomInputID = tabNameExtension + "_Layer" + layerIndex + "_LayerGeomInput";
  layerGeomInput.id = layerGeomInputID;
  layerGeomInput.tabindex = layerIndex;
  layerGeomInput.value = layer.geometry;
  // var inputForm = document.getElementById("input-form");
  // tabElement.appendChild(layerGeomInput);
  // layerGeomInput.addEventListener("change", onLayerGeomInput);

  // loadCode();

  CodeEditors[layerIndex].setOption( 'firstLineNumber', 2 + Object.keys(object).length );

}








////////////////////////////////////////////////////////////////////
function makeGUIControlsPanel(layer) {

  //console.log("makeGUIControlsPanel");

  var layerIndex = layer.ctxIndex;
  var geometry = layer.geometry;




  // make the Code Panel invisible.
  let Tab97CodePanel = document.getElementById("Tab97CodePanel");
  Tab97CodePanel.style.display = "none";

  // make the Controls Panel visible.
  let Tab97ControlsPanel = document.getElementById("Tab97ControlsPanel");
  Tab97ControlsPanel.style.display = "block";


  // clear out the layer...
  removeAllChildNodes(Tab97ControlsPanel);

  

  var tabNameExtension = "Tab97";  

  // var object = layer.object;



  // tabElement = document.getElementById("Tab97");
  tabElement = document.getElementById("Tab97ControlsPanel");

  var layerGeomInputs = document.getElementsByName("LayerGeomInput");
  // //console.log("layerGeomInputs",layerGeomInputs);
  var layerGeomInput = layerGeomInputs[0];
  var layerGeomInputID = tabNameExtension + "_Layer" + layerIndex + "_LayerGeomInput";
  layerGeomInput.id = layerGeomInputID;
  layerGeomInput.tabindex = layerIndex;
  layerGeomInput.value = layer.geometry;


  // //console.log("geometry",geometry);

  // if the geometry hasnt been defined yet, skip everything else
  if(geometry=="") {return;}


  ControlsDict = window[geometry + "Dict"]();



  // get the parameter keys
  var keys = Object.keys(ControlsDict);

  // console.log("keys",keys);

  // for each parameter add and set up an input in the controls panel.
  for (let i = 0; i < keys.length; i++) {

    var key = keys[i];

    var className = ControlsDict[key].class;
    var type = ControlsDict[key].type;

    if(className==="text") {

      var break_element = document.createElement("BR");
      tabElement.appendChild(break_element); 

      if(type){
        var header_element = document.createElement(type);
      } else {
        var header_element = document.createElement("H3");
      }
      
      header_element.innerText = ControlsDict[key].value;  
      // header_element.style.textAlign
      tabElement.appendChild(header_element);    

    } else {

    // //console.log("key",key);

    // // if it's the first iteration and it's neither a section header or a header only (sorry, kind of a shitty if statement...)
    // if(i==0 && (object[key].type == "range" || object[key].type == "number")) {

      var input_section = document.createElement("DIV")
      var nColumns = 2
      input_section.className = "grid-container-Nx" + nColumns

      tabElement.appendChild(input_section);

    // }

    // if(object[key].type == "header_only") {
    //   var section_header = document.createElement("H2")
    //   section_header.innerText = object[key].title
    //   tabElement.appendChild(section_header)
    // }

    // if(object[key].type == "section_header") {

    //   var section_header = document.createElement("H4")
    //   section_header.innerText = object[key].title;

    //   var input_section = document.createElement("DIV")
    //   // var nColumns = object[key].columns
    //   var nColumns = 2
    //   input_section.className = "grid-container-Nx" + nColumns

    //   tabElement.appendChild(section_header);
    //   tabElement.appendChild(input_section);
    // }

    // if (object[key].type == "range" || object[key].type == "number") { // if it's a control then do the thing (otherwise it's a non-control property without attributes like min, max, etc.)

      // var div = document.createElement("DIV");
      var input = document.createElement("INPUT");
      var label = document.createElement("H5");

      // handles adding the value indicator
      if (ControlsDict[key].class == "on-off") {
        label.innerText = key;
      } else if (ControlsDict[key].class == null) {
        label.innerText = key;
      } else {
        label.innerText = key + "()";
      }
      

      // select the HTML type and CSS className for the input based on the "class" attribute that the user has defined...
      // input.type = object[key].type; (delete this?)
      if (ControlsDict[key].class == "number") {
        input.type = "number";
        input.className = "number";
      } else if (ControlsDict[key].class == "slider") {
        input.type = "range";
        input.className = "slider";
      } else if (ControlsDict[key].class == "slider-hue") {
        input.type = "range";
        input.className = "slider-hue";
      } else if (ControlsDict[key].class == "slider-sat") {
        input.type = "range";
        input.className = "slider-sat";
      } else if (ControlsDict[key].class == "slider-lit") {
        input.type = "range";
        input.className = "slider-lit";
      } else if (ControlsDict[key].class == "on-off") {
        input.type = "range";
        input.className = "on-off";
        ControlsDict[key].default = 0;
        ControlsDict[key].min = 0;
        ControlsDict[key].max = 1;
        ControlsDict[key].step= 1;
      }

      var propertyName = key;
      var inputID = "Tab97" + "_Layer" + layerIndex + "_Property" + propertyName + "_Input";

      // assign stuff to the object's various attributes...
      input.id = inputID; // add the Tab Name to the input ID so it looks like Tab_1_01, for instance
      input.min = ControlsDict[key].min;
      input.max = ControlsDict[key].max;
      input.step = ControlsDict[key].step;

      // And then assign the value. However, assigning the value is a lil' more complicated... If the parameter is undefined, set it to the default value, otherwise set it to the value.
      var object = layer.object;
      if(object[key]===undefined) {
        input.value = ControlsDict[key].default;
      } else {
        input.value = object[key].value;
      }
      

      ControlsDict[key].inputID = input.id;

      input.addEventListener("input", onObjectPropertyInput);

      // input_section.appendChild(div);

      // div.insertBefore(label, null);
      // div.appendChild(input);

      input_section.insertBefore(label, null);
      input_section.appendChild(input);

      updateObjectPropertyIndicator(input);

    }

    
  }

  // assignToControls(layer); // can you delete this??????????????????????????????????????????????????????????????????????????????

}
