import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import plzList from "./data/plz.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import PLZ from "./models/plzModel.js";
import REVIEWS from "./models/reviewsModel.js";
import DELIVERYTIME from "./models/deliveryTimeModel.js";
import DELIVERYDATE from "./models/deliveryDateModel.js";
import FREQUENTY from "./models/frequentyModel.js";
import FREQUENTYDATETIME from "./models/frequentydateTimeModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await PLZ.deleteMany();
    await REVIEWS.deleteMany();
    await DELIVERYTIME.deleteMany();
    await DELIVERYDATE.deleteMany();
    await FREQUENTY.deleteMany();
    await FREQUENTYDATETIME.deleteMany();

    const createdUsers = await User.insertMany(users);
    const createdPLZ = await PLZ.insertMany(plzList);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);
    console.log(`Data Imported`.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await PLZ.deleteMany();
    await REVIEWS.deleteMany();
    await DELIVERYTIME.deleteMany();
    await DELIVERYDATE.deleteMany();
    await FREQUENTY.deleteMany();
    await FREQUENTYDATETIME.deleteMany();

    console.log(`Data destroyed`.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
