import dotenv from "dotenv";
import pkg from "sequelize";

const { Sequelize } = pkg;
dotenv.config();

//logging: false im Prodction Mode
//Models Einbinden um SQL CREATE TABLE IF NOT EXISTS

const sequelize = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYSQL_PW,
  {
    dialect: "mysql",
    host: process.env.MYSQL_HOST,
    pool: {
      max: 10,
      idle: 30000,
      acquire: 60000,
    },
    logging: false,
  }
);

export default sequelize;
