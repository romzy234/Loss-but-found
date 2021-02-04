const Datastore = require('nedb');

exports.loss = new Datastore('./database/loss.db');

exports.users = new Datastore('./database/users.db');

exports.test= new Datastore('./database/test.db');