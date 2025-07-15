/* 
 * JEST Enabled Test Suite for Test Driven Development
The test suite helps test the code in accordance to the business rules and constraints given.
Note: The Payment and Seat Reservation Services are not tested since as per assumptions those are out of scope for this assessment.
So we assume those work well already.

To run tests Excute in terminal:
npm test
*/


import TicketService from "../src/pairtest/TicketService.js";
import InvalidPurchaseException from "../src/pairtest/lib/InvalidPurchaseException.js";
import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest.js";
import TicketPaymentService from '../src/thirdparty/paymentgateway/TicketPaymentService.js';
import SeatReservationService from '../src/thirdparty/seatbooking/SeatReservationService.js';



describe('TicketService.purchaseTickets', ()=>{

    //Create mock for TicketPaymentService
    let spyPay;
    let spyReserve;
    
    beforeEach(() => {
        // Mocking the TicketPaymentService and SeatReservationService methods
        spyPay = jest.spyOn(TicketPaymentService.prototype, 'makePayment').mockImplementation(() => {});
        spyReserve = jest.spyOn(SeatReservationService.prototype, 'reserveSeat').mockImplementation(() => {});
    });
    
    afterEach(() => {
        jest.restoreAllMocks();
    });

    // Simple success case - Happy Path
    it('Test for single adult reservation',()=>{
        const service = new TicketService();
        const req = new TicketTypeRequest('ADULT', 1);

        service.purchaseTickets(1, req);

        expect(spyPay).toHaveBeenCalledWith(1, 25);
        expect(spyReserve).toHaveBeenCalledWith(1, 1);
    })


})