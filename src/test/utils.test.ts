// url_test.ts
import { assertEquals } from 'https://deno.land/std@0.161.0/testing/asserts.ts';

Deno.test('url test', () => {
	const url = new URL('./foo.js', 'https://deno.land/');
	assertEquals(url.href, 'https://deno.land/foo.js');
});

// import * as assert from 'assert';
// import { after } from 'mocha';

// // You can import and use all API from the 'vscode' module
// // as well as import your extension to test it
// import * as vscode from 'vscode';
// // import * as myExtension from '../../extension';

// suite('Extension Test Suite', () => {
// 	vscode.window.showInformationMessage('Start all tests.');

// 	test('Sample test', () => {
// 		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
// 		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
// 	});
// });
