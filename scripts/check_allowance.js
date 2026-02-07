const D24Token = artifacts.require("D24Token");
const D24TokenSale = artifacts.require("D24TokenSale");

module.exports = async function (callback) {
    try {
        const token = await D24Token.deployed();
        const sale = await D24TokenSale.deployed();
        const accounts = await web3.eth.getAccounts();

        // Assuming the "Different Account" is the Miner (Account 1) or target (Account 2)
        const target = accounts[1];

        console.log("--- Allowance Check ---");
        console.log("Target Address: ", target);
        console.log("Sale Contract:  ", sale.address);

        const allowance = await token.allowance(target, sale.address);
        console.log("Allowance:      ", allowance.toString());

        const balance = await token.balanceOf(target);
        console.log("Balance:        ", balance.toString());
        console.log("-----------------------");

    } catch (error) {
        console.error("Error:", error);
    }
    callback();
};
