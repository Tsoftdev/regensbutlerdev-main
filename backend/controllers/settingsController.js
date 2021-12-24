import asyncHandler from "express-async-handler";
import ProductMySQL from "../models/productModelMySQL.js";
import path from "path";

import * as csv from "fast-csv";
import fs from "fs";

import fsExtra from "fs-extra";

const downloadProducts = asyncHandler(async (req, res) => {
  //Löschen aller alten Dateien

  fsExtra.emptyDirSync("./regensbutler-frontend/public/uploads");

  const products = await ProductMySQL.findAll();

  const fileName = new Date();
  const datetime =
    fileName.getDate() +
    "-" +
    (Number(fileName.getMonth()) + 1).toString() +
    "-" +
    fileName.getFullYear() +
    "-" +
    fileName.getHours() +
    "-" +
    fileName.getMinutes() +
    "-" +
    fileName.getSeconds();
  const ws = fs.createWriteStream(
    "./regensbutler-frontend/public/uploads/" + datetime + "-data.csv"
  );

  if (products) {
    const jsonData = JSON.parse(JSON.stringify(products));
    csv
      .write(jsonData, { headers: true, delimiter: ";" })
      .on("finish", function () {
        res.status(200).send(datetime + "-data.csv");
      })
      .pipe(ws);
  } else {
    res.status(404);
    throw new Error("Problem beim Produktdownload");
  }
});

const uploadProducts = asyncHandler(async (req, res) => {
  try {
    const { file } = req.body;
    if (file == undefined) {
      return res.status(400).send("Bitte csv datei hochladen");
    }

    let products = [];
    let path =
      "./regensbutler-frontend/public/uploads/tomysql/" + console.log(path);
    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        products.push(row);
      })
      .on("end", () => {
        ProductMySQL.bulkUpdate(products, { updateOnDuplicate: ["id"] })
          .then(() => {
            res.status(200).send({
              message: "Upload erfolgreich: " + req.body.uploadCSV.originalname,
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: "Import in Datenbank fehlgeschlagen",
              error: error.message,
            });
          });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Upload fehlgeschlagen: " + req.body.uploadCSV.originalname,
    });
  }
});

export { uploadProducts, downloadProducts };
