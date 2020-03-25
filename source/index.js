/* eslint class-methods-use-this:0 */
// @ts-check
'use strict'

// Import
const { Transform } = require('caterpillar')
const util = require('util')
let ansiColors, ansiStyles
try {
	ansiColors = require('ansicolors')
	ansiStyles = require('ansistyles')
} catch (err) {
	ansiColors = null
	ansiStyles = null
}

/**
Return the given argument.
Used for when there is no formatter.
@private
@param {string} str
@returns {string}
*/
function nop(str) {
	return str
}

/**
Convert Logger entries into human readable format.
Extends http://master.caterpillar.bevry.surge.sh/docs/Transform.html
@extends Transform
@example
const logger = require('caterpillar').create()
logger.pipe(require('caterpillar-human').create()).pipe(process.stdout)
logger.log('info', 'some', {data: 'oh yeah'}, 42)
*/
class Human extends Transform {
	/**
	Get the initial configuration.
	@returns {Object}
	*/
	getInitialConfig() {
		return {
			color: true,
			level: null,
			colors: {
				'0': 'red',
				'1': 'red',
				'2': 'red',
				'3': 'red',
				'4': 'yellow',
				'5': 'yellow',
				'6': 'green',
				'7': 'green',
			},
		}
	}

	/**
	Get the color for the log level
	@param {number} levelNumber
	@returns {string}
	*/
	getColor(levelNumber) {
		// Determine
		const { colors } = this.getConfig()
		const color = colors[levelNumber] || false

		// Return
		return color
	}

	/**
	Pad the left of some content if need be with the specified padding to make the content reach a certain size
	@param {string} padding
	@param {number} size
	@param {string|number} content
	@returns {string}
	*/
	padLeft(padding, size, content) {
		// Prepare
		padding = String(padding)
		content = String(content)

		// Handle
		if (content.length < size) {
			for (let i = 0, n = size - content.length; i < n; ++i) {
				content = padding + content
			}
		}

		// Return
		return content
	}

	/**
	Convert logger entry arguments into a human readable string
	@param {Array<any>} args
	@returns {string}
	*/
	formatArguments(args) {
		const { color } = this.getConfig()
		return args
			.map((value) =>
				typeof value === 'string'
					? value
					: util.inspect(value, { showHidden: false, depth: 10, colors: color })
			)
			.join(' ')
	}

	/**
	Convert a datetime into a human readable format
	@param {Date|number|string} datetime
	@returns {string}
	*/
	formatDate(datetime) {
		// Prepare
		const now = new Date(datetime)
		const year = now.getFullYear()
		const month = this.padLeft('0', 2, now.getMonth() + 1)
		const date = this.padLeft('0', 2, now.getDate())
		const hours = this.padLeft('0', 2, now.getHours())
		const minutes = this.padLeft('0', 2, now.getMinutes())
		const seconds = this.padLeft('0', 2, now.getSeconds())
		const ms = this.padLeft('0', 3, now.getMilliseconds())

		// Apply
		const result = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}.${ms}`

		// Return
		return result
	}

	/**
	Convert a logger entry into a human readable format
	@param {string} message
	@returns {string}
	*/
	format(message) {
		// Prepare
		const entry = JSON.parse(message)
		const { color, level } = this.getConfig()
		const debug = level === 7
		let result = null

		// Format
		entry.color = this.getColor(entry.levelNumber)
		entry.timestamp = this.formatDate(entry.date)
		entry.text = this.formatArguments(entry.args)

		// Check
		if (entry.text) {
			// Formatters
			const levelFormatter =
				(color &&
					((ansiColors && ansiColors[entry.color]) ||
						(ansiStyles && ansiStyles[entry.color]))) ||
				nop
			const textFormatter =
				(false && debug && color && ansiStyles && ansiStyles.bright) || nop
			const debugFormatter =
				(debug && color && ansiStyles && ansiStyles.dim) || nop

			// Message
			const levelString = levelFormatter(`${entry.levelName}:`)
			const entryString = textFormatter(entry.text)
			const messageString = `${levelString} ${entryString}`

			// Debugging
			if (debug) {
				// Debug Information
				const seperator = '\n    '
				const debugString = debugFormatter(
					`→ [${entry.timestamp}] [${entry.file}:${entry.line}] [${entry.method}]`
				)

				// Result
				result = `${messageString}${seperator}${debugString}\n`
			} else {
				// Result
				result = `${messageString}\n`
			}
		}
		// @TODO should we throw on else?

		// Return
		return result
	}
}

// Export
module.exports = Human
