/**
 * Test module for the business rule validator helper class
 */

import BusinessRuleValidator from '../../src/pairtest/helpers/BusinessRuleValidator.js';
import InvalidPurchaseException from '../../src/pairtest/lib/InvalidPurchaseException.js';

describe('BusinessRuleValidator.validate', () => {
  it('passes for a single adult', () => {
    expect(() =>
      BusinessRuleValidator.validate({ adult: 1, child: 0, infant: 0 })
    ).not.toThrow();
  });

  it('passes for mixed tickets within 25 limit', () => {
    expect(() =>
      BusinessRuleValidator.validate({ adult: 2, child: 5, infant: 5 }) // total=12
    ).not.toThrow();
  });

  it('throws if any count is negative', () => {
    expect(() =>
      BusinessRuleValidator.validate({ adult: -1, child: 0, infant: 0 })
    ).toThrow(InvalidPurchaseException);

    expect(() =>
      BusinessRuleValidator.validate({ adult: 1, child: -1, infant: 0 })
    ).toThrow(InvalidPurchaseException);

    expect(() =>
      BusinessRuleValidator.validate({ adult: 1, child: 0, infant: -1 })
    ).toThrow(InvalidPurchaseException);
  });

  it('throws if no tickets are requested', () => {
    expect(() =>
      BusinessRuleValidator.validate({ adult: 0, child: 0, infant: 0 })
    ).toThrow(InvalidPurchaseException);
  });

  it('throws if child-only with no adult', () => {
    expect(() =>
      BusinessRuleValidator.validate({ adult: 0, child: 2, infant: 0 })
    ).toThrow(InvalidPurchaseException);
  });

  it('throws if infant-only with no adult', () => {
    expect(() =>
      BusinessRuleValidator.validate({ adult: 0, child: 0, infant: 3 })
    ).toThrow(InvalidPurchaseException);
  });

  it('throws if total exceeds 25', () => {
    expect(() =>
      BusinessRuleValidator.validate({ adult: 10, child: 10, infant: 6 }) // total=26
    ).toThrow(InvalidPurchaseException);
  });

  it('allows exactly 25 tickets', () => {
    expect(() =>
      BusinessRuleValidator.validate({ adult: 10, child: 10, infant: 5 }) // total=25
    ).not.toThrow();
  });
});
