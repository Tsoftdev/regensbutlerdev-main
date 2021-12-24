import asyncHandler from "express-async-handler";
//import User from "../models/userModel.js";
import UserMySQL from "../models/userModelMySQL.js";
import generateToken from "../utils/generateToken.js";
import sgMail from "@sendgrid/mail";
import nodemailer from "nodemailer";
import TokenMySQL from "../models/tokenMySQL.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import pkg, { Sequelize } from "sequelize";
var mailFlag = false;
const { Op } = pkg;

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await UserMySQL.findOne({ where: { email: email } });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user.id,
      vorname: user.vorname,
      nachname: user.nachname,
      birthday: user.birthday,
      adresse: user.adresse,
      adresszusatz: user.adresszusatz,
      stockwerk: user.stockwerk,
      apartment: user.apartment,
      wohnort: user.wohnort,
      plz: user.plz,
      email: user.email,
      isAdmin: user.isAdmin,
      isRegister: user.isRegister,
      bonus: user.bonus,
      token: generateToken(user.id),
    });
  } else {
    res.status(401);
    throw new Error("Falscher Benutzername oder falsches Passwort:");
  }
});

// @desc password validate
// @route POST /api/users/matchPassword
// @access private
const validatePassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await UserMySQL.findOne({ where: { email: email } });

  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      status: true,
    });
  } else {
    res.status(201).json({
      status: false,
    });
  }
});

// @desc Register a new user
// @route POST /api/users
// @access Public

const registerUser = asyncHandler(async (req, res) => {
  const {
    vorname,
    nachname,
    birthday,
    adresse,
    plz,
    wohnort,
    telefon,
    adresszusatz,
    stockwerk,
    apartment,
    email,
    password,
    secret,
  } = req.body;
  const userExists = await UserMySQL.findOne({ where: { email: email } });

  if (userExists) {
    res.status(400);
    throw new Error("Der Benutzer existiert bereits");
  }
  if (
    vorname === "" ||
    nachname === "" ||
    birthday === "" ||
    adresse === "" ||
    wohnort === "" ||
    email === "" ||
    password === "" ||
    telefon === ""
  ) {
    res.status(400);
    throw new Error("Es wurden nicht alle Angaben korrekt übermittelt");
  }
  const salt = await bcrypt.genSalt(Number(process.env.SALT_NUM));
  const newPW = await bcrypt.hash(password, salt);
  const user = await UserMySQL.create({
    vorname: vorname,
    nachname: nachname,
    birthday: birthday,
    adresse: adresse,
    adresszusatz: adresszusatz,
    stockwerk: stockwerk,
    apartment: apartment,
    wohnort: wohnort,
    plz: plz,
    telefon: telefon,
    email: email,
    passwort: newPW,
  });

  if (user) {
    handleSendMail(secret, email);
    res.status(201).json({
      _id: user.id,
      vorname: user.vorname,
      nachname: user.nachname,
      birthday: user.birthday,
      adresse: user.adresse,
      adresszusatz: user.adresszusatz,
      stockwerk: user.stockwerk,
      apartment: user.apartment,
      plz: user.plz,
      wohnort: user.wohnort,
      telefon: user.telefon,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalide Benutzerdaten");
  }
});

const resendMail = asyncHandler(async (req, res) => {
  const { email, secret } = req.body;

  handleSendMail(secret, email);
  res.status(200).json({
    status: true,
  });
});

const handleSendMail = asyncHandler(async (secret, email) => {
  sgMail.setApiKey(
    "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"
  );
  const msg = {
    to: email, // Change to your recipient
    from: "regensbutler-info@walhalla-software-dev.de", // Change to your verified sender
    subject: "regensbutler-info@walhalla-software-dev.de",
    text: `Regensbutler – Dein Verifizierungscode lautet: ${secret}`,
    html: `<div style="min-height:652px; max-width:625px; margin:0 auto; font-family:Roboto;">
		<div style="margin:0 auto; text-align:center; color:#fff; height:135px; justify-content:center; align-items:center;">
			<img alt="" src="https://firebasestorage.googleapis.com/v0/b/firestore-85536.appspot.com/o/android-icon-96x96.png?alt=media&token=776cc626-ada2-4191-b373-124726317ff7" style="width:96px; height:96px;">
		</div>
		<div style="margin:0 auto; text-align:center; color:#000; background:#fff;" >
			<div class="email-verify-body-code">
				<h1 class="title">DEIN VERIFIZIERUNGSCODE LAUTET</h1>
				<h1 class="verify-code">${secret}</h1>
			</div>
			<div class="email-verify-node">
				<h3>Geben Sie diesen Code auf der Anmeldeseite ein um Ihre E-Mail Adresse einmalig zu verifzieren!</h3>
			</div>
		</div>
		<div  style="margin:0 auto; text-align:center; color:#000; padding:20px 0px;">
			<div style="font-size:15px;">Sie haben diese Nachricht erhalten, weil Sie sich mit dieser E-Mail Adresse bei Regensbutler zum ersten Mal anmelden möchten.</div>
			<div style="font-size:15px;">Wenn Sie nicht selbst den Registrierungsvorgang angestoßen haben, können Sie diese Nachricht ignorieren.</div>
			<div style="font-size:15px;">Dein Regensbutler Team</div>
		</div>
	</div>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
      mailFlag = true;
    })
    .catch((error) => {
      console.error("Email sending error--->", error);
      mailFlag = false;
      throw new Error("Email sending error");
    });
});
// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await UserMySQL.findByPk(req.user.id);
  if (user) {
    res.json({
      _id: user.id,
      vorname: user.vorname,
      nachname: user.nachname,
      birthday: user.birthday,
      adresse: user.adresse,
      adresszusatz: user.adresszusatz,
      wohnort: user.wohnort,
      plz: user.plz,
      telefon: user.telefon,
      email: user.email,
      isAdmin: user.isAdmin,
      bonus: user.bonus,
    });
  } else {
    res.status(404);
    throw new Error("Invalid email or password");
  }
});

// @desc Update user register status
// @route PUT /api/users/register-status
// @access Private
const updateUserRegister = asyncHandler(async (req, res) => {
  const user = await UserMySQL.findOne({ where: { email: req.body.email } });
  if (user) {
    const updatedUser = await user.update(
      {
        isRegister: 1,
      },
      { where: { id: req.body.id } }
    );

    res.json({
      _id: updatedUser.id,
      vorname: updatedUser.vorname,
      nachname: updatedUser.nachname,
      adresse: updatedUser.adresse,
      adresszusatz: updatedUser.adresszusatz,
      wohnort: updatedUser.wohnort,
      plz: updatedUser.plz,
      telefon: updatedUser.telefon,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isRegister: updatedUser.isRegister,
      token: generateToken(updatedUser.id),
    });
  } else {
    res.status(404);
    throw new Error("Benutzer wurde nicht gefunden");
  }
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await UserMySQL.findByPk(req.user.id);
  if (user) {
    user.vorname = req.body.vorname || user.vorname;
    user.nachname = req.body.nachname || user.nachname;
    user.birthday = req.body.newbirthday || user.birthday;
    user.adresse = req.body.adresse || user.adresse;
    user.adresszusatz = req.body.adresszusatz || user.adresszusatz;
    user.wohnort = req.body.wohnort || user.wohnort;
    user.plz = req.body.plz || user.plz;
    user.telefon = req.body.telefon || user.telefon;
    // user.email = req.body.email || user.email;
    if (req.body.newPassword) {
      const salt = await bcrypt.genSalt(Number(process.env.SALT_NUM));
      const newPW = await bcrypt.hash(req.body.newPassword, salt);
      user.passwort = newPW;
    }

    const updatedUser = await user.update(
      {
        vorname: user.vorname,
        nachname: user.nachname,
        birthday: user.birthday,
        adresse: user.adresse,
        adresszusatz: user.adresszusatz,
        wohnort: user.wohnort,
        plz: user.plz,
        telefon: user.telefon,
        email: user.email,
        passwort: user.passwort,
      },
      { where: { id: req.user.id } }
    );

    const sendMail = async () => {
      let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      });

      let info = await transporter.sendMail({
        from: "regensbutler-info@walhalla-software-dev.de",
        to: updatedUser.email,
        subject: "Regensbutler - Änderung Ihrer Accountdaten",
        text: "Information: Ihre Accountdaten wurde geändert. Wenn Sie die Änderung selbst vorgenommen haben, ist keine Aktion erforderlich.",
        html: "<h3>Accountdatenänderung bei Regensbutler</h3><p>Wenn Sie die Änderung selbst vorgenommen, haben ist keine Aktion erforderlich.</p><p>Wenn Sie selbst keine Änderung vorgenommen haben, melden Sie sich bitte bei uns, um Accountmissbrauch zu vermeiden.<br/>Dein Regensbutler-Team",
      });
      console.log("Message sent: %s", info.message);
    };
    sendMail().catch(console.error);

    res.json({
      _id: updatedUser.id,
      vorname: updatedUser.vorname,
      nachname: updatedUser.nachname,
      birthday: updatedUser.birthday,
      adresse: updatedUser.adresse,
      adresszusatz: updatedUser.adresszusatz,
      wohnort: updatedUser.wohnort,
      plz: updatedUser.plz,
      telefon: updatedUser.telefon,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser.id),
    });
  } else {
    res.status(404);
    throw new Error("Benutzer wurde nicht gefunden");
  }
});

// @desc GET all users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await UserMySQL.findAll();
  res.json(users);
});

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await UserMySQL.findByPk(req.params.id);
  if (user) {
    await user.destroy();
    res.json({ message: "Benutzer gelöscht" });
  } else {
    res.status(404);
    throw new Error("Benutzer nicht gefunden");
  }
});

// @desc GET user by ID
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await UserMySQL.findByPk(req.params.id, {
    attributes: { exclude: ["passwort"] },
  });
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("Benutzer nicht gefunden: getUserById");
  }
});

// @desc Update user
// @route PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await UserMySQL.findByPk(req.params.id);

  if (user) {
    user.vorname = req.body.vorname || user.vorname;
    user.nachname = req.body.nachname || user.nachname;
    user.adresse = req.body.adresse || user.adresse;
    user.adresszusatz = req.body.adresszusatz || user.adresszusatz;
    user.wohnort = req.body.wohnort || user.wohnort;
    user.plz = req.body.plz || user.plz;
    user.telefon = req.body.telefon || user.telefon;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.update(
      {
        vorname: user.vorname,
        nachname: user.nachname,
        adresse: user.adresse,
        adresszusatz: user.adresszusatz,
        wohnort: user.wohnort,
        plz: user.plz,
        telefon: user.telefon,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      { where: { id: req.params.id } }
    );

    res.json({
      _id: updatedUser.id,
      vorname: updatedUser.vorname,
      nachname: updatedUser.nachname,
      adresse: updatedUser.adresse,
      adresszusatz: updatedUser.adresszusatz,
      wohnort: updatedUser.wohnort,
      plz: updatedUser.plz,
      telefon: updatedUser.telefon,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("Benutzer wurde nicht gefunden");
  }
});

// @desc Update user for bonus
// @route PUT /api/users/:id/bonus
// @access Private/Admin
const updateUserTobonus = asyncHandler(async (req, res) => {
  const user = await UserMySQL.findByPk(req.params.id);
  var bonus = 0;
  if (req.body.bonus > 0) {
    if (Number(req.body.bonus) + Number(user.bonus) < 250)
      bonus = Number(req.body.bonus) + Number(user.bonus);
    else
      bonus = 250;
  }
  else {
    if (Number(req.body.bonus) + Number(user.bonus) > -250)
      bonus = Number(req.body.bonus) + Number(user.bonus);
    else
      bonus = -250;
  }
  if (user) {
    await user.update(
      {
        bonus: bonus,
      },
      { where: { id: req.params.id } }
    );

    return res.status(200).json({
      status: true,
    });
  } else {
    res.status(404);
    throw new Error("Benutzer wurde nicht gefunden");
  }
});

const userValidate = asyncHandler(async (req, res) => {
  const user = await UserMySQL.findOne({ where: { email: req.body.email } });
  if (user) {
    res.status(200).json({
      status: true,
    });
  } else {
    res.status(200).json({
      status: false,
    });
  }
});

// @desc resetUserPw user
// @route PUT /api/users/reset-pw
// @access Public
const resetUserPw = asyncHandler(async (req, res) => {
  const user = await UserMySQL.findOne({ where: { email: req.body.email } });
  if (user) {
    let token = await TokenMySQL.findOne({ where: { userId: user.id } });
    if (token) {
      console.log("Token existiert bereits");
      await TokenMySQL.destroy({ where: { userId: user.id } });
    }
    console.log("Token existiert noch nicht");
    let resetToken = crypto.randomBytes(32).toString("hex");

    const hash = await bcrypt.hash(resetToken, Number("10"));
    let expireDate = new Date();
    expireDate.setHours(expireDate.getHours() + 3);

    console.log("Token erzeugt", expireDate);
    await TokenMySQL.create({
      userId: user.id,
      tokenExpires: expireDate,
      token: hash,
      email: user.email,
    });

    const sendMail = async () => {
      let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      });

      let info = await transporter.sendMail({
        from: "regensbutler-info@walhalla-software-dev.de",
        to: user.email,
        subject: "Regensbutler - Passwort Reset",
        text:
          "Hier finden Sie einen Link um Ihr Passwort zurückzusetzen.\nKopieren Sie folgenden Link und fügen Sie ihn in das URL Eingabefeld Ihres Browers ein.\nDer Link ist 1 Stunde gültig.\n\nhttp://" +
          process.env.DOMAIN +
          "/passwort-reset?token=" +
          encodeURIComponent(resetToken) +
          "&email=" +
          user.email,
        html:
          '<h2>Passwort Reset Link:</h2><p>Rufen Sie folgenden Link auf um Ihr Passwort zurückzusetzen (1 Stunde gültig):</p><br/><br/><a href="http://' +
          process.env.DOMAIN +
          "/passwort-reset?token=" +
          encodeURIComponent(resetToken) +
          "&email=" +
          user.email +
          '" target="_blank">Passwort erneuern</a>' +
          "<p>Grüße, dein Regensbutler-Team</p>",
      });
    };
    sendMail().catch(console.error);
    return res.json({ status: "ok" });

    //Generate Token and Save to DB
    //If exists yet, delete replace
    //Generate Link
    //Email Link to User
    //Redirect to Login/Or PW Reset
  } else {
    res.json({ status: "ok" });
  }
});

const changeUserPw = asyncHandler(async (req, res) => {
  console.log("Zerstöre abgelaufene Tokens");
  const tokenDestroyed = await TokenMySQL.destroy({
    where: {
      tokenExpires: {
        [Op.lt]: Sequelize.fn("CURDATE"),
      },
    },
  });
  if (tokenDestroyed) {
    console.log("Token zerstört die abgelaufen sind");
  }
  if (req.body.pw !== req.body.pwAgain) {
    return res.status(404).json({
      status: "error",
      message: "Passwörter sind nicht gleich",
    });
  }
  if (!req.body.email || !req.body.token) {
    return res.status(404).json({
      status: "error",
      message: "Keine E-Mail oder Token",
    });
  }

  console.log("Suche richtiges Token:", req.body.token);
  const record = await TokenMySQL.findOne({
    where: {
      email: req.body.email,
      tokenExpires: { [Op.gt]: Sequelize.fn("CURDATE") },
    },
  });
  if (!record) {
    console.log("Richtiges Token nicht gefunden");
    return res
      .status(404)
      .json({ status: "error", message: "Kein gültiges Token" });
  }

  const isValid = await bcrypt.compare(req.body.token, record.token);
  if (!isValid) {
    return res.status(404).json({
      status: "error",
      message: "Kein gültiges Token (Validation)",
    });
  }
  const salt = await bcrypt.genSalt(Number(process.env.SALT_NUM));
  const newPW = await bcrypt.hash(req.body.pw, salt);

  const userUpdated = await UserMySQL.update(
    { passwort: newPW },
    { where: { email: req.body.email, id: record.userId } }
  );
  if (userUpdated) {
    return res.json({ status: "ok", message: "Benutzer aktualisiert" });
  }
});

export {
  authUser,
  getUserProfile,
  registerUser,
  resendMail,
  updateUserProfile,
  updateUserRegister,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  resetUserPw,
  userValidate,
  changeUserPw,
  validatePassword,
  updateUserTobonus,
};
