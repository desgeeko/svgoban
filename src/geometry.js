/**
 * SVGoban
 * geometry.js
 *
 */

var SV_GRID_SIZE = 560;
var SV_MARGIN = 30;
var SV_BORDER_SHRINK = 7;
var SV_MARKER = 2.5;

/** ASCII decimal codes */
var CODE_9 = 59;
var CODE_A = 65;
var CODE_a = 97;


/**
 * Defines horizontal label.
 *
 * @param {number} i index of column
 * @param {string} coordSystem ("A1" or "aa")
 * @returns {string}
 */
var horizontal = function(i, coordSystem) {
    if ("aa" === coordSystem) {
	return String.fromCharCode(CODE_a + --i);
    }
    else { // "A1" (default)
	var skipI = i >= 9 ? 1 : 0;
	return String.fromCharCode(CODE_A + --i + skipI);
    }
}

/**
 * Defines vertical label.
 *
 * @param {number} j index of row
 * @param {string} coordSystem ("A1" or "aa")
 * @param {number} size the grid base (9, 13, 19)
 * @returns {string}
 */
var vertical = function(j, coordSystem, size) {
    if ("aa" === coordSystem) {
	return String.fromCharCode(CODE_a + --j);
    }
    else { // "A1" (default)
	return (size - --j).toString();
    }
}

/**
 * Calculates column and row of intersection.
 *
 * @param {string} intersection either in "A1" or "aa" coordinates
 * @param {number} size the grid base (9, 13, 19)
 * @returns {Object}
 */
var toColRow = function(intersection, size) {
    var i, j;
    if (intersection.charCodeAt(1) > CODE_9) { // "aa"
	i = intersection.charCodeAt(0) - CODE_a + 1;
	j = intersection.charCodeAt(1) - CODE_a + 1;
    }
    else { // "A1"
	i = intersection.charCodeAt(0) - CODE_A + 1;
	var skipI = i >= 9 ? 1 : 0;
	i -= skipI;
	j = size - (+intersection.substring(1)) + 1;
    }
    return {i: i, j: j};
}

/**
 * Translates intersection in other coordinate system.
 *
 * @param {string} intersection either in "A1" or "aa" coordinates
 * @param {number} size the grid base (9, 13, 19)
 * @returns {string}
 */
var other = function(intersection, size) {
    var i, j, ret;
    if (intersection.charCodeAt(1) > CODE_9) { // "aa"
	i = intersection.charCodeAt(0) - CODE_a + 1;
	j = intersection.charCodeAt(1) - CODE_a + 1;
	ret = horizontal(i, "A1") + vertical(j, "A1", size);
    }
    else { // "A1"
	i = intersection.charCodeAt(0) - CODE_A + 1;
	var skipI = i >= 9 ? 1 : 0;
	i -= skipI;
	j = size - (+intersection.substring(1)) + 1;
	ret = horizontal(i, "aa") + vertical(j, "aa", size);
    }
    return ret;
}


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

    var d = "";
    for (var i = 1; i <= size; i++) {
	x1 = SV_MARGIN + step;
	y1 = SV_MARGIN + i * step;
	x2 = SV_MARGIN + SV_GRID_SIZE - step;
	y2 = SV_MARGIN + i * step;
	d += "M" + x1 + " " + y1 + "H " + x2 + " ";
    }
    for (var j = 1; j <= size; j++) {
	x1 = SV_MARGIN + j * step;
	y1 = SV_MARGIN + step;
	x2 = SV_MARGIN + j * step;
	y2 = SV_MARGIN + SV_GRID_SIZE - step;
	d += "M" + x1 + " " + y1 + "V " + y2 + " ";
    } 
    /** Replace multiple lines with one SVG path */
    ret.push({type:"path", d:d, style:s});
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
exports.shapeLabels = function(size, coordSystem) {
    size = +size;
    coordSystem = coordSystem || "A1";
    var step = SV_GRID_SIZE / (size + 1);
    var x, y, txt;
    var ret = [];
    
    for ( var i = 1; i <= size; i++ ) {

	/** Top row */
	x = SV_MARGIN + i * step;
	y = SV_MARGIN - 5;
	txt = horizontal(i, coordSystem);
	var s = {
	    "text-anchor":"middle" 
	};
	ret.push({type:"text", x:x, y:y, txt:txt, style:s});

	/** Bottom row */
	x = SV_MARGIN + i * step;
	y = SV_MARGIN + SV_GRID_SIZE + 15;
	txt = horizontal(i, coordSystem);
	var s = {
	    "text-anchor":"middle" 
	};
	ret.push({type:"text", x:x, y:y, txt:txt, style:s});
    }
    for ( var j = 1; j <= size; j++ ) {

	/** Left column */
	x = SV_MARGIN;
	y = SV_MARGIN + j * step;
	txt = vertical(j, coordSystem, size);
	var s = {
	    "text-anchor":"end", 
	    "dominant-baseline":"central"
	};
	ret.push({type:"text", x:x, y:y, txt:txt, style:s});

	/** Right column */
	x = SV_MARGIN + SV_GRID_SIZE;
	y = SV_MARGIN + j * step;
	txt = vertical(j, coordSystem, size);
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
    var hA1, haa, vA1, vaa, target, coordA1;

    for ( var i = 1; i <= size; i++ ) {
	hA1 = horizontal(i, "A1");
	haa = horizontal(i, "aa");
	cx = SV_MARGIN + i * step;

	for ( var j = 1; j <= size; j++ ) {
	    vA1 = vertical(j, "A1", size);
	    vaa = vertical(j, "aa", size);
	    coordA1 = hA1 + vA1;
	    target = positions[hA1 + vA1] || positions[haa + vaa];

	    cls = "stone";
	    cls += target ? " " + target + "stone" : " placeholder";
	    cls += " " + coordA1;

	    cy = SV_MARGIN + j * step;
	    r = step / 2.1;
	    ret.push({type:"circle", key:coordA1, cx:cx, cy:cy, r:r, class:cls });
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
    var rowcol = toColRow(intersection, size);
    cls = "stone";
    color = (color == "placeholder") ? color : color + cls;
    cls += " " + color;
    cls += " " + intersection;
    cx = SV_MARGIN + rowcol.i * step;
    cy = SV_MARGIN + rowcol.j * step;
    r = step / 2.1;
    ret.push({type:"circle", key:intersection, cx:cx, cy:cy, r:r, class:cls });
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
    var coord;

    for (var k in markers) {

	var rowcol = toColRow(k, size);
	x = SV_MARGIN + rowcol.i * step;
	y = SV_MARGIN + rowcol.j * step;

	if ("cross" == markers[k]) {
	    cls = markers[k] + " on" + (positions[k] || "white");
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
	    cls = markers[k] + " on" + (positions[k] || positions[other(k, size)] || "white");
	    r = step / 3.5;
	    ret.push({type:"circle", cx:x, cy:y, r:r, class:cls });

	} else if ("square" == markers[k]) {
	    cls = markers[k] + " on" + (positions[k] || "white");
	    var delta = step / SV_MARKER * Math.cos(Math.PI / 4);
	    var side = 2 * delta;
	    x1 = x - delta;
	    y1 = y - delta;
	    ret.push({type:"rect", x:x1, y:y1, width:side, height:side, class:cls});

	} else if ("triangle" == markers[k]) {
	    cls = markers[k] + " on" + (positions[k] || "white");
	    x1 = x;
	    y1 = y - step / SV_MARKER;
	    x2 = x + step / SV_MARKER * Math.cos(Math.PI / 2 + 2 * Math.PI / 3);
	    y2 = y - step / SV_MARKER * Math.sin(Math.PI / 2 + 2 * Math.PI / 3);
	    x3 = x + step / SV_MARKER * Math.cos(Math.PI / 2 + 4 * Math.PI / 3);
	    y3 = y - step / SV_MARKER * Math.sin(Math.PI / 2 + 4 * Math.PI / 3);
	    points = x1 + "," + y1 + " " + x2 + "," + y2 + " " + x3 + "," + y3;
	    ret.push({type:"polygon", points:points, class:cls});
	} else {
	    cls = "wood";
	    r = step / 3;
	    ret.push({type:"circle", cx:x, cy:y, r:r, class:cls });
	    cls = "on" + (positions[k] || "white");
	    var txt = markers[k];
	    var s = {
		"text-anchor":"middle", 
		"dominant-baseline":"central"
	    };
	    ret.push({type:"text", x:x, y:y, txt:txt, style:s});
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

