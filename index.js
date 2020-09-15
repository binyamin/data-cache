const fs = require("fs");
const path = require("path");

const _cachedir = path.join(process.cwd(), ".cache");

function _initCache() {
    if(fs.existsSync(_cachedir) === false) {
        fs.mkdirSync(_cachedir)
    }
}

/**
 * Set a value
 * @param {string} key - Uses dot-notation (no brackets)
 * @param {*} value - data to store
 */

function set(key, value, ext="") {
    _initCache();

    if(!value) throw new Error("param `value` is not present");

    let keypath = path.resolve(_cachedir, key.replace(/\./g, path.sep));

    if(typeof value === "object") {
        value = JSON.stringify(value, null, 4)
        ext = ".json";
    }
    fs.mkdirSync(path.parse(keypath).dir, {recursive: true});
    fs.writeFileSync(keypath+ext, value)
}

/**
 * Retrieve a value
 * @param {string} key - Uses dot-notation (no brackets)
 * @param {BufferEncoding} [encoding="utf-8"] - (Optional)
 * @returns {*}
 */
function get(key, encoding="utf8") {
    const keypath = path.resolve(_cachedir, key.replace(/\./g, path.sep));

    if(fs.existsSync(keypath)) {
        return fs.readFileSync(keypath, {encoding})
    } else if(fs.existsSync(keypath+".json")) {
        const filedata = fs.readFileSync(keypath+".json", {encoding});
        return JSON.parse(filedata);
    }

    return undefined;
}

module.exports = {
    get,
    set
}
