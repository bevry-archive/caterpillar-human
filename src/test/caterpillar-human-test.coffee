# Import
{expect} = require('chai')
joe = require('joe')
{Logger} = require('caterpillar')
{Human} = require('../../')
{PassThrough} = require('readable-stream')

# Prepare
cleanChanging = (item) ->
	item
		.replace(/\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}.\d{3}\]/, 'date')
		.replace(/\[[\/\\].+?:\d{1,}\]/, 'file')
		.replace(/\[[\d\w\.]+?\]/, 'method')

# Test
joe.describe 'human', (describe,it) ->

	describe 'transform', (describe,it) ->
		transform = null

		it 'should instantiate correctly', ->
			transform = new Human()


	describe 'logging without colors', (describe,it) ->
		logger = new Logger()
		transform = new Human(color:false)
		output = new PassThrough()
		actual = []
		expected =
			[ 'emergency: this is emergency and is level 0\n',
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
			'info: this is default and is level 6\n' ]

		output.on 'data', (chunk) ->
			actual.push chunk.toString()

		it 'should pipe correctly', ->
			logger.pipe(transform).pipe(output)

		it 'should log messages', ->
			for own name,code of Logger::config.levels
				message = "this is #{name} and is level #{code}"
				logger.log(name, message)

		it 'should provide the expected output', (done) ->
			output.on 'end', ->
				#console.log actual
				expect(actual.length).to.equal(expected.length)
				for result,index in actual
					expect(result).to.equal(expected[index])
				done()
			logger.end()

	describe 'logging with colors', (describe,it) ->
		logger = new Logger()
		transform = new Human()
		output = new PassThrough()
		actual = []
		expected =
			[ '\u001b[31memergency:\u001b[39m this is emergency and is level 0\n',
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
			'\u001b[32minfo:\u001b[39m this is default and is level 6\n' ]

		output.on 'data', (chunk) ->
			actual.push chunk.toString()

		it 'should pipe correctly', ->
			logger.pipe(transform).pipe(output)

		it 'should log messages', ->
			for own name,code of Logger::config.levels
				message = "this is #{name} and is level #{code}"
				logger.log(name, message)

		it 'should provide the expected output', (done) ->
			output.on 'end', ->
				#console.log actual
				expect(actual.length).to.equal(expected.length)
				for result,index in actual
					expect(result).to.equal(expected[index])
				done()
			logger.end()


	describe 'logging with colors in debug mode', (describe,it) ->
		logger = new Logger()
		transform = new Human(level:7)
		output = new PassThrough()
		actual = []
		expected =
			[ '\u001b[31memergency:\u001b[39m this is emergency and is level 0\n    \u001b[2m→ [2013-05-06 20:39:46.119] [/Users/balupton/Projects/caterpillar-human/out/test/caterpillar-human-test.js:138] [Task.fn]\u001b[22m\n',
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
			'\u001b[32minfo:\u001b[39m this is default and is level 6\n    \u001b[2m→ [2013-05-06 20:39:46.126] [/Users/balupton/Projects/caterpillar-human/out/test/caterpillar-human-test.js:138] [Task.fn]\u001b[22m\n' ]

		# Clean up
		expected = expected.map(cleanChanging)

		output.on 'data', (chunk) ->
			actual.push chunk.toString()

		it 'should pipe correctly', ->
			logger.pipe(transform).pipe(output)

		it 'should log messages', ->
			for own name,code of Logger::config.levels
				message = "this is #{name} and is level #{code}"
				logger.log(name, message)

		it 'should provide the expected output', (done) ->
			output.on 'end', ->
				#console.log actual
				actual = actual.map(cleanChanging)
				expect(actual.length).to.equal(expected.length)
				for result,index in actual
					expect(result).to.equal(expected[index])
				done()
			logger.end()
