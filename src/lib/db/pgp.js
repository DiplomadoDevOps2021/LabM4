const promise = require('bluebird');
const pgp = require('pg-promise');

// TODO check if bluebird is really necessary
const options = {
  promiseLib: promise // overriding the default (ES6 Promise);
};

module.exports =  pgp(options);
