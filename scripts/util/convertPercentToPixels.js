module.exports = (actualPixels, percent) => {
    if (typeof actualPixels === undefined) {
        console.log("convertPercentToPixels failed, actualPixels must be provided");
        return 0;
    }
    return (actualPixels * percent) / 100;
};
