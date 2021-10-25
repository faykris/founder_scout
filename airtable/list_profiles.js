//var Airtable = require('airtable');
import Airtable from "airtable";
import dotenv from 'dotenv';

dotenv.config();
const base = new Airtable({apiKey: process.env.APY_KEY}).base(process.env.BASE_ID);


base('co-founders').select({
  // Selecting the first 3 records in Grid view:
  maxRecords: 3,
  view: "Grid view"
}).eachPage(function page(records, fetchNextPage) {
  // This function (`page`) will get called for each page of records.

  records.forEach(function(record) {
    console.log('Retrieved', record.get('vmid'));
  });

  // To fetch the next page of records, call `fetchNextPage`.
  // If there are more records, `page` will get called again.
  // If there are no more records, `done` will get called.
  fetchNextPage();

}, function done(err) {
  if (err) { console.error(err); }
});

/*
OUTPUT
Retrieved ACwAADdBlX4Bw8DuWFRxaXVHnxSDQeV0C8ehZxQ
Retrieved ACwAADXrm7kBHMYYGvquEhJ14aaJWIKthmBpeCY
Retrieved ACwAADLUE7QB1j0GzI2FTPf4DYMsM_aSeN0tx6o
FETCH FIRST PAGE
 */
// If you only want the first page of records, you can
// use `firstPage` instead of `eachPage`.
base('co-founders').select({
  view: 'Grid view'
}).firstPage(function(err, records) {
  if (err) { console.error(err); return; }
  records.forEach(function(record) {
    console.log('Retrieved', record.get('vmid'));
  });
});
