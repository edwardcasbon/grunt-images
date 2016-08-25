'use strict';

var fs = require('fs');
var DOMParser = require('xmldom').DOMParser;
var XMLSerializer = require('xmldom').XMLSerializer;
var mkdirp = require('mkdirp');
var path = require('path');

var buildSvg = {
    build: function(args, cb) {

        fs.readFile(args[1], 'utf8', function(err, data){
            if(err) {
                console.error(err);
            }

            var parser = new DOMParser();
            var svg = parser.parseFromString(data, "image/svg+xml");

            svg.documentElement.setAttribute('width', args[3] + 'px');
            svg.documentElement.setAttribute('height', args[3] + 'px');

            var XMLSerializerInstance = new XMLSerializer();
            var svgAsString = XMLSerializerInstance.serializeToString(svg);

            // Create output directory if it doesn't exist already.
            mkdirp(path.dirname(args[2]), function(err) {
                if(err) {
                    console.error(err);
                }

                // Save the svg file.
                fs.writeFile(args[2], svgAsString, function(err) {
                    if(err) {
                        console.error(err);
                    }
                });
            });
        });
    }
};

module.exports = buildSvg;
