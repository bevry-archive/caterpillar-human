# Import
{expect} = require('chai')
joe = require('joe')
{Logger} = require('caterpillar')
{Human} = require('../../')
{PassThrough} = require('stream')

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

	describe 'logging', (describe,it) ->
		logger = new Logger()
		transform = new Human(color:false)
		output = new PassThrough()
		actual = []
		expected = [
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
		]

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
				expect(actual.length).to.equal(expected.length)
				for result,index in actual
					expect(result).to.equal(expected[index])
				done()
			logger.end()

	describe 'logging debug', (describe,it) ->
		logger = new Logger()
		transform = new Human(color:false,level:7)
		output = new PassThrough()
		actual = []
		expected = [
			'emergency: this is emergency and is level 0\n    → [2013-04-25 20:07:40.449] [/Users/balupton/Projects/caterpillar-human/out/test/caterpillar-human-test.js:90] [Task.fn]\n',
			'alert: this is alert and is level 1\n    → [2013-04-25 20:07:40.450] [/Users/balupton/Projects/caterpillar-human/out/test/caterpillar-human-test.js:90] [Task.fn]\n',
			'critical: this is critical and is level 2\n    → [2013-04-25 20:07:40.450] [/Users/balupton/Projects/caterpillar-human/out/test/caterpillar-human-test.js:90] [Task.fn]\n',
			'error: this is error and is level 3\n    → [2013-04-25 20:07:40.451] [/Users/balupton/Projects/caterpillar-human/out/test/caterpillar-human-test.js:90] [Task.fn]\n',
			'warning: this is warning and is level 4\n    → [2013-04-25 20:07:40.451] [/Users/balupton/Projects/caterpillar-human/out/test/caterpillar-human-test.js:90] [Task.fn]\n',
			'notice: this is notice and is level 5\n    → [2013-04-25 20:07:40.452] [/Users/balupton/Projects/caterpillar-human/out/test/caterpillar-human-test.js:90] [Task.fn]\n',
			'info: this is info and is level 6\n    → [2013-04-25 20:07:40.453] [/Users/balupton/Projects/caterpillar-human/out/test/caterpillar-human-test.js:90] [Task.fn]\n',
			'debug: this is debug and is level 7\n    → [2013-04-25 20:07:40.454] [/Users/balupton/Projects/caterpillar-human/out/test/caterpillar-human-test.js:90] [Task.fn]\n',
			'emergency: this is emerg and is level 0\n    → [2013-04-25 20:07:40.455] [/Users/balupton/Projects/caterpillar-human/out/test/caterpillar-human-test.js:90] [Task.fn]\n',
			'critical: this is crit and is level 2\n    → [2013-04-25 20:07:40.456] [/Users/balupton/Projects/caterpillar-human/out/test/caterpillar-human-test.js:90] [Task.fn]\n',
			'error: this is err and is level 3\n    → [2013-04-25 20:07:40.457] [/Users/balupton/Projects/caterpillar-human/out/test/caterpillar-human-test.js:90] [Task.fn]\n',
			'warning: this is warn and is level 4\n    → [2013-04-25 20:07:40.458] [/Users/balupton/Projects/caterpillar-human/out/test/caterpillar-human-test.js:90] [Task.fn]\n',
			'notice: this is note and is level 5\n    → [2013-04-25 20:07:40.459] [/Users/balupton/Projects/caterpillar-human/out/test/caterpillar-human-test.js:90] [Task.fn]\n',
			'info: this is default and is level 6\n    → [2013-04-25 20:07:40.463] [/Users/balupton/Projects/caterpillar-human/out/test/caterpillar-human-test.js:90] [Task.fn]\n'
		].map(cleanChanging)

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
				actual = actual.map(cleanChanging)
				expect(actual.length).to.equal(expected.length)
				for result,index in actual
					expect(result).to.equal(expected[index])
				done()
			logger.end()
