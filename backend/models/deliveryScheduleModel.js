import mongoose from "mongoose";

const DeliveryTimeSchema = mongoose.Schema({
  DeliverTimeArray: { type: Array },
});

const DELIVERYTIME = mongoose.model("DELIVERYTIME", DeliveryTimeSchema);

export default DELIVERYTIME;
