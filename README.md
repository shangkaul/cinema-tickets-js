# Cinema Tickets Booking Module

Cinema ticket booking JavaScript module that can be further extended as a JS based (Node JS) API. Current implementation is a JS module along with a main.js runner that calculates total cost and no. of seats to be reserved for each booking while validating the user purchase as per the specified business rules and constraints.

## Features
- Validates valid (Positive Integer) Account IDs
- Supports Three ticket types (Adult, Infant and Child)
- Atlease one adult must accompany children/infants
- Total ticket counts are capped at 25 tickets per transaction
- Infants get free tickets but their ticket in counted towards the 25 ticket limit.
- No seat is alloted for infants.
- Extended the Ticket Service to return an object with cost and seat count for integration to main.js and smoke testing.

## Module List
- main.js - Main runner created for interactive demo and smoke testing. 
- Services
  - TicketService - Interface with only the purchaseTickets method public. Drives the request validation and calculation. Also calls third-party services to accept payment and book seats.
- configs
  - prices - Configurable price class storing the price of each ticket class. Any changes in price can solely be driven through this class.
- helpers
  - ReqAgg - Aggregates the requests into a ticketCounts object, storing ticket counts for each class: adult, child and infant.
  - BusinessRuleValidator - Module to validate all business rules at once. Can be extended to incorporate more business rules in the future.
  - PriceCalculator - Module that calculates the total cost of the transaction
  - SeatCalc - Module that calculates the total seats to be booked for this transaction
- Third Party
  - TicketsPaymentService - Service to accept payments (Not Modified)
  - SeatReservationService - Service to book seats (Not Modified)
- lib
  - TicketTypeRequest - Immutable object that stores the request for the transaction (Not Modified)
  - InvalidPurchaseException - Exception class to raise an exception when a purchase does not go through (Not Modified)

## How to Run?

### Pre-requisites:
- **Node.js** >= 20.9.0  
- **npm** (comes with Node.js)

### Installation:
1. Clone the repo and `cd` into it:  
   ```bash
   git clone https://github.com/your-username/cinema-tickets-javascript.git
   cd cinema-tickets-javascript
2. Install Dependencies
   ```bash
   npm install
3. Run in Interactive Mode:
   ```bash
   node main.js
4. Testing (Driven by Jest):
   ```bash
   npm test
6. Test Coverage
   <img width="1078" height="558" alt="image" src="https://github.com/user-attachments/assets/cc9c7bcd-92c0-474d-b102-f576fd502f4d" />





