import asyncHandler from "express-async-handler";
import FrequentiesMySQL from "../models/frequentyModelMySQL.js";
import FrequentyDateTimeMySQL from "../models/frequentydateTimeModelMySQL.js";


// @desc Fetch Per all Frequenties
// @route GET /api/perfrequenties
// @access private
const getPerFrequenties = asyncHandler(async (req, res) => {
  const frequenties = await FrequentiesMySQL.findAll({
    where: { userId: req.params.id },
  });
  if (frequenties) {
    res.json({
      data: frequenties,
      status: true
    });
  } else {
    res.status(404);
    throw new Error("frequenties not found");
  }
});

// @desc Fetch all Frequenties
// @route GET /api/frequenties
// @access private
const getFrequenties = asyncHandler(async (req, res) => {
  const frequenties = await FrequentiesMySQL.findAll();

  if (frequenties) {
    res.json({
      data: frequenties,
      status: true
    });
  } else {
    res.status(404);
    throw new Error("frequenties not found");
  }
});

// @desc Create single Frequenties
// @route POST /api/frequenties
// @access Private
const createFrequenty = asyncHandler(async (req, res) => {
  const {
    orderItems,
    daysNum,
    timeAt,
    userId
  } = req.body;

  const delRes = await FrequentiesMySQL.destroy({ where: { userId: userId } })
  console.log('orderItemsCreated--->', delRes)

  const orderItemsArray = [];
  for (let i = 0; i < orderItems.length; i++) {
    let tmpObj = {
      product_id: orderItems[i].product_id,
      userId: orderItems[i].userId,
      count: orderItems[i].count,
      daysNum: daysNum,
      timeAt: timeAt,
      express_sortiment: orderItems[i].express_sortiment,
      voll_sortiment: orderItems[i].voll_sortiment,
      product_lager_id: orderItems[i].product_lager_id,
      produktname: orderItems[i].produktname,
      beschreibung: orderItems[i].beschreibung,
      ek: orderItems[i].ek,
      vk: orderItems[i].vk,
      ustr: orderItems[i].ustr,
      Verpackungsinhalt: orderItems[i].Verpackungsinhalt,
      Verpackungseinheit: orderItems[i].Verpackungseinheit,
      lagerbestand: orderItems[i].lagerbestand,
      kategorie: orderItems[i].kategorie,
      unterkategorie: orderItems[i].unterkategorie,
      direktkategorie: orderItems[i].direktkategorie,
      pfand: orderItems[i].pfand,
      gewicht: orderItems[i].gewicht,
      kalorien: orderItems[i].kalorien,
      verpackung: orderItems[i].verpackung,
      bildname: orderItems[i].bildname,
      bildname_inhaltsstoffe: orderItems[i].bildname_inhaltsstoffe,
      neu_inhaltsstoffe: orderItems[i].neu_inhaltsstoffe,
      neu_zusatzst: orderItems[i].neu_zusatzst,
      neu_naehrwerte: orderItems[i].neu_naehrwerte,
      neu_pflichthinweis: orderItems[i].neu_pflichthinweis,
      numReviews: orderItems[i].numReviews,
      rating: orderItems[i].rating,
      tiefkuehlware: orderItems[i].tiefkuehlware,
      kasten: orderItems[i].kasten,
      trockenware: orderItems[i].trockenware,
      kuehlware: orderItems[i].kuehlware,
      pictureurl: orderItems[i].pictureurl,
      Altersgrenze: orderItems[i].Altersgrenze,
    };
    orderItemsArray.push(tmpObj);
  }

  const orderItemsCreated = await FrequentiesMySQL.bulkCreate(orderItemsArray);
  if (orderItemsCreated) {
    res.status(201).json({
      data: orderItemsArray,
      status: true
    });
  } else {
    res.status(404);
    throw new Error("Liefergebiete not found");
  }
});


// @desc Delete single Frequenty item
// @route DELETE /api/frequenties/:id
// @access Private
const deleteFrequenty = asyncHandler(async (req, res) => {
  const result = await FrequentiesMySQL.findByPk(req.params.id);

  if (result) {
    await result.destroy();
    const dateitems = await FrequentiesMySQL.findAll();
    if (dateitems) {
      res.status(201).json({
        data: dateitems,
        status: true
      });
    } else {
      res.status(404);
      throw new Error("Liefergebiete not found");
    }
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});




const getPerFrequentyDateTime = asyncHandler(async (req, res) => {
  const frequentydatetime = await FrequentyDateTimeMySQL.findOne({
    where: { userId: req.params.id }
  });

  if (frequentydatetime) {
    res.json({
      dataTime: frequentydatetime,
      status: true
    });
  } else {
    res.status(404);
    throw new Error("frequenties not found");
  }
});

const createFrequentyDateTime = asyncHandler(async (req, res) => {
  const {
    id,
    deliveryDay,
    deliveryTime
  } = req.body;
  const existItem = await FrequentyDateTimeMySQL.findOne({
    where: { userId: id }
  });
  if (existItem) {
    const updated = await FrequentyDateTimeMySQL.update(
      {
        deliveryDay: deliveryDay,
        deliveryTime: deliveryTime
      },
      { where: { userId: id } }
    );
    const Item = await FrequentyDateTimeMySQL.findOne({
      where: { userId: id }
    });
    res.json({
      dataTime: Item,
      status: true
    });
  }
})

export {
  getFrequenties,
  getPerFrequenties,
  createFrequenty,
  deleteFrequenty,
  getPerFrequentyDateTime,
  createFrequentyDateTime
};
