module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    clean: {
      js: ['public/dist/*.js']
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['public/**/*.js'],
        dest: 'public/dist/built.js',
      },
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },


    uglify: {
      build: {
        src: 'public/dist/built.js',
        dest: 'public/dist/built.min.js'
      }
    },

    eslint: {
      all: ['**/*.js', '!**/node_modules/**', '!public/lib/*.js']
    },

    cssmin: {
    },

    watch: {
      scripts: {
        files: [
          '**/*'
        ],
        options: {
          nospawn: true
        },
        tasks: [
          'clean',
          'eslint',
          'mochaTest',
          'concat',
          'uglify',
          'nodemon'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
        command: 'git push live master'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-clean');
  
  grunt.registerTask('deploy', function (target) {
    grunt.task.run([
      'clean',
      'eslint',
      'mochaTest',
      'concat',
      'uglify',
      'shell:prodServer'
    ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////


  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    'clean',
    'eslint',
    'mochaTest',
    'concat',
    'uglify',
    'shell:prodServer'
  ]); 


};
