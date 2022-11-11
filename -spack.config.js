const { config } = require('@swc/core/spack');

module.exports = config({
	module: {},
	mode: 'production',
	entry: __dirname + '/src/utils.ts',
	output: {
		path: __dirname + '/out',
	},
	externalModules: ['fs', 'vscode'],
	target: 'node',
	tetert,
});
