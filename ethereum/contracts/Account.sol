pragma solidity ^0.4.17;

contract AccountFactory {
    address[] public deployedAccounts;

    function createAccount(uint minimum) public {
        address newAccount = new Account(minimum, msg.sender);
        deployedAccounts.push(newAccount);
    }

    function getdeployedAccounts() public view returns (address[]) {
        return deployedAccounts;
    }
}


contract Account {
    
    address public owner;
    uint public minimumContribution;
    mapping(address => uint) public contributers;
    uint public totalContribution; 
    

    modifier restricted() {
        require(msg.sender == owner);
        _;
    }

    function Account(uint minimum, address creator) public {
        owner = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);
        totalContribution += msg.value;
        contributers[msg.sender] = msg.value;
    }

    function getMyContribution() public view returns (uint, uint) {

        uint value = contributers[msg.sender];
        uint percentage = percent( value , totalContribution, 3 );
        
        return ( value,
                 percentage
               );
    }
// https://stackoverflow.com/questions/42738640/division-in-ethereum-solidity/42739843
    function percent(uint numerator, uint denominator, uint precision) private 

      constant returns(uint quotient) {

         // caution, check safe-to-multiply here
        uint _numerator  = numerator * 10 ** (precision+1);
        // with rounding of last digit
        uint _quotient =  ((_numerator / denominator) + 5) / 10;
        return ( _quotient);
    }
  
  
    function getSummary() public view returns (
      uint, uint, address
      ) {
        return (
          minimumContribution,
          this.balance,
          owner
        );
    }

}