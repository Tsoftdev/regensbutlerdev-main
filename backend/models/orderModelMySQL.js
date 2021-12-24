import Sequelize from "sequelize";
import sequelize from "../config/mysqldb.js";
import OrderItemsMySQL from "./orderItemsMySQL.js";

const OrderMySQL = sequelize.define(
  "bestellungen",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    paymentMethod: { type: Sequelize.STRING },
    shippingAdressAdress: { type: Sequelize.STRING },
    shippingAdressCity: { type: Sequelize.STRING },
    shippingAdressStockwerk: { type: Sequelize.STRING },
    shippingAdressApartment: { type: Sequelize.STRING },
    shippingAdressPostalCode: { type: Sequelize.STRING },
    shippingAdressCountry: { type: Sequelize.STRING },
    paymentResultId: { type: Sequelize.STRING },
    paymentResultStatus: { type: Sequelize.STRING },
    paymentResultUpdate_time: { type: Sequelize.STRING },
    paymentResultEmail_adress: { type: Sequelize.STRING },
    lieferzeitpunkt: { type: Sequelize.STRING },
    itemsPrice: { type: Sequelize.DOUBLE, defaultValue: 0.0 },
    taxPrice: { type: Sequelize.DOUBLE, defaultValue: 0.0 },
    shippingPrice: { type: Sequelize.DOUBLE, defaultValue: 0.0 },
    totalPrice: { type: Sequelize.DOUBLE, defaultValue: 0.0 },
    isPaid: { type: Sequelize.BOOLEAN, defaultValue: false },
    paidAt: { type: Sequelize.STRING },
    isDelivered: { type: Sequelize.BOOLEAN, defaultValue: false },
    deliveredAt: { type: Sequelize.STRING },
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

OrderMySQL.hasMany(OrderItemsMySQL);
OrderItemsMySQL.belongsTo(OrderMySQL, {
  foreignKey: "bestellungenId",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});

export default OrderMySQL;
