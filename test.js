import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { test } from 'node:test';

import mock from 'mock-fs';

import * as datacache from './index.js';

test.before(() => {
	mock();
});

test.after(() => {
	mock.restore();
});

test('#set should set key if value is provided', async () => {
	datacache.set('username', 'binyamin');

	const content = await fs.readFile('.cache/username', 'utf-8');
	assert.equal(content, 'binyamin');
});

test('#set should throw if value is not present', () => {
	assert.throws(() => datacache.set('username'));
});

test('#get should return a value, if key exists', () => {
	const username = datacache.get('username');
	assert.equal(username, 'binyamin');
});

test('#get should return `null`, if key does not exist', () => {
	const email = datacache.get('email');
	assert.equal(email, null);
});

test('#get should return an object/record, if key points to folder', () => {
	datacache.set('person.username', 'binyamin');
	const person = datacache.get('person');
	assert.deepEqual(person, {
		username: 'binyamin',
	});
});

test('#get should return a value, if data is JSON and `ext` was not present', () => {
	datacache.set('person2', { username: 'binyamin' });
	const person = datacache.get('person2');
	assert.deepEqual(person, {
		username: 'binyamin',
	});
});
