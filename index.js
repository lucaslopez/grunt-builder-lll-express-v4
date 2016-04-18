var path = require('path');
var fs = require('fs');
var glob = require('glob');
var _ = require('lodash');
var loadGruntConfig = require('load-grunt-config');

var defaults =
{
	"paths":
	{
		"source": "src",
		"dev": "dev",
		"test": "test",
		"dist": "dist"
	}
};

module.exports = function (grunt)
{
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-symlink');
	grunt.loadNpmTasks('grunt-merge-json');
	grunt.loadNpmTasks('grunt-log');
	
	var setup = function(bundlePath)
	{
		// Load config
		var config = loadGruntConfig(grunt,
		{
			init: false,
			configPath: path.join(__dirname, 'config')
		});
		grunt.config.merge(config);
		
		//Load tasks
		grunt.verbose.subhead("Loading tasks in " + path.join(__dirname, 'tasks'));
		grunt.loadTasks(path.join(__dirname, 'tasks'));
	}
	
	setup();
};
