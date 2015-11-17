
var SVGoban = require('..');

var config = {
    "size":19,
    "theme":"classic",
    "noMargin":false,
    "hideMargin":false
};

var position = {
    "A1":"black",	
    "T1":"white",	
    "P16":"black",	
    "Q4":"white",
    "D4":"black",
    "E16":"white"
};

console.log(SVGoban.serialize(config, position, "T1"));

