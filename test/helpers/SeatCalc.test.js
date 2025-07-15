/**
 * Test suite to test the helper class SeatCalc, calculating seats that need to be reserved for the booking
 */

import SeatCalc from "../../src/pairtest/helpers/SeatCalc";

describe('SeatCalc.totalSeats', () => {
  it('returns 0 when no adults and no children', () => {
    expect(SeatCalc.totalSeats({ adult: 0, child: 0 })).toBe(0);
  });
  it('sums adults and children for mixed counts', () => {
    expect(SeatCalc.totalSeats({ adult: 2, child: 3 })).toBe(5);
    expect(SeatCalc.totalSeats({ adult: 10, child: 15 })).toBe(25);
  });

  it('ignores infants if passed in the object', () => {
    // even if the object has an infant property, only adult+child matter
    expect(SeatCalc.totalSeats({ adult: 2, child: 3, infant: 7 })).toBe(5);
  });

  it('handles large valid counts without overflow', () => {
    expect(SeatCalc.totalSeats({ adult: 1000, child: 2000 })).toBe(3000);
  });
});