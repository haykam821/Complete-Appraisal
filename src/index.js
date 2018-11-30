const rqAll = require("require-all");
const checkers = Object.values(rqAll({
	dirname: __dirname + "/checkers",
	resolve: checker => new checker(),
}));

const File = require("./util/file.js");

const fs = require("fs-extra");
const path = require("path");

/**
 * Appraises files in a directory.
 * @param {string} directory The directory to appraise.
 * @param {string[]} ignore An array of glob patterns to ignore.
 * @returns {Promise<Object>} The appraisal's information.
 */
async function appraise(directory, ignore = []) {
	if (typeof directory === "undefined") {
		throw new TypeError("You must specify a directory.");
	} else if (typeof directory !== "string") {
		throw new TypeError("The directory must be a string.");
	}

	const gitignore = await fs.readFile(path.resolve(directory, "./.gitignore"));
	const gitignored = gitignore.toString().split("\n");
	const ignored = ignore.concat(gitignored);

	const done = {};
	let problemCount = 0;

	const checkened = await Promise.all(checkers.map(checker => {
		return checker.check(directory, ignored);
	}));
	
	checkened.flat().forEach(file => {
		if (!done[file.path]) {
			done[file.path] = new File(file.path, []);
		}
		done[file.path].problems = done[file.path].problems.concat(...file.problems);
		problemCount += file.problems.length;
	});

	return {
		problems: Object.values(done),
		problemCount,
	}
}
module.exports = appraise;
