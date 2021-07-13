function fromParams2Code(layer) {

    // var object = layer.object;
    var geometry = layer.geometry;
    var layerIndex = layer.ctxIndex;

    // code snippet starts with the function declaration
    var code_snippet = "function " + geometry + "Dict() { \n";

    // var keys = Object.keys(object);

    code_snippet = code_snippet + geometry + " = { \n"

    // console.log("layerIndex",layerIndex);

    var params_editor = ParamsEditors[layerIndex];

    // then comes the code from the code_editor
    var params_editor_text = params_editor.getValue();

    // console.log("params_editor_text",params_editor_text);
    // use replace to make sure that the close curly brackets are followed by a comma (necessary for the dictionary structure)
    params_editor_text_w_commas = params_editor_text.replaceAll(   "}"   ,   "}," );
    code_snippet = code_snippet + params_editor_text_w_commas + "\n } \n";

    code_snippet = code_snippet + "return " + geometry +";\n}";

    // console.log(code_snippet);

    return code_snippet;

}





function fromDrawFunction2Code(layer) {

    var object = layer.object;
    // console.log("object",object);
    var geometry = layer.geometry;
    var layerIndex = layer.ctxIndex;

    // code snippet starts with the function declaration
    var code_snippet = "function draw_" + geometry + "( paramValues, layer, ctx ) {\n";

    var keys = Object.keys(ControlsDict);

    for(let i=0; i<keys.length; i++) {

        var key = keys[i];

        // code_snippet = code_snippet + "var " + key + " = parseFloat(" + geometry + "." + key + ".value, 10 ); \n";

        code_snippet = code_snippet + "var " + key + " = " + "paramValues[" + i + "]; \n";

    }

    // gets the code editor for this layer
    var code_editor = CodeEditors[layerIndex];

    // gets the ctx variable by using the ctxIndex attribute of the layer.
    // code_snippet = code_snippet + "var ctx = ctx[" + layerIndex + "];\n"

    // one more return before the draw code.
    code_snippet = code_snippet + "\n";

    // then comes the code from the code_editor
    code_snippet = code_snippet + code_editor.getValue();

    // place the last curly brace to end the draw function.
    code_snippet = code_snippet + "\n}";

    // console.log(code_snippet);

    return code_snippet;

}







function fromAlgorithm2Code(layer) {

    fromParams2Code(layer);

    ControlsDict = window[geometry + "Dict"]();

    fromDrawFunction2Code(layer);

}










