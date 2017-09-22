"use strict";

var log4js = require('log4js');
var logger = log4js.getLogger();

var request = require('request');
var LibraryService = require('./LibraryService');

module.exports = {

    metadata: () => (
        {
            "name": "get_books",
            "properties": {
                "subject": { "type": "string", "required": true }
            },
            "supportedActions": []
        }
    ),

    invoke: (conversation, done) => {

        console.log("");
        console.log("Entering get_books...");

        var mobileSdk = conversation.mobileSdk;
        var subject = conversation.properties().subject;

        console.log("Selected subject = " + conversation.properties().subject);

        // I'm not doing anything with this module yet, just setting up the infrastructure...
        // var getSubjects = LibraryService.subjects(mobileSdk, subject);


        // Make the request to the Library microservice...
        request('http://140.86.40.251:8080/instructional/instructors/disciplines/astronomy', function (error, response, body) {
            console.log('Status:', response.statusCode);
            console.log('Headers:', JSON.stringify(response.headers));
            console.log('Response:', body);

            var jsonBody = JSON.parse(body);
 
            console.log ("Records found = " + jsonBody.recordsFound);

            if (body.recordsFound == 0) {

                conversation.reply({
                    text: "Sorry Charlie, there are no " + subject + " books available. Try Astronomy"
                });

            } else {

                // Build the choices array from the response body...
                var choices = [];
                for (var i = 0; i < jsonBody.results.length; i++) {
                    choices.push(jsonBody.results[i].title);
                    console.log(jsonBody.results[i].title);
                }

                console.log("Before reply in get_books:");

                conversation.reply({
                    text: "[Dynamic] Here are the available " + subject + " books:",
                    choices: choices
                });
            }

            conversation.transition("confirmBookSelection");
            done();
        });
    }
};