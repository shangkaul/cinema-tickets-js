export default class SeatCalc {
  /**
   * Helper class to calculate how many tickets need to be reserved
   * @param {{adult:number, child:number}} counts
   * @returns {number}
   */
  static totalSeats(ticketCounts) {
    return ticketCounts.adult + ticketCounts.child;
  }
}
