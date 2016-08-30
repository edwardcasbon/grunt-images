'use strict';

var config = {
    'name': 'icons',
    'src': '/Users/edward.casbon/Desktop/svgs',
    'dest': '/Users/edward.casbon/Desktop/svgs-dest-node',
    'sizes': [
        {
            'in': 16,
            'out': [16]
        },
        {
            'in': 24,
            'out': [24, 48, 96]
        },
        {
            'in': 32,
            'out': [32, 64, 128, 256]
        }
    ]
}

module.exports = function(grunt) {
    grunt.initConfig({

        // Convert svg source files to png files.
        svgtopng: {
            options: config
        },

        // Convert svg source files to different sized svg files.
        svgtosvg: {
            options: config
        },

        // Optimise images.
        imagemin: {
            dynamic: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: config.dest,
                    src: ['**/*.{png,svg}'],
                    dest: config.dest
                }]
            }
        },

        webfont: {
            dynamic: {
                src: config.src + '/**/*_16.svg', // Use the 16px version to create web font.
                dest: config.dest + '/webfont',
                options: {
                    font: config.name,
                    types: 'eot,woff2,woff,ttf,svg',
                    hashes: false,
                }
            }
        }

    });

    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-webfont');

    grunt.registerTask('default', ['svgtopng', 'svgtosvg', 'imagemin', 'webfont']);
};
