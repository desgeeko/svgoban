
var SVGoban = require('..');

var config = {
	"size":19,
	"theme":"classic"
};

var position = {
	"P16":"black",	
	"Q4":"white",
	"D4":"black",
	"E16":"white"
};

console.log(SVGoban.serialize(config, position));

