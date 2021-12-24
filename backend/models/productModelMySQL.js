import Sequelize from "sequelize";
import sequelize from "../config/mysqldb.js";

const ProductMySQL = sequelize.define(
  "products",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    product_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      unique: true,
    },
    express_sortiment: Sequelize.BOOLEAN,
    voll_sortiment: Sequelize.BOOLEAN,
    product_lager_id: Sequelize.BIGINT,
    produktname: { type: Sequelize.STRING, allowNull: false },
    beschreibung: Sequelize.TEXT, // description
    ek: Sequelize.DOUBLE, // buyer price .. not needed for website
    vk: Sequelize.DOUBLE, // selling price
    ustr: Sequelize.DOUBLE, // tax e.g. 0.19, 19 percent tax
    Verpackungsinhalt: Sequelize.STRING, // package information
    Verpackungseinheit: Sequelize.STRING, // package art e.g. six pack, 12x1 or something
    lagerbestand: Sequelize.BIGINT, // inventory of the product / how much currently available
    lagerueberwachung: Sequelize.BOOLEAN, // not needed
    kat_id: Sequelize.BIGINT, // not needed
    kategorie: Sequelize.STRING, // category
    unterkategorie: Sequelize.STRING, // subcategory
    direktkategorie: Sequelize.STRING, // directkategory
    pfand: Sequelize.DOUBLE, // pledge for the product
    gewicht: Sequelize.DOUBLE, // weight
    kalorien: Sequelize.STRING, // calories
    verpackung: Sequelize.STRING, // packaging
    bildname: Sequelize.STRING, // image name => PRODUCT_ID.PNG
    bildname_inhaltsstoffe: Sequelize.STRING, // image for ingredients
    neu_grundpreis: Sequelize.DOUBLE, // not needed
    neu_inhaltsstoffe: Sequelize.TEXT, // ingredients
    neu_zusatzst: Sequelize.TEXT, // special ingredients
    neu_naehrwerte: Sequelize.TEXT, // nutritional values
    neu_pflichthinweis: Sequelize.TEXT, // a special hint done by the customer
    numReviews: Sequelize.BIGINT, // old rating sum
    rating: Sequelize.FLOAT, // old rating value
    tiefkuehlware: Sequelize.BOOLEAN, // frozen product
    kasten: Sequelize.BOOLEAN, // is this a box? => 12 x 1 liter cola e.g.
    trockenware: Sequelize.BOOLEAN, // dry article
    kuehlware: Sequelize.BOOLEAN, // cooled article
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
    pictureurl: {
      type: Sequelize.STRING,
      defaultValue:
        "https://www.walhalla-software-dev.de/regensbutler_product_images/",
    },
    Altersgrenze: Sequelize.INTEGER, // adult product? from 18 like alcohole
  },
  {
    freezeTableName: true,
    define: { charset: "utf-8", collate: "utf8mb4_unicode_ci" },
  }
);

export default ProductMySQL;
