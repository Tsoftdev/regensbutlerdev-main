import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);

//Schema aus Excel angepasst
const productSchemaRegensbutler = mongoose.Schema({
  produkt_id: { type: Number, required: true },
  express_sortiment: { type: Boolean, required: true, default: false },
  voll_sortiment: { type: Boolean, required: true, defaut: true },
  product_lager_id: { type: Number, required: true },
  produktname: { type: String, required: true },
  beschreibung: { type: String },
  ek: { type: Number, required: true, default: 0.0 },
  vk: { type: Number, required: true },
  ustr: { type: Number, required: true },
  lagerbestand: { type: Number, require: true, default: 0 },
  lagerueberwachung: { type: Boolean, required: true, default: false },
  kat_id: { type: Number, required: true },
  kategorie: { type: String, required: true },
  unterkategorie: { type: String },
  direktkategorie: { type: String },
  nur_von_tag: { type: String },
  bis_tag: { type: String },
  zwischen_zeit_von: { type: String },
  zwischen_zeit_bis: { type: String },
  abogeeignet: { type: Boolean, required: true },
  pfand: { type: Number, required: true, default: 0 },
  gewicht: { type: String },
  kalorien: { type: String },
  verpackung: { type: String },
  bildname: { type: String, default: "defaultimage.png" },
  neu_grundpreis: { type: String },
  neu_inhaltsst: { type: String },
  neu_zusatzst: { type: String },
  neu_naehrwerte: { type: String },
  neu_pflichthinweis: { type: String },
  reviews: [reviewSchema],
  numReviews: { type: Number, required: true, default: 0 },
  rating: { type: Number, required: true, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

const Product = mongoose.model("Product", productSchemaRegensbutler);

export default Product;
