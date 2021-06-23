// this function figures out which tab an element belongs to, and returns that Tab's index.
function getLayerElementIsOn(element) {

    layerIndex = getNamedIndexOfElement("Layer",element);

    var layer = Tabs[layerIndex];

    return layer;
}



// function getPropertyName(element) {
//     var id = element.id;
//     var propertyName = id.substring( 0, id.indexOf('_')  );  
//     return propertyName;
// }


// function to handle getting rid of the previous GUI (so that a new one can replace it whenever the module type is changed)
function removeAllChildNodes(parent) {
    if(parent!=null){ // if the parent (the Tab element) exists
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
    }
  }



// HEY. So, this is a really bullshit function which has a lot of esoteric stuff... Just hackin things together atm.
// Basically what this does is goes through and deletes childNodes until the childNode's className starts with "CodeMirror".
// NOW, this obviously assumes that the Code Editor is the last "keeper" element in the Tab97, which could change in the future. (Temporary soln)
function removeAllChildNodesExcept(parent) {
  if(parent!=null){ // if the parent (the Tab element) exists

    while(true) { 

      var lastChildsClassName = parent.lastChild.className;
      console.log("lastChildsClassName",lastChildsClassName);
      console.log("lastChildsClassName type",typeof(lastChildsClassName));

      // if the element has a className, check to see if the first 10 characters are "CodeMirror"
      if(lastChildsClassName === undefined){

        parent.removeChild(parent.lastChild);

      } else if (lastChildsClassName.substring(0,10) == "CodeMirror") {

        console.log("it was CodeMirror");

        return;

      } else {

        parent.removeChild(parent.lastChild);

      }

    }

  }

}



function removeAllChildNodesExceptCode(parent) {

  if(parent!=null){ // if the parent (the Tab element) exists

    var nChildren = parent.childNodes.length;

    console.log("nChildren",nChildren);

    for(let i=0; i<nChildren; i++) { 

      // var lastChildsClassName = parent.lastChild.className;
      // console.log("lastChildsClassName",lastChildsClassName);

      let thisChild = parent.childNodes[i];

      console.log("thisChild",thisChild);

    

      if(thisChild === undefined) {

        console.log("")
        
        parent.removeChild(thisChild);

      } else {

        let thisChildsClassName = thisChild.className;

        if(thisChildsClassName !== undefined) {

          if (thisChildsClassName.substring(0,10) == "CodeMirror") {
            // do nothing
            console.log("it was a CodeMirror");        
          } else {
            parent.removeChild(thisChild);
            console.log("it was NOT a CodeMirror");
          }

        }

      }

    }

  }
  
}






function getNamedIndexOfElement(name,element) {
    var id = element.id;
    var newid = id.substring(id.indexOf(name));
    var namedIndex = newid.substring(newid.indexOf(name)+name.length,newid.indexOf("_"));
    namedIndex = parseInt(namedIndex,10);
    return namedIndex;
}


function getPropertyNameFromInput(name,element) {
    var id = element.id;
    var newid = id.substring(id.indexOf(name));
    var namedIndex = newid.substring(newid.indexOf(name)+name.length,newid.indexOf("_"));
    return namedIndex;
}



function print(variable) {
  // var hello = variable
  var variableAsString = Object.keys({variable})[0];
  console.log(variableAsString + ":", variable);
}


// function makeInputName(propertyName, tabIndex) {
//     // var tabIndex = tab.ctxIndex;
//     var inputName = "";
//     if(tabIndex>9){
//         inputName = propertyName + "_Tab" + tabIndex;
//     } else {
//         inputName = propertyName + "_Tab0" + tabIndex;
//     }
//     return inputName;
// }


// function makeTabNameExtension(tabIndex) {
//     // var tabIndex = tab.ctxIndex;
//     let tabNameExtension;

//     if(tabIndex>9){
//         tabNameExtension =  "Tab"  + tabIndex;
//     } else {
//         tabNameExtension =  "Tab0" + tabIndex;
//     }
//     return tabNameExtension;
// }


// // // // OLD SHIT

// // this function figures out which tab an element belongs to, and returns that Tab's index.
// function getTabIndexOfElement(element) {
//     var id = element.id;
//     // console.log("id:",id)
//     var start = id.lastIndexOf('Tab') + 3; // add 2 to get from "T" to "b" and then 1 more to get to the index
//     var end = start + 2;
//     // console.log("[start,end]:",[start,end])
//     var tabIndex = id.substring(start, end);
//     // console.log("tabIndex:",tabIndex);
//     var nDigits = tabIndex.length;
//     if(tabIndex[0]==0){
//         tabIndex = tabIndex.substring(1);
//     } else {
//         // do nothing
//     }
//     var tabIndexInt = parseInt(tabIndex,10);
//     return tabIndexInt;
// }

// // this function figures out which layer an element belongs to, and returns that Layer's index.
// function getLayerIndexOfElement(element) {
//     var id = element.id;
//     var start = id.lastIndexOf('Layer') + "Layer".length; // add 2 to get from "T" to "b" and then 1 more to get to the index
//     var end = start + 1;
//     var layerIndex = id.substring(start, end);
//     return layerIndex;
// }