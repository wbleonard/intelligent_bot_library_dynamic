"use strict";

var log4js = require('log4js');
var logger = log4js.getLogger();

var LibraryService = require('./LibraryService');

module.exports = {

        metadata: () => (
        {
            "name": "get_subjects",
            "supportedActions": []
        }
    ),

    invoke: (conversation, done) => {

        var mobileSdk = conversation.mobileSdk;
        var subject = conversation.properties().Subject;

        console.log(conversation.context);

        var getSubjects = LibraryService.subjects(mobileSdk, subject);

        console.log("Before reply");

        conversation.reply({ text: "[Dynamic] For which subject do you need a book?",
                             choices: ["All Mathmatics","Departmental Math", "Precalculus", "Advanced Math", "Statistics", "Physics", "Chemistry", "Biology", "Astronomy"] });

        conversation.transition();
        done();
    }
};