



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

    // console.log(code_snippet);

    return code_snippet;

}





/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function fromDrawFunctionText2Code(algName, algText) {


    // console.log("object",object);
    var geometry = algName;



    ////////////////////////// CODE HEADER //////////////////////////
    // code snippet starts with the function declaration
    var code_snippet = "function draw_" + geometry + "( paramValues, layer, ctx ) {\n";

    var keys = Object.keys(ControlsDict);

    for(let i=0; i<keys.length; i++) {

        var key = keys[i];

        // console.log("key",key);

        // code_snippet = code_snippet + "var " + key + " = parseFloat(" + geometry + "." + key + ".value, 10 ); \n";

        code_snippet = code_snippet + "var " + key + " = " + "paramValues[" + i + "]; \n";

    }


    ////////////////////////// CODE BODY //////////////////////////
    // then comes the code from the code_editor
    code_snippet = code_snippet + algText;

    // place the last curly brace to end the draw function.
    code_snippet = code_snippet + "\n}";

    // console.log(code_snippet);

    return code_snippet;

}












/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// function fromAlgorithm2Code(algName) {

//     fromParamsText2Code(layer);

//     ControlsDict = window[geometry + "Dict"]();

//     fromDrawTextFunction2Code(layer);

// }










