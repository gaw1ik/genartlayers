////////////////////////////////////////////////////////////////////
function onLayerGeomInput() {

  var layerIndex = getNamedIndexOfElement("Layer",this);
  var layer = Tabs[layerIndex];

  layer.geometry = this.value;

  // update the layer button's inner text
  var layerButton = document.getElementById("Tab97" + "_Layer" + layerIndex + "_Button");
  console.log("Tab97" + "_Layer" + layerIndex + "_Button");
  layerButton.innerText = layerIndex + ". " + layer.geometry;

  // console.log("layer",layer);

  // update the layer geometry to match the change
  layer.geometry = this.value;
  // layer.geometry = 
  TabModule_Name = this.value;

  //   console.log("TabModule_Name:", TabModule_Name);

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





//////////////////////////////////////////////////////////////////// I'm pretty sure I don't use this anywhere and can delete...
// function assignToControls(layer) {
//   // console.log("object:",object);

//   var tabID = layer.name;
//   var geometry = layer.geometry;

//   // var object = window[geometry + tabID];
//   var object = layer.object;

//   // console.log("geometry + tabID:",geometry + tabID);

//   var keys = Object.keys(object);

//   for (let i = 0; i < keys.length; i++) {

//     var key = keys[i];

//     var id = ControlsDict[key].inputID;

//     // console.log("id",id)

//     var input = document.getElementById(id);

    

//     if(object[key].value === undefined) {
//       object[key].value = ControlsDict.default;
//     } else {      
//       input.value = object[key].value;
//     }
    
//   }
  
// }





////////////////////////////////////////////////////////////////////
function makeGUICodePanel(layer) {

  console.log("makeGUICodePanel")

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

  // var header = document.createElement("h3");
  // header.innerText = "Params";
  // Tab97CodePanel.appendChild(header);

  // this layer's params editor
  var params_editor_element = CodeMirrors[2*layerIndex  ];
  params_editor_element.style.display = "block";
  var params_editor_object = ParamsEditors[layerIndex];
  params_editor_object.refresh();

  // header = document.createElement("h3");
  // header.innerText = "DrawFunction";
  // Tab97CodePanel.appendChild(header);

  // this layer's code editor
  var code_editor_element = CodeMirrors[2*layerIndex+1];
  code_editor_element.style.display = "block";
  var code_editor_object = CodeEditors[layerIndex];
  code_editor_object.refresh();


  var tabNameExtension = "Tab97";  

  var object = layer.object;

  tabElement = document.getElementById("Tab97");
  
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

}








////////////////////////////////////////////////////////////////////
function makeGUIControlsPanel(layer) {

  console.log("makeGUIControlsPanel");

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
  // console.log("layerGeomInputs",layerGeomInputs);
  var layerGeomInput = layerGeomInputs[0];
  var layerGeomInputID = tabNameExtension + "_Layer" + layerIndex + "_LayerGeomInput";
  layerGeomInput.id = layerGeomInputID;
  layerGeomInput.tabindex = layerIndex;
  layerGeomInput.value = layer.geometry;


  // console.log("geometry",geometry);

  // if the geometry hasnt been defined yet, skip everything else
  if(geometry=="") {return;}
  // console.log("geometry", geometry);
  ControlsDict = window[geometry + "Dict"]();



  // get the parameter keys
  var keys = Object.keys(ControlsDict);

  // console.log("keys",keys);

  // for each parameter add and set up an input in the controls panel.
  for (let i = 0; i < keys.length; i++) {

    var key = keys[i];

    // console.log("key",key);

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
      }

      var propertyName = key;
      var inputID = "Tab97" + "_Layer" + layerIndex + "_Property" + propertyName + "_Input";

      // assign stuff to the object's various attributes...
      input.id = inputID; // add the Tab Name to the input ID so it looks like Tab_1_01, for instance
      input.min = ControlsDict[key].min;
      input.max = ControlsDict[key].max;
      input.step = ControlsDict[key].step;
      // and assigning the value is a lil' more complicated... If it's undefined, set it to the default value, otherwise set it to the value.
      var object = layer.object;
      if(object[key].value===undefined) {
        input.value = object[key].default;
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

  // assignToControls(layer); // can you delete this??????????????????????????????????????????????????????????????????????????????

}
