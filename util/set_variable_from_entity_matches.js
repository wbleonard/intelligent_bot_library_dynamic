"use strict"

var log4js = require('log4js');
var logger = log4js.getLogger();

module.exports = {

    metadata: function metadata() {
        return {
            "name": "SetVariableFromEntityMatches",
            "properties": {
                "variable": { "type": "string", "required": true },
                "nlpVariable": { "type": "string", "required": true },
                "entity": { "type": "string", "required": true }
            },
            "supportedActions": [
            ]
        };
    },

    //invoke: function invoke(conversation, done) {
    invoke: (conversation, done) => {        
        console.log(conversation);

        var variable = conversation.properties().variable;
        var nlpVariable = conversation.properties().nlpVariable;
        var entity = conversation.properties().entity;

        logger.info('SetVariableFromEntityMatches: variable=' + variable + ' nlpVariable=' + nlpVariable + ' entity=' + entity);
        console.log('SetVariableFromEntityMatches: variable=' + variable + ' nlpVariable=' + nlpVariable + ' entity=' + entity);
        

        if (!variable || !nlpVariable || !entity) {
            throw new Error('SetVariableFromEntityMatches: Missing required property!');
        }

        var nlpResult = conversation.nlpResult(nlpVariable);
        console.log (nlpResult);

        var matches = nlpResult.entityMatches(entity);
        if (matches.length > 0) {
            logger.info('SetVariableFromEntityMatches: setting entity value=' + JSON.stringify(matches[0]));
            // TODO: check type safety!  Variable may not be of compatible type with matches..
            conversation.variable(variable, matches[0])
        }

        done();
    }
};
