function bringInIncludedAlgs(includedAlgNames) {


    for(let i=0; i<includedAlgNames.length; i++) {

        var thisAlgName = includedAlgNames[i];

    
        fetch("./" + "ALG_" + thisAlgName + ".txt")
        .then(response => {    
    
            return response.text();
            
        })
        .then( function(data) {
 
            var algorithm = JSON.parse( data );

            console.log("thisAlgName",thisAlgName);
            console.log(algorithm);

            var paramsText = algorithm.params;
            var paramsCode = fromParamsText2Code(thisAlgName, paramsText);
            window.eval(paramsCode);

            // this line right here is super important. it makes sure that the params are in, so that the drawFunctionCode can include them.
            ControlsDict = window[thisAlgName + "Dict"]();

            var drawFunctionText = algorithm.drawFunction;
            var drawFunctionCode = fromDrawFunctionText2Code(thisAlgName, drawFunctionText);
            window.eval(drawFunctionCode);
    
        })

    }

}