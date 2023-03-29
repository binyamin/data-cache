import fs from 'node:fs';
import path from 'node:path';
import { cwd } from 'node:process';

const _cachedir = path.join(cwd(), '.cache');

/** @returns {*} */
function _readFile(abspath, encoding) {
	let filedata = fs.readFileSync(abspath, { encoding });
	if (abspath.endsWith('.json')) {
		filedata = JSON.parse(filedata)
	}
	return filedata;
}

/**
 * Set a value
 * @param {string} key - Uses dot-notation (no brackets)
 * @param {any} value - data to store
 */
export function set(key, value, ext = '') {
	if (!value) throw new Error('param `value` is not present');

	let keypath = path.resolve(_cachedir, key.replace(/\./g, path.sep));

	if (typeof value === 'object') {
		value = JSON.stringify(value, null, 4)
		ext = '.json';
	}
	fs.mkdirSync(path.parse(keypath).dir, { recursive: true });
	fs.writeFileSync(keypath + ext, value)
}

/**
 * Retrieve a value
 * @param {string} key - Uses dot-notation (no brackets)
 * @param {BufferEncoding} [encoding='utf-8'] - (Optional)
 * @returns {unknown}
 */
export function get(key, encoding = 'utf8') {
	const keypath = path.resolve(_cachedir, key.replace(/\./g, path.sep));

	/**
	 * Note:
	 * The order here is intentional, in order to
	 * limit the number of file-system calls.
	 *
	 * Pseudo-code:
	 * The entry "foo" may be a directory or a file.
	 * [1] We read it as a file. If that succeeds, `return`.
	 * [2] If we get EISDIR, it's a directory. Read it and
	 *     `return` the contents.
	 * [3] If we get ENOENT, it doesn't exist. We try
	 *     "foo.json", which should never be a directory.
	 * [4] If we get ENOENT again, `return`. Otherwise,
	 *     `return` data or re-throw errors, as appropriate.
	 */

	// [1]
	try {
		return _readFile(keypath, encoding);
	} catch(err) {
		// [2]
		if (err.code === 'EISDIR') {
			const data = {};
			const dir = fs.readdirSync(keypath);
			for (const filepath of dir) {
				const key = path.parse(filepath).name;
				data[key] = _readFile(path.resolve(keypath, filepath), encoding);
			}

			return data;
		}

		// [3]
		else if (err.code === 'ENOENT') {
			try {
				return _readFile(keypath + '.json', encoding);
			} catch (err) {
				// [4]
				if (err.code !== 'ENOENT') throw err;
				return null;
			}
		} else {
			throw err;
		}
	}
}
