



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function fromParamsText2Code(algName, algText) {


    // code snippet starts with the function declaration
    var code_snippet = "function " + algName + "Dict() { \n";

    // var keys = Object.keys(object);

    var code_snippet = code_snippet + algName + " = { \n"



    // use replace to make sure that the close curly brackets are followed by a comma (necessary for the dictionary structure)
    var algTextWCommas = algText.replaceAll(   "}"   ,   "}," );
    code_snippet = code_snippet + algTextWCommas + "\n } \n";


    // then comes the code from the code_editor
    // code_snippet = code_snippet + algText + "\n } \n";

    code_snippet = code_snippet + "return " + algName +";\n}";

    // //console.log(code_snippet);

    return code_snippet;

}





/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function fromDrawFunctionText2Code(algName, algText) {


    // //console.log("object",object);
    var geometry = algName;

    var nHeadings = 0;



    ////////////////////////// CODE HEADER //////////////////////////
    // code snippet starts with the function declaration
    var code_snippet = "function draw_" + geometry + "( object ) {\n";

    // var code_snippet = "console.log('layerIndex'" + layerIndex + ")\n;"

    // if(algName.layerIndex===undefined) {
    //     // do nothing (that should mean it's a nested algorithm)
    // } else {
    //     code_snippet = code_snippet + "var layerIndex = object.layerIndex;\n";
    //     code_snippet = code_snippet + "var layer = Layers[layerIndex];\n";
    // }

    //code_snippet = code_snippet + "layerIndex = layer.ctxIndex;\n";
    //code_snippet = code_snippet + "layerIndex = layer.ctxIndex;\n";

    var keys = Object.keys(ControlsDict);

    for(let i=0; i<keys.length; i++) {

        var key = keys[i];

        var className = ControlsDict[key].class;

        if(className==="text") {
            // do nothing
        } else {
            code_snippet = code_snippet + "var " + key + " = " + "object." + key + ".value; \n";
        }


    }


    ////////////////////////// CODE BODY //////////////////////////
    // then comes the code from the code_editor
    code_snippet = code_snippet + algText;

    // place the last curly brace to end the draw function.
    code_snippet = code_snippet + "\n}";

    // //console.log(code_snippet);

    return code_snippet;

}












/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// function fromAlgorithm2Code(algName) {

//     fromParamsText2Code(layer);

//     ControlsDict = window[geometry + "Dict"]();

//     fromDrawTextFunction2Code(layer);

// }










