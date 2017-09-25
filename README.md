# Library Service Intelligent Bot Custom Component (Express.js)

This Component Service implementation is based on Express.js. It includes the following files:

- [package.json](package.json) --  This is a standard `package.json` file.
- [index.js](index.js) --  The main Javascript file. It implements the Bots Component Service REST API by  delegating most of the functions to the [shell.js](shell.js) object.
- [registry.js](registry.js) --  Lists the custom components that are managed by a component service.
- [shell.js](shell.js) --  A utility object that's shipped with Bots that both finds and invokes custom components.
- [library/get_subjects.js](library/get_subjects.js) --  Retrieves the list of subjects displayed by the bot.
- [library/get_books.js](library/get_books.js) --  Retrieves the list of books for the selected subject. 
- [bot/LibraryBotDynamic.json](bot/LibraryBotDynamic.json) --  An exported bot that uses the [library/get_subjects.js](library/get_subjects.js) and [library/get_books.js](library/get_books.js) custom components.
- [bot/Flows.yaml](bot/Flows.yaml) -- The Library Bot's Flow.
- [manifest.json](manifest.json) and [deploy.json](deploy.json) -- Oracle Application Container Cloud Metadata files.


## How To Start the Server ##

1. Run npm install on your module.
1. Run node index.js to start the server.
1. In the Bot Builder, create a new bot by importing the [bot/LibraryBotDynamic.json](bot/LibraryBotDynamic.json) file. Be sure to configure the custom component service connection parameters. The username/Password is MyTestUser/MyTestPassword.
