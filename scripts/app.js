/* globals lang */
require("i18n/i18n.js"); // Generates global lang object

const Application = require("sf-core/application");
Application.onUnhandledError = function(e) {
    alert({
        title: lang.applicationError,
        message: e.message + "\n\n*" + e.sourceURL + "\n*" + e.line + "\n*" + e.stack
    });
};

const Router = require("sf-core/ui/router");
const config = require("./settings.json").config;
const themeConfig = config.theme;
const createThemeContextBound = require("@smartface/contx/lib/styling/ThemeContext").createThemeContextBound;
const themeSources = [];

themeConfig.themes.forEach(function(name) {
    themeSources.push({
        name: name,
        rawStyles: require("./themes/" + name),
        isDefault: themeConfig.currentTheme === name
    });
});

Application.theme = createThemeContextBound(themeSources);

Router.add("pgLogin", require("./pages/pgLogin"));
Router.add("pgBeforeGame", require("./pages/pgBeforeGame"));
Router.add("pgWait", require("./pages/pgWait"));
Router.go("pgLogin");
