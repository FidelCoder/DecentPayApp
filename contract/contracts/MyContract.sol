// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
}

contract MyContract {
    address public admin;
    address public tokenAddress;
    address[] public bonusedAddressesArray;
    uint256[] public amountSent;

    constructor(address _tokenAddress) {
        admin = msg.sender;
        tokenAddress = _tokenAddress;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    function setAdmin(address _newAdmin) external onlyAdmin {
        admin = _newAdmin;
    }

    function getArr() external view returns(address bonusedAddress, uint256 bonusAmount) {
        // Assume the first entry for demonstration
        if (bonusedAddressesArray.length > 0 && amountSent.length > 0) {
            bonusedAddress = bonusedAddressesArray[0];
            bonusAmount = amountSent[0];
        }
    }

    function getSmartContractTokenBalance() external view returns(uint256) {
        IERC20 token = IERC20(tokenAddress);
        return token.balanceOf(address(this));
    }

    function batchTransfer(address[] calldata employees, uint256[] calldata amounts) external onlyAdmin {
        require(employees.length == amounts.length, "Invalid input params");

        IERC20 token = IERC20(tokenAddress);

        for(uint i = 0; i < employees.length; i++) {
            address to = employees[i];
            uint256 tokens = amounts[i];

            require(token.balanceOf(address(this)) >= tokens, "Less token in the contract");
            token.transfer(to, tokens);

            bonusedAddressesArray.push(to);
            amountSent.push(tokens);
        }
    }

    function token() external view returns(address) {
        return tokenAddress;
    }
}
