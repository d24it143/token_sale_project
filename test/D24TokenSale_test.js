var D24Token = artifacts.require("./D24Token");
var D24TokenSale = artifacts.require("./D24TokenSale");

contract('D24TokenSale', function (accounts) {
    var tokenInstance;
    var tokenSaleInstance;
    var admin = accounts[0];
    var buyer = accounts[1];
    var tokenPrice = 1000000000000000; // 0.001 ETH in wei
    var tokensAvailable = 750000;
    var numberOfTokens;

    it('initializes the contracts with the correct values', async function () {
        tokenInstance = await D24Token.deployed();
        tokenSaleInstance = await D24TokenSale.deployed();

        const address = tokenSaleInstance.address;
        assert.notEqual(address, 0x0, 'has contract address');

        const tokenAddress = await tokenSaleInstance.tokenContract();
        assert.equal(tokenAddress, tokenInstance.address, 'has correct token contract address');

        const price = await tokenSaleInstance.tokenPrice();
        assert.equal(price.toNumber(), tokenPrice, 'token price is correct');
    });

    it('facilitates token buying', async function () {
        numberOfTokens = 10;
        const value = numberOfTokens * tokenPrice;

        // Buy tokens
        const receipt = await tokenSaleInstance.buyTokens(numberOfTokens, { from: buyer, value: value });

        assert.equal(receipt.logs.length, 1, 'triggers one event');
        assert.equal(receipt.logs[0].event, 'Sell', 'should be the "Sell" event');
        assert.equal(receipt.logs[0].args._buyer, buyer, 'logs the account that purchased the tokens');
        assert.equal(receipt.logs[0].args._amount, numberOfTokens, 'logs the number of tokens purchased');

        const sold = await tokenSaleInstance.tokensSold();
        assert.equal(sold.toNumber(), numberOfTokens, 'increments the number of tokens sold');

        const buyerBalance = await tokenInstance.balanceOf(buyer);
        assert.equal(buyerBalance.toNumber(), numberOfTokens, 'buyer received tokens');
    });

    it('facilitates token selling', async function () {
        numberOfTokens = 5;
        const sellValue = numberOfTokens * tokenPrice;

        // Approve sale contract to spend tokens
        await tokenInstance.approve(tokenSaleInstance.address, numberOfTokens, { from: buyer });

        // Sell tokens
        const receipt = await tokenSaleInstance.sellTokens(numberOfTokens, { from: buyer });

        assert.equal(receipt.logs.length, 1, 'triggers one event');
        assert.equal(receipt.logs[0].event, 'Buy', 'should be the "Buy" event');
        assert.equal(receipt.logs[0].args._seller, buyer, 'logs the account that sold the tokens');
        assert.equal(receipt.logs[0].args._amount, numberOfTokens, 'logs the number of tokens sold');

        const sold = await tokenSaleInstance.tokensSold();
        assert.equal(sold.toNumber(), 5, 'decrements the number of tokens sold');

        const buyerBalance = await tokenInstance.balanceOf(buyer);
        assert.equal(buyerBalance.toNumber(), 5, 'buyer tokens decreased');
    });
});
