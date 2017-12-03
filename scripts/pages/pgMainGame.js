/* globals game */
const extend = require('js-base/core/extend');
const PgMainGameDesign = require('ui/ui_pgMainGame');
const FlPlayer = require("../components/FlPlayer");
const convertPercentToPixels = require("../util/convertPercentToPixels");
const service = require("../service/index");
const constants = require("../constants");
var width = 100;
var height = 50;
var page;
var playerMe;
var playerOpponent;

const PgMainGame = extend(PgMainGameDesign)(
    function(_super) {
        _super(this);
        page = this;
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.btnUp.onPress = () => {
            console.log("btnUp");
            service.send({
                type: constants.COMMANDS.UPDATE_USER_POSITION,
                userID: game.me.id,
                gameID: game.id,
                top: game.me.position.top - 10,
                left: game.me.position.left
            });
        };
        this.btnDown.onPress = () => {
            console.log("btnDown");
            service.send({
                type: constants.COMMANDS.UPDATE_USER_POSITION,
                userID: game.me.id,
                gameID: game.id,
                top: game.me.position.top + 10,
                left: game.me.position.left
            });
        };
        this.btnRight.onPress = () => {
            console.log("btnRight");
            service.send({
                type: constants.COMMANDS.UPDATE_USER_POSITION,
                userID: game.me.id,
                gameID: game.id,
                top: game.me.position.top,
                left: game.me.position.left + 10
            });
        };
        this.btnLeft.onPress = () => {
            console.log("btnLeft");
            service.send({
                type: constants.COMMANDS.UPDATE_USER_POSITION,
                userID: game.me.id,
                gameID: game.id,
                top: game.me.position.top,
                left: game.me.position.left - 10
            });
        };
    });

function onShow(superOnShow) {
    superOnShow();
    service.addMessageListener(onMessage);

    /********** ME **********/
    playerMe = new FlPlayer();
    playerMe.lblName.text = "You";
    playerMe.lblIcon.text = "👷️";
    this.flRoot.addChild(playerMe, game.me.id, ".flexLayout .flAbsolute", function(style) {
        style.width = 100;
        style.width = width;
        style.height = height;
        style.backgroundColor = "rgba(0,0,0,0)";
        style.top = convertPercentToPixels(page.flRoot.height, game.me.position.top) - height / 2;
        style.left = convertPercentToPixels(page.flRoot.width, game.me.position.left) - width / 2;
        return style;
    });

    /********** OPPONENT **********/
    playerOpponent = new FlPlayer();
    playerOpponent.lblName.text = game.opponent.name;
    playerOpponent.lblIcon.text = "👷️";
    this.flRoot.addChild(playerOpponent, game.opponent.id, ".flexLayout .flAbsolute", function(style) {
        style.width = 100;
        style.width = width;
        style.height = height;
        style.backgroundColor = "rgba(0,0,0,0)";
        style.top = convertPercentToPixels(page.flRoot.height, game.opponent.position.top) - height / 2;
        style.left = convertPercentToPixels(page.flRoot.width, game.opponent.position.left) - width / 2;
        return style;
    });
}

function onLoad(superOnLoad) {
    superOnLoad();
}

function onMessage(message) {
    switch (message.type) {
        case constants.COMMANDS.UPDATE_USER_POSITION:
            var userID = message.userID;
            var position = message.position;
            var top = convertPercentToPixels(page.flRoot.height, position.top) - height / 2;
            var left = convertPercentToPixels(page.flRoot.width, position.left) - width / 2;
            var component;

            if (userID === game.me.id) {
                component = playerMe;
                game.me.position = position;
            }
            else {
                component = playerOpponent;
                game.opponent.position = position;
            }

            console.log(userID === game.me.id ? "me" : "bok");
            console.log("position " + top + " " + left);

            component.dispatch({
                type: "updateUserStyle",
                userStyle: {
                    top: top,
                    left: left
                }
            });
            component.applyLayout();
            break;
    }
}

module && (module.exports = PgMainGame);
