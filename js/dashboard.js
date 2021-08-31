// this is more-or-less my main function, but it's currently a little dirty (probably)
// handles the window.onload tasks and also sets up event handlers


VERSION = "1.16d"

// GLOBAL VARIABLES
includedProjNames = ["default","example4Martin","example01"];
includedAlgNames = ["bg","example01","arcs4Martin","arcsA"];
currentProjName = "default";
noDrawMode = 0;
ctxIndex = 0;
ctxToDrawToNow = 0;

xCenterOffset = 0.5;
yCenterOffset = 0.5;

//xOrigin = 0.5;
//yOrigin = 0.5;

axesOn = -1;
gridOn = -1;


// useful constants
//deg2rad = Math.PI/180;
twoPI = Math.PI * 2;
PI = Math.PI;
PIo2 = Math.PI/2;
PIo4 = Math.PI/4;
PIo8 = Math.PI/8;
PIo16 = Math.PI/16;
PIo32 = Math.PI/32;
PIo64 = Math.PI/64;




window.onload = function () {

  //console.log("**Window Loaded**");




  // make the BIG OL' array of code_editors, CodeEditors.
  CodeEditors = [];
  ParamsEditors = [];
  ControlsDict = [];






  // // Retrieve the ApplicationData object out of local storage and put the most recent projects into the Main Tab.
  // if (localStorage.getItem("ApplicationData") === null) {

  //   //console.log("creating Application Data for New User");
  //   // if the ApplicationData object doesn't already exist in local storage, create a new one (new user).
  //   ApplicationData = { "recentOpenedProjects":[] };
  //   var ApplicationDataJSON = JSON.stringify(ApplicationData);
  //   localStorage.setItem("ApplicationData", ApplicationDataJSON);

  //   // //console.log("ApplicationData",ApplicationData);

  // } else {

  //   // //console.log("getting Application Data for Existing User");

  //   var ApplicationDataJSON = localStorage.getItem("ApplicationData");
  //   ApplicationData = JSON.parse(ApplicationDataJSON);
  //   var recentOpenedProjects = ApplicationData.recentOpenedProjects;
  //   var recent_projects_list = document.getElementById("recent-projects-list");
  //   var text = "";

  //   for(let i=0; i<recentOpenedProjects.length; i++) {
  //     var thisPROJ_Name = recentOpenedProjects[i].replace("PROJ_","");
  //     text = text + thisPROJ_Name + ", ";
  //   }

  //   recent_projects_list.innerText = text;

  //   // //console.log("ApplicationData",ApplicationData);

  // }



  currentPanelValue = 0;



  // Assign default document properties to page controls
  var tabElement = document.getElementById("Tab98ControlsPanel");
  doc1 = docDict(); // make default doc object
  var keys = Object.keys(doc1);

  // add the input_section to the main tab
  var input_section = document.createElement("DIV")
  var nColumns = 2
  input_section.className = "grid-container-Nx" + nColumns

  tabElement.appendChild(input_section);

  for (i = 0; i < keys.length; i++) {

    var key = keys[i];
    // var inputID = doc1[key].inputID
    var inputID = "doc_" + "Property" + key + "_Input";
    // var element = document.getElementById(inputID);



    var input = document.createElement("INPUT");

          //
          //
          //
          var label = document.createElement("H5");

          // handles adding the value indicator
          if (doc1[key].class == "on-off") {
            label.innerText = key;
          } else if (doc1[key].class == null) {
            label.innerText = key;
          } else {
            label.innerText = key + "()";
          }


          //
          //
          //



    doc1[key].value = doc1[key].default;
    input.id = inputID
    input.value = doc1[key].value;
    input.min   = doc1[key].min;
    input.max   = doc1[key].max;
    input.step       = doc1[key].step;
    input.className  = doc1[key].class;
    input.type  = doc1[key].type;

    // input_section.appendChild(input);
    input_section.insertBefore(label, null);
    input_section.appendChild(input);

    updateObjectPropertyIndicator(input);

    input.addEventListener("input", updateDocObject);
  }


  // Canvases
  canvas_0 = document.getElementById("canvas0");
  canvas_1 = document.getElementById("canvas1");
  canvas_2 = document.getElementById("canvas2");
  canvas_3 = document.getElementById("canvas3");
  canvas_4 = document.getElementById("canvas4");
  canvas_5 = document.getElementById("canvas5");
  canvas_6 = document.getElementById("canvas6");
  canvas_7 = document.getElementById("canvas7");
  canvas_8 = document.getElementById("canvas8");

  

  canvas4Export = document.getElementById("canvas4Export");
  canvas4Wall = document.getElementById("canvas4Wall");
  canvas4WallShadow = document.getElementById("canvas4WallShadow");
  canvas4WallShot = document.getElementById("canvas4WallShot");
  canvas4Frame = document.getElementById("canvas4Frame");

  // canvases array
  canvases = [canvas_0, canvas_1, canvas_2, canvas_3, canvas_4, canvas_5, canvas_6, canvas_7, canvas_8];

  // get ctx variables from each canvas
  CTX = [];
  for (i = 0; i < canvases.length; i++) {
    CTX[i] = canvases[i].getContext("2d");
  }




  ctx4Export = canvas4Export.getContext("2d");
  ctx4WallShadow = canvas4WallShadow.getContext("2d");
  ctx4Wall   =   canvas4Wall.getContext("2d");
  ctx4WallShot = canvas4WallShot.getContext("2d");
  ctx4Frame = canvas4Frame.getContext("2d")


  // LAYERS ARRAY
  Layers = [];

  // Set up Page Properties
  // setUpDocumentEventListeners();


  attachTabButtonEventListeners();



  loadIncludedStuff();



  // fpath.value = "default";
  // readJsonButton.click(); // automatically opening the project defined in the line above

  // setTheme_input.click(); // automatically select light theme

  // do a resize
  handleResize();

  // document.getElementById("Tab99_Button").click();




};



async function loadIncludedStuff() {

    
    // pull in all the user's saved algorithms from local storage.
    bringInAlgsFromLocalStorage();

    // pull in all the included algorithms.
    
    let response = await bringInIncludedAlgs(includedAlgNames);
  
    // FOR AUTOMATCIALLY OPENING A PROJECT
    loadDefaultProject();

}










// Tab Buttons EVENT LISTENERS
function attachTabButtonEventListeners() {
  // Main Tab Button
  // MainTabButton = document.getElementById("Tab99_Button");
  // MainTabButton.addEventListener("click", openTab);

  DocPropsTabButton = document.getElementById("Tab98_Button");
  DocPropsTabButton.addEventListener("click", openTab);

  // click on it
  //MainTabButton.click();
}

// // setTheme Event Listener
// document.addEventListener("DOMContentLoaded", function () {
//   setTheme_input = document.getElementById("setTheme");

//   setTheme_input.addEventListener("change", setTheme);
// });

// // saveImg Event Handler
// document.addEventListener("DOMContentLoaded", function () {
//   SaveImgButton = document.getElementById("save-img-button");

//   SaveImgButton.addEventListener("click", saveImg);
// });


























// // Slider Sat Hue Change Handler
// // document.addEventListener('DOMContentLoaded', function() {
//   sliderHue = document.getElementsByClassName("slider-hue");
//   sliderSat = document.getElementsByClassName("slider-sat");

//   for (i=0;i<sliderHue.length;i++) {
//     sliderHue[i].addEventListener('input',updateColorSliders );
//   }
// // });

// function updateColorSliders() {

//   for (i=0;i<sliderSat.length;i++) {

//     //console.log("hey");

//     var sliderSatHue = sliderHue[i].value;
//     var color1 = 'hsl(' + sliderSatHue + ', ' +  0 + '%, ' + 50 + '%)';
//     var color2 = 'hsl(' + sliderSatHue + ', ' +  100 + '%, ' + 50 + '%)';

//     sliderSat[i].style.background = 'linear-gradient(to right,' + color1 + ',' + color2 + ')';
//   }

// }

// add window size change event handler to trigger the handleResize function
window.addEventListener("resize", handleResize);


//
//
//
//





