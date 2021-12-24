import Sequelize from "sequelize";
import sequelize from "../config/mysqldb.js";
import UserMySQL from "./userModelMySQL.js";

const AbosMySQL = sequelize.define(
  "abos",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    info: { type: Sequelize.STRING },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

UserMySQL.hasMany(AbosMySQL, { foreignKey: "userId" });

export default AbosMySQL;
