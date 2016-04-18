module.exports =
{
	builder__lll_express_v4__dev_static :
	{
		files :
		[
			{
				expand : true,
				overwrite : false,
				cwd : '<%= build.source.static %>',
				src : ['*'],
				dest : '<%= builder.paths.tmp %>/<%= grunt.task.current.args[0] %>/public'
			}
		]
	},
	builder__lll_express_v4__dev_bower :
	{
		files :
		[
			{
				expand : true,
				overwrite : false,
				cwd : 'bower_components',
				src : ['*'],
				dest : '<%= builder.paths.tmp %>/<%= grunt.task.current.args[0] %>/public/vendor'
			}
		]
	},
	builder__lll_express_v4__dev_mount :
	{
		files :
		[
			{
				expand : true,
				overwrite : false,
				cwd : '<%= builder.paths.source %>/<%= grunt.task.current.args[1] %>',
				src : ['*'],
				dest : '<%= builder.paths.tmp %>/<%= grunt.task.current.args[0] %>/public/<%= grunt.task.current.args[2] %>'
			}
		]
	}
}