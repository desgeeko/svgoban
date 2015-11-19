/**
 * SVGoban
 * styles.js
 *
 */


/**
 * Chosen constants for a top left radial gradient
 */
var SV_GRAD = {
    "cx" : "50%",
    "cy" : "45%",
    "r"  : "60%",
    "fx" : "10%",
    "fy" : "10%"
}

var SV_BW = {
    "black": {
	"start" : "rgb(75,75,75)",
	"stop"  : "rgb(0,0,0)" 
    },
    "white": {
	"start" : "rgb(255,255,255)", 
	"stop"  : "rgb(180,180,180)"
    }
};

exports.defineRadialColors = function(color) {
    var gradient =  {cx:SV_GRAD.cx, cy:SV_GRAD.cy, r:SV_GRAD.r, fx:SV_GRAD.fx, fy:SV_GRAD.fy};
    return {id:color+"grad", a:SV_BW[color]["start"], z:SV_BW[color]["stop"], gradient:gradient};
}

/**
 * Themes are just CSS rules
 */
exports.Themes = {
    "classic" : function() {
	return `
	    .wood { 
		fill: #b4916c; 
	    }
	    .placeholder { 
		stroke: black;
		opacity: 0 
	    }
    	    .black .placeholder:hover { 
		fill: black;
		stroke: black;
		opacity: 0.2 
	    }
	    .white .placeholder:hover { 
		fill: white;
		stroke: white;
		opacity: 0.2 
	    }
	    .blackstone { 
		fill: url(#blackgrad); 
	    }
	    .whitestone { 
		fill: url(#whitegrad);
	    }
	    .onblack {
		stroke: white;
		fill: none;
	    }
	    .onwhite {
		stroke: black;
		fill: none;
	    }
	line { 
	    stroke: black; 
	}
	text { 
	    font-family: "Ubuntu Light", sans-serif; 
	    font-size: 1.1em; 
	}
	`;
    },
    "night" : function() {
	return `
	    .wood { 
		fill: #425b5b; 
	    }
	    .placeholder { 
		fill: black;
		stroke: black;
		opacity: 0 
	    }
	    .black .placeholder:hover { 
		fill: black;
		stroke: black;
		opacity: 0.2 
	    }
	    .white .placeholder:hover { 
		fill: white;
		stroke: white;
		opacity: 0.2 
	    }
	    .blackstone { 
		fill: #222222; 
	    }
	    .whitestone { 
		fill: #888888;
	    }
	    .black.circle {
		stroke: white;
		fill: none;
	    }
	    .white.circle {
		stroke: black;
		fill: none;
	    }
	line { 
	    stroke: black; 
	}
	text { 
	    font-family: sans-serif; 
	    font-size: 1.1em; 
	}
	`;
    },
    "paper" : function() {
	return `
	    .wood { 
		fill: white; 
	    }
	    .placeholder { 
		fill: black;
		stroke: black;
		opacity: 0 
	    }
	    .black .placeholder:hover { 
		fill: black;
		stroke: black;
		opacity: 0.2 
	    }
	    .white .placeholder:hover { 
		fill: white;
		stroke: white;
		opacity: 0.2 
	    }
	    .blackstone { 
		fill: black; 
		stroke: black;
	    }
	    .whitestone { 
		fill: white;
		stroke: black;
	    }
	    .black.circle {
		stroke: white;
		fill: none;
	    }
	    .white.circle {
		stroke: black;
		fill: none;
	    }
	line { 
	    stroke: black; 
	}
	text { 
	    font-family: sans-serif; 
	    font-size: 1.1em; 
	}
	`;
    }
}

