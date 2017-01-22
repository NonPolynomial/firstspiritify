# Firstspiritify

[![yargs](https://img.shields.io/badge/yargs-6.6.0-brightgreen.svg)](http://yargs.js.org/)
[![mkdirp](https://img.shields.io/badge/mkdirp-0.5.1-brightgreen.svg)](https://github.com/substack/node-mkdirp)

Module to replace URL references in CSS files with FirstSpirit `$CMS_REF(media:"", abs: 0)$` function calls.

## Pattern

Firstspiritify searches for `url\(['"]?([\w-_ ./]*\.[\w-_ ]*)['"]?\)` and removes all spaces and dots (`.`) and replaces hyphens (`-`) with underscores (`_`).
