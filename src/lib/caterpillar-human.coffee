# Import
util = require('util')
try
	ansiColors = require('ansicolors')
	ansiStyles = require('ansistyles')
catch err
	ansiColors = null
	ansiStyles = null

# Human
class Human extends require('caterpillar').Transform
	config:
		spacer: ''
		color: true
		level: null
		colors:
			0: 'red'
			1: 'red'
			2: 'red'
			3: 'red'
			4: 'yellow'
			5: 'yellow'
			6: 'green'
			7: 'green'

	_transform: (chunk, encoding, next) =>
		entry = JSON.parse(chunk.toString())
		message = @format(entry)
		return next(null, message)

	getColor: (levelNumber) ->
		# Determine
		color = @config.colors?[levelNumber] or false

		# Return
		return color

	padLeft: (padding,size,msg) ->
		# Prepare
		padding = String(padding)
		msg = String(msg)

		# Handle
		if msg.length < size
			for i in [0...size-msg.length]
				msg = padding+msg

		# Return
		msg

	padRight: (padding,size,msg) ->
		# Prepare
		padding = String(padding)
		msg = String(msg)

		# Handle
		if msg.length < size
			for i in [0...size-msg.length]
				msg += padding

		# Return
		msg

	formatArguments: (args) ->
		# Handle
		parts = []
		for value,index in args
			parts[index] =
				if typeof value is 'string'
					value
				else
					util.inspect(value, false, 10)
		text = parts.join(' ')

		# Return
		return text

	formatDate: (now) ->
		# Prepare
		now      = new Date(now)
		year     = now.getFullYear()
		month    = @padLeft('0', 2, now.getMonth() + 1)
		date     = @padLeft('0', 2, now.getDate())
		hours    = @padLeft('0', 2, now.getHours())
		minutes  = @padLeft('0', 2, now.getMinutes())
		seconds  = @padLeft('0', 2, now.getSeconds())
		ms       = @padLeft('0', 3, now.getMilliseconds())

		# Apply
		result = "#{year}-#{month}-#{date} #{hours}:#{minutes}:#{seconds}.#{ms}"

		# Return
		return result

	format: (entry) =>
		# Prepare
		config = @getConfig()
		entry.color = @getColor(entry.levelNumber)
		entry.timestamp = @formatDate(entry.date)
		entry.text = @formatArguments(entry.args)
		useColors = @config.color is true
		debugMode = config.level is 7
		result = null

		# Check
		if entry.text
			# Formatters
			levelFormatter = useColors and (ansiColors?[entry.color] or ansiStyles?[entry.color])
			textFormatter  = false and debugMode and useColors and ansiStyles?.bright
			debugFormatter = debugMode and useColors and ansiStyles?.dim

			# Message
			levelString = entry.levelName+':'
			levelString = levelFormatter(levelString)  if levelFormatter
			entryString = entry.text
			entryString = textFormatter(entryString)  if textFormatter
			messageString = "#{config.spacer}#{levelString} #{entryString}"

			# Debugging
			if debugMode
				# Debug Information
				seperator = '\n    '
				debugString = "→ [#{entry.timestamp}] [#{entry.file}:#{entry.line}] [#{entry.method}]"
				debugString = debugFormatter(debugString)  if debugFormatter

				# Result
				result = "#{messageString}#{seperator}#{debugString}\n"
			else
				# Result
				result = messageString+'\n'

		# Return
		return result

# Export
module.exports = {
	Human
	createHuman: (args...) ->  new Human(args...)
}