import Sequelize from "sequelize";
import sequelize from "../config/mysqldb.js";

const PlzMySQL = sequelize.define(
  "liefergebiete",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    plz: Sequelize.INTEGER,
    bezeichnung: Sequelize.STRING,
    zusatzhinweis: Sequelize.TEXT,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default PlzMySQL;
