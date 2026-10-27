// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "./Token.sol";

/// @title AutoGrow - auto-compounding vault. Yield accrues at a fixed APR from a funded reserve and is
/// compounded into the share price whenever anyone deposits, withdraws or calls compound().
contract AutoGrow {
    IERC20 public immutable token;
    uint256 public immutable aprBps;
    uint256 public totalAssets;
    uint256 public totalShares;
    uint256 public lastCompound;
    mapping(address => uint256) public shares;

    event Deposited(address indexed user, uint256 amount, uint256 shares);
    event Withdrawn(address indexed user, uint256 amount, uint256 shares);
    event Compounded(uint256 yieldAdded, uint256 totalAssets);
    event Funded(address indexed from, uint256 amount);

    constructor(address _token, uint256 _aprBps) {
        token = IERC20(_token);
        aprBps = _aprBps;
        lastCompound = block.timestamp;
    }

    function reserve() public view returns (uint256) { return token.balanceOf(address(this)) - totalAssets; }

    function pendingYield() public view returns (uint256) {
        if (totalAssets == 0) return 0;
        uint256 y = (totalAssets * aprBps * (block.timestamp - lastCompound)) / (365 days * 10000);
        uint256 r = reserve();
        return y > r ? r : y;
    }
    function sharePrice() public view returns (uint256) {
        return totalShares == 0 ? 1e18 : ((totalAssets + pendingYield()) * 1e18) / totalShares;
    }
    function assetsOf(address u) external view returns (uint256) {
        return totalShares == 0 ? 0 : (shares[u] * (totalAssets + pendingYield())) / totalShares;
    }

    function compound() public {
        uint256 y = pendingYield();
        totalAssets += y;
        lastCompound = block.timestamp;
        emit Compounded(y, totalAssets);
    }

    function deposit(uint256 amount) external {
        require(amount > 0, "zero");
        compound();
        uint256 s = totalShares == 0 ? amount : (amount * totalShares) / totalAssets;
        require(s > 0, "no shares");
        totalAssets += amount; totalShares += s; shares[msg.sender] += s;
        require(token.transferFrom(msg.sender, address(this), amount), "transfer");
        emit Deposited(msg.sender, amount, s);
    }
    function withdraw(uint256 s) external {
        require(s > 0 && shares[msg.sender] >= s, "shares");
        compound();
        uint256 amount = (s * totalAssets) / totalShares;
        shares[msg.sender] -= s; totalShares -= s; totalAssets -= amount;
        require(token.transfer(msg.sender, amount), "transfer");
        emit Withdrawn(msg.sender, amount, s);
    }
    function fund(uint256 amount) external {
        require(token.transferFrom(msg.sender, address(this), amount), "transfer");
        emit Funded(msg.sender, amount);
    }
}
