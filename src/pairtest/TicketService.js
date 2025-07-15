
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
import BusinessRuleValidator from './helpers/BusinessRuleValidator.js';
import PriceCalculator from './helpers/priceCalculator.js';
import SeatCalc from './helpers/SeatCalc.js';

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */
  
  constructor({
    paymentService     = new TicketPaymentService(),
    reservationService = new SeatReservationService(),
    aggregator         = ReqAgg,
    validator          = BusinessRuleValidator,
    pricing            = PriceCalculator,
    seating            = SeatCalc,
  } = {}) {
    this.paymentService     = paymentService;
    this.reservationService = reservationService;
    this.aggregator         = aggregator;
    this.validator          = validator;
    this.pricing            = pricing;
    this.seating            = seating;
  }

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
  const ticketCounts = this.aggregator.agg(ticketTypeRequests);

  // Validate business rules
  this.validator.validate(ticketCounts);

 // Calculate total cost and number of seats
  const amt= this.pricing.totalCost(ticketCounts);
  const seats= this.seating.totalSeats(ticketCounts);
  
  // Call ticket payment and seat reservation services
  new TicketPaymentService().makePayment(accountId, amt);
  new SeatReservationService().reserveSeat(accountId, seats);

  
  // Added return object to print values in main js, DOES NOT MODIFY INTERFACE of the class.
  return{
    totalCost:amt,
    totalSeats: seats
  }
}
}
