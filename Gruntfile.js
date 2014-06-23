module.exports = function (grunt) {
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: {
      tmp: '.tmp/',
      dist: 'dist/'
    },

    copy: {
      spriteGenerator: {
        files: [
          // includes files within path and its sub-directories
          {expand: true, src: ['css/**'], dest: 'dist/grunt-sprite-generator'},

          // makes all src relative to cwd
          {expand: true, cwd: '.tmp/img', src: ['**'], dest: 'dist/grunt-sprite-generator/img'},
        ]
      },
      imagine: {
        files: [
          {expand: true, src: ['css/**'], dest: 'dist/grunt-imagine'},
          {expand: true, cwd: '.tmp/img', src: ['**'], dest: 'dist/grunt-imagine/img'}
        ]
      }
    },

    imagemin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: 'img/',
            src: '{,*/}*.{png,jpg,jpeg,gif}',
            dest: '.tmp/img'
          }
        ]
      }
    },

    // grunt-imagine
    sprites: {
      all: {
        src: ['.tmp/img/*.png'],
        css: 'dist/grunt-imagine/css/sprites.css',
        map: 'dist/grunt-imagine/img/spritesheet.png',
        classPrefix: 'Icon'
      }
    },

    // grunt-spritesmith
    sprite: {
      all: {
        src: '.tmp/img/*.png',
        destImg: 'dist/grunt-spritesmith/spritesheet.png',
        destCSS: 'dist/grunt-spritesmith/sprites.css',
        margin: 15
      }
    },

    spriteGenerator: {
      spriteGenerator: {
        options: {
          algorithm: 'binary-tree',
          padding: 10
        },
        files: {
          'dist/grunt-sprite-generator/spritesheet.png': ['dist/grunt-sprite-generator/css/test.css']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.loadNpmTasks('grunt-imagine');
  grunt.loadNpmTasks('grunt-sprite-generator');
  grunt.loadNpmTasks('grunt-spritesmith');

  grunt.registerTask('default', [
    'clean',
    'imagemin',
    'copy:spriteGenerator',
    'copy:imagine',
    'sprite',
    'sprites',
    'spriteGenerator',
    'clean:tmp'
  ]);
};