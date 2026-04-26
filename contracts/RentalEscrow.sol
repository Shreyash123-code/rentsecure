// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RentalEscrow {
    enum LeaseStatus { INACTIVE, ACTIVE, DISPUTED, COMPLETED }

    struct Lease {
        address payable tenant;
        address payable landlord;
        uint256 depositAmount;
        uint256 rentPerMonth;
        uint256 startDate;
        uint256 lastRentPaid;
        LeaseStatus status;
        bool tenantConfirmedMoveOut;
        bool landlordConfirmedDepositReturn;
    }

    mapping(bytes32 => Lease) public leases;
    mapping(address => uint256) public reputationScores;

    event LeaseInitiated(bytes32 indexed leaseId, address tenant, address landlord, uint256 deposit);
    event RentPaid(bytes32 indexed leaseId, uint256 amount, uint256 timestamp);
    event DepositRefunded(bytes32 indexed leaseId, uint256 amount);

    function initiateLease(address payable _landlord, bytes32 _leaseId) external payable {
        require(msg.value > 0, "Deposit required");
        require(leases[_leaseId].tenant == address(0), "Lease already exists");

        leases[_leaseId] = Lease({
            tenant: payable(msg.sender),
            landlord: _landlord,
            depositAmount: msg.value,
            rentPerMonth: 0, // Set after off-chain agreement verification
            startDate: block.timestamp,
            lastRentPaid: block.timestamp,
            status: LeaseStatus.ACTIVE,
            tenantConfirmedMoveOut: false,
            landlordConfirmedDepositReturn: false
        });

        emit LeaseInitiated(_leaseId, msg.sender, _landlord, msg.value);
    }

    function payRent(bytes32 _leaseId) external payable {
        Lease storage lease = leases[_leaseId];
        require(msg.sender == lease.tenant, "Only tenant can pay rent");
        require(lease.status == LeaseStatus.ACTIVE, "Lease not active");
        
        lease.landlord.transfer(msg.value);
        lease.lastRentPaid = block.timestamp;
        
        // Boost reputation slightly for on-time payment
        reputationScores[msg.sender] += 10;
        
        emit RentPaid(_leaseId, msg.value, block.timestamp);
    }

    function requestRefund(bytes32 _leaseId) external {
        Lease storage lease = leases[_leaseId];
        require(msg.sender == lease.tenant, "Only tenant can request refund");
        lease.tenantConfirmedMoveOut = true;

        if (lease.landlordConfirmedDepositReturn) {
            _finalizeRefund(_leaseId);
        }
    }

    function approveRefund(bytes32 _leaseId) external {
        Lease storage lease = leases[_leaseId];
        require(msg.sender == lease.landlord, "Only landlord can approve refund");
        lease.landlordConfirmedDepositReturn = true;

        if (lease.tenantConfirmedMoveOut) {
            _finalizeRefund(_leaseId);
        }
    }

    function _finalizeRefund(bytes32 _leaseId) internal {
        Lease storage lease = leases[_leaseId];
        uint256 amount = lease.depositAmount;
        lease.depositAmount = 0;
        lease.status = LeaseStatus.COMPLETED;
        lease.tenant.transfer(amount);
        
        emit DepositRefunded(_leaseId, amount);
    }
}
