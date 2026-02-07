const D24Token = artifacts.require("D24Token");

module.exports = async function (callback) {
    try {
        const token = await D24Token.deployed();
        const accounts = await web3.eth.getAccounts();
        const admin = accounts[0];
        const miner = accounts[1]; // mining to the second account
        const amount = 50; // Mining 50 tokens

        console.log(`Mining ${amount} tokens to ${miner}...`);

        const receipt = await token.transfer(miner, amount, { from: admin });

        console.log("Mining complete!");
        console.log("Transaction Hash:", receipt.tx);
        console.log("Miner Address:", miner);

        // verify balance
        const balance = await token.balanceOf(miner);
        console.log("Miner Balance:", balance.toNumber());

    } catch (error) {
        console.error("Mining failed:", error);
    }
    callback();
};
