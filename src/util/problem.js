const snakeCase = require("snake-case");

class Problem {
	constructor(from, problem) {
		this.from = from;

		this.id = this.from.id + ":" + snakeCase(problem.id);
		this.message = problem.message;
		this.column = problem.column;
		this.line = problem.line;
	}
}
module.exports = Problem;