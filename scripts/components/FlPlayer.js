const extend = require('js-base/core/extend');
const FlPlayerDesign = require('library/FlPlayer');

const FlPlayer = extend(FlPlayerDesign)(
  function(_super, props, pageName) {
    _super(this, props || {});
    this.pageName = pageName;
  }
);

module && (module.exports = FlPlayer);
