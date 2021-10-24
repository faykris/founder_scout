import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import assert from "assert";
import flatten from 'flat';
import fastcsv from 'fast-csv';


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

  const promise = Cof.find().exec();
  assert.ok(promise instanceof Promise);

  promise.then(function (cof) {
    if (cof === null) {
      console.log("Empty database or doesn't exist");
    }
    else {
      const list = [];
      const ws = fs.createWriteStream("co-founders.csv");
      for (let i = 0; i < cof.length; i++) {
        const profile = flatten(cof[i]);
        const object = {};
        for (const key in profile) {
          if (!key.includes('.') && !key.includes('$')) {
            object[key] = profile[key];
          }
        }
        list.push(object);
      }

      fastcsv
        .write(list, { headers: true })
        .on("finish", function() {
          console.log("Write to CSV successfully!");
        })
        .pipe(ws);
    }
    mongoose.disconnect().then(() => console.log("Connection close"));
  }).catch((err) => console.log("select failed!\n", err));
}).catch((err) => console.log("connection failed!\n", err));

