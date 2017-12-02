const extend = require('js-base/core/extend');
const PgWaitDesign = require('ui/ui_pgWait');

const PgWait = extend(PgWaitDesign)(
  function(_super) {
    _super(this);
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

  });

function onShow(superOnShow) {
  superOnShow();
}

function onLoad(superOnLoad) {
  superOnLoad();
}

module && (module.exports = PgWait);
