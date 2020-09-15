/**
 * Retrieve a value
 * @param {string} key - Uses dot-notation (no brackets)
 * @param {BufferEncoding} [encoding="utf-8"] - (Optional)
 * @returns {*}
 */
export function get(key: string, encoding?: BufferEncoding): any;
/**
 * Set a value
 * @param {string} key - Uses dot-notation (no brackets)
 * @param {*} value - data to store
 */
export function set(key: string, value: any, ext?: string): void;
