var D24Token = artifacts.require("./D24Token");
var D24TokenSale = artifacts.require("./D24TokenSale");

module.exports = function (deployer, network, accounts) {
  deployer.deploy(D24Token, 1000000).then(function () {
    // Token price is 0.001 Ether
    var tokenPrice = 1000000000000000;
    return deployer.deploy(D24TokenSale, D24Token.address, tokenPrice);
  }).then(function () {
    var tokensAvailable = 750000;
    return D24Token.deployed().then(function (instance) {
      return instance.transfer(D24TokenSale.address, tokensAvailable, { from: accounts[0] });
    });
  });
};
