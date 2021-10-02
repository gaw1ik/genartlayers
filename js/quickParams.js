function quickParams() {

    var layerIndex = currentLayerIndex;

    //var layer = Layers[currentLayerIndex];

    var params_editor = ParamsEditors[layerIndex];
    
    // var code_snippet = 'section1:{class:"text",value:"Random Stuff"}\nseed:{class:"seed"}\n\nsection2:{class:"text",value:"Position"}\nx0:{class:"slider", default:0, min:-1, max:1, step:0.01}\ny0:{class:"slider", default:0, min:-1, max:1, step:0.01}\nrotationD:{class:"angle"}\n\nsection3:{class:"text",value:"Color"}\nhue:{class:"slider-hue"}\nsat:{class:"slider-sat"}\nlit:{class:"slider-lit"}\nalpha:{class:"slider-alpha"}'

    var code_snippet = 
`section1:{class:"text",value:"Random Stuff"}
    seed:{class:"seed"}

section2:{class:"text",value:"Position"}
    x0:{class:"slider", default:0, min:-1, max:1, step:0.01}
    y0:{class:"slider", default:0, min:-1, max:1, step:0.01}
    rotationD:{class:"angle"}
    
section3:{class:"text",value:"Color"}
    hue:{class:"slider-hue"}
    sat:{class:"slider-sat"}
    lit:{class:"slider-lit"}
    alpha:{class:"slider-alpha"}
`
    
    params_editor.setValue(code_snippet);

}