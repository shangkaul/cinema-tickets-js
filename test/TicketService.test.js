/* 
 * JEST Enabled Test Suite for Test Driven Development
The test suite helps test the code in accordance to the business rules and constraints given.
Note: The Payment and Seat Reservation Services are not tested since as per assumptions those are out of scope for this assessment.
So we assume those work well already.

To run tests Excute in terminal:
npm test
*/


import TicketService from "../src/pairtest/TicketService";
import TicketTypeRequest from "../src/pairtest/lib/InvalidPurchaseException";
import InvalidPurchaseException from "../src/pairtest/lib/TicketTypeRequest";


describe('TicketService.purchaseTickets', ()=>{
    it('Test for single adult reservation',()=>{
        //Test to be written
    })
})