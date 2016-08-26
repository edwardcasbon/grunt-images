'use strict';

var grunt = require('grunt');
var DOMParser = require('xmldom').DOMParser;
var XMLSerializer = require('xmldom').XMLSerializer;

var buildSvg = {
    build: function(args, cb) {
        var data = grunt.file.read(args[0]);
        if(!data) {
            grunt.log.error('Error reading SVG file');
        }

        var parser = new DOMParser();
        var svg = parser.parseFromString(data, "image/svg+xml");

        svg.documentElement.setAttribute('width', args[2] + 'px');
        svg.documentElement.setAttribute('height', args[2] + 'px');

        var XMLSerializerInstance = new XMLSerializer();
        var svgAsString = XMLSerializerInstance.serializeToString(svg);

        // Save the svg file.
        grunt.file.write(args[1], svgAsString);
    }
};

module.exports = buildSvg;
