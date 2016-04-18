module.exports = 
{
	builder__lll_express_v4__dev_src :
	{
		files:
		[
			{
				cwd : '<%= builder.paths.source %>/<%= grunt.task.current.args[0] %>',
				src : ['**'],
				dest : '<%= builder.paths.tmp %>/<%= grunt.task.current.args[0] %>',
				expand : true
			}
		]
	},
	builder__lll_express_v4__dev_mount :
	{
		files:
		[
			{
				cwd : '<%= builder.paths.tmp %>/<%= grunt.task.current.args[1] %>',
				src : ['**'],
				dest : '<%= builder.paths.tmp %>/<%= grunt.task.current.args[0] %>/public/<%= grunt.task.current.args[2] %>',
				expand : true
			}
		]
	},
	builder__lll_express_v4__dist_src :
	{
		files:
		[
			{
				cwd : '<%= builder.paths.source %>/<%= grunt.task.current.args[0] %>',
				src : ['**'],
				dest : '<%= builder.paths.tmp %>/<%= grunt.task.current.args[0] %>',
				expand : true
			}
		]
	},
	builder__lll_express_v4__dist_mount :
	{
		files:
		[
			{
				cwd : '<%= builder.paths.tmp %>/<%= grunt.task.current.args[1] %>',
				src : ['**'],
				dest : '<%= builder.paths.tmp %>/<%= grunt.task.current.args[0] %>/public/<%= grunt.task.current.args[2] %>',
				expand : true
			}
		]
	},
	builder__lll_express_v4__dist_bower :
	{
		files:
		[
			{
				cwd : 'bower_components',
				src : ['**'],
				dest : '<%= builder.paths.tmp %>/<%= grunt.task.current.args[0] %>/public/vendor',
				expand : true
			}
		]
	}
}