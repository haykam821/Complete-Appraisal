#! /usr/bin/env node

const run = require(".");
const chalk = require("chalk");

function posSyntax(line, column) {
	if (line && column) {
		return `${line}:${column}`;
	} else if (line) {
		return line.toString();
	} else {
		return "";
	}
}

async function cli() {
	const {problems, problemCount} = await run(process.cwd());

	process.stdout.write("\n" + problems.filter(file => {
		// Hide a file if it has no problems
		return file.problems.length > 0;
	}).map(file => {
		return chalk.bold.red(file.path) + "\n" + file.problems.map(problem => {
			const lc = posSyntax(problem.line, problem.column);
			return chalk`{yellow ${lc.padStart(8)}} {white ${problem.message}} {gray ${problem.id}}`;
		}).join("\n");
	}).join("\n\n") + "\n\n");

	if (problemCount > 0) {
		process.exitCode = 1;
	}
}
cli();