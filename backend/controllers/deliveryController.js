import asyncHandler from "express-async-handler";
import DeliveryScheduleMySQL from "../models/deliveryScheduleModelMySQL.js";
import DeliveryDatesMySQL from "../models/deliveryDateModelMySQL.js";

// @desc Fetch all times
// @route GET /api/times
// @access private
const getDeliverySchedule = asyncHandler(async (req, res) => {
  const deliverySchedules = await DeliveryScheduleMySQL.findAll();

  if (deliverySchedules) {
    res.json({
      data: deliverySchedules,
      status: true
    });
  } else {
    res.status(405);
    throw new Error("deliverySchedules not found");
  }
});

// @desc Create single Times
// @route POST /api/Times
// @access Private
const createDeliverySchedule = asyncHandler(async (req, res) => {
  const {
    flag,
    day,
    timeAt,
    daysNum
  } = req.body;

  const result = await DeliveryScheduleMySQL.create({
    flag: flag,
    day: day,
    timeAt: timeAt,
    daysNum: daysNum
  });

  if (result) {
    const timeitems = await DeliveryScheduleMySQL.findAll();
    if (timeitems) {
      res.status(201).json({
        data: timeitems,
        status: true
      });
    } else {
      res.status(404);
      throw new Error("Liefergebiete not found");
    }
  } else {
    res.status(400);
    throw new Error("Ungültige Bewertungstimen");
  }
});


// @desc Delete single time item
// @route DELETE /api/time/:id
// @access Private/Admin
const deleteDeliverySchedule = asyncHandler(async (req, res) => {
  const result = await DeliveryScheduleMySQL.findByPk(req.params.id);

  if (result) {
    await result.destroy();
    const timeitems = await DeliveryScheduleMySQL.findAll();
    if (timeitems) {
      res.status(201).json({
        data: timeitems,
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






// @desc Fetch all dates
// @route GET /api/dates
// @access private
const getDates = asyncHandler(async (req, res) => {
  const deliveryDates = await DeliveryDatesMySQL.findAll();

  if (deliveryDates) {
    res.json({
      data: deliveryDates,
      status: true
    });
  } else {
    res.status(404);
    throw new Error("deliveryDates not found");
  }
});

// @desc Create single Dates
// @route POST /api/Dates
// @access Private
const createDate = asyncHandler(async (req, res) => {
  const {
    dateAt
  } = req.body;

  const existDate = await DeliveryDatesMySQL.findOne({
    where: { dateAt: dateAt }
  });

  if (!existDate) {
    const result = await DeliveryDatesMySQL.create({
      dateAt: dateAt,
    });

    if (result) {
      const dateitems = await DeliveryDatesMySQL.findAll();
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
      res.status(400);
      throw new Error("Ungültige Bewertungsdaten");
    }
  }
  else {
    res.status(400);
    throw new Error("Ungültige Bewertungsdaten Oder die Daten sind bereits vorhanden.");
  }
});


// @desc Delete single date item
// @route DELETE /api/date/:id
// @access Private/Admin
const deleteDateItem = asyncHandler(async (req, res) => {
  const result = await DeliveryDatesMySQL.findByPk(req.params.id);

  if (result) {
    await result.destroy();
    const dateitems = await DeliveryDatesMySQL.findAll();
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

export {
  getDeliverySchedule,
  createDeliverySchedule,
  deleteDeliverySchedule,
  getDates,
  createDate,
  deleteDateItem
};
