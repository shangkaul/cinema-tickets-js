/**
 * BusinessRules is a validator class that enforces ticket purchase business rules.
 * It ensures that ticket purchases meet constraints such as minimum and maximum ticket counts,
 * and that children and infants are accompanied by at least one adult.
 */

import InvalidPurchaseException from '../lib/InvalidPurchaseException.js';

export default class BusinessRuleValidator {
    /**
     * Validates the ticket purchase request against business rules.
     *    * @param {Object} ticketCounts - An object containing counts of different ticket types.
     * * @param {number} ticketCounts.adult - The number of adult tickets.
     * * @param {number} ticketCounts.child - The number of child tickets.
     * * @param {number} ticketCounts.infant - The number of infant tickets.
     * @throws {InvalidPurchaseException} If the purchase request violates any business rules.
     * */

    static validate(ticketCounts) {
        const { adult, child, infant } = ticketCounts;

        const totalTickets = adult + child + infant;

        // Rule 1: At least one adult ticket is required
        if (adult < 1) {
            throw new InvalidPurchaseException("Minimum 1 adult is required accompanying children or infants");
        }
        // Rule 2: Total tickets cannot exceed 25
        // Here we assume infant tickets are also counted in the 25 limit.
        // Although they are not allocated seats but still counted as a ticket.
        if (totalTickets > 25) {
            throw new InvalidPurchaseException("Cannot buy more than 25 tickets in a single transaction");
        }
        // Rule 3: Negative ticket counts are not allowed
        if (adult < 0 || child < 0 || infant < 0) {
            throw new InvalidPurchaseException("Ticket count must be zero or positive");
        }

        // Did not add a check for decimal counts (fractions) since that is already validated in the TicketTypeRequest class. 
    }
}