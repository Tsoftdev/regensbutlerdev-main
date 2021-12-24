import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import ProductMySQL from "../models/productModelMySQL.js";
import sequelize from "../config/mysqldb.js";
import pkg from "sequelize";
const { Op, QueryTypes } = pkg;

// @desc Fetch all products for admin
// @route GET /api/products/admin
// @access Public
const getProductsAdmin = asyncHandler(async (req, res) => {
  const pageSize = 20;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword.trim() || "";

  const key_kat = req.query.key_kat.trim() || "";

  const key_ukat = req.query.key_ukat.trim() || "";

  const key_dkat = req.query.key_dkat.trim() || "";

  const { count, rows: products } = await ProductMySQL.findAndCountAll({
    where: {
      [Op.and]: [
        { produktname: { [Op.like]: `%${keyword}%` } },
        { kategorie: { [Op.like]: `%${key_kat}%` } },
        { unterkategorie: { [Op.like]: `%${key_ukat}%` } },
        { direktkategorie: { [Op.like]: `%${key_dkat}%` } },
      ],
    },
    offset: pageSize * (page - 1),
    limit: pageSize,
    order: [
      ["produktname", "ASC"],
      ["express_sortiment", "DESC"],
    ],
  });
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});


// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 20;
  const page = Number(req.query.pageNumber) || 1;

  const type = req.query.type.trim() || "";

  const keyword = req.query.keyword.trim() || "";

  const key_kat = req.query.key_kat.trim() || "";

  const key_ukat = req.query.key_ukat.trim() || "";

  const key_dkat = req.query.key_dkat.trim() || "";

  const { count, rows: products } = await ProductMySQL.findAndCountAll({
    where: {
      [Op.and]: [
        { produktname: { [Op.like]: `%${keyword}%` } },
        { kategorie: { [Op.like]: `%${key_kat}%` } },
        { unterkategorie: { [Op.like]: `%${key_ukat}%` } },
        { direktkategorie: { [Op.like]: `%${key_dkat}%` } },
        type === "PRIO" ? { express_sortiment: 1 } : { voll_sortiment: 1 }
      ],
    },
    offset: pageSize * (page - 1),
    limit: pageSize,
    order: [
      ["produktname", "ASC"],
      ["express_sortiment", "DESC"],
    ],
  });
  /*const count = await Product.countDocuments({
    $and: [{ ...keyword }, { ...key_kat }, { ...key_ukat }, { ...key_dkat }],
  });

  const products = await Product.find({
    $and: [{ ...keyword }, { ...key_kat }, { ...key_ukat }, { ...key_dkat }],
  })
    .limit(pageSize)
    .skip(pageSize * (page - 1));*/

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc Fetch single products
// @route GET /api/products/id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await ProductMySQL.findByPk(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc Delete single products
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await ProductMySQL.findByPk(req.params.id);

  if (product) {
    await product.destroy();
    res.json({ message: "Artikel entfernt" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});


// @desc Create single products
// @route POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    user: req.user._id,
    express_sortiment: false,
    voll_sortiment: true,
    product_id: 0,
    product_lager_id: 0,
    produktname: "to be defined",
    beschreibung: "to be defined",
    ek: 0,
    vk: 0,
    ustr: 0.05,
    lagerbestand: 0,
    lagerueberwachung: false,
    kat_id: 0,
    bestell_moeglichkeit_MO: false,
    bestell_moeglichkeit_DI: false,
    bestell_moeglichkeit_MI: false,
    bestell_moeglichkeit_DO: false,
    bestell_moeglichkeit_FR: false,
    bestell_moeglichkeit_SA: false,
    bestell_moeglichkeit_SO: false,
    nur_von_tag: "to be defined",
    bis_tag: "to be defined",
    zwischen_zeit_von: "to be defined",
    zwischen_zeit_bis: "to be defined",
    abogeeignet: false,
    pfand: 0,
    gewicht: "to be defined",
    kalorien: "to be defined",
    verpackung: "to be defined",
    bildname: "to be defined",
    neu_grundpreis: "to be defined",
    neu_inhaltsst: "to be defined",
    neu_zusatzst: "to be defined",
    neu_naehrwerte: "to be defined",
    neu_pflichthinweis: "to be defined",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc Update single products
// @route PUT /api/products
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const product = await ProductMySQL.findByPk(req.params.id);
  if (product) {
    product.product_id = req.body.product_id || product.product_id;
    product.express_sortiment = req.body.express_sortiment || product.express_sortiment;
    product.voll_sortiment = req.body.voll_sortiment || product.voll_sortiment;
    product.product_lager_id = req.body.product_lager_id || product.product_lager_id;
    product.produktname = req.body.produktname || product.produktname;
    product.beschreibung = req.body.beschreibung || product.beschreibung;
    product.ek = req.body.ek || product.ek;
    product.vk = req.body.vk || product.vk;
    product.ustr = req.body.ustr || product.ustr;
    product.lagerbestand = req.body.lagerbestand || product.lagerbestand;
    product.lagerueberwachung = req.body.lagerueberwachung || product.lagerueberwachung;
    product.kat_id = req.body.kat_id || product.kat_id;
    product.bestell_moeglichkeit_MO = req.body.bestell_moeglichkeit_MO || product.bestell_moeglichkeit_MO;
    product.bestell_moeglichkeit_DI = req.body.bestell_moeglichkeit_DI || product.bestell_moeglichkeit_DI;
    product.bestell_moeglichkeit_MI = req.body.bestell_moeglichkeit_MI || product.bestell_moeglichkeit_MI;
    product.bestell_moeglichkeit_DO = req.body.bestell_moeglichkeit_DO || product.bestell_moeglichkeit_DO;
    product.bestell_moeglichkeit_FR = req.body.bestell_moeglichkeit_FR || product.bestell_moeglichkeit_FR;
    product.bestell_moeglichkeit_SA = req.body.bestell_moeglichkeit_SA || product.bestell_moeglichkeit_SA;
    product.bestell_moeglichkeit_SO = req.body.bestell_moeglichkeit_SO || product.bestell_moeglichkeit_SO;
    product.nur_von_tag = req.body.nur_von_tag || product.nur_von_tag;
    product.bis_tag = req.body.bis_tag || product.bis_tag;
    product.zwischen_zeit_von = req.body.zwischen_zeit_von || product.zwischen_zeit_von;
    product.zwischen_zeit_bis = req.body.zwischen_zeit_bis || product.zwischen_zeit_bis;
    product.abogeeignet = req.body.abogeeignet || product.abogeeignet;
    product.pfand = req.body.pfand || product.pfand;
    product.gewicht = req.body.gewicht || product.gewicht;
    product.kalorien = req.body.kalorien || product.kalorien;
    product.verpackung = req.body.verpackung || product.verpackung;
    product.bildname = req.body.bildname || product.bildname;
    product.neu_grundpreis = req.body.neu_grundpreis || product.neu_grundpreis;
    product.neu_inhaltsst = req.body.neu_inhaltsst || product.neu_inhaltsst;
    product.neu_zusatzst = req.body.neu_zusatzst || product.neu_zusatzst;
    product.neu_naehrwerte = req.body.neu_naehrwerte || product.neu_naehrwerte;
    product.neu_pflichthinweis = req.body.neu_pflichthinweis || product.neu_pflichthinweis;

    const updatedProduct = await product.update(
      {
        product_id: product.product_id,
        express_sortiment: product.express_sortiment,
        voll_sortiment: product.voll_sortiment,
        product_lager_id: product.product_lager_id,
        produktname: product.produktname,
        beschreibung: product.beschreibung,
        ek: product.ek,
        vk: product.vk,
        ustr: product.ustr,
        lagerbestand: product.lagerbestand,
        lagerueberwachung: product.lagerueberwachung,
        kat_id: product.kat_id,
        bestell_moeglichkeit_MO: product.bestell_moeglichkeit_MO,
        bestell_moeglichkeit_DI: product.bestell_moeglichkeit_DI,
        bestell_moeglichkeit_MI: product.bestell_moeglichkeit_MI,
        bestell_moeglichkeit_DO: product.bestell_moeglichkeit_DO,
        bestell_moeglichkeit_FR: product.bestell_moeglichkeit_FR,
        bestell_moeglichkeit_SA: product.bestell_moeglichkeit_SA,
        bestell_moeglichkeit_SO: product.bestell_moeglichkeit_SO,
        nur_von_tag: product.nur_von_tag,
        bis_tag: product.bis_tag,
        zwischen_zeit_von: product.zwischen_zeit_von,
        zwischen_zeit_bis: product.zwischen_zeit_bis,
        abogeeignet: product.abogeeignet,
        pfand: product.pfand,
        gewicht: product.gewicht,
        kalorien: product.kalorien,
        verpackung: product.verpackung,
        bildname: product.bildname,
        neu_grundpreis: product.neu_grundpreis,
        neu_inhaltsst: product.neu_inhaltsst,
        neu_zusatzst: product.neu_zusatzst,
        neu_naehrwerte: product.neu_naehrwerte,
        neu_pflichthinweis: product.neu_pflichthinweis
      },
      { where: { id: req.params.id } }
    );
    res.json({
      product_id: updatedProduct.product_id,
      express_sortiment: updatedProduct.express_sortiment,
      voll_sortiment: updatedProduct.voll_sortiment,
      product_lager_id: updatedProduct.product_lager_id,
      produktname: updatedProduct.produktname,
      beschreibung: updatedProduct.beschreibung,
      ek: updatedProduct.ek,
      vk: updatedProduct.vk,
      ustr: updatedProduct.ustr,
      lagerbestand: updatedProduct.lagerbestand,
      lagerueberwachung: updatedProduct.lagerueberwachung,
      kat_id: updatedProduct.kat_id,
      bestell_moeglichkeit_MO: updatedProduct.bestell_moeglichkeit_MO,
      bestell_moeglichkeit_DI: updatedProduct.bestell_moeglichkeit_DI,
      bestell_moeglichkeit_MI: updatedProduct.bestell_moeglichkeit_MI,
      bestell_moeglichkeit_DO: updatedProduct.bestell_moeglichkeit_DO,
      bestell_moeglichkeit_FR: updatedProduct.bestell_moeglichkeit_FR,
      bestell_moeglichkeit_SA: updatedProduct.bestell_moeglichkeit_SA,
      bestell_moeglichkeit_SO: updatedProduct.bestell_moeglichkeit_SO,
      nur_von_tag: updatedProduct.nur_von_tag,
      bis_tag: updatedProduct.bis_tag,
      zwischen_zeit_von: updatedProduct.zwischen_zeit_von,
      zwischen_zeit_bis: updatedProduct.zwischen_zeit_bis,
      abogeeignet: updatedProduct.abogeeignet,
      pfand: updatedProduct.pfand,
      gewicht: updatedProduct.gewicht,
      kalorien: updatedProduct.kalorien,
      verpackung: updatedProduct.verpackung,
      bildname: updatedProduct.bildname,
      neu_grundpreis: updatedProduct.neu_grundpreis,
      neu_inhaltsst: updatedProduct.neu_inhaltsst,
      neu_zusatzst: updatedProduct.neu_zusatzst,
      neu_naehrwerte: updatedProduct.neu_naehrwerte,
      neu_pflichthinweis: updatedProduct.neu_pflichthinweis
    });
  } else {
    res.status(404);
    throw new Error("Benutzer wurde nicht gefunden");
  }
});


// @desc Update single products
// @route PUT /api/products
// @access Private/Admin
const updateProductRating = asyncHandler(async (req, res) => {
  const product = await ProductMySQL.findOne({
    where: { id: req.params.id },
  });
  if (product) {
    product.rating = (req.body.rating + product.rating) / 2 || product.rating;
    product.numReviews = product.numReviews + 1;

    const updatedProduct = await product.update(
      {
        rating: product.rating,
        numReviews: product.numReviews
      },
      { where: { id: req.params.id } }
    );
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Benutzer wurde nicht gefunden");
  }
});

// @desc Create new review
// @route POST /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Artikel bereits bewertet");
    }

    const review = {
      name: req.user.vorname,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Bewertung abgegeben" });
  } else {
    res.status(404);
    throw new Error("Artikel nicht gefunden");
  }
});

// @Get top rated products
// @route GET /api/products/top
// @access Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(4);
  res.json(products);
});

//KATEGORIEABFRAGEN
const getCategories = asyncHandler(async (req, res) => {
  let kategorien = [];

  //1. Kategorien holen
  const hauptkategorien = await sequelize.query(
    "SELECT DISTINCT kategorie FROM `products`",
    { type: QueryTypes.SELECT }
  );

  console.log("-----------------------------------",hauptkategorien.length);

  for (let i = 0; i < hauptkategorien.length; i++) {
    let unterkategorien = await sequelize.query(
      "SELECT DISTINCT unterkategorie FROM products WHERE kategorie = :hk",
      {
        replacements: { hk: hauptkategorien[i].kategorie },
        type: QueryTypes.SELECT,
      }
    );

    let tempLinks = [];

    for (let j = 0; j < unterkategorien.length; j++) {
      let direktkategorien = await sequelize.query(
        "SELECT DISTINCT direktkategorie FROM `products` WHERE `kategorie` LIKE :hk AND `unterkategorie` LIKE :uk",
        {
          replacements: {
            hk: hauptkategorien[i].kategorie,
            uk: unterkategorien[j].unterkategorie,
          },
          type: QueryTypes.SELECT,
        }
      );

      let tempSubLinks = [];
      for (let x = 0; x < direktkategorien.length; x++) {
        let key_kat = hauptkategorien[i].kategorie || "";

        let key_ukat = unterkategorien[j].unterkategorie || "";

        let key_dkat = direktkategorien[x].direktkategorie || "";

        const { count } = await ProductMySQL.findAndCountAll({
          where: {
            [Op.and]: [
              { kategorie: { [Op.like]: `%${key_kat}%` } },
              { unterkategorie: { [Op.like]: `%${key_ukat}%` } },
              { direktkategorie: { [Op.like]: `%${key_dkat}%` } },
            ],
          },
        });

        tempSubLinks.push({
          title: direktkategorien[x].direktkategorie,
          to: direktkategorien[x].direktkategorie,
          count: count,
        });
      }

      tempLinks.push({
        title: unterkategorien[j].unterkategorie,
        to: unterkategorien[j].unterkategorie,
        sublinks: tempSubLinks,
        open: false,
      });
    }

    kategorien.push({
      name: hauptkategorien[i].kategorie,
      links: tempLinks,
      open: false,
    });
  }

  res.json(kategorien);
});

export {
  getProductsAdmin,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  updateProductRating,
  createProduct,
  createProductReview,
  getTopProducts,
  getCategories,
};
