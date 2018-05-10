module.exports = function animateComponent(component, animationInterval, done) {
    var interval = setInterval(() => {
        if (component.alpha > 1) {
            clearInterval(interval);
            done && done();
        }
        else {
            component.alpha += 0.1;
        }
    }, animationInterval);
};
