"use strict";

var log4js = require('log4js');
var logger = log4js.getLogger();

var request = require('request');
var LibraryService = require('./LibraryService');

module.exports = {

    metadata: () => (
        {
            "name": "get_subjects",
            "supportedActions": []
        }
    ),

    invoke: (conversation, done) => {

        // CC specific variables ==============================================
        var baseURL = "http://140.86.40.251:8080/instructional/instructors/disciplines/";

        console.log(conversation.text());

        // I'm not doing anything with this module yet, just setting up the infrastructure...
        // var getSubjects = LibraryService.subjects(conversation, subject);

        // Make the request to the Library microservice...
        request(baseURL, function (error, response, body) {
            console.log('Status:', response.statusCode);
            console.log('Headers:', JSON.stringify(response.headers));
            console.log('Response:', body);

            // Build the choices array from the response body...
            var choices = [];
            var jsondata = JSON.parse(body);
            for (var i=0; i<jsondata.length; i++){
                choices.push(jsondata[i]);
                //console.log(jsondata[i]);    
            }
            
            conversation.reply({
                text: "For which subject do you need a book?",
                //choices: ["Departmental Math", "Precalculus", "Advanced Math", "Statistics", "Physics", "Chemistry", "Biology", "Astronomy"]
                choices: choices
            });

            conversation.transition(true);
            done();
            console.log("*** Exiting invoke get_subjects ***\n");            
        });
    }
};