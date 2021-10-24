import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
// make a connection
mongoose.connect(process.env.MONGODB_URI);

// get reference to database?"
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', async function () {
  console.log("Connection Successful!");

  const FounderSchema = mongoose.Schema(
    {},
    {strict: false}
  );
// compile schema to model
  const Cof = mongoose.model('Co-Founders', FounderSchema, 'co-founders');

  await Cof.deleteMany({"companyInfo.websiteUrl": {$exists: false}}).exec()
    .then((cof) => console.log("Profiles was deleted...\n", cof))
    .catch((err) => console.log("Profiles can't be deleted...\n", err));

  process.exit(0);
});
