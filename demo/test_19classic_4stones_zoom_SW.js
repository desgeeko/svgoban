
var SVGoban = require('..');

var config = {
    "size":19,
    "theme":"classic",
    "coordSystem":"A1",
    "noMargin":false,
    "hideMargin":true,
    "zoom":{"mode":"zone", "region":"SW"}
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
    "G8":"a",
    "H8":"b",
    "J8":"C",
    "K8":"D",
    "L8":"1",
    "M8":"2",
    "N8":"3",
    "E16":"square",
    "K12":"cross",
    "J12":"triangle",
    "L12":"square",
    "Q4":"triangle",
    "P16":"square",
    "D4":"triangle"
};

console.log(SVGoban.serialize(config, position, markers));

