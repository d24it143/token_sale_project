const D24Token = artifacts.require("D24Token");
const D24TokenSale = artifacts.require("D24TokenSale");

module.exports = async function (callback) {
    try {
        const token = await D24Token.deployed();
        const sale = await D24TokenSale.deployed();
        const accounts = await web3.eth.getAccounts();
        const target = accounts[1]; // Miner

        const amount = 1000000; // Large approval

        console.log(`Approving ${sale.address} for ${target}...`);

        await token.approve(sale.address, amount, { from: target });

        console.log("Approval successful!");

        // Check again
        const allowance = await token.allowance(target, sale.address);
        console.log("New Allowance:", allowance.toString());

    } catch (error) {
        console.error("Error:", error);
    }
    callback();
};
