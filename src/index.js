const rqAll = require("require-all");
const checkers = Object.values(rqAll({
	dirname: __dirname + "/checkers",
	resolve: checker => new checker(),
}));

const File = require("./util/file.js");

async function run(directory) {
	if (typeof directory === "undefined") {
		throw new TypeError("You must specify a directory.");
	} else if (typeof directory !== "string") {
		throw new TypeError("The directory must be a string.");
	}

	const done = {};
	let problemCount = 0;

	const checkened = await Promise.all(checkers.map(checker => {
		return checker.check(directory);
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
module.exports = run;
