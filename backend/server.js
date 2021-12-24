import express from "express";
import path from "path";
import dotenv from "dotenv";
import sequelize from "./config/mysqldb.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import morgan from "morgan";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import plzRoutes from "./routes/plzRoutes.js";
import reviewRoutes from "./routes/reviewsRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import deliveryScheduleRoutes from "./routes/deliveryRoutes.js";
import frequentiesRoutes from "./routes/frequentyRoutes.js";
import recurringpayment from "./routes/recurringpaymentRoutes.js";
import cors from "cors";
import paypal from "paypal-rest-sdk";
import fs from "fs";
import * as schedule from 'node-schedule';
import moment  from 'moment';


dotenv.config();

sequelize.sync();

const app = express();

app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

try {
  // var configJSON = fs.readFileSync("/config/config.json");
  // var config = JSON.parse(configJSON.toString());
  paypal.configure({
    "host": "api.sandbox.paypal.com",
    "port": "",
    "client_id": "Aa4jFxfNpyiUAX3MtWWN1NW6dO85FF6T7NvLrg2r1a0JH9IvJrtjgOuvQlLQVkpyDIe0kMyCgnwQ9ti8",
    "client_secret": "ECg3vn9cs6XBQvP6ylN_TB1FxiMzMP6jCW8T5QAvtVmpEVcmPsejSjqb8mvQJPeRkITrcjNVX-8GT-H-"
  });
} catch (e) {
  console.error("File config.json not found or is invalid: " + e.message);
  process.exit(1);
}
// recurringpayment.init(config);

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/liefergebiete", plzRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/deliverySchedule", deliveryScheduleRoutes);
app.use("/api/frequenties", frequentiesRoutes);
app.use("/api/recurringpayment", recurringpayment);
app.use("/api/settings", settingsRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/regensbutler-frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "regensbutler-frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "/regensbutler-frontend", "/puplic", "/uploads")
  )
);

app.use(notFound);

app.use(errorHandler);
const current1 = moment();
// Schedule tasks to be run on the server.
schedule.scheduleJob('* * * * *', function(){
  const current = moment();
  console.log('Email Reminder (automatic) for frequently order', current);
  console.log('Difference times', current.diff(current1, 'seconds'));
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);

