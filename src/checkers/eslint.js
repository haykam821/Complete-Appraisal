const { CLIEngine } = require("eslint");
const baseConfig = require("eslint-config-haykam");

const File = require("./../util/file.js");
const Problem = require("./../util/problem.js");

class ESLintChecker {
	constructor() {
		this.id = "eslint";
	}

	check(directory) {
		const { results } = new CLIEngine({
			baseConfig,
			cwd: directory,
		}).executeOnFiles(["."]);
		
		return results.map(result => {
			return new File(result.filePath, result.messages.map(msg => {
				return new Problem(this, {
					id: msg.ruleId,
					message: msg.message,
					column: msg.column,
					line: msg.line,
				});
			}));
		});
	}
}
module.exports = ESLintChecker;