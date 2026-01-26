var DappToken = artifacts.require("./DappToken");
var DappTokenSale = artifacts.require("./DappTokenSale");

module.exports = function (deployer, network, accounts) {
  deployer.deploy(DappToken, 1000000).then(function () {
    // Token price is 0.001 Ether
    var tokenPrice = 1000000000000000;
    return deployer.deploy(DappTokenSale, DappToken.address, tokenPrice);
  }).then(function () {
    var tokensAvailable = 750000;
    return DappToken.deployed().then(function (instance) {
      return instance.transfer(DappTokenSale.address, tokensAvailable, { from: accounts[0] });
    });
  });
};
