/**
 * SVGoban
 * geometry.js
 *
 */

var SV_GRID_SIZE = 560;
var SV_MARGIN = 30;

/**
 * Shapes the horizontal and vertical lines.
 *
 * @param {number} size the grid base (9, 13, 19)
 * @returns {Array} 
 */
exports.shapeGrid = function(size) {
    size = +size;
    var step = SV_GRID_SIZE / (size + 1);
    var x1, y1, x2, y2;
    var ret = [];

    var s = {
	"stroke-width":1, 
	"shape-rendering":"geometricPrecision"
    };

    /** @todo Replace multiple lines with one SVG path? */
    for (var i = 1; i <= size; i++) {
	x1 = SV_MARGIN + step;
	y1 = SV_MARGIN + i * step;
	x2 = SV_MARGIN + SV_GRID_SIZE - step;
	y2 = SV_MARGIN + i * step;
	ret.push({type:"line", x1:x1, y1:y1, x2:x2, y2:y2, style:s});
    }
    for (var j = 1; j <= size; j++) {
	x1 = SV_MARGIN + j * step;
	y1 = SV_MARGIN + step;
	x2 = SV_MARGIN + j * step;
	y2 = SV_MARGIN + SV_GRID_SIZE - step;
	ret.push({type:"line", x1:x1, y1:y1, x2:x2, y2:y2, style:s});
    } 
    return ret;
}

/**
 * Shapes the star points (Hoshis).
 *
 * @param {number} size the grid base (9, 13, 19)
 * @returns {Array} 
 */
exports.shapeStarPoints = function(size) {
    size = +size;
    var step = SV_GRID_SIZE / (size + 1);
    var cx, cy, r;
    var ret = [];
    var evenSize = size % 2;
    var midStars = 1;
    var starPadding = 4;
    if (size < 12) {
	starPadding = 3;
	midStars = 0;
    }
    r = step / 10;
    cx = SV_MARGIN + starPadding * step;
    cy = SV_MARGIN + starPadding * step;
    ret.push({type:"circle", cx:cx, cy:cy, r:r});
    cx = SV_MARGIN - starPadding * step + SV_GRID_SIZE;
    cy = SV_MARGIN + starPadding * step;
    ret.push({type:"circle", cx:cx, cy:cy, r:r});
    cx = SV_MARGIN + starPadding * step;
    cy = SV_MARGIN - starPadding * step + SV_GRID_SIZE;
    ret.push({type:"circle", cx:cx, cy:cy, r:r});
    cx = SV_MARGIN - starPadding * step + SV_GRID_SIZE;
    cy = SV_MARGIN - starPadding * step + SV_GRID_SIZE;
    ret.push({type:"circle", cx:cx, cy:cy, r:r});
    /** Central star point */
    if (evenSize == 1) {
	cx = SV_MARGIN + (size + 1) / 2 * step;
	cy = SV_MARGIN + (size + 1) / 2 * step;
	ret.push({type:"circle", cx:cx, cy:cy, r:r});
	/** 3rd star point */
	if (midStars == 1) {
	cx = SV_MARGIN + (size + 1) / 2 * step;
	cy = SV_MARGIN + starPadding * step;
	ret.push({type:"circle", cx:cx, cy:cy, r:r});
	cx = SV_MARGIN + starPadding * step;
	cy = SV_MARGIN + (size + 1) / 2 * step;
	ret.push({type:"circle", cx:cx, cy:cy, r:r});
	cx = SV_MARGIN + (size + 1) / 2 * step;
	cy = SV_MARGIN - starPadding * step + SV_GRID_SIZE;
	ret.push({type:"circle", cx:cx, cy:cy, r:r});
	cx = SV_MARGIN - starPadding * step + SV_GRID_SIZE;
	cy = SV_MARGIN + (size + 1) / 2 * step;
	ret.push({type:"circle", cx:cx, cy:cy, r:r});
	}
    }
    return ret;
}

/**
 * Shapes the axis labels.
 *
 * @param {number} size the grid base (9, 13, 19)
 * @returns {Array} 
 */
exports.shapeLabels = function(size) {
    size = +size;
    var step = SV_GRID_SIZE / (size + 1);
    var x, y, txt;
    var ret = [];
    var hletter;
    var vnumber;
    var skipJ;
    
    for ( var i = 1; i <= size; i++ ) {
	skipJ = i >= 9 ? 1 : 0;
	hletter = String.fromCharCode(64 + i + skipJ);

	/** Top row */
	x = SV_MARGIN + i * step;
	y = SV_MARGIN;
	txt = hletter;
	var s = {
	    "text-anchor":"middle" 
	};
	ret.push({type:"text", x:x, y:y, txt:txt, style:s});

	/** Bottom row */
	x = SV_MARGIN + i * step;
	y = SV_MARGIN + SV_GRID_SIZE + 12;
	txt = hletter;
	var s = {
	    "text-anchor":"middle" 
	};
	ret.push({type:"text", x:x, y:y, txt:txt, style:s});
    }
    for ( var j = 1; j <= size; j++ ) {
	vnumber = j.toString();

	/** Left column */
	x = SV_MARGIN;
	y = SV_MARGIN - j * step + SV_GRID_SIZE;
	txt = vnumber;
	var s = {
	    "text-anchor":"end", 
	    "dominant-baseline":"central"
	};
	ret.push({type:"text", x:x, y:y, txt:txt, style:s});

	/** Right column */
	x = SV_MARGIN + SV_GRID_SIZE;
	y = SV_MARGIN - j * step + SV_GRID_SIZE;
	txt = vnumber;
	var s = {
	    "text-anchor":"start", 
	    "dominant-baseline":"central"
	};
	ret.push({type:"text", x:x, y:y, txt:txt, style:s});
    }
    return ret;
}

/**
 * Shapes the stones and placeholders.
 *
 * @param {number} size the grid base (9, 13, 19)
 * @returns {Array} 
 */
exports.shapeStones = function(size, positions) {
    size = +size;
    var step = SV_GRID_SIZE / (size + 1);
    var cx, cy, r, cls;
    var ret = [];
    var hletter;
    var vnumber;
    var coord;
    var skipJ;

    for ( var i = 1; i <= size; i++ ) {
	skipJ = i >= 9 ? 1 : 0;
	hletter = String.fromCharCode(64 + i + skipJ);
	for ( var j = 1; j <= size; j++ ) {
	    vnumber = j.toString();
	    coord = hletter + vnumber; 

	    cls = "stone";
	    cls += positions[coord] ? " " + positions[coord] + "stone": " placeholder";

	    cx = SV_MARGIN + i * step;
	    cy = SV_MARGIN - j * step + SV_GRID_SIZE;
	    r = step / 2.1;
	    ret.push({type:"circle", coord:coord, cx:cx, cy:cy, r:r, class:cls });
	}
    }
    return ret;
}

/**
 * Shapes the visible area.
 *
 * @returns {Array} 
 */
exports.shapeArea = function() {
    /** @todo Zoom */
    var sz = SV_GRID_SIZE + 2*SV_MARGIN - 1;
    return [0, 0, sz, sz];
}



