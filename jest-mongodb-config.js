/* eslint-disable no-undef */
module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: '6.0.8',
      skipMD5: true,
    },
    instance: {
      dbName: 'jest',
    },
    autoStart: false,
  },
};
