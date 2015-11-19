/**
 * SVGoban
 * geometry.js
 *
 */

var SV_GRID_SIZE = 560;
var SV_MARGIN = 30;
var SV_BORDER_SHRINK = 7;
var SV_MARKER = 2.5;

/**
 * Shapes the background.
 *
 * @param {boolean} noMargin
 * @returns {Array} 
 */
exports.shapeBackground = function(noMargin) {
    var offset, sz, cls;
    var ret = [];

    cls = "wood";
    if (noMargin) {
	offset = SV_MARGIN + SV_BORDER_SHRINK;
	sz = SV_GRID_SIZE - 2*SV_BORDER_SHRINK;
    } else {
	offset = 0;
	sz = SV_GRID_SIZE + 2*SV_MARGIN;
    }
    ret.push({type:"rect", class:cls, x:offset, y:offset, width:sz, height:sz});
    return ret;
}

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
	"shape-rendering":"crispEdges",
	"vector-effect":"non-scaling-stroke"
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
    var skipI;
    
    for ( var i = 1; i <= size; i++ ) {
	skipI = i >= 9 ? 1 : 0;
	hletter = String.fromCharCode(64 + i + skipI);

	/** Top row */
	x = SV_MARGIN + i * step;
	y = SV_MARGIN - 5;
	txt = hletter;
	var s = {
	    "text-anchor":"middle" 
	};
	ret.push({type:"text", x:x, y:y, txt:txt, style:s});

	/** Bottom row */
	x = SV_MARGIN + i * step;
	y = SV_MARGIN + SV_GRID_SIZE + 15;
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
 * @param {Object} positions as key-value pairs of coordinates and colors
 * @returns {Array} 
 */
exports.shapeStones = function(size, positions) {
    size = +size;
    var step = SV_GRID_SIZE / (size + 1);
    var cx, cy, r, cls;
    var ret = [];
    var hletter, vnumber, coord, skipI;

    for ( var i = 1; i <= size; i++ ) {
	skipI = i >= 9 ? 1 : 0;
	hletter = String.fromCharCode(64 + i + skipI);
	for ( var j = 1; j <= size; j++ ) {
	    vnumber = j.toString();
	    coord = hletter + vnumber; 

	    cls = "stone";
	    cls += positions[coord] ? " " + positions[coord] + "stone": " placeholder";
	    cls += " " + coord;

	    cx = SV_MARGIN + i * step;
	    cy = SV_MARGIN - j * step + SV_GRID_SIZE;
	    r = step / 2.1;
	    ret.push({type:"circle", key:coord, cx:cx, cy:cy, r:r, class:cls });
	}
    }
    return ret;
}

/**
 * Shapes a specific intersection.
 *
 * @param {number} size the grid base (9, 13, 19)
 * @param {string} intersection
 * @param {string} color ("black"/"white"/"placeholder")
 * @returns {Array}
 */
exports.shapeStone = function(size, intersection, color) {
    size = +size;
    var step = SV_GRID_SIZE / (size + 1);
    var cx, cy, r, cls;
    var ret = [];
    var i, j, skipI, coord;

    coord = intersection;
    i = intersection.charCodeAt(0) - 64;
    skipI = i >= 9 ? 1 : 0;
    i -= skipI;
    j = +intersection.substring(1);
    cls = "stone";
    color = (color == "placeholder") ? color : color + cls;
    cls += " " + color;
    cls += " " + coord;
    cx = SV_MARGIN + i * step;
    cy = SV_MARGIN - j * step + SV_GRID_SIZE;
    r = step / 2.1;
    ret.push({type:"circle", key:coord, cx:cx, cy:cy, r:r, class:cls });
    return ret;
}

/**
 * Shapes the last stone played marker.
 *
 * @param {number} size the grid base (9, 13, 19)
 * @param {Object} markers
 * @param {Object} positions as key-value pairs of coordinates and colors
 * @returns {Array}
 */
exports.shapeMarkers = function(size, markers, positions) {
    size = +size;
    var step = SV_GRID_SIZE / (size + 1);
    var x, y, x1, y1, x2, y2, cls, points;
    var ret = [];
    var i, j, skipI, coord;

    for (var k in markers) {
	i = k.charCodeAt(0) - 64;
	skipI = i >= 9 ? 1 : 0;
	i -= skipI;
	j = +k.substring(1);
	x = SV_MARGIN + i * step;
	y = SV_MARGIN - j * step + SV_GRID_SIZE;

	if ("cross" == markers[k]) {
	    cls = "cross on";
	    cls += (positions[k] || "white");
	    x1 = x - step / SV_MARKER;
	    y1 = y;
	    x2 = x + step / SV_MARKER;
	    y2 = y;
	    rot = "rotate(45," + x + "," + y + ")";
	    ret.push({type:"line", x1:x1, y1:y1, x2:x2, y2:y2, class:cls, transform:rot});
	    y1 = y - step / SV_MARKER;
	    x1 = x;
	    y2 = y + step / SV_MARKER;
	    x2 = x;
	    ret.push({type:"line", x1:x1, y1:y1, x2:x2, y2:y2, class:cls, transform:rot});

	} else if ("circle" == markers[k]) {
	    cls = "circle on";
	    cls += (positions[k] || "white");
	    r = step / 3.5;
	    ret.push({type:"circle", cx:x, cy:y, r:r, class:cls });

	} else if ("square" == markers[k]) {
	    cls = "square on";
	    cls += (positions[k] || "white");
	    var delta = step / SV_MARKER * Math.cos(Math.PI / 4);
	    var side = 2 * delta;
	    x1 = x - delta;
	    y1 = y - delta;
	    ret.push({type:"rect", x:x1, y:y1, width:side, height:side, class:cls});

	} else if ("triangle" == markers[k]) {
	    cls = "triangle on";
	    cls += (positions[k] || "white");
	    x1 = x;
	    y1 = y - step / SV_MARKER;
	    x2 = x + step / SV_MARKER * Math.cos(Math.PI / 2 + 2 * Math.PI / 3);
	    y2 = y - step / SV_MARKER * Math.sin(Math.PI / 2 + 2 * Math.PI / 3);
	    x3 = x + step / SV_MARKER * Math.cos(Math.PI / 2 + 4 * Math.PI / 3);
	    y3 = y - step / SV_MARKER * Math.sin(Math.PI / 2 + 4 * Math.PI / 3);
	    points = x1 + "," + y1 + " " + x2 + "," + y2 + " " + x3 + "," + y3;
	    ret.push({type:"polygon", points:points, class:cls});
	}
    }
    return ret;
}

/**
 * Shapes the visible area.
 *
 * @param {boolean} hideMargin
 * @returns {Array} viewBox (visible area)
 */
exports.shapeArea = function(hideMargin) {
    var offset, sz;
    if (hideMargin) {
	offset = SV_MARGIN + SV_BORDER_SHRINK;
	sz = SV_GRID_SIZE - 2*SV_BORDER_SHRINK;
    } else {
	offset = 0;
	sz = SV_GRID_SIZE + 2*SV_MARGIN;
    }
    return [offset, offset, sz, sz];
}

