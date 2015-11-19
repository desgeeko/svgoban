
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

var markers = {
    "A1":"circle",
    "T1":"circle",
    "E16":"square",
    "K12":"cross",
    "J12":"triangle",
    "L12":"square",
    "Q4":"triangle",
    "P16":"square",
    "D4":"triangle"
};

console.log(SVGoban.serialize(config, position, markers));

