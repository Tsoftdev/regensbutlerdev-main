import Sequelize from "sequelize";
import sequelize from "../config/mysqldb.js";

const DeliveryDateMySQL = sequelize.define(
  "deliverydate",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dateAt: Sequelize.INTEGER,
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

export default DeliveryDateMySQL;
