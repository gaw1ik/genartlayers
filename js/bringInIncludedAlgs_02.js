async function bringInIncludedAlgs(includedAlgNames) {

    promisesList = [];

    for(let i=0; i<includedAlgNames.length; i++) {

        var thisAlgName = includedAlgNames[i];

        promisesList.push(
            //await promisesList.push(
            fetch("./" + "ALG_" + thisAlgName + ".txt")
            .then(response => {    
        
                return response.text();
                
            })
            .then( function(data) {

                return data;
        
            })
        );

    }

    // console.log("promisesList",promisesList);

    const fetchedDataList = await Promise.all(promisesList);

    for(let i=0; i<fetchedDataList.length; i ++) {

        var data = fetchedDataList[i];

        var algorithm = JSON.parse( data );

        var thisAlgName = includedAlgNames[i];

        // console.log("thisAlgName",thisAlgName);
        // console.log(algorithm);

        var paramsText = algorithm.params;
        var paramsCode = fromParamsText2Code(thisAlgName, paramsText);
        window.eval(paramsCode);

        // this line right here is super important. it makes sure that the params are in, so that the drawFunctionCode can include them.
        ControlsDict = window[thisAlgName + "Dict"]();

        

        var drawFunctionText = algorithm.drawFunction;
        var drawFunctionCode = fromDrawFunctionText2Code(thisAlgName, drawFunctionText);


        window.eval(drawFunctionCode);


    }

    // console.log("fetchedDataList",fetchedDataList)

}