// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Calend3 {
    uint rate;
    address payable public owner;
    struct Appointment {
        string title;
        address attendee;
        uint startTime;
        uint endTime;            
        uint amountPaid;
    }
Appointment[] appointments;

    constructor(){
        owner=payable(msg.sender);
    }

    function getRate () view public returns(uint){
        return rate;
    }
     function setRate (uint _rate) public{  
        require(msg.sender==owner,"Only the owner can set the rate");
        rate=_rate;
     }

     function getAppointments() public view returns(Appointment[] memory) {
        return(appointments);
        
     }

     function createAppointment(string memory title ,uint startTime,uint endTime) public payable{
        Appointment memory appointment;
        appointment.title=title;
        appointment.startTime=startTime;
        appointment.endTime=endTime;
        appointment.amountPaid=(endTime-startTime)/60*rate;
        require(msg.value >= appointment.amountPaid, "We require more ether");
        (bool success,) =owner.call{value: msg.value}(""); 
        require(success, "Failed to send Ether");

        appointments.push(appointment);
     }
     
}
