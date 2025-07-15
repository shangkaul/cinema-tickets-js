
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

import prices from './config/prices.js';
import ReqAgg from './helpers/reqAgg.js';

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */
  
  purchaseTickets(accountId, ...ticketTypeRequests) {
  /**
  * Attempts to purchase tickets for a given account.
  * 
  * @param {number} accountId - The unique identifier for the account making the purchase.
  * @param {...TicketTypeRequest} ticketTypeRequests - One or more ticket type requests specifying the type and quantity of tickets.
  * @throws {InvalidPurchaseException} If the purchase request is invalid according to business rules.
  */
  // Validate accountId
    if ((!Number.isInteger(accountId)) || (accountId <= 0)){
      throw new InvalidPurchaseException('Invalid account ID'); 
  }

  // Get aggregated ticket counts
  const ticketCounts = ReqAgg.agg(ticketTypeRequests);

  
  const adultCount = ticketCounts.adult;
  const chCount = ticketCounts.child;
  const infCount = ticketCounts.infant;


  // Check for valid account IDs
  if (adultCount<1)
    throw new InvalidPurchaseException("Minimum 1 adult is required.");

  // Check if any of the counts are negative
  if (chCount < 0 || infCount < 0) {
  throw new InvalidPurchaseException('Ticket count must be zero or positive');
}

 // Did not add a check for decimat counts (fractions) since that is already validated in the TicketTypeRequest class. 

  // Check for total tickets capped at 25.
  // Here we assume infant tickets are also counted in the 25 limit.
  // Although they are not allocated seats but still counted as a ticket.

  if ((adultCount+chCount+infCount) >25)
    throw new InvalidPurchaseException("Cannot but more than 25 tickets in a single transaction.");

  const amt= (adultCount * prices.ADULT)
             + (chCount * prices.CHILD)
             + (infCount * prices.INFANT);
  const seats= adultCount + chCount;
  
  // Call ticket payment and seat reservation services.
  new TicketPaymentService().makePayment(accountId, amt);
  new SeatReservationService().reserveSeat(accountId, seats);

  
  // Added return object to print values in main js, DOES NOT MODIFY INTERFACE of the class.
  return{
    totalCost:amt,
    totalSeats: seats
  }
}
}
