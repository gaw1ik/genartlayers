function listAlgorithms() {

    var ALG_NAMES = [];

    var localStorageKeys = Object.keys(localStorage);

    for(let i=0; i<localStorageKeys.length; i++) {

        var thisKey = localStorageKeys[i];

        var prefix = thisKey.substr(0,3);

        if( prefix == "ALG" ) {
            var algName = thisKey.replace("ALG_","");
            ALG_NAMES.push(algName);
        }

    }

   return ALG_NAMES;

}




function listProjects() {

    var PROJ_NAMES = [];

    var localStorageKeys = Object.keys(localStorage);

    for(let i=0; i<localStorageKeys.length; i++) {

        var thisKey = localStorageKeys[i];

        var prefix = thisKey.substr(0,4);

        if( prefix == "PROJ" ) {
            var projName = thisKey.replace("PROJ_","");
            PROJ_NAMES.push(projName);
            
        }

    }

   return PROJ_NAMES;

}