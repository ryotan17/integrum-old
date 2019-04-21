const path = require('path');
const useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');

const env = process.env.IONIC_ENV;

useDefaultConfig[env].resolve.alias = {
    "@app": path.resolve('./src/app/'),
    "@consts": path.resolve('./src/consts/')
};

module.exports = function () {
    return useDefaultConfig;
};

