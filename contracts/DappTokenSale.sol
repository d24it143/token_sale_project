pragma solidity ^0.5.11;

import "./DappToken.sol";

contract DappTokenSale {
    address payable public admin;
    DappToken public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokensSold;

    event Sell(address _buyer, uint256 _amount);

    constructor(DappToken _tokenContract, uint256 _tokenPrice) public {
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
    }

    // multiply
    function multiply(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x);
    }

    function buyTokens(uint256 _numberOfTokens) public payable {
        // Require that value is equal to tokens
        require(msg.value == multiply(_numberOfTokens, tokenPrice));
        // Require that the contract has enough tokens
        require(tokenContract.balanceOf(address(this)) >= _numberOfTokens);
        // Require that a transfer is successful
        require(tokenContract.transfer(msg.sender, _numberOfTokens));

        // Keep track of tokensSold
        tokensSold += _numberOfTokens;

        // Trigger Sell Event
        emit Sell(msg.sender, _numberOfTokens);
    }

    function endSale() public {
        // Require admin
        require(msg.sender == admin);
        // Transfer remaining dapp tokens to admin
        require(tokenContract.transfer(admin, tokenContract.balanceOf(address(this))));

        // Destroy contract - selfdestruct was deprecated but commonly used in older solidity.
        // For 0.5.11 it is valid. 
        // Just transferring balance to admin
        admin.transfer(address(this).balance);
    }
}
