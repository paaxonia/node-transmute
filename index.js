'use strict';

/**
 * Require dependencies.
 */
var async = require('async');

/**
 * Transmute library.
 */
function Transmute() {

  /**
   * Checks if supplied value is a function.
   *
   * @param  {mixed}  value
   * @return {bool}
   */
  function isFunction(value) {
   return value && {}.toString.call(value) === '[object Function]';
  }

	/**
	 * Tranmute a single item.
   *
   * @param {object}   item       The item to transmute.
   * @param {function} transmuter The function to handle the transmutation.
   * @param {function} callback
	 */
	this.one = function (item, transmuter, callback) {

    if (!isFunction(transmuter)) {
      return callback(new Error('The transmuter parameter must be a function.'), null);
    }

    transmuter(item, callback);
	};

  /**
   * Tranmute a collection of items.
   *
   * @param {array}    collection The collection of items to transmute.
   * @param {function} transmuter The function to handle the transmutation.
   * @param {function} callback
   */
	this.collection = function (collection, transmuter, callback) {
    var results = [];

    if (!isFunction(transmuter)) {
      return callback(new Error('The transmuter parameter must be a function.'), null);
    }

    async.eachSeries(collection, function each(item, callback) {
      transmuter(item, function (err, result) {
        results.push(result);
        callback();
      });
    }, function done(err) {
      callback(err, results);
    });
	};
};

module.exports = new Transmute();
