import Sequelize from "sequelize";
import sequelize from "../config/mysqldb.js";

const OrderItemsMySQL = sequelize.define(
  "orderItems",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    star: {
      type: Sequelize.FLOAT,
    },
    productId: {
      type: Sequelize.INTEGER,
    },
    qty: { type: Sequelize.INTEGER },
    vk: { type: Sequelize.DOUBLE },
    produktname: { type: Sequelize.STRING },
    pictureurl: { type: Sequelize.STRING },
    bildname: { type: Sequelize.STRING },
    pfand: { type: Sequelize.DOUBLE },
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
  }
);

export default OrderItemsMySQL;
