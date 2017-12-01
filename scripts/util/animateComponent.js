const Timer = require("sf-core/timer");

module.exports = function(component, animationInterval, done) {
    component.alpha = 0;
    var timer = Timer.setInterval({
        task: () => {
            if (component.alpha > 1) {
                Timer.clearTimer(timer);
                done && done();
            }
            else {
                component.alpha += 0.1;
            }
        },
        delay: animationInterval
    });
};
