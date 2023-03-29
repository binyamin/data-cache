const fs = require("fs");
const path = require("path");

const _cachedir = path.join(process.cwd(), ".cache");

function _initCache() {
	if (fs.existsSync(_cachedir) === false) {
		fs.mkdirSync(_cachedir)
	}
}

/** @returns {*} */
function _readFile(abspath, encoding) {
	let filedata = fs.readFileSync(abspath, { encoding });
	if (abspath.endsWith(".json")) {
		filedata = JSON.parse(filedata)
	}
	return filedata;
}

/**
 * Set a value
 * @param {string} key - Uses dot-notation (no brackets)
 * @param {*} value - data to store
 */

function set(key, value, ext = "") {
	_initCache();

	if (!value) throw new Error("param `value` is not present");

	let keypath = path.resolve(_cachedir, key.replace(/\./g, path.sep));

	if (typeof value === "object") {
		value = JSON.stringify(value, null, 4)
		ext = ".json";
	}
	fs.mkdirSync(path.parse(keypath).dir, { recursive: true });
	fs.writeFileSync(keypath + ext, value)
}

/**
 * Retrieve a value
 * @param {string} key - Uses dot-notation (no brackets)
 * @param {BufferEncoding} [encoding="utf-8"] - (Optional)
 * @returns {*}
 */
function get(key, encoding = "utf8") {
	const keypath = path.resolve(_cachedir, key.replace(/\./g, path.sep));

	let data;

	if (fs.existsSync(keypath)) {
		if (fs.lstatSync(keypath).isDirectory()) {
			data = {};

			const dir = fs.readdirSync(keypath);
			for (const filepath of dir) {
				const filename = path.parse(filepath).name;
				data[filename] = _readFile(path.resolve(keypath, filepath), encoding);
			}
		} else {
			data = _readFile(keypath, encoding);
		}
	} else {
		if (fs.existsSync(keypath + ".json")) {
			data = _readFile(keypath + ".json", encoding);
		} else {
			data = undefined;
		}
	}

	return data;
}

module.exports = {
	get,
	set
}
