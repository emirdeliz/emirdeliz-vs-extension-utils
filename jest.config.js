/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
	// // Automatically clear mock calls, instances, contexts and results before every test
	clearMocks: true,

	// A map from regular expressions to paths to transformers
	transform: {
		'^.+\\.(t|j)s?$': ['@swc/jest'],
	},

	// A map from regular expressions to module names or to arrays of module names that allow to stub out resources,
	// like images or styles with a single module.
	moduleNameMapper: {
		'^vscode$': '<rootDir>/src/test/__mocks__/vscode.ts',
	},
};
