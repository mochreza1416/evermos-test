var promisedNode = require("promised-node"),
	fs = promisedNode.load("fs"),
	Promise = promisedNode.Promise;

/**
 * writeFileIntoJson - Writes the contents of the file with the given filename
 *                     into the property named jsonProperty from jsonFileName.
 * @param {string} fileName
 * @param {string} jsonFileName
 * @param {string} jsonProperty
 * @return {Promise}
 */
function writeFileIntoJson(fileName, jsonFileName, jsonProperty) {
	var readmePromise,
		packageJsonPromise;

	/**
	 * Read and convert a file as a JavaScript JSON string.
	 */
	readmePromise = fs.readFile("README.md", {encoding: 'utf-8'}).then(function(readmeContent) {
		return readmeContent
			.replace(/\\/g, "\\\\")
			.replace(/"/g, "\\\"")
			.split(/[\n\r]+/)
			.join("\\n");
	});

	packageJsonPromise = fs.readFile("package.json", {encoding: 'utf-8'});

	return Promise.all([readmePromise, packageJsonPromise]).then(function(data) {
		var stringContent = data[0],
			packageJsonContent = data[1];

		function replace(str, $1, $2) {
			return $1 + stringContent + $2;
		}

		return packageJsonContent.replace(/^(\s*"readme"\s*:\s*").*(",?\s*)$/m, replace);
	}).then(function(data) {
		return fs.writeFile("package.json", data, {encoding: 'utf-8'});
	}).then(function() {
		console.log("Fantastic success, package.json was updated.");
	}, function(e) {
		console.error('oh noes', e);
	});
}

exports.writeFileIntoJson = writeFileIntoJson;
