'use strict';

module.exports = {
  components: {
    // say_hello Bot
    'say_hello': require('./examples/say_hello'),

    // Library Bot
    'get_subjects': require('./library/get_subjects'),
    'get_books': require('./library/get_books'),

    // Utilitiy Components
    'SetVariableFromEntityMatches': require('./util/set_variable_from_entity_matches')
  }
};
