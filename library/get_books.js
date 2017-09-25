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
                "selectedBook": { "type": "string", "required": true }
            },
            "supportedActions": [
                "selectAnotherBook",
                "confirmBookSelection"
            ]
        }
    ),

    invoke: (conversation, done) => {

        // CC specific variables ==============================================
        var subject = conversation.text();
        var ccPhase = conversation.variable("bookSelectionPhase");
        var baseURL = "http://140.86.40.251:8080/instructional/instructors/disciplines/" + subject;
        console.log("Selected subject = " + subject);

        // ====================================================================
        //  Check if this is the first call to the component and either 
        //  render the UI or respond to the selected book
        // ====================================================================

        if ((ccPhase === undefined) || (ccPhase == null) || (ccPhase === '') || (ccPhase === '1')) {

            // First call to CC so get book options from Library microservice =

            request(baseURL, function (error, response, body) {
                console.log('Status:', response.statusCode);
                console.log('Headers:', JSON.stringify(response.headers));
                console.log('Response:', body);

                var jsonBody = JSON.parse(body);

                var recordsFound = Number(jsonBody.recordsFound)
                console.log("Records found = " + recordsFound);

                if (recordsFound == 0) {

                    conversation.reply({
                        text: "Sorry Charlie, there are no " + subject + " books available. Try Astronomy."
                    });
                    conversation.keepTurn(true);
                    conversation.transition("selectAnotherBook");
                    done();
                    console.log("*** Exiting invoke get_subjects ***\n");    

                } else {

                    // Build the choices array from the response body...
                    var choices = [];
                    for (var i = 0; i < jsonBody.results.length; i++) {
                        choices.push(jsonBody.results[i].title);
                        console.log(jsonBody.results[i].title);
                    }

                    conversation.reply({
                        text: "[Dynamic] Here are the available " + subject + " books:",
                        choices: choices    
                    });

                    conversation.keepTurn(false); // to keep the control of user input            
                    conversation.variable("bookSelectionPhase", 2);
                    done();
                    console.log("*** Exiting invoke get_subjects ***\n");                        
                }
            });
        } else {

            // Second call to CC so User is selecting a book ==================
            console.log ("Entering get_books phase 2...");
            var selectedBook = conversation.text();
            console.log ("selectedBook = " + selectedBook);
            conversation.variable("selectedBook", selectedBook);
            conversation.keepTurn(true);
            conversation.transition("confirmBookSelection");
            done();
            console.log("*** Exiting invoke get_subjects ***\n");                
        }
    }
};