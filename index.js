'use strict';

/**
 * Require dependencies.
 */
var async = require('async');

/**
 * Transmute library.
 */
function Transmute () {

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
	 */
	this.one = function(item, transmuter, callback) {

    if (!isFunction(transmuter)) {
      return callback(new Error('The transmuter parameter must be a function.'), null);
    }

    var result = transmuter(item);

    callback(null, result);
	};

  /**
   * Tranmute a collection of items.
   */
	this.collection = function(collection, transmuter, callback) {
    var result = [];

    if (!isFunction(transmuter)) {
      return callback(new Error('The transmuter parameter must be a function.'), null);
    }

    async.each(collection, function (item) {
      result.push(transmuter(item));
    });

    callback(null, result);
	};
};

module.exports = new Transmute();
