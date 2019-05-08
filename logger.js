const EventEmiiter = require('events');

const url = 'http://mylogger.io/log';

class Logger extends EventEmiiter{
    log(message) {
        console.log(message);
        //Raise an event
        this.emit('messageLogged', { id: 1, url: 'http://' });
    }
}

module.exports = Logger;