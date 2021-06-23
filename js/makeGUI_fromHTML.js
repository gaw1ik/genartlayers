
function remakeGUI() {

    var id = this.id;
    var tabIndex = id.substring(id.lastIndexOf('_') + 1);

    var tabID = "Tab_"+tabIndex;

    var parent = document.getElementById(tabID);

    var tab = Tabs[tabIndex];

    // update the tab geometry to match the change
    tab.geometry = this.value;
    TabModule_Name = this.value;

    // console.log("TabModule_Name:",TabModule_Name);

    // make new module object
    tab.object = window[ TabModule_Name + "Dict" ]();

    removeAllChildNodes(parent);

    makeGUI(tab);

    distributeEventListenersToControls(tab);

    assignToControls(tab);

    var tabButton = document.getElementById("Tab_Button_" + tabIndex);
    tabButton.innerText = tabIndex + ". " + TabModule_Name;

    calcAll();
    drawAll();
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}



function makeGUI(tab) {

    var ModuleHTML = fs.readFileSync( 'C:/Users/Brian/Documents/GitHub/Gen-Art-Studio-01/js/' + tab.geometry + '/moduleHTML.html','utf8' );
    var Tab = document.getElementById("Tab_" + tab.ctxIndex);
    Tab.insertAdjacentHTML('afterbegin', ModuleHTML);

    // var tabName = tab.name;
    // var geometry = tab.geometry;

    var tabIndex = tab.ctxIndex;

    var object = tab.object;

    

    var tabButton = document.getElementById("Tab_Button_" + tabIndex);
    tabButton.innerText = tabIndex + ". " + tab.geometry;

    var tabDiv = document.getElementById("Tab_" + tabIndex);
    var inputs = tabDiv.getElementsByTagName('input');

    var keys = Object.keys(object);  

    for(let i=0; i<keys.length; i++) {

        var key = keys[i];

        var id = object[key].inputID;

        if(object[key].type!=null){ // if it's a control then do the thing (otherwise it's a non-control property without attributes like min, max, etc.)

            var propertyName = key;

            var input = inputs[i];

            // console.log("input:",input);

            // input.id = propertyName + "_Tab" + tabIndex;

            // if the input doesn't exist in the HTML (yet), just skip this part, otherwise info like id, min, max, etc. are added to the input element.
            if(input==undefined){
                // do nothing (skip)
            } else {

                // set up the html input to have all the desired properties
                input.id = makeInputName(propertyName, tabIndex);

                input.min = object[propertyName].min;
                input.max = object[propertyName].max;
                input.step = object[propertyName].step;
                input.type = object[propertyName].type;
                input.className = object[propertyName].class;
                
                object[key].inputID = input.id;

                object["tabIndex"] = tabIndex;
            }

        }

    }

    // console.log("made GUI for the object:",object);


}