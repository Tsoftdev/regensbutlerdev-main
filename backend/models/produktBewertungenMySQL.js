import Sequelize from "sequelize";
import sequelize from "../config/mysqldb.js";
import ProductMySQL from "./productModelMySQL.js";

const ProduktBewertungenMySQL = sequelize.define(
  "produktbewertungen",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    info: { type: Sequelize.STRING },
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

ProductMySQL.hasMany(ProduktBewertungenMySQL, { foreignKey: "productId" });

export default ProduktBewertungenMySQL;
