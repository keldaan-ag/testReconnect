const Arena = require("@colyseus/arena").default;
const { monitor } = require("@colyseus/monitor");
const path = require('path');

/**
 * Import your Room files
 */
const { MyRoom } = require("./rooms/MyRoom");

module.exports = Arena({
    getId: () => "Your Colyseus App",

    initializeGameServer: (gameServer) => {
        /**
         * Define your room handlers:
         */
        gameServer.define('my_room', MyRoom);
    },

    initializeExpress: (app) => {
        /**
         * Bind your custom express routes here:
         */
         app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, 'public', 'index.html'));
          });
          

        /**
         * Bind @colyseus/monitor
         * It is recommended to protect this route with a password.
         * Read more: https://docs.colyseus.io/tools/monitor/
         */
        app.use("/colyseus", monitor());
    },

    beforeListen: () => {
        /**
         * Before before gameServer.listen() is called.
         */
    }

});
