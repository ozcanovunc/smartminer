/* globals myID, myName, gameID */
const extend = require('js-base/core/extend');
const PgMainGameDesign = require('ui/ui_pgMainGame');

const PgMainGame = extend(PgMainGameDesign)(
    function(_super) {
        _super(this);
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    });

function onShow(superOnShow) {
    superOnShow();
    console.log("myID " + myID);
    console.log("myName " + myName);
    console.log("gameID " + gameID);
}

function onLoad(superOnLoad) {
    superOnLoad();
}

module && (module.exports = PgMainGame);
