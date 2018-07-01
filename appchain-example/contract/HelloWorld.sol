pragma solidity ^0.4.19;

contract HelloWorld {
    string value;
    
    constructor() public {
        value = "Hello World!";
    }
    
    function getValue () public constant returns (string) {
        return value;
    }
    
    function setValue (string str) public {
        value = str;
    }

}