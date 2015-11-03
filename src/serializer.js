/**
 * SVGoban
 * serializer.js
 *
 */

var Geo = require('./geometry');
var Css = require('./styles');

/** @todo Replace all string concatenations with ES6 templates? */


var _toElem = function(shapes) {
    var typeofShape;
    var txt = null;
    var ret = '';

    for (var i = 0; i < shapes.length; i++) {
        typeofShape = shapes[i].type;

        txt = shapes[i].txt || '';
        delete shapes[i].txt;

        delete shapes[i].type;
	ret += '<' + typeofShape + ' ';
	
	ret += 'style="';
	for (var j in shapes[i].style) {
	    ret += j + ':' + shapes[i].style[j] + ';';
	}
	ret += '" ';
        delete shapes[i].style;

	for (var k in shapes[i]) {
	    if (k == "key") continue;
	    ret += k + '="' + shapes[i][k] + '" ';
	}
	ret += '>' 
	ret += txt;
	ret += '</' + typeofShape + '>';
    }
    return ret;
}

var _addGridLayer = function(str, size) {
    str += '<g class="grid_layer">'
    str +=   '<rect class="wood" x="0" y="0" width="100%" height="100%" />';
    str +=   _toElem(Geo.shapeGrid(size));
    str += '</g>'
    return str;
}

var _addStarPointsLayer = function(str, size) {
    str += '<g class="starpoints_layer">'
    str +=   _toElem(Geo.shapeStarPoints(size));
    str += '</g>'
    return str;
}

var _addStonesLayer = function(str, size, pos) {
    str += '<g class="stones_layer">'
    str +=   _toElem(Geo.shapeStones(size, pos));
    str += '</g>'
    return str;
}

var _addLettersLayer = function(str, size) {
    str += '<g class="letters_layer">'
    str +=   _toElem(Geo.shapeLabels(size));
    str += '</g>'
    return str;
}

var _addGradient = function(str, color) {
    var rad = Css.defineRadialColors(color);
	var attr = '';
	attr += 'id="' + rad.id + '" ';
    for (var i in rad.gradient) {
        attr += i + '="' + rad.gradient[i] + '" ';
    }
    str += '<radialGradient ';
    str += attr + '>';
    str += '<stop offset="0%" style="stop-color:' + rad.a + ';stop-opacity:1" />'
    str += '<stop offset="100%" style="stop-color:' + rad.z + ';stop-opacity:1" />'
    str += '</radialGradient>';
    return str;
}

var _addStyles = function(str, theme) {
    str += '<style type="text/css"><![CDATA['
    str +=   Css.Themes[theme]();
    str += ']]></style>'
    return str;
}

/**
 * Serializes a full SVG goban into a string.
 *
 * @param {object} config object with size and theme attributes
 * @param {object} pos object containing locations of stones
 * @returns {string} 
 */
var serializeSVG = function(config, pos) {
    var size = config.size || 19;
    var theme = config.theme || "classic";
    var viewBox = Geo.shapeArea().join(" ");
    var str = '<svg class="svgoban" xmlns="http://www.w3.org/2000/svg" version="1.1" ';
    str += 'height="100%" viewBox="' + viewBox + '" >';    
    str += '<defs>';
    str = _addGradient(str, "black");
    str = _addGradient(str, "white");
    str = _addStyles(str, theme);
    str += '</defs>';
    str = _addGridLayer(str, size);
    str = _addStarPointsLayer(str, size);
    str = _addStonesLayer(str, size, pos);
    str = _addLettersLayer(str, size);
    str += '</svg>';
    return str;
}

module.exports = serializeSVG;
