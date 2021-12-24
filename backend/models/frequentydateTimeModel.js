import mongoose from "mongoose";

const FrequentyDateTimeSchema = mongoose.Schema({
  DeliverDateArray: { type: Array },
});

const FREQUENTYDATETIME = mongoose.model("FREQUENTYDATETIME", FrequentyDateTimeSchema);

export default FREQUENTYDATETIME;
