import mongoose from "mongoose";

const FrequentySchema = mongoose.Schema({
  DeliverDateArray: { type: Array },
});

const FREQUENTY = mongoose.model("FREQUENTY", FrequentySchema);

export default FREQUENTY;
