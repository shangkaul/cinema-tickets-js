

/**
 * PriceCalculator module for calculating total ticket costs.
 * Utilizes predefined prices for adult, child, and infant tickets.
 * 
 * @module PriceCalculator
 */

import prices from '../config/prices.js';

export default class PriceCalculator {
  /**
   * Calculates the total cost for a given set of ticket counts.
   * @param {{adult:number, child:number, infant:number}} ticketCounts
   * @returns {number}
   */
  static totalCost(ticketCounts) {
    return ticketCounts.adult  * prices.ADULT
         + ticketCounts.child  * prices.CHILD
         + ticketCounts.infant * prices.INFANT;
  }
}
