





function updatePROJ_Tabs2Layers() {


    var localStorageKeys = Object.keys(localStorage);

    // for each item in local storage...
    for(let i=0; i<localStorageKeys.length; i++) {

        var thisKey = localStorageKeys[i];

        var prefix = thisKey.substr(0,3);


        // if it's a project file...
        if( prefix == "PRO" ) {


            // get the str out of local storage.
            var thisItemStr = localStorage.getItem(thisKey);

            //console.log("thisItemStr",thisItemStr);


            // replace every instance of "Tabs" with "Layers".
            var thisItemStrUpdated = thisItemStr.replace("Tabs","Layers");

            //console.log("thisItemStrUpdated",thisItemStrUpdated);


            // and save the update version back to local stoarage.
            localStorage.setItem(thisKey, thisItemStrUpdated);


            // a lil' return for testing purposes
            // return;
        
        }

    }

}