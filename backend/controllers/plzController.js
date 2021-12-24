import asyncHandler from "express-async-handler";
import PlzMySQL from "../models/plzModelMySQL.js";


// @desc Fetch all liefergebiete
// @route GET /api/liefergebiete
// @access Public
const getLiefergebiete = asyncHandler(async (req, res) => {
  const liefergebiete = await PlzMySQL.findAll();

  if (liefergebiete) {

    res.json(liefergebiete);
  } else {
    res.status(404);
    throw new Error("Liefergebiete not found");
  }
})


// @desc check exist or not in liefergebiete
// @route GET /api/liefergebiete/checkExist
// @access private
const checkExist = asyncHandler(async (req, res) => {
  const plzs = await PlzMySQL.findOne({
    where: { plz: req.body.plz },
  });
  if (plzs) {
    res.status(200).json({ status: true });
  } else {
    res.status(200).json({ status: false });
  }
});

export {
  getLiefergebiete,
  checkExist
};