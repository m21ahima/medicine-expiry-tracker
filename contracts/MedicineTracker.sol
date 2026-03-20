// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicineTracker {

    struct Medicine {
        uint id;
        string name;
        string expiryDate;
        address addedBy;
        uint timestamp;
    }

    uint public medicineCount = 0;
    uint public minimumFee = 0.001 ether;
    mapping(uint => Medicine) public medicines;

    event MedicineAdded(
        uint id,
        string name,
        string expiryDate,
        address addedBy,
        uint timestamp
    );

    function addMedicine(string memory _name, string memory _expiryDate) public payable {
        require(msg.value >= minimumFee, "Minimum 0.001 ETH required");
        medicineCount++;
        medicines[medicineCount] = Medicine(
            medicineCount,
            _name,
            _expiryDate,
            msg.sender,
            block.timestamp
        );
        emit MedicineAdded(medicineCount, _name, _expiryDate, msg.sender, block.timestamp);
    }

    function getMedicine(uint _id) public view returns (
        uint, string memory, string memory, address, uint
    ) {
        Medicine memory m = medicines[_id];
        return (m.id, m.name, m.expiryDate, m.addedBy, m.timestamp);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}