import test from 'ava';

import mock from 'mock-fs'; // Import before 'node:fs'
import fs from 'node:fs/promises';

import * as datacache from './index.js';

test.before(() => {
	mock();
});

test.after(() => {
	mock.restore();
});

test.serial('#set should set key if value is provided', async (t) => {
	datacache.set('username', 'binyamin');

	const content = await fs.readFile('.cache/username', 'utf-8');
	t.is(content, 'binyamin');
});

test('#set should throw if value is not present', (t) => {
	t.throws(() => datacache.set('username'));
});

test('#get should return a value, if key exists', (t) => {
	const username = datacache.get('username');
	t.is(username, 'binyamin');
});

test('#get should return `undefined`, if key does not exist', (t) => {
	const email = datacache.get('email');
	t.is(email, undefined);
});

test('#get should return an object/record, if key points to folder', (t) => {
	datacache.set('person.username', 'binyamin');
	const person = datacache.get('person');
	t.deepEqual(person, {
		username: 'binyamin',
	});
});

test('#get should return a value, if data is JSON and `ext` was not present', (t) => {
	datacache.set('person2', { username: 'binyamin' });
	const person = datacache.get('person2');
	t.deepEqual(person, {
		username: 'binyamin',
	});
});
