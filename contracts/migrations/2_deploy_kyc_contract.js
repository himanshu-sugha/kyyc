// migrations/2_deploy_kyc_contract.js
const KYCContract = artifacts.require("KYCContract");

module.exports = function (deployer) {
  deployer.deploy(KYCContract);
};
