import Sequelize from "sequelize";
import sequelize from "../config/mysqldb.js";

const TokenMySQL = sequelize.define(
  "tokens",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    email: {
      type: Sequelize.STRING,
    },
    token: {
      type: Sequelize.STRING,
    },
    tokenExpires: {
      type: Sequelize.DATE,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default TokenMySQL;
