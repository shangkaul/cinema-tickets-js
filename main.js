/**
 * Main.js is a console runner file for the module
 * Can be used for pre-limanary smoke tests and demo runs
 * Just Run: 
 *  node main.js
 */

import readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import TicketService from './src/pairtest/TicketService.js';
import TicketTypeRequest from './src/pairtest/lib/TicketTypeRequest.js';
import InvalidPurchaseException from './src/pairtest/lib/InvalidPurchaseException.js';

const input = readline.createInterface({ input: stdin, output: stdout });

// Get acc ID and ticket booking as console prompt input
const accId = await input.question('Please enter your Account ID. ');
const adult     = await input.question('How many adult tickets do you wish to buy? ');
const child     = await input.question('How many child tickets do you wish to buy? ');
const inf   = await input.question('How many infant tickets do you wish to buy? ');

input.close();

// Parse the input
const accountId   = Number(accId);
const adultCount  = Number(adult);
const childCount  = Number(child);
const infantCount = Number(inf);

// Build the request array
const requests = [];
if (adultCount  > 0) requests.push(new TicketTypeRequest('ADULT',  adultCount));
if (childCount  > 0) requests.push(new TicketTypeRequest('CHILD',  childCount));
if (infantCount > 0) requests.push(new TicketTypeRequest('INFANT', infantCount));


try {
  // Call the Ticket Service
  const { totalCost, totalSeats } = new TicketService().purchaseTickets(accountId, ...requests);

  console.log("Purchase Successful!")
  console.log(`Total amount charged: £${totalCost}`);
  console.log(`Total seats reserved: ${totalSeats}`);
} catch (e) {
  // Error Handling to handle exceptions  
  if (e instanceof InvalidPurchaseException) {
    console.error(`\n Purchase failed: ${e.message}`);
  } else {
    console.error('\nUnexpected error:', e);
  }
}