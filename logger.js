// Events Module
const EventsEmitter = require('events');

var url = 'http://mylogger.io/log';

class Logger extends EventsEmitter {
    log (message) {
        console.log(message);
        //raise an event
        this.emit('messageLogged', { id: 1, url: 'http://'});
    }
}

module.exports = Logger;