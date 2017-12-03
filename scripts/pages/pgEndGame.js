/* globals game */
const extend = require('js-base/core/extend');
const PgEndGameDesign = require('ui/ui_pgEndGame');
const Router = require("sf-core/ui/router");
const service = require("../service/index");
const constants = require("../constants");

const PgEndGame = extend(PgEndGameDesign)(
    function(_super) {
        _super(this);
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.btnStart.onPress = () => {
            Router.go("pgWait");
        };
    });

function onShow(superOnShow) {
    superOnShow();
    var opponentScore = game.opponent.score;
    var myScore = game.me.score;
    var resultText = myScore > opponentScore ? "Y O U  W I N" : "Y O U  L O S E";
    resultText = myScore === opponentScore ? "T I E" : resultText;
    this.lblMain.text = resultText;

    // Deregister user & current game from server
    service.send({
        type: constants.COMMANDS.DEREGISTER_USER,
        userID: game.me.id
    });
}

function onLoad(superOnLoad) {
    superOnLoad();
}

module && (module.exports = PgEndGame);
