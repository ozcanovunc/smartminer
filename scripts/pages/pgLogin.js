const extend = require('js-base/core/extend');
const PgLoginDesign = require('ui/ui_pgLogin');
const Router = require("sf-core/ui/router");
const animateComponent = require("../util/animateComponent");
const fingerprint = require("sf-extension-utils").fingerprint;

const PgLogin = extend(PgLoginDesign)(
    function(_super) {
        _super(this);
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.btnStart.onPress = () => {
            fingerprint.loginWithFingerprint();
        };
    });

function onShow(superOnShow) {
    superOnShow();
    animateComponent(this.lblMain, 150, () => {
        animateComponent(this.btnStart, 50);
    });

    fingerprint.init({
        userNameTextBox: this.taUsername,
        passwordTextBox: this.taPassword,
        callback: function(err, fingerprintResult) {
            if (!err) {
                fingerprintResult && fingerprintResult.success();
            }
            Router.go("pgBeforeGame");
        }
    });
}

function onLoad(superOnLoad) {
    superOnLoad();
}

module && (module.exports = PgLogin);
