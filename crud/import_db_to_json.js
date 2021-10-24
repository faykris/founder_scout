import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import assert from "assert";

dotenv.config();
// make a connection
mongoose.connect(process.env.MONGODB_URI).then(function () {
  console.log("connection successfully");

  const FounderSchema = mongoose.Schema(
    {},
    {strict: false}
  );
  // compile schema to mode
  const Cof = mongoose.model('Co-Founders', FounderSchema, 'co-founders');

  const promise = Cof.findOne({"profileInfo.fullName":"Matthew McClarnon"}).exec();
  assert.ok(promise instanceof Promise);

  promise.then(async function (cof) {
    if (cof === null) {
      console.log("Empty database or doesn't exist");
    }
    else {
      'use strict';
      let data = JSON.stringify(cof);

      fs.writeFile("co-founders.json", data, function (err) {
        if (err) console.log('Error saving co-founders', err);
        else console.log('Co-founders successfully saved!');
      });
    }
    mongoose.disconnect().then(() => console.log("Connection close"));
  }).catch((err) => console.log("select failed!\n", err));
}).catch((err) => console.log("connection failed!\n", err));

