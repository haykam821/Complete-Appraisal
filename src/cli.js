#! /usr/bin/env node

const run = require(".");
const chalk = require("chalk");
const path = require("path");

async function cli(args) {
	const {problems, problemCount} = await run(path.resolve(process.cwd(), args.directory), args.ignore);

	process.stdout.write("\n" + problems.filter(file => {
		// Hide a file if it has no problems
		return file.problems.length > 0;
	}).map(file => {
		return chalk.bold.red(file.path) + "\n" + file.problems.map(problem => {
			const lc = problem.line + (problem.column ? ":" + problem.column : "");
			return chalk`{yellow ${lc.padStart(8)}} {white ${problem.message}} {gray ${problem.id}}`;
		}).join("\n");
	}).join("\n\n") + "\n\n");

	if (problemCount > 0) {
		process.exitCode = 1;
	}
}

const yargs = require("yargs");
yargs.command("* [directory]", "Appraises a directory.", builder => {
	builder.positional("directory", "The directory to appraise.", {
		default: ".",
		type: "string",
	});
	builder.option("ignore", "The glob patterns to ignore.", {
		alias: "i",
		type: "array",
	});
}, run);

cli();
