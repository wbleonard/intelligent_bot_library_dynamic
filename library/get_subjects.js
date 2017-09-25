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
        var fbmList = "";

        console.log(conversation.text());

        // I'm not doing anything with this module yet, just setting up the infrastructure...
        // var getSubjects = LibraryService.subjects(conversation, subject);

        // Make the request to the Library microservice...
        request(baseURL, function (error, response, body) {
            console.log('Status:', response.statusCode);
            console.log('Headers:', JSON.stringify(response.headers));
            console.log('Response:', body);

            // Format reply for Facebook
            // https://developers.facebook.com/docs/messenger-platform/send-messages/template/list
            // To troubleshoot, docker ps the bots-connectors container.
            if (conversation.channelType() == "facebook") {
                fbmList = "{ \"attachment\":{ \"type\":\"template\", " +
                    "\"payload\":{ \"template_type\":\"list\",\"top_element_style\":\"compact\", " +
                    "\"elements\":[";
            }

            // Build the choices array from the response body...
            var choices = [];
            var jsondata = JSON.parse(body);
            for (var i = 0; i < jsondata.length; i++) {
                if (conversation.channelType() == 'facebook') {
                    if (i < 3) { // The Facebook list can't handle more then 4 elements
                        fbmList += "{\"title\":\"" + jsondata[i] + "\"," +
                                   //"\"subtitle\":\"" + jsondata[i] + "\"," +
                                   "\"buttons\":[{ \"type\":\"postback\", \"title\":\"Select\", \"payload\":\"" + jsondata[i] + "\"}]" +
                            "},";
                    }
                } else {
                    choices.push(jsondata[i]);
                    //console.log(jsondata[i]);    
                }
            }

            if (conversation.channelType() == 'facebook') {
                fbmList = fbmList.substr(0, (fbmList.length - 1)); // Strip trailing comma
                fbmList += "] } } }";
                console.log(fbmList);
                conversation.reply(JSON.parse(fbmList));
            } else {
                conversation.reply({
                    text: "For which subject do you need a book?",
                    //choices: ["Departmental Math", "Precalculus", "Advanced Math", "Statistics", "Physics", "Chemistry", "Biology", "Astronomy"]
                    choices: choices
                });
            }

            conversation.transition(true);
            done();
            console.log("*** Exiting invoke get_subjects ***\n");
        });
    }
};