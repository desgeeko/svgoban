SVGoban
=======

*A lightweight JavaScript library that generates a Goban representation as layered sets of SVG shapes.*

## Project Guidelines

* Pure functions (no state, no side-effects)
* Scalable to any size without quality loss (SVG!)
* No dependencies
* Any goban size
* CSS styling
* Default themes with plain colors and very light gradients

## Demo
![SVGoban demo](demo/demo.png)

Generate a SVG sample output from this repository:
`node demo/test_19classic_4stones.js > sample.svg`

## Installation
SVGoban may be installed as a NPM package: `npm install svgoban --save`

## API
"Pseudo-" elements are regular objects with a type attribute matching the target SVG element and other related attributes.

### Attributes
* `size` = a number between `9` and `19`
* `color` = `"black"` or `"white"`
* `position` = an object containing coordinates and colors as keys and values 
* `config` = an object containing `size` and `theme` attributes

### Geometry
* `shapeGrid(size)` returns an array of 2*size pseudo-lines
* `shapeStarPoints(size)` returns an array of pseudo-circles
* `shapeLabels(size)` returns an array of 4*size pseudo-text
* `shapeStones(size, position)` returns an array of size*size pseudo-circles (stones and placeholders)
* `shapeStone(size, intersection, color)` returns 1 pseudo-circle
* `shapeArea()` returns the view box

### Styles
* `defineRadialColors(color)` returns gradient colors
* `Themes` is an array of predefined themes: `"classic"` and `"paper"`

### Helper
* `serialize(config, position)` returns a string containing a full SVG goban

