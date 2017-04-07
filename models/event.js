var mongoose = require('mongoose');

mongoose.createConnection('mongodb://localhost/BarberData');

var db = mongoose.connection;

var Event = mongoose.Schema ({
      name: {
        type: String,
        index: true
      },
      date: {
        type: String
      },
      time: {
        type: String
      },
      comment: {
        type: String
      }
});

var Event = module.exports = mongoose.model('Event', Event);

module.exports.createEvent = function(newEvent, cb) {
      newEvent.save(cb);
  }

module.exports.getEvents = function(id, cb) {
      return cb(Event.find({}));
  }
