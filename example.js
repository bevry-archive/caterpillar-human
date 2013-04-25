// Import
var logger = new (require('caterpillar').Logger)();
var human = new (require('./').Human)();

// Pipe logger output to our human interface, then our human interface output to stdout
logger.pipe(human).pipe(process.stdout);

// Log
logger.log('info',  'this is the first log entry');
// info:  this is the first log entry
logger.log('debug', 'this is the second log entry');
// debug: this is the second log entry

// Wait
setTimeout(function(){
	// Set debug mode
	logger.setConfig({level:7});

	// Log
	logger.log('info',  'this is the first log entry');
	// info: this is the first log entry
	//    → [2013-04-25 20:37:22.692] [/Users/balupton/Projects/caterpillar-human/example.js:20] [null._onTimeout]
	logger.log('debug', 'this is the second log entry');
	// debug: this is the second log entry
	//    → [2013-04-25 20:37:22.693] [/Users/balupton/Projects/caterpillar-human/example.js:22] [null._onTimeout]
},0);