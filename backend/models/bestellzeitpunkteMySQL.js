import Sequelize from "sequelize";
import sequelize from "../config/mysqldb.js";

const BestellZeitPunkteMySQL = sequelize.define(
  "bestellzeitpunkte",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bestelluhrzeit_von: { type: Sequelize.TIME },
    bestelluhrzeit_bis: { type: Sequelize.TIME },
    info: { type: Sequelize.STRING },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default BestellZeitPunkteMySQL;
