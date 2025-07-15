/**
 * Test Suite for Price Calculator Module
 * 
 * This module tests functions of the helper class
 */

import PriceCalculator from "../../src/pairtest/helpers/priceCalculator";


describe('PricingCalculator.totalCost', () => {
  it('returns 0 when all counts are zero', () => {
    const counts = { adult: 0, child: 0, infant: 0 };
    const cost = PriceCalculator.totalCost(counts);
    expect(cost).toBe(0);
  });

  it('calculates mixed costs correctly', () => {
    // 2 adults × £25 + 3 children × £15 + 4 infants × £0 = 50 + 45 = 95
    const counts = { adult: 2, child: 3, infant: 4 };
    expect(PriceCalculator.totalCost(counts)).toBe(95);
  });

  //handles large numbers
    it('handles large numbers correctly', () => {
    // 1000 adults × £25 + 1000 children × £15 + 1000 infants × £0 = 25000 + 15000 = 40000
    const counts = { adult: 1000, child: 1000, infant: 1000 };
    expect(PriceCalculator.totalCost(counts)).toBe(40000);
  });   
});