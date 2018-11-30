const mdlint = require("markdownlint");
const {glob} = require("glob-gitignore");

const File = require("./../util/file.js");
const Problem = require("./../util/problem.js");

const {promisify} = require("util");

class MarkdownLintChecker {
	constructor() {
		this.id = "markdownlint";
	}

	async check(directory, ignored) {
		const files = await glob("./**/*.md", {
			cwd: directory,
			ignore: ignored,
		});

		const results = await promisify(mdlint)({
			files,
		});

		return Object.keys(results).map(key => {
			return new File(key, results[key].map(msg => {
				return new Problem(this, {
					id: msg.ruleNames[1],
					message: msg.ruleDescription,
					column: null,
					line: msg.lineNumber,
				});
			}));
		});
	}
}
module.exports = MarkdownLintChecker;