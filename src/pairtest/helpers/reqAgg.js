/**
 * Aggregates an array of TicketTypeRequest into counts for each ticket category.
 *
 * @class ReqAgg
 * @module helpers/reqAgg
 */

import TicketTypeRequest from '../lib/TicketTypeRequest.js';
import InvalidPurchaseException from '../lib/InvalidPurchaseException.js';

export default class ReqAgg {
  /**
   * @param {TicketTypeRequest[]} requests
   * @returns {{adult: number, child: number, infant: number}}
   * @throws {InvalidPurchaseException} If any request has a negative ticket count.
   */

  static agg(requests) {
    const ticketCounts={
        adult: 0,
        child: 0,
        infant: 0
    };

    for (const req of requests) {
    const type  = req.getTicketType().toLowerCase();
    const count   = req.getNoOfTickets();

    // Check for negative counts
    if(count<0)
        throw new InvalidPurchaseException('Ticket count must be zero or positive');
    
    //No need to check for invalid ticket types since that is already handled in TicketTypeRequest class.
    ticketCounts[type] += count;
    
}
return ticketCounts;
  }
}