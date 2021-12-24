import mongoose from "mongoose";

const plzSchema = mongoose.Schema({
  plzArray: { type: Array },
});

const PLZ = mongoose.model("PLZ", plzSchema);

export default PLZ;
