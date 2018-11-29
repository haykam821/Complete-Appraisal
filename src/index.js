const { CLIEngine } = require("eslint");
const baseConfig = require("eslint-config-haykam");

function run(directory) {
	if (typeof directory === "undefined") {
		throw new TypeError("You must specify a directory.");
	} else if (typeof directory !== "string") {
		throw new TypeError("The directory must be a string.");
	}

	const lint = new CLIEngine({
		baseConfig,
		cwd: directory,
	});
}
module.exports = run;
