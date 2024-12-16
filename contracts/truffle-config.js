const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",    // Localhost
      port: 7545,           // Ganache default port
      network_id: "*",      // Match any network id
      gas: 6721975,         // Gas limit for deployment
      gasPrice: 20000000000, // Gas price
    },
  },

  compilers: {
    solc: {
      version: "0.8.0", // Match the version you are using
    },
  },
};
