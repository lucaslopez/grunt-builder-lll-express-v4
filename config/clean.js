
module.exports = 
{
	builder__lll_express_v4__dist_locales:
	{
		src : ['<%= builder.paths.tmp %>/<%= grunt.task.current.args[0] %>/node_modules/**/locales']
	},
	builder__lll_express_v4__dist_after:
	{
		src :
		[
			// Clean sparse locales json files
			'<%= builder.paths.tmp %>/<%= grunt.task.current.args[0] %>/node_modules/**/locales',
			// Clean builder.json
			'<%= builder.paths.tmp %>/<%= grunt.task.current.args[0] %>/buildfile.json'
		]
	}
};
