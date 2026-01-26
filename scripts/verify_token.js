const DappToken = artifacts.require("DappToken");

module.exports = async function (callback) {
    try {
        const token = await DappToken.deployed();
        const name = await token.name();
        const symbol = await token.symbol();
        const supply = await token.totalSupply();

        console.log("--- Token Verification ---");
        console.log("Name:   ", name);
        console.log("Symbol: ", symbol);
        console.log("Supply: ", supply.toNumber());
        console.log("Address:", token.address);
        console.log("--------------------------");

        if (name === "D24IT143") {
            console.log("CONFIRMATION: Token 'D24IT143' is successfully created!");
        } else {
            console.log("ERROR: Token name mismatch!");
        }
    } catch (error) {
        console.error("Verification failed:", error);
    }
    callback();
}
