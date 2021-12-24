import mongoose from "mongoose";

const DeliveryDateSchema = mongoose.Schema({
  DeliverDateArray: { type: Array },
});

const DELIVERYDATE = mongoose.model("DELIVERYDATE", DeliveryDateSchema);

export default DELIVERYDATE;
