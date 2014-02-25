/**
 * Created by m0sk1t on 2/25/14.
 */
module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			build: {
				src: ['classes/meCore.js','classes/meAssets.js','classes/mePrimitive.js','classes/meInput.js']
			}
		},
		concat: {
			build: {
				src: ['classes/meCore.js','classes/meAssets.js','classes/mePrimitive.js','classes/meInput.js'],
				dest: '<%= pkg.name %>.js'
			},
			options: {
				separator: ';'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: '<%= pkg.name %>.js',
				dest: '<%= pkg.name %>.min.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
};