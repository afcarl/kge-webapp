function getEnvApi() {
    return process.env.KGE_SERVER_API;
}

export const defaultConfig = {
    apiRoute: getEnvApi() != undefined ? getEnvApi() : 'http://kge.lab.oeg-upm.net/api',
    defaultLang: 'en',
};
