
var SVGoban = require('..');

var config = {
    "size":13,
    "theme":"night",
    "noMargin":true,
    "hideMargin":false
};

var position = {
    "A1":"black",	
    "N1":"white",	
    "J10":"black",	
    "E10":"white",
    "D4":"black",
    "K4":"white"
};

var markers = {
    "K4":"circle"
}

console.log(SVGoban.serialize(config, position, markers));

