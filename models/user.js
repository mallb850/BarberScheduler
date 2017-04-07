var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.createConnection('mongodb://localhost/BarberData');

var db = mongoose.connection;

var User = mongoose.Schema ({
      username: {
        type: String,
        index: true
      },
      password: {
        type: String
      },
      email: {
        type: String
      },
      firstname: {
        type: String
      },
      lastname: {
        type: String
      }
});

var User = module.exports = mongoose.model('User', User);

module.exports.createUser = function(newUser, cb) {
  var bcrypt = require('bcryptjs');
bcrypt.genSalt(10, function(err, salt) {

        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(cb);
        });

    });
  }

  module.exports.getUserByUsername = function(username, cb) {
    var query = {username: username};
    User.findOne(query, cb);
  }

  module.exports.comparePassword = function(candidatePassword, hash, cb) {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
      if(err) throw err;
      cb(null, isMatch);
    })
  }

  module.exports.getUserById = function(id, cb) {
      User.findById(id, cb);
  }
