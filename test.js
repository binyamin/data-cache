import mock from 'mock-fs'; // Import before 'node:fs'
import fs from 'node:fs/promises';
import { expect } from 'chai';

import * as datacache from './index.js';

describe('DataCache Module', () => {
	describe('.set() - Add a value to the cache', () => {
		beforeEach(async () => {
			mock();
		});

		it('should add a value to the cache, if data key is empty', async () => {
			datacache.set('username', 'binyamin');

			const content = await fs.readFile('.cache/username', 'utf-8');
			expect(content).to.equal('binyamin');
		});

		it('should throw an error, if value param is not present', () => {
			expect(() => datacache.set('username')).to.throw();
		});

		afterEach(mock.restore);
	});

	describe('.get() - Retrieve a value from the cache', () => {
		beforeEach(() => {
			mock()
		});

		it('should return a value, if key exists', async () => {
			datacache.set('username', 'binyamin');

			const username = datacache.get('username');

			expect(username).to.exist;
			expect(username).to.equal('binyamin');
			const content = await fs.readFile('.cache/username', 'utf-8');
			expect(content).to.equal(username);
		});

		it('should return undefined, if key does not exist', () => {
			datacache.set('username', 'binyamin');

			const email = datacache.get('email');
			expect(email).not.to.exist;
		});

		it('should return an object of key-value pairs, if key points to a folder', () => {
			datacache.set('people.binyamin', { username: 'binyamin' })

			const people = datacache.get('people');
			expect(people).to.exist;
			expect(people).to.be.an('object');
			expect(people).to.haveOwnProperty('binyamin')
			expect(people.binyamin).to.deep.equal({ username: 'binyamin' })
		});

		it('should return a value, if data is json and `ext` was not specified', () => {
			const input = [
				{
					display_name: 'Binyamin Green',
					github: 'binyamin'
				},
			];

			datacache.set('people', input);

			const output = datacache.get('people');
			expect(output).to.exist;
			expect(output).to.be.an('array');
			expect(output[0]).to.be.an('object')
			expect(output).to.deep.equal(input);
		});

		afterEach(mock.restore);
	});
});
