"use strict";

var log4js = require('log4js');
var logger = log4js.getLogger();

module.exports = {
    subjects: function subjects(mobileSdk, subject) {
        console.log('In subjects function');
    }
}