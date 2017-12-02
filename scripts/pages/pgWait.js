/* globals myID, myName, gameID */
const extend = require('js-base/core/extend');
const PgWaitDesign = require('ui/ui_pgWait');
const Router = require("sf-core/ui/router");
const service = require("../service/index");
const constants = require("../constants");

const PgWait = extend(PgWaitDesign)(
    function(_super) {
        _super(this);
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

    });

function onShow(superOnShow) {
    superOnShow();
    service.addMessageListener(onMessage);
    service.connect();
}

function onMessage(message) {
    switch (message.type) {
        case constants.COMMANDS.REGISTER_USER:
            myID = message.user.id;
            myName = message.user.name;
            service.send({
                type: constants.COMMANDS.UPDATE_USER_STATE,
                userID: myID,
                state: constants.USER.STATE.SEARCHING_FOR_OPPONENT
            });
            break;
        case constants.COMMANDS.START_GAME:
            gameID = message.gameID;
            Router.go("pgMainGame");
            service.removeMessageListener(onMessage);
            break;
    }
}

function onLoad(superOnLoad) {
    superOnLoad();
}

module && (module.exports = PgWait);
