const D24Token = artifacts.require("D24Token");

module.exports = async function (callback) {
    try {
        const token = await D24Token.deployed();
        const accounts = await web3.eth.getAccounts();
        const owner = accounts[0];

        const balance = await token.balanceOf(owner);
        const symbol = await token.symbol();

        console.log("--- Owner Details ---");
        console.log("Owner Address:", owner);
        console.log(`Balance: ${balance.toString()} ${symbol}`);
        console.log("---------------------");

    } catch (error) {
        console.error("Error fetching details:", error);
    }
    callback();
};
