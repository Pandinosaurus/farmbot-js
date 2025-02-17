"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateConfig = exports.FIX_ATOB_FIRST = exports.CONFIG_DEFAULTS = void 0;
var util_1 = require("./util");
var ERR_TOKEN_PARSE = "Unable to parse token. Is it properly formatted?";
exports.CONFIG_DEFAULTS = {
    speed: 100,
    interim_flag_is_legacy_fbos: true
};
var ERR_MISSING_MQTT_USERNAME = "MISSING_MQTT_USERNAME";
exports.FIX_ATOB_FIRST = "NOTE TO NODEJS USERS:\n\nThis library requires an 'atob()' function.\nPlease fix this first.\nSOLUTION: https://github.com/FarmBot/farmbot-js/issues/33";
var parseToken = function (input) {
    try {
        return JSON.parse(atob(input.split(".")[1]));
    }
    catch (e) {
        console.warn(e);
        throw new Error(ERR_TOKEN_PARSE);
    }
};
var generateConfig = function (input) {
    if ((0, util_1.isNode)() && !global.atob) {
        throw new Error(exports.FIX_ATOB_FIRST);
    }
    var t = parseToken(input.token);
    return {
        speed: input.speed || exports.CONFIG_DEFAULTS.speed,
        token: input.token,
        secure: input.secure === false ? false : true,
        mqttServer: (0, util_1.isNode)() ? "mqtt://".concat(t.mqtt, ":1883") : t.mqtt_ws,
        mqttUsername: t.bot || ERR_MISSING_MQTT_USERNAME,
        LAST_PING_OUT: 0,
        LAST_PING_IN: 0,
        interim_flag_is_legacy_fbos: true,
    };
};
exports.generateConfig = generateConfig;
