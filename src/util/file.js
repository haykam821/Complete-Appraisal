const path = require("path");

class File {
	constructor(filePath, problems) {
		this.path = path.relative("./", filePath);
		this.problems = problems;
	}
}
module.exports = File;
