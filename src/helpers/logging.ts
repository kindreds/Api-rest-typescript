const getTime = (): string => {
  return new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' });
};

const info = (namespace: string, msg: string, obj?: object) => {
  if (obj) {
    console.info(`[${getTime()}] [INFO]\n [${namespace}] ${msg}`, obj);
  } else {
    console.info(`[${getTime()}] [INFO] [${namespace}] ${msg}`);
  }
};

const warn = (namespace: string, msg: string, obj?: object) => {
  if (obj) {
    console.warn(`[${getTime()}] [WARN] [${namespace}] ${msg}`, obj);
  } else {
    console.warn(`[${getTime()}] [WARN] [${namespace}] ${msg}`);
  }
};

const error = (namespace: string, msg: string, obj?: object) => {
  if (obj) {
    console.error(`[${getTime()}] [ERROR] [${namespace}] ${msg}`, obj);
  } else {
    console.error(`[${getTime()}] [ERROR] [${namespace}] ${msg}`);
  }
};

const debug = (namespace: string, msg: string, obj?: object) => {
  if (obj) {
    console.debug(`[${getTime()}] [DEBUG] [${namespace}] ${msg}`, obj);
  } else {
    console.debug(`[${getTime()}] [DEBUG] [${namespace}] ${msg}`);
  }
};

export default {
  info,
  warn,
  error,
  debug,
};
