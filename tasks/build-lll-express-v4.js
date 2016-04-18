var fs = require('fs');
var path = require('path');
var _ = require('lodash');

module.exports = function (grunt)
{
	grunt.registerTask('build-lll-express-v4', 'Build an express application', function (mode, target, setup)
	{
		//var options = this.options();
		var options = grunt.config('builder');
		
		if (mode === undefined)	mode = "dist";
		if (target === undefined || target == null)
		{
			grunt.fail.warn("Build target not defined");
			return;
		}
		
		var build = function(s)
		{
			if (mode == "dev")
			{
				// Clean the target directory in tmp folder
				grunt.task.run('clean:builder__tmp_target:' + target);
				// Copy express source files to tmp folder
				grunt.task.run('copy:builder__lll_express_v4__dev_src:' + target);
				// Merge sparse i18n json files to a single file per language
				for (locale in s.locales)
				{
					var o = s.locales[locale];
					if (o.build)
						grunt.task.run('merge-json:builder__lll_express_v4__dev_locale:' + target + ':' + locale);
				}
				// Create symlink to bower components into dev/public 
				grunt.task.run('symlink:builder__lll_express_v4__dev_bower:' + target);
				// Build and mount client-side content
				var i = 0;
				for (mount in s.mount)
				{
					//i++;
					m = s.mount[mount];
					// Create event listener to copy the prebuild to the public directory once its finished
					grunt.event.on('prebuild_finished', function(buildName)
					{
						i++;
						if (s.mount[buildName] !== undefined)
						{
							grunt.task.run("output:builder__h3:" + "Prebuilding of '" + buildName + "' finished!");
							grunt.task.run('copy:builder__lll_express_v4__dev_mount:' + target + ":" + mount + ":" + m.path);
							//grunt.log.subhead(i + " == " + s.mount.length + " ?");
							if (i == _.size(s.mount))
								grunt.event.emit('prebuild_finished', target);
						}
					});
					// Run the prebuilder
					grunt.task.run('prebuild:' + mode + ':' + mount + ':' + m.setup);
				}
			}
			else if (mode == "dist")
			{
				// Clean the target directory in tmp folder
				grunt.task.run('clean:builder__tmp_target:' + target);
				// Copy express source files to tmp folder
				grunt.task.run('copy:builder__lll_express_v4__dist_src:' + target);
				// Merge sparse i18n json files to a single file per language
				for (locale in s.locales)
				{
					var o = s.locales[locale];
					if (o.build)
						grunt.task.run('merge-json:builder__lll_express_v4__dist_locale:' + target + ':' + locale);
				}
				// Copy bower components
				grunt.task.run('copy:builder__lll_express_v4__dist_bower:' + target);
				// Clean sparse i18n json files
				grunt.task.run('clean:builder__lll_express_v4__dist_after:' + target);
				// Build and mount client-side content
				var i = 0;
				for (mount in s.mount)
				{
					//i++;
					//console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> " + mount);
					m = s.mount[mount];
					// Create event listener to copy the prebuild to the public directory once its finished
					grunt.event.on('prebuild_finished', function(buildName)
					{
						i++;
						if (s.mount[buildName] !== undefined)
						{
							grunt.task.run("output:builder__h3:" + "Finished prebuilding '" + buildName + "'");
							grunt.task.run('copy:builder__lll_express_v4__dist_mount:' + target + ":" + mount + ":" + m.path);
							if (i == _.size(s.mount))
								grunt.event.emit('prebuild_finished', target);
						}
					});
					// Run the prebuilder
					grunt.task.run("output:builder__h3:" + "Prebuilding target '" + mount + "' in mode '" + mode + "'");
					grunt.task.run('prebuild:' + mode + ':' + mount + ':' + m.setup);
				}
			}
		};
		
		var targetDir = path.join(process.cwd(), options.paths.source, target);
		if (grunt.file.isDir(targetDir))
		{
			var buildfile = path.join(targetDir, 'buildfile.json');
			if (grunt.file.isFile(buildfile))
			{
				var targetConfig = grunt.file.readJSON(buildfile);
				if (targetConfig)
				{
					if (targetConfig.type && targetConfig.type == 'lll-express-v4')
					{
						if (setup === undefined && targetConfig.defaultSetup)
						{
							setup = targetConfig.defaultSetup;
						}
						
						if (setup)
						{
							if (targetConfig.setups && targetConfig.setups[setup])
							{
								var setupConfig = _.merge(targetConfig.setups['_common'], targetConfig.setups[setup]);
								//grunt.task.run("log:builder__h2:" + "Building target '" + target + "' in mode '" + mode);
								build(setupConfig);
							}
							else
							{
								grunt.fail.warn("Target '" + target + "' has no setup '" + setup + "' defined in buildfile.js");
							}
						}
						else
						{
							grunt.fail.warn("No setup was defined and no default setup in target '" + target + "'");
						}
					}
					else
					{
						grunt.fail.warn("Target '" + target + "' is not from builder type lll-express-v4");
					}
				}
			}
			else
			{
				grunt.fail.warn("Target '" + target + "' has no buildfile.js");
			}
		}
		else
		{
			grunt.fail.warn("Could not find target '" + target + "' in directory " + targetDir);
		}
		
		
		//console.log(builderOptions);
	});
};
