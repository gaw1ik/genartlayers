// functions involved in reading and writing files
// also includes functions for assigning values read from files to controls, from controls, and the initial setup of the controls.

// // deprecating
// function assignFromControls(object) {
//   // //console.log("assign from controls for:",object);

//   // var object = tab.object;

//   var keys = Object.keys(object);

//   tabIndex = object.tabIndex;
//   // values = Object.values(object);

//   for (let i = 0; i < keys.length; i++) {
//     var propertyName = keys[i];

//     // //console.log("propertyName:",propertyName);

//     // var id = propertyName + "_Tab" + tabIndex;

//     var id = makeInputName(propertyName, tabIndex);

//     // //console.log("id:", id);

//     // if it's a control then do the thing (otherwise it's a non-control property without attributes like min, max, etc.)
//     if (object[propertyName].type != null) {
//       var input = document.getElementById(id);

//       // //console.log("input:", input)

//       // Stuff for handling the value indicator on the inputs
//       var inputLabel_Node = input.previousElementSibling;
//       var inputLabel = inputLabel_Node.innerText;
//       var lastIndex = inputLabel.lastIndexOf("(");
//       if (lastIndex != -1) {
//         var inputLabelBase = inputLabel.substring(0, lastIndex);
//         inputLabel = inputLabelBase + "(" + input.value + ")";
//         inputLabel_Node.innerText = inputLabel;
//       }

//       object[propertyName].value = parseFloat(input.value, 10);
//     }
//   }
// }





















// for saving to JSON
var saveJsonButton = document.getElementById("save-json-button");
saveJsonButton.addEventListener("click", saveProject);
  

function saveProject () {

  var fPathElement = document.getElementById("fpath");
  var projNameUser = fPathElement.value;
  var projName = "PROJ_" + projNameUser;


  // Catch when users try to save over included project names. If so, alert the user and return immediately.
  if( includedProjNames.some((name) => name === projNameUser) ) {
    console.warn("'" + projNameUser + "' is the name of an included project. Please choose a different name and try saving again.");
    alert("'" + projNameUser + "' is the name of an included project. Please choose a different name and try saving again.");
    return;
  }
  
  

  // Send a confirmation message to the user to double check that they want to save over the existing project.
  var confirmation = confirm("Are you sure you want to overwrite '" + projName +"' ?");
  if(confirmation==false) return;


  // var newTabs = getParamsOnly(Layers);

  let dataStr = JSON.stringify({ doc1: doc1, Layers: Layers });

  // 
  localStorage.setItem(projName, dataStr);

}




// // this function gets only the parameters (i.e. not coordinate arrays) and values (i.e. not min, max, etc.) from the layer objects

// // depricating
// function getParamsOnly(Layers) {

//   const newTabs = JSON.parse(JSON.stringify(Layers));

//   // let newTabs = [];

//   // get the values just so you can get its length for the subsequent for-loop
//   var Tabs_values = Object.values(Layers);

//   // for each layer ("tab")
//   for (let i = 0; i < Tabs_values.length; i++) {

//     layer = Layers[i];

//     var object = layer.object;

//     var params = Object.keys(object);

//     tempObject = {};

//     for (let j = 0; j < params.length; j++) {
//       param = params[j];
//       tempObject[param] = { value: 0 };
//     }

//     for (let j = 0; j < params.length; j++) {

//       param = params[j];

//       if (object[param].type != undefined) {
//         // //console.log(object[param].type)
//         tempObject[param].value = object[param].value;
//       }

//     }

//     newTabs[i].object = tempObject;
//   }

//   return newTabs;
// }








// for reading from JSON
var readJsonButton = document.getElementById("read-json-button");
readJsonButton.addEventListener("click", loadProject );



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setUpProjectFromProjectFile(JSONdata) {

  Layers = JSONdata.Layers;
  doc1 = JSONdata.doc1;

  //////////////////////////////////////////////// Bring in the Doc object
  var newDoc = docDict();

  // doc1 = parsedData.doc1;
  var keys = Object.keys(doc1);

  // document object
  for (let i = 0; i < keys.length; i++) {

    var parameter = keys[i]

    if(newDoc[parameter]==null){
      // console.warn("the parameter ",parameter, "was not found in the prototype object for newDoc");
    } else {
      parameter = keys[i];
      newDoc[parameter].value = doc1[parameter].value;
    }

  }

  doc1 = newDoc;

  var keys = Object.keys(doc1);
  for (let i = 0; i < keys.length; i++) {
    var key = keys[i];
    var inputID = "doc_" + "Property" + key + "_Input";
    // //console.log("key",key)
    var element = document.getElementById(inputID);
    element.value = doc1[key].value;
    updateObjectPropertyIndicator(element);

  }
  /////////////////////////////////////////////////////////////////////////



  /////////////////////////////////////////////// Bring in the Layers object.
  // Layers = Object.values( parsedData.Layers );  
  // //console.log("Layers", Layers);

  // Clear out the CodeEditors and ParamsEditors objects AND remove all the HTML CodeMirror Elements in this layer (otherwise they stick around and eff' stuff up).
  CodeEditors = [];
  ParamsEditors = [];

  var Tab97CodePanel = document.getElementById("Tab97CodePanel");
  removeAllChildNodes(Tab97CodePanel);

  var tab_bar_layers_container = document.getElementById("tab-bar-layers-container");
  removeAllChildNodes(tab_bar_layers_container);


  //console.log("Layers",Layers);

  // for each layer add a code editor, add a tab button, and load the algorithm.
  for (let i = 0; i < Layers.length; i++) {

    var layer = Layers[i];

    addCodeEditor(layer);


    addTabButton(layer);

    // Load the algorithm for this layer. Also evaluates the code so it's usable.
    // console.log("loading algorithm for layer ",i);
    let algName = layer.geometry;
    assignAlgorithmToLayer(algName, layer);
  
  }

  updateTabButtons();


  currentLayerIndex = 0;  

  handleResize();

  // open layer 0 tab
  // document.getElementById("Tab97_Layer0_Button").click();

}




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function loadProject() {

  //console.log("**Load Project**");


  /////////////////////////////////////////////// Bring in file info, and the then file data
  var fPathEntry = document.getElementById("fpath");
  var projName = fPathEntry.value;
  var fpath = "PROJ_" + projName;

  var rawData = localStorage.getItem(fpath);

  // if the project doesn't exist in local storage, alert the user and return immediately
  if(rawData===null) {

    console.warn("The project '" + projName + "' does not exist.");
    alert(       "The project '" + projName + "' does not exist.");
    // reset the projName input to the current one
    fPathEntry.value = currentProjName;
    return;

  }

  currentProjName = projName;

  var JSONdata = JSON.parse(rawData);

  setUpProjectFromProjectFile(JSONdata) ;


  // Unless the project nameis already in the recentSavedProjects, put this project name onto the recentSavedProjects array and then update recentSavedProjects to have the most reent 8.
  var recentOpenedProjects = ApplicationData.recentOpenedProjects;
  var yep = 1;
  for(let i=0; i<recentOpenedProjects.length; i++){
    if( fpath == recentOpenedProjects[i] ) {
      yep = 0;
    }
  }
  if( yep == 1 ) {
    recentOpenedProjects.splice(0,0,fpath);
  }
  // most recent 8.
  recentOpenedProjects = ApplicationData.recentOpenedProjects.slice(0,8); 
  ApplicationData.recentOpenedProjects = recentOpenedProjects;
  // save ApplicationData to local storage
  let ApplicationDataJSON = JSON.stringify(ApplicationData);
  localStorage.setItem("ApplicationData", ApplicationDataJSON);

  

}





function loadDefaultProject() {

  //console.log("**Load Default Project**");

  document.getElementById("fpath").value = "default";

  // get the default project JSON file from the server
  fetch("./PROJ_default.json")
  .then(response => {
    return response.json();
  })
  .then( function(data) {
    var JSONdata = data;
    setUpProjectFromProjectFile(JSONdata);  
  })
  .then( () => {
    // then click layer 1 so it opens up and the user sees the controls for the example algorithm
    // document.getElementById("Tab97_Layer1_Button").click();
  });

}



// for reading from JSON
// var readJsonButton = document.getElementById("read-json-button");


// // the old readJASON function...
// readJsonButton.addEventListener("click", function () {
  
//   //console.log("**Read from JSON**");


//   // let rawdata = fs.readFileSync('tree1.json');
//   var fPathEntry = document.getElementById("fpath");
//   var fpath = fPathEntry.value;

  

//   var rawData = localStorage.getItem(fpath);

//   //console.log("rawData",rawData);

//   parsedData = JSON.parse(rawData);

//   //console.log("parsedData",parsedData);


//   // Bring in the Doc object
//   var newDoc = docDict();

//   doc1 = parsedData.doc1;
//   var keys = Object.keys(doc1);

//   // document object
//   for (let i = 0; i < keys.length; i++) {

//     var parameter = keys[i]

//     if(newDoc[parameter]==null){
//       console.warn("the parameter ",parameter, "was not found in the prototype object for newDoc");
//     } else {
//       parameter = keys[i];
//       newDoc[parameter].value = doc1[parameter].value;
//     }

//   }

//   doc1 = newDoc;

//   var keys = Object.keys(doc1);
//   for (let i = 0; i < keys.length; i++) {
//     var key = keys[i];
//     var inputID = "doc_" + "Property" + key + "_Input";
//     // //console.log("key",key)
//     var element = document.getElementById(inputID);
//     element.value = doc1[key].value;
//     updateObjectPropertyIndicator(element);

//   }




//   // bring in the Layers object.
//   let newTabs = Object.values( parsedData.Layers );  

//   // //console.log("newTabs",newTabs);

//   // return;

//   // Bring in info from the Layers object to make tab guis, make geometry objects, assign to controls...
//   Layers = newTabs; // initially, let's just set Layers = newTabs
//   for (let i = 0; i < newTabs.length; i++) {

//     var layer = newTabs[i];
    
//     bringInLayer(layer);
    
//   }

//   updateLayers();

//   handleResize();

// });



// // depricating
// function bringInLayer(layer) {

//   addCodeEditor(layer);

//   // addTabButton(layer);

//   // if the layer geometry is empty return imediately (still could be more robust in order to handle non-existant algorithms e.g. "fractal24792")
//   if(layer.geometry=="") {return;}


//   // get the layer attributes
//   var layerIndex = layer.ctxIndex;
//   var geometry = layer.geometry;


//   // Get the algorithm out of local storage, and put it in the code editors.
//   var algorithmJSON = localStorage.getItem(geometry);
//   var algorithm = JSON.parse(algorithmJSON);
//   // // populate the params and code eidtors based on the algorithm.
//   var params_editor = ParamsEditors[layerIndex];
//   var code_editor = CodeEditors[layerIndex];
//   params_editor.setValue( algorithm.params );
//   code_editor.setValue( algorithm.drawFunction );

  
//   // evaluate the algorithm so that it's actually usable (excerpt from the function evalAlgorithm(), but without the assignment to the object, ...
//   // so that the object doesn't end up with the default values or undefined shit.)

//   var object_dict_code = fromParams2Code(layer);
//   window.eval(object_dict_code);

//   var draw_function_code = fromDrawFunction2Code(layer);
//   window.eval(draw_function_code);




//   // Base it on the prototype object, and update the values only (so you can update GUI properties like min, max, and step)
//   var protoObject = window[layer.geometry + "Dict"]();

//   //console.log("protoObject",protoObject);


//   // for each key in tabObject assign the value from the saved object to the prototype object.
//   var keys = Object.keys(layer.object);
  
//   for (let j = 0; j < keys.length; j++) {

//     var param = keys[j]; // get one key

//     // if( tabObject[param].value!=null ) { // if it has a value (i.e. if it's an input parameter)
//     // //console.log("param:",param);
//     if(protoObject[param]==null){
//       console.warn("the parameter ",param, "was not found in the prototype object for", layer.geometry, "." );
//     } else {
//       //console.log("layer.object[param].value:",layer.object[param].value);
//       protoObject[param].value = layer.object[param].value; // assign the *value* from the saved object to the prototype object
//     }
//     // }
//   }

  

//   // replace the object from newTabs (with key:value pairs like hue:20, sat:30, etc. with the new object with e.g. hue:{value:20,min:0,max:255,etc...})
//   Layers[layerIndex].object = protoObject; 


//   // calcTab(layer);
// }