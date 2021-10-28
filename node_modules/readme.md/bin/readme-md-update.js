#!/usr/bin/env node

var readme = require("../lib/readme.md.js");

readme.writeFileIntoJson("README.md", "package.json", "readme");

