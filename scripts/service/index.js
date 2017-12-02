const constants = require("../constants");
const WebSocket = require("sf-core/net/websocket");
var ws;
var listeners = [];

module.exports = {
    init: function init(url) {
        ws = new WebSocket({ url: url });
    },
    connect: function connect() {
        this.send({ type: constants.COMMANDS.REGISTER_USER });
        ws.onMessage = (e) => {
            listeners.forEach(f => {
                var message = e.string;
                message = JSON.parse(message);
                f(message);
            });
        };
    },
    send: function send(message) {
        message = typeof message === "string" ? message : JSON.stringify(message);
        ws.send({
            data: message
        });
    },
    addMessageListener: function addMessageListener(f) {
        listeners.push(f);
    },
    removeMessageListener: function removeMessageListener(f) {
        var indexOfListener = listeners.indexOf(f);
        if (indexOfListener > -1) {
            listeners.splice(indexOfListener, 1);
        }
    }
};
