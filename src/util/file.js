const path = require("path");

class File {
	constructor(filePath, errors) {
		this.path = path.relative("./", filePath);
		this.errors = errors;
	}
}
module.exports = File;
