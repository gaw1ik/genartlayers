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
  TabModule_Name = this.value;

  //   console.log("TabModule_Name:", TabModule_Name);

  // make new module object
  if(TabModule_Name=="") {
    // do nothing
  } else {
    layer.object = window[TabModule_Name + "Dict"]();
  }

  makeGUI(layer);

  

  calcAll();
  drawAll();
}











function makeGUI(layer) {
  // var tabName = layer.name;
  // var geometry = layer.geometry;

  var layerIndex = layer.ctxIndex;

  // clear out the layer...
  // var tabID = makeTabNameExtension(layerIndex);
  var Tab97 = document.getElementById("Tab97");
  removeAllChildNodes(Tab97);
  // console.log("removed all children");


  
  var tabNameExtension = "Tab97";

  // var tabButton = document.getElementById("Tab97" + "_Layer" + layerIndex + "_button");
  // console.log("Tab97" + "_Layer" + layerIndex + "_button");
  // tabButton.innerText = layerIndex + ". " + layer.geometry;

  // // add the layer to input-form
  // var newTab = document.createElement("DIV");
  // newTab.className = "tabcontent";
  // newTab.id = makeTabNameExtension(layerIndex); // this should make something like "Tab00"
  // document.getElementById("input-form").appendChild(newTab); // appends it to input-form

  

  var object = layer.object;

  // object.tabIndex = layerIndex;

  var keys = Object.keys(object);

  // Append the main title to the layer
  // var labelH2 = document.createElement("H2");
  // labelH2.innerText = layer.geometry + "_" + tabIndex;
  // tabElement.appendChild(labelH2);

  // tabElement = document.getElementById(tabNameExtension);
  tabElement = document.getElementById("Tab97");

  var layerGeomInput = document.createElement("INPUT");
  layerGeomInput.className = "TabModule_Input_InTab";
  layerGeomInput.id = tabNameExtension + "_Layer" + layerIndex + "_LayerGeomInput";
  layerGeomInput.tabindex = layerIndex;
  layerGeomInput.value = layer.geometry;
  // var inputForm = document.getElementById("input-form");
  tabElement.appendChild(layerGeomInput);
  layerGeomInput.addEventListener("change", onLayerGeomInput);



  var inputs_container= document.createElement("DIV");
  inputs_container.className = "grid-container-Nx2"
  tabElement.appendChild(inputs_container);

  // breaky.innerHTML = "<br>";

  for (let i = 0; i < keys.length; i++) {
    var key = keys[i];

    // console.log(object);

    if (object[key].type != null) {
      // if it's a control then do the thing (otherwise it's a non-control property without attributes like min, max, etc.)



      var inputDiv = document.createElement("DIV");
      var input = document.createElement("INPUT");
      var label = document.createElement("H5");

      if (object[key].class == "on-off") {
        label.innerText = key;
      } else if (object[key].class == null) {
        label.innerText = key;
      } else {
        label.innerText = key + "()";
      }
      // 

      input.type = object[key].type;

      if (object[key].class != null) {
        input.className = object[key].class;
      }

      var propertyName = key;
      var inputID = "Tab97" + "_Layer" + layerIndex + "_Property" + propertyName + "_Input";

      input.id = inputID; // add the Tab Name to the input ID so it looks like Tab_1_01, for instance
      input.min = object[key].min;
      input.max = object[key].max;
      input.step = object[key].step;

      object[key].inputID = input.id;

      input.addEventListener("input",onObjectPropertyInput);

      // console.log(object[key].inputID);

      // var tabnNameExtension = makeTabNameExtension(tabIndex);

      // let inputs_container = document.getElementById("inputs_container");

      

      inputs_container.appendChild(inputDiv);

      inputDiv.insertBefore(label, null);

      

      // tabElement.appendChild(label);

      inputDiv.appendChild(input);

      updateObjectPropertyIndicator(input);

      // // line break stuff
      // var breaky = document.createElement("br");
      // tabElement.appendChild(breaky);
      // var breaky = document.createElement("br");
      // tabElement.appendChild(breaky);
      // var breaky = document.createElement("br");
      // tabElement.appendChild(breaky);
    }
  }

  assignToControls(layer);

}
