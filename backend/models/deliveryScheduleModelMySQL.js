import Sequelize from "sequelize";
import sequelize from "../config/mysqldb.js";

const DeliveryTimeMySQL = sequelize.define(
  "deliverytime",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    flag: Sequelize.STRING,
    day: Sequelize.STRING,
    timeAt: Sequelize.STRING,
    daysNum: Sequelize.INTEGER,
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      field: "created_at",
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      onUpdate: Sequelize.NOW,
      field: "updated_at",
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default DeliveryTimeMySQL;
