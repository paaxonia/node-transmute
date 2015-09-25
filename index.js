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

    var result = transmuter(item);

    callback(null, result);
	};

  /**
   * Tranmute a collection of items.
   *
   * @param {array}    collection The collection of items to transmute.
   * @param {function} transmuter The function to handle the transmutation.
   * @param {function} callback
   */
	this.collection = function (collection, transmuter, callback) {
    var result = [];

    if (!isFunction(transmuter)) {
      return callback(new Error('The transmuter parameter must be a function.'), null);
    }

    async.eachSeries(collection, function each(item, callback) {
      result.push(transmuter(item));
      callback();
    }, function done(err) {
      callback(err, result);
    });
	};
};

module.exports = new Transmute();
