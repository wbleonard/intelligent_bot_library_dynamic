"use strict";

var log4js = require('log4js');
var logger = log4js.getLogger();

var request = require('request');
var LibraryService = require('./LibraryService');

module.exports = {

    metadata: () => (
        {
            "name": "get_subjects",
            "properties": {
                "subject": { "type": "string", "required": true }
            },
            "supportedActions": []
        }
    ),

    invoke: (conversation, done) => {

        var mobileSdk = conversation.mobileSdk;
        var subject = conversation.properties().subject;

        //console.log(conversation);

        // I'm not doing anything with this module yet, just setting up the infrastructure...
        // var getSubjects = LibraryService.subjects(mobileSdk, subject);

        console.log("Before request");

        // Make the request to the Library microservice...
        request('http://140.86.40.251:8080/instructional/instructors/disciplines', function (error, response, body) {
            console.log('Status:', response.statusCode);
            console.log('Headers:', JSON.stringify(response.headers));
            console.log('Response:', body);

            // Build the choices array from the response body...
            var choices = [];
            var jsondata = JSON.parse(body);
            for (var i=0; i<jsondata.length; i++){
                choices.push(jsondata[i]);
                console.log(jsondata[i]);    
            }
            //console.log(choices);
            
            console.log("Before reply in get_subjects");

            conversation.reply({
                text: "[Dynamic] For which subject do you need a book?",
                //choices: ["Departmental Math", "Precalculus", "Advanced Math", "Statistics", "Physics", "Chemistry", "Biology", "Astronomy"]
                choices: choices
            });

            // Update the Flow's Subject variablet to the list of subjects found.
            //conversation.variable("Subject", choices);

            conversation.transition();
            done();
        });
    }
};