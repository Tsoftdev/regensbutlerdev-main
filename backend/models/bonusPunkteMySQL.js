import Sequelize from "sequelize";
import sequelize from "../config/mysqldb.js";
import UserMySQL from "./userModelMySQL.js";

const BonusPunkteMySQL = sequelize.define(
  "bonuspunkte",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    info: { type: Sequelize.STRING },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

UserMySQL.hasOne(BonusPunkteMySQL, { foreignKey: "userId" });

export default BonusPunkteMySQL;
