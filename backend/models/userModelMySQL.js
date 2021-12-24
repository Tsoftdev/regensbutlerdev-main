import Sequelize from "sequelize";
import sequelize from "../config/mysqldb.js";
import bcrypt from "bcryptjs";
import OrderMySQL from "./orderModelMySQL.js";

const UserMySQL = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  vorname: Sequelize.STRING,
  nachname: Sequelize.STRING,
  birthday: Sequelize.DATE,
  ageVerified: {
    type: Sequelize.BOOLEAN,
    defaultValue: 0,
  },
  adresse: Sequelize.STRING,
  plz: Sequelize.INTEGER,
  wohnort: Sequelize.STRING,
  adresszusatz: Sequelize.STRING,
  stockwerk: Sequelize.STRING,
  apartment: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  passwort: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  telefon: Sequelize.STRING,
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: 0,
  },
  isRegister: {
    type: Sequelize.BOOLEAN,
    defaultValue: 0,
  },
  bonus: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
  },
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
});

UserMySQL.prototype.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.passwort);
};

// UserMySQL.beforeSave(async (user, options) => {
//   const salt = await bcrypt.genSalt(Number(process.env.SALT_NUM));
//   user.passwort = await bcrypt.hash(user.passwort, salt);
// });

UserMySQL.hasMany(OrderMySQL, { foreignKey: "userId" });
OrderMySQL.belongsTo(UserMySQL);

export default UserMySQL;
