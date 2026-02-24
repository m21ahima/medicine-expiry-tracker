const MedicineTracker = artifacts.require("MedicineTracker");

module.exports = function (deployer) {
  deployer.deploy(MedicineTracker);
};