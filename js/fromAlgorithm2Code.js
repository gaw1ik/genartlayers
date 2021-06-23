

function fromDrawFunction2Code(layer) {

    var object = layer.object;
    // console.log("object",object);
    var geometry = layer.geometry;
    var layerIndex = layer.ctxIndex;

    // code snippet starts with the function declaration
    var code_snippet = "function draw_" + geometry + "( ctx ) {\n";

    var keys = Object.keys(object);

    for(let i=0; i<keys.length; i++) {

        var key = keys[i];

        code_snippet = code_snippet + "var " + key + " = parseFloat(" + geometry + "." + key + ".value, 10 ); \n";

    }

    var code_editor = CodeEditors[layerIndex];

    // then comes the code from the code_editor
    code_snippet = code_snippet + code_editor.getValue();

    // place the last curly brace to end the draw function.
    code_snippet = code_snippet + "\n}";

    // console.log(code_snippet);

    return code_snippet;

}







function fromParams2Code(layer) {

    var object = layer.object;
    var geometry = layer.geometry;
    var layerIndex = layer.ctxIndex;

    // code snippet starts with the function declaration
    var code_snippet = "function " + geometry + "Dict() { \n";

    // var keys = Object.keys(object);

    code_snippet = code_snippet + geometry + " = { \n"

    console.log("layerIndex",layerIndex);

    var params_editor = ParamsEditors[layerIndex];

    // then comes the code from the code_editor
    code_snippet = code_snippet + params_editor.getValue() + "\n } \n";

    code_snippet = code_snippet + "return " + geometry +";\n}";

    // console.log(code_snippet);

    return code_snippet;

}


















