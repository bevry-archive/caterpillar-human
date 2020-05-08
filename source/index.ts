// Imports
import { Transform, LogEntry } from 'caterpillar'
import { inspect } from 'util'

// Import with type fixes
import ansiColorsUntyped from 'ansicolors'
interface AnsiColors {
	(value: string): string
	[key: string]: this
}
const ansiColors = (ansiColorsUntyped as unknown) as AnsiColors
import ansiStylesUntyped from 'ansistyles'
interface AnsiStyles {
	(value: string): string
	[key: string]: this
}
const ansiStyles = (ansiStylesUntyped as unknown) as AnsiStyles

/**
 * Return the given argument.
 * Used for when there is no formatter.
 */
function nop<T>(str: T): T {
	return str
}

/**
 * Convert Logger entries into human readable format.
 * @extends Transform
 * @example
 * ``` javascript
 * import Logger from 'caterpillar'
 * import Human from 'caterpillar-human'
 * const logger = new Logger()
 * const human = new Human()
 * logger.pipe(human).pipe(process.stdout)
 * logger.log('info', 'some', {data: 'oh yeah'}, 42)
 * ```
 */
class Human extends Transform {
	/** Get the initial configuration. */
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

	/** Get the color for the log level */
	getColor(levelNumber: number): string | false {
		// Determine
		const { colors } = this.getConfig()
		const color = colors[levelNumber] || false

		// Return
		return color
	}

	/** Pad the left of some content if need be with the specified padding to make the content reach a certain size */
	padLeft(padding: string, size: number, content: string | number): string {
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

	/** Convert logger entry arguments into a human readable string */
	formatArguments(args: any[]): string {
		const { color } = this.getConfig()
		return args
			.map((value) =>
				typeof value === 'string'
					? value
					: inspect(value, { showHidden: false, depth: 10, colors: color })
			)
			.join(' ')
	}

	/** Convert a datetime into a human readable format */
	formatDate(datetime: Date | number | string): string {
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

	/** Convert a logger entry into a human readable format */
	format(message: string): string {
		// Prepare
		const entry: LogEntry = JSON.parse(message)
		const config = this.getConfig()
		const debug = config.level === 7
		let result: string

		// Format
		const format = {
			color: this.getColor(entry.levelNumber),
			timestamp: this.formatDate(entry.date),
			text: this.formatArguments(entry.args),
		}

		// Check
		if (format.text) {
			// Formatters
			const levelFormatter =
				(config.color &&
					format.color &&
					((ansiColors && ansiColors[format.color]) ||
						(ansiStyles && ansiStyles[format.color]))) ||
				nop
			const textFormatter =
				(false && debug && config.color && ansiStyles && ansiStyles.bright) ||
				nop
			const debugFormatter =
				(debug && config.color && ansiStyles && ansiStyles.dim) || nop

			// Message
			const levelString = levelFormatter(`${entry.levelName}:`)
			const entryString = textFormatter(format.text)
			const messageString = `${levelString} ${entryString}`

			// Debugging
			if (debug) {
				// Debug Information
				const seperator = '\n    '
				const debugString = debugFormatter(
					`→ [${format.timestamp}] [${entry.file}:${entry.line}] [${entry.method}]`
				)

				// Result
				result = `${messageString}${seperator}${debugString}\n`
			} else {
				// Result
				result = `${messageString}\n`
			}
		} else {
			result = format.text
		}

		// Return
		return result
	}
}

// Aliases
export const create = Human.create.bind(Human)
export default Human
