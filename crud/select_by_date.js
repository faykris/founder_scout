import mongoose from 'mongoose';
import dotenv from 'dotenv';
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

  const promise = Cof.find({"companyInfo.timestamp": {
      "$gte": new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1).toISOString(),
      "$lt": new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).toISOString()
    }}).exec();
  assert.ok(promise instanceof Promise);

  promise.then(async function (cof) {
    if (cof === null) {
      console.log("Empty database or doesn't exist");
    }
    else {
      console.log('Co-founders successfully selected!');
      console.log(cof);
    }
    mongoose.disconnect().then(() => console.log("Connection close"));
  }).catch((err) => console.log("select failed!\n", err));
}).catch((err) => console.log("connection failed!\n", err));
