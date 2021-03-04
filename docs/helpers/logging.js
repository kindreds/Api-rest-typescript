"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTime = () => {
    return new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' });
};
const info = (namespace, msg, obj) => {
    if (obj) {
        console.info(`[${getTime()}] [INFO]\n [${namespace}] ${msg}`, obj);
    }
    else {
        console.info(`[${getTime()}] [INFO] [${namespace}] ${msg}`);
    }
};
const warn = (namespace, msg, obj) => {
    if (obj) {
        console.warn(`[${getTime()}] [WARN] [${namespace}] ${msg}`, obj);
    }
    else {
        console.warn(`[${getTime()}] [WARN] [${namespace}] ${msg}`);
    }
};
const error = (namespace, msg, obj) => {
    if (obj) {
        console.error(`[${getTime()}] [ERROR] [${namespace}] ${msg}`, obj);
    }
    else {
        console.error(`[${getTime()}] [ERROR] [${namespace}] ${msg}`);
    }
};
const debug = (namespace, msg, obj) => {
    if (obj) {
        console.debug(`[${getTime()}] [DEBUG] [${namespace}] ${msg}`, obj);
    }
    else {
        console.debug(`[${getTime()}] [DEBUG] [${namespace}] ${msg}`);
    }
};
exports.default = {
    info,
    warn,
    error,
    debug,
};
