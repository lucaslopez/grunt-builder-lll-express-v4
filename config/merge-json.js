
module.exports = 
{
	builder__lll_express_v4__dev_locale :
	{
		files :
		{
			"<%= builder.paths.tmp %>/<%= grunt.task.current.args[0] %>/locales/<%= grunt.task.current.args[1] %>.json" :
			[
				"<%= builder.paths.tmp %>/<%= grunt.task.current.args[0] %>/**/locales/*.<%= grunt.task.current.args[1] %>.json"
			]
		}
	},
	builder__lll_express_v4__dist_locale :
	{
		files :
		{
			"<%= builder.paths.tmp %>/<%= grunt.task.current.args[0] %>/locales/<%= grunt.task.current.args[1] %>.json" :
			[
				"<%= builder.paths.tmp %>/<%= grunt.task.current.args[0] %>/**/locales/*.<%= grunt.task.current.args[1] %>.json"
			]
		}
	}
};
