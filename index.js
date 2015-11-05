/**
 * SVGoban
 * index.js
 *
 */

exports.shapeGrid = require('./src/geometry').shapeGrid;
exports.shapeStarPoints = require('./src/geometry').shapeStarPoints;
exports.shapeLabels = require('./src/geometry').shapeLabels;
exports.shapeStones = require('./src/geometry').shapeStones;
exports.shapeStone = require('./src/geometry').shapeStone;
exports.shapeArea = require('./src/geometry').shapeArea;

exports.defineRadialColors = require('./src/styles').defineRadialColors;
exports.Themes = require('./src/styles').Themes;

exports.serialize = require('./src/serializer');

