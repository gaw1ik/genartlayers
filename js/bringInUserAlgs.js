











function bringInAlgsFromLocalStorage() {

    var localStorageKeys = Object.keys(localStorage);

    for(let i=0; i<localStorageKeys.length; i++) {

        var thisKey = localStorageKeys[i];

        var prefix = thisKey.substr(0,3);

        if( prefix == "ALG" ) {

            var thisItemStr = localStorage.getItem(thisKey);

            var thisItemJSON = JSON.parse(thisItemStr);


            // the name of the algorithm is the key minus the "ALG_" part.
            var algName = thisKey.replace("ALG_","");


            var paramsText = thisItemJSON.params;
            var paramsCode = fromParamsText2Code(algName, paramsText);
            // //console.log("paramsCode",paramsCode);
            window.eval(paramsCode);

            // this line right here is super important. it makes sure that the params are in, so that the drawFunctionCode can include them.
            ControlsDict = window[algName + "Dict"]();

            var drawFunctionText = thisItemJSON.drawFunction;
            var drawFunctionCode = fromDrawFunctionText2Code(algName, drawFunctionText);
            window.eval(drawFunctionCode);
        
        }

    }

}