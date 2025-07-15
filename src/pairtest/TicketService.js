
/**
 * TicketService handles ticket purchase operations for cinema bookings.
 * 
 * This service validates ticket requests and processes purchases according to business rules.
 * Only the `purchaseTickets` method should be public; all other methods must remain private.
 */


import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';

import TicketPaymentService from '../thirdparty/paymentgateway/TicketPaymentService.js';
import SeatReservationService from '../thirdparty/seatbooking/SeatReservationService.js';

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  static #ADULT_PRICE=25;
  static #CHILD_PRICE=15;
  static #INFANT_PRICE=0;
  

  purchaseTickets(accountId, ...ticketTypeRequests) {
  /**
  * Attempts to purchase tickets for a given account.
  * 
  * @param {number} accountId - The unique identifier for the account making the purchase.
  * @param {...TicketTypeRequest} ticketTypeRequests - One or more ticket type requests specifying the type and quantity of tickets.
  * @throws {InvalidPurchaseException} If the purchase request is invalid according to business rules.
  */
    if ((!Number.isInteger(accountId)) || (accountId <= 0)){
      throw new InvalidPurchaseException('Invalid account ID'); 
  }

  const adultReq= ticketTypeRequests.find(req => req.getTicketType() === 'ADULT');
  const adultCount = adultReq ? adultReq.getNoOfTickets() : 0;

  if (adultCount<1)
    throw new InvalidPurchaseException("Minimum 1 adult is required.")

  const amt= adultCount * TicketService.#ADULT_PRICE;
  const seats= adultCount;
  
  // Call ticket payment and seat reservation services.
  new TicketPaymentService().makePayment(accountId, amt);
  new SeatReservationService().reserveSeat(accountId, seats);

  return{
    totalCost:amt,
    totalSeats: seats
  }
}
}
