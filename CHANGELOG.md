# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project tries to adhere to [Semantic Versioning (SemVer)](https://semver.org/spec/v2.0.0.html).

<!--
	**Added** for new features.
	**Changed** for changes in existing functionality.
	**Deprecated** for soon-to-be removed features.
	**Removed** for now removed features.
	**Fixed** for any bug fixes.
	**Security** in case of vulnerabilities.
-->

## 2.0.0 - 2023-03-29

### Added

- `get()` - If "key" has child keys (ie. it's a directory), return the children's contents as a JSON object.

### Changed

- **Breaking** - Move to ESM
- **Breaking** - Requires Node.js v16 or greater
- Updated dependencies

### Removed

- Using this module via `require()` (ie, commonjs) is no longer supported.

## 1.1.0 - 2020-09-15

### Added

- Add Typescript definitions ("typedefs").

## 1.0.1 - 2020-09-09

### Fixed

- JSON content should return as JSON, not as `string`.
- When reading JSON content, add a `.json` extension to the key.

## 1.0.0 - 2020-09-08

### Added

- `get()` method retrieves a value from the cache, using the provided key.
- `set()` method initializes or modifies a value from the cache, using the provided key and value.
- `set()` method accepts an optional 3rd parameter "ext", which, for JSON content, will parse the value as JSON before returning.
