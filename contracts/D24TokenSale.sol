// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import "./D24Token.sol";

contract D24TokenSale {
    address payable admin;
    D24Token public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokensSold;

    event Sell(address _buyer, uint256 _amount);
    event Buy(address _seller, uint256 _amount);

    constructor(D24Token _tokenContract, uint256 _tokenPrice) public {
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
    }

    function multiply(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x);
    }

    // Buy tokens
    function buyTokens(uint256 _numberOfTokens) public payable {
        require(msg.value == multiply(_numberOfTokens, tokenPrice));
        require(tokenContract.balanceOf(address(this)) >= _numberOfTokens);
        require(tokenContract.transfer(msg.sender, _numberOfTokens));

        tokensSold += _numberOfTokens;

        emit Sell(msg.sender, _numberOfTokens);
    }

    // Sell tokens (User sends tokens back to contract, receives ETH)
    function sellTokens(uint256 _numberOfTokens) public {
        require(tokenContract.balanceOf(msg.sender) >= _numberOfTokens);
        uint256 ethAmount = multiply(_numberOfTokens, tokenPrice);
        require(address(this).balance >= ethAmount);

        require(tokenContract.transferFrom(msg.sender, address(this), _numberOfTokens));
        
        msg.sender.transfer(ethAmount);

        tokensSold -= _numberOfTokens;
        
        emit Buy(msg.sender, _numberOfTokens);
    }

    function endSale() public {
        require(msg.sender == admin);
        require(tokenContract.transfer(admin, tokenContract.balanceOf(address(this))));

        // Transfer all ETH remaining in the contract to admin
        admin.transfer(address(this).balance);
    }
}
