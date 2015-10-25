
var SVGoban = require('..');

var config = {
	"size":13,
	"theme":"night"
};

var position = {
	"J10":"black",	
	"E10":"white",
	"D4":"black",
	"K4":"white"
};

console.log(SVGoban.serialize(config, position));

