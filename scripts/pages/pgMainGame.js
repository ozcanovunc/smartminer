/* globals game */
const extend = require('js-base/core/extend');
const PgMainGameDesign = require('ui/ui_pgMainGame');
const FlPlayer = require("../components/FlPlayer");
const FlMine = require("../components/FlMine");
const convertPercentToPixels = require("../util/convertPercentToPixels");
const service = require("../service/index");
const constants = require("../constants");
var width = 100;
var height = 50;
var mineWidth = 30;
var mineHeight = 30;
var page;
var playerMe;
var playerOpponent;
var minesOnScreen = {};

const PgMainGame = extend(PgMainGameDesign)(
    function(_super) {
        _super(this);
        page = this;
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.btnUp.onPress = () => {
            service.send({
                type: constants.COMMANDS.UPDATE_USER_POSITION,
                userID: game.me.id,
                gameID: game.id,
                top: game.me.position.top - 10,
                left: game.me.position.left
            });
        };
        this.btnDown.onPress = () => {
            service.send({
                type: constants.COMMANDS.UPDATE_USER_POSITION,
                userID: game.me.id,
                gameID: game.id,
                top: game.me.position.top + 10,
                left: game.me.position.left
            });
        };
        this.btnRight.onPress = () => {
            service.send({
                type: constants.COMMANDS.UPDATE_USER_POSITION,
                userID: game.me.id,
                gameID: game.id,
                top: game.me.position.top,
                left: game.me.position.left + 10
            });
        };
        this.btnLeft.onPress = () => {
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
    service.send({ type: constants.COMMANDS.UPDATE_MINES, gameID: game.id });

    /********** ME **********/
    playerMe = new FlPlayer();
    playerMe.lblName.text = "You";
    playerMe.lblIcon.text = "👷️";
    page.flRoot.addChild(playerMe, game.me.id, ".flexLayout .flAbsolute", function(style) {
        style.width = width;
        style.height = height;
        style.backgroundColor = "rgba(0,0,0,0)";
        style.top = convertPercentToPixels(page.flRoot.height, game.me.position.top);
        style.left = convertPercentToPixels(page.flRoot.width, game.me.position.left);
        return style;
    });
    page.lblMyScore.text = 0;
    page.lblMyName.text = "You";

    /********** OPPONENT **********/
    playerOpponent = new FlPlayer();
    playerOpponent.lblName.text = game.opponent.name;
    playerOpponent.lblIcon.text = "👷️";
    page.flRoot.addChild(playerOpponent, game.opponent.id, ".flexLayout .flAbsolute", function(style) {
        style.width = width;
        style.height = height;
        style.backgroundColor = "rgba(0,0,0,0)";
        style.top = convertPercentToPixels(page.flRoot.height, game.opponent.position.top);
        style.left = convertPercentToPixels(page.flRoot.width, game.opponent.position.left);
        return style;
    });
    page.lblOpponentScore.text = 0;
    page.lblOpponentName.text = game.opponent.name;
}

function onLoad(superOnLoad) {
    superOnLoad();
}

function onMessage(message) {
    switch (message.type) {
        case constants.COMMANDS.UPDATE_USER_POSITION:
            var userID = message.userID;
            var position = message.position;
            var top = convertPercentToPixels(page.flRoot.height, position.top);
            var left = convertPercentToPixels(page.flRoot.width, position.left);
            var component;

            if (userID === game.me.id) {
                component = playerMe;
                game.me.position = position;
            }
            else {
                component = playerOpponent;
                game.opponent.position = position;
            }

            component.dispatch({
                type: "updateUserStyle",
                userStyle: {
                    top: top,
                    left: left
                }
            });
            component.applyLayout();
            break;
        case constants.COMMANDS.UPDATE_USER_SCORE:
            var userID = message.userID;
            var score = message.score;
            if (userID === game.me.id) {
                page.lblMyScore.text = score;
            }
            else {
                page.lblOpponentScore.text = score;
            }
            break;
        case constants.COMMANDS.UPDATE_MINES:
            var mines = message.mines;
            drawMines(mines);
            break;
    }
}

function drawMines(mines) {
    for (var mineID in minesOnScreen) {
        // Mine on screen should be removed
        if (!mines[mineID]) {
            page.flRoot.removeChild(minesOnScreen[mineID]);
            page.layout.applyLayout();
            delete minesOnScreen[mineID];
        }
    }
    for (var mineID in mines) {
        if (!minesOnScreen[mineID]) {
            var mine = new FlMine();
            var minePosition = mines[mineID].position;
            page.flRoot.addChild(mine, mineID, ".flexLayout .flAbsolute", function(style) {
                style.width = mineWidth;
                style.height = mineHeight;
                style.backgroundColor = "rgba(0,0,0,0)";
                style.top = convertPercentToPixels(page.flRoot.height, minePosition.top);
                style.left = convertPercentToPixels(page.flRoot.width, minePosition.left);
                return style;
            });
            minesOnScreen[mineID] = mine;
        }
    }
}

module && (module.exports = PgMainGame);
