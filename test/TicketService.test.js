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

        service.purchaseTickets(123, req);

        expect(spyPay).toHaveBeenCalledWith(123, 25);
        expect(spyReserve).toHaveBeenCalledWith(123, 1);
    })
    // Input validation for accountId
    it('Test for invalid accountId',()=>{
        const service = new TicketService();
        const req = new TicketTypeRequest('ADULT', 1);

    // id=0
    expect(() => {
      service.purchaseTickets(0, req);
    }).toThrow(InvalidPurchaseException);

    // negative ID
    expect(() => {
      service.purchaseTickets(-5, req);
    }).toThrow(InvalidPurchaseException);

    // Non-numeric
    expect(() => {
      service.purchaseTickets('JohnD', req);
    }).toThrow(InvalidPurchaseException);

    })

    //Complex case with multiple ticket types
    it('Test for multiple ticket types',()=>{
        const service = new TicketService();
        const requests = [
            new TicketTypeRequest('ADULT', 2),
            new TicketTypeRequest('CHILD', 1),
            new TicketTypeRequest('INFANT', 1),
    ];
    service.purchaseTickets(123, ...requests);

    // 2×£25 + 1×£15 + 1×£0 = £65
    expect(spyPay).toHaveBeenCalledWith(123, 65);
    // 2 adult, 1 child infant not counted.= 2 + 1 = 3
    expect(spyReserve).toHaveBeenCalledWith(123, 3);
    })

    // Failure case for only child and infant
    it('Test for only child and infant tickets',()=>{
        const service = new TicketService();
        const requests = [
            new TicketTypeRequest('CHILD', 2),
            new TicketTypeRequest('INFANT', 1)

        ];
        expect(() => {
            service.purchaseTickets(123, ...requests);
        }).toThrow(InvalidPurchaseException);
    })

    // Failure case only child
    it('Test for only child tickets',()=>{
        const service = new TicketService();
        const req= new TicketTypeRequest('CHILD', 1);
        expect(() => {
            service.purchaseTickets(2, req);
        }).toThrow(InvalidPurchaseException);
    })
    // Failure case only infant
    it('Test for only infant tickets',()=>{
        const service = new TicketService();
        const req= new TicketTypeRequest('INFANT', 1);
        expect(() => {
            service.purchaseTickets(3, req);
        }).toThrow(InvalidPurchaseException);
    })

})