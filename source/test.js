// Import
const {equal} = require('assert-helpers')
const {suite} = require('joe')
const {Logger} = require('caterpillar')
const Human = require('../')
const {PassThrough} = require('stream')

// Prepare
function cleanChanging (item) {
	item = item
		.replace(/\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}.\d{3}\]/, 'date')
		.replace(/\[[\/\\].+?:\d{1,}\]/, 'file')
		.replace(/\[[\d\w\.\_\-\<\>]+?\]/, 'method')
	return item
}

// Test
suite('human', function (suite) {

	suite('instantiation', function (suite, test) {
		test('should instantiate correctly', function () {
			const browser = new Human()
			equal(browser.getConfig().color, true, 'default color was applied correctly')
		})

		test('should instantiate correctly, via create, with config', function () {
			const browser = Human.create({color: false})
			equal(browser.getConfig().color, false, 'custom color was applied correctly')
		})
	})

	function addSuite (name, config, expected, cleaner) {
		suite(name, function (suite, test) {
			const logger = new Logger()
			const browser = new Human(config)
			const output = new PassThrough()
			let actual = []
			if ( cleaner )  expected = expected.map(cleaner)

			output.on('data', function (chunk) {
				actual.push(chunk.toString())
			})

			test('should pipe correctly', function () {
				logger.pipe(browser).pipe(output)
			})

			test('should log messages', function () {
				const levels = logger.getConfig().levels
				Object.keys(levels).forEach(function (name) {
					const code = levels[name]
					const message = `this is ${name} and is level ${code}`
					logger.log(name, message)
				})
			})

			test('should provide the expected output', function (done) {
				output.on('end', function () {
					if ( cleaner )  actual = actual.map(cleaner)
					equal(actual.length, expected.length)
					actual.forEach(function (result, index) {
						equal(result, expected[index])
					})
					done()
				})
				logger.end()
			})
		})
	}

	addSuite('logging without colors', {color: false}, [
		'emergency: this is emergency and is level 0\n',
		'alert: this is alert and is level 1\n',
		'critical: this is critical and is level 2\n',
		'error: this is error and is level 3\n',
		'warning: this is warning and is level 4\n',
		'notice: this is notice and is level 5\n',
		'info: this is info and is level 6\n',
		'debug: this is debug and is level 7\n',
		'emergency: this is emerg and is level 0\n',
		'critical: this is crit and is level 2\n',
		'error: this is err and is level 3\n',
		'warning: this is warn and is level 4\n',
		'notice: this is note and is level 5\n',
		'info: this is default and is level 6\n'
	])

	addSuite('logging with colors', {}, [
		'\u001b[31memergency:\u001b[39m this is emergency and is level 0\n',
		'\u001b[31malert:\u001b[39m this is alert and is level 1\n',
		'\u001b[31mcritical:\u001b[39m this is critical and is level 2\n',
		'\u001b[31merror:\u001b[39m this is error and is level 3\n',
		'\u001b[33mwarning:\u001b[39m this is warning and is level 4\n',
		'\u001b[33mnotice:\u001b[39m this is notice and is level 5\n',
		'\u001b[32minfo:\u001b[39m this is info and is level 6\n',
		'\u001b[32mdebug:\u001b[39m this is debug and is level 7\n',
		'\u001b[31memergency:\u001b[39m this is emerg and is level 0\n',
		'\u001b[31mcritical:\u001b[39m this is crit and is level 2\n',
		'\u001b[31merror:\u001b[39m this is err and is level 3\n',
		'\u001b[33mwarning:\u001b[39m this is warn and is level 4\n',
		'\u001b[33mnotice:\u001b[39m this is note and is level 5\n',
		'\u001b[32minfo:\u001b[39m this is default and is level 6\n'
	])

	addSuite('logging with colors', {level: 7}, [
		'\u001b[31memergency:\u001b[39m this is emergency and is level 0\n    \u001b[2m→ [2013-05-06 20:39:46.119] [/Users/balupton/Projects/caterpillar-human/out/test/caterpillar-human-test.js:138] [Task.fn]\u001b[22m\n',
		'\u001b[31malert:\u001b[39m this is alert and is level 1\n    \u001b[2m→ [2013-05-06 20:39:46.120] [/Users/balupton/Projects/caterpillar-human/out/test/caterpillar-human-test.js:138] [Task.fn]\u001b[22m\n',
		'\u001b[31mcritical:\u001b[39m this is critical and is level 2\n    \u001b[2m→ [2013-05-06 20:39:46.120] [/Users/balupton/Projects/caterpillar-human/out/test/caterpillar-human-test.js:138] [Task.fn]\u001b[22m\n',
		'\u001b[31merror:\u001b[39m this is error and is level 3\n    \u001b[2m→ [2013-05-06 20:39:46.121] [/Users/balupton/Projects/caterpillar-human/out/test/caterpillar-human-test.js:138] [Task.fn]\u001b[22m\n',
		'\u001b[33mwarning:\u001b[39m this is warning and is level 4\n    \u001b[2m→ [2013-05-06 20:39:46.121] [/Users/balupton/Projects/caterpillar-human/out/test/caterpillar-human-test.js:138] [Task.fn]\u001b[22m\n',
		'\u001b[33mnotice:\u001b[39m this is notice and is level 5\n    \u001b[2m→ [2013-05-06 20:39:46.122] [/Users/balupton/Projects/caterpillar-human/out/test/caterpillar-human-test.js:138] [Task.fn]\u001b[22m\n',
		'\u001b[32minfo:\u001b[39m this is info and is level 6\n    \u001b[2m→ [2013-05-06 20:39:46.122] [/Users/balupton/Projects/caterpillar-human/out/test/caterpillar-human-test.js:138] [Task.fn]\u001b[22m\n',
		'\u001b[32mdebug:\u001b[39m this is debug and is level 7\n    \u001b[2m→ [2013-05-06 20:39:46.123] [/Users/balupton/Projects/caterpillar-human/out/test/caterpillar-human-test.js:138] [Task.fn]\u001b[22m\n',
		'\u001b[31memergency:\u001b[39m this is emerg and is level 0\n    \u001b[2m→ [2013-05-06 20:39:46.123] [/Users/balupton/Projects/caterpillar-human/out/test/caterpillar-human-test.js:138] [Task.fn]\u001b[22m\n',
		'\u001b[31mcritical:\u001b[39m this is crit and is level 2\n    \u001b[2m→ [2013-05-06 20:39:46.124] [/Users/balupton/Projects/caterpillar-human/out/test/caterpillar-human-test.js:138] [Task.fn]\u001b[22m\n',
		'\u001b[31merror:\u001b[39m this is err and is level 3\n    \u001b[2m→ [2013-05-06 20:39:46.124] [/Users/balupton/Projects/caterpillar-human/out/test/caterpillar-human-test.js:138] [Task.fn]\u001b[22m\n',
		'\u001b[33mwarning:\u001b[39m this is warn and is level 4\n    \u001b[2m→ [2013-05-06 20:39:46.125] [/Users/balupton/Projects/caterpillar-human/out/test/caterpillar-human-test.js:138] [Task.fn]\u001b[22m\n',
		'\u001b[33mnotice:\u001b[39m this is note and is level 5\n    \u001b[2m→ [2013-05-06 20:39:46.126] [/Users/balupton/Projects/caterpillar-human/out/test/caterpillar-human-test.js:138] [Task.fn]\u001b[22m\n',
		'\u001b[32minfo:\u001b[39m this is default and is level 6\n    \u001b[2m→ [2013-05-06 20:39:46.126] [/Users/balupton/Projects/caterpillar-human/out/test/caterpillar-human-test.js:138] [Task.fn]\u001b[22m\n'
	], cleanChanging)
})
