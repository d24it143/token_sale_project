const D24Token = artifacts.require("D24Token");
const D24TokenSale = artifacts.require("D24TokenSale");

module.exports = async function (callback) {
    try {
        const token = await D24Token.deployed();
        const tokenSale = await D24TokenSale.deployed();
        const accounts = await web3.eth.getAccounts();
        const admin = accounts[0];

        const adminBalance = await token.balanceOf(admin);
        const saleBalance = await token.balanceOf(tokenSale.address);
        const totalSupply = await token.totalSupply();

        console.log("Token Address:", token.address);
        console.log("Token Sale Address:", tokenSale.address);
        console.log("Admin Account (accounts[0]):", admin);
        console.log("------------------------------------------");
        console.log("Total Supply:  ", totalSupply.toString());
        console.log("Admin Balance: ", adminBalance.toString());
        console.log("Sale Contract Balance:", saleBalance.toString());
        console.log("------------------------------------------");

        if (adminBalance.toString() === "0" && saleBalance.toString() === "0") {
            console.log("CRITICAL: No tokens found in expected accounts.");
        } else {
            console.log("Tokens are distributed as shown above.");
        }

    } catch (err) {
        console.error(err);
    }
    callback();
}
