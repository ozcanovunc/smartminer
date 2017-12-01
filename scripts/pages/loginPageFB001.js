const extend = require('js-base/core/extend');
const LoginPageFB001Design = require('ui/ui_loginPageFB001');
const Facebook = require("sf-plugin-facebook");
Facebook.applicationId = "228765320996089";
Facebook.applicationName = "smartminer";

var readPermissions = ['user_posts', 'public_profile', 'user_friends', 'user_photos'];

const LoginPageFB001 = extend(LoginPageFB001Design)(
  // Constructor
  function(_super) {
    // Initalizes super class for this page scope
    _super(this);
    // overrides super.onShow method
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    // overrides super.onLoad method
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    this.fbLoginButton.onPress = function() {
      Facebook.loginWithReadPermissions({
        page: this,
        permissions: readPermissions,
        onSuccess: function(data) {
          alert(JSON.stringify(data));
        },
        onFailure: function(e) {
          alert(e);
        },
        onCancel: function() {
          alert("canceled");
        }
      });
    };
  });

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow) {
  superOnShow();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
  superOnLoad();
}

module && (module.exports = LoginPageFB001);
