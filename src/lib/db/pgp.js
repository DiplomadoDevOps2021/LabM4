import promise from 'bluebird';
import pgp from 'pg-promise';

// TODO check if bluebird is really necessary
const options = {
  promiseLib: promise // overriding the default (ES6 Promise);
};

export default pgp(options);
