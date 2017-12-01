const extend = require('js-base/core/extend');
const PgLoginDesign = require('ui/ui_pgLogin');
const Router = require("sf-core/ui/router");
const animateComponent = require("../util/animateComponent");

const PgLogin = extend(PgLoginDesign)(
    // Constructor
    function(_super) {
        // Initalizes super class for this page scope
        _super(this);
        // overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.btnStart.onPress = () => {
            Router.go("pgBeforeGame");
        };
    });

function onShow(superOnShow) {
    superOnShow();
    animateComponent(this.lblMain, 150, () => {
        animateComponent(this.btnStart, 50);
    });
}

function onLoad(superOnLoad) {
    superOnLoad();
}

module && (module.exports = PgLogin);
