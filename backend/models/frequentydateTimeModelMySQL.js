import Sequelize from "sequelize";
import sequelize from "../config/mysqldb.js";

const FrequentyMySQL = sequelize.define(
  "frequentydatetime",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: Sequelize.INTEGER, //user Id
    deliveryDay: Sequelize.STRING, // delivery date
    deliveryTime: Sequelize.STRING, // delivery time
  },
  {
    freezeTableName: true,
    define: { charset: "utf-8", collate: "utf8mb4_unicode_ci" },
  }
);

export default FrequentyMySQL;
