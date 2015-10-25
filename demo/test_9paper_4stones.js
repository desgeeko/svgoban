
var SVGoban = require('..');

var config = {
	"size":9,
	"theme":"paper"
};

var position = {
	"F7":"black",	
	"D7":"white",
	"C3":"black",
	"G3":"white"
};

console.log(SVGoban.serialize(config, position));

