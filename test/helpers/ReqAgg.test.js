import ReqAgg from "../../src/pairtest/helpers/reqAgg";
import TicketTypeRequest from "../../src/pairtest/lib/TicketTypeRequest";
import InvalidPurchaseException from "../../src/pairtest/lib/InvalidPurchaseException";

describe('ReqAgg.agg', () => {
  it('correctly tallies multiple requests', () => {
    const reqs = [
      new TicketTypeRequest('ADULT', 5),
      new TicketTypeRequest('CHILD', 1),
      new TicketTypeRequest('INFANT', 3),
      new TicketTypeRequest('ADULT', 1),
      new TicketTypeRequest('CHILD', 2)

    ];
    const counts = ReqAgg.agg(reqs);
    expect(counts).toEqual({ adult: 6, child: 3, infant: 3 });
  });


  it('returns zeros when passed an empty array', () => {
    const counts = ReqAgg.agg([]);
    expect(counts).toEqual({ adult: 0, child: 0, infant: 0 });
  });

   it('throws exceptionif any count is negative', () => {
    const req = new TicketTypeRequest('ADULT', 1);
    req.getNoOfTickets = () => -5;  //Negative count
    expect(() => ReqAgg.agg([req])).toThrow(InvalidPurchaseException);
  });

// Invalid ticket type already handled in TicketTypeRequest class

});