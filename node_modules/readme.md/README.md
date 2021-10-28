readme.md
=========

readme.md is an application that allows easy updating of
package.json files with the content from the README.md.

Installation
------------

In order to install it you can run:

```sh
$ npm install -g readme.md
```

Usage
-----

Then in the project that you develop you can run again:

```sh
$ readme-md-update
```

This will update your package.json file, setting the
readme contents to the JSON escaped file.

Programmatic Access
-------------------

In case you want to update a different file, or read
a different file, or use a different property, you can
also use it directly:

```javascript
var readme = require("readme.md");

readme.writeFileIntoJson("README.md", "package.json", "readme");
```

