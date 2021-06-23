function randomizeParams(layers) {
    // var values = Object.values(layers)

    layerIndex = 0;

    var layer = layers[layerIndex]

    var object = layer.object

    var params = Object.keys(object)

    var min
    var max
    var step
    var value
    var roundedValue
    var param

    for(i=0; i<params.length; i++){

        param = params[i]

        min  = object[param].min
        max  = object[param].max
        step = object[param].step

        value = getRandomFloat(min,max)

        roundedValue = Math.round(value / step) * step

        randomValue = roundedValue

        object[param].value = randomValue

    }

    layer.object = object

    updateLayers()

    calcTab(layer)

    // return randomValue
}