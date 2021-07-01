
// TABS SCRIPT

function openTab() {


    console.log("**Switch tab**");

    var i, tabcontent, tablinks;



    // get all the tabcontents
    tabcontent = document.getElementsByClassName("tabcontent");

    // change class of all tabcontents to "non-active" class and set display to "none"
    for (let i = 0; i < tabcontent.length; i++) {

        tabcontent[i].className = tabcontent[i].className.replace(" active", "");

        tabcontent[i].style.display = "none";

    }


    // get all the tab links
    tablinks = document.getElementsByClassName("tablinks");

    // change class of all tablinks to "non-active" class
    for (let i = 0; i < tablinks.length; i++) {

        tablinks[i].className = tablinks[i].className.replace(" active", "");

    }

    // change current button to active class
    this.className += " active";



    // get current tab and change its class to the "active" class
    var currentTabIndex =  getNamedIndexOfElement("Tab",this);
    currentLayerIndex =  getNamedIndexOfElement("Layer",this); // global variable
    // console.log("currentTabIndex:",currentTabIndex);
    // console.log("currentLayerIndex:",currentLayerIndex);

    // Update the Layer Header
    var layer_header = document.getElementById("layer_header");
    layer_header.innerText = "Layer " + currentLayerIndex + ":";


    var currentTabId = "Tab" + currentTabIndex;

    // console.log("currentTabId:",currentTabId);

    // console.log("currentTabId:",currentTabId);
    var currentTab = document.getElementById(currentTabId)
    currentTab.style.display = "block";
    currentTab.className += " active";
    


    if(currentTabIndex==97){

        // var ControlsCodeToggle = document.getElementById("ControlsCodeToggle");
        // var ControlsCodeToggle_value = ControlsCodeToggle.value;

        var currentLayer = Tabs[currentLayerIndex];

        if(currentPanelValue == 1) {
            makeGUICodePanel(currentLayer);
        } else {
            makeGUIControlsPanel(currentLayer);
        }

    }

    if(currentTabIndex==99){
        currentLayerIndex=0;
    }

// }





}


    
