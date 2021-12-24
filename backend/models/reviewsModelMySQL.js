import Sequelize from "sequelize";
import sequelize from "../config/mysqldb.js";

const ReviewsMySQL = sequelize.define(
  "reviews",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: Sequelize.INTEGER,
    userId: Sequelize.INTEGER,
    stars: Sequelize.FLOAT,
    reviewComment: Sequelize.TEXT,
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

export default ReviewsMySQL;
