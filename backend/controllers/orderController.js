import asyncHandler from "express-async-handler";
import OrderItemsMySQL from "../models/orderItemsMySQL.js";
import OrderMySQL from "../models/orderModelMySQL.js";
import UserMySQL from "../models/userModelMySQL.js";
import sgMail from "@sendgrid/mail";
import pkg from "sequelize";
var mailFlag = false;

// @desc Create new order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    lieferzeitpunkt,
    userInfo,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("Sie haben keine Artikel für diese Bestellung ausgewählt.");
    return;
  } else {
    const createdOrder = await OrderMySQL.create({
      paymentMethod: paymentMethod,
      shippingPrice: shippingPrice,
      shippingAdressAdress: shippingAddress.address,
      shippingAdressCity: shippingAddress.city,
      shippingAdressStockwerk: shippingAddress.stockwerk,
      shippingAdressApartment: shippingAddress.apartment,
      shippingAdressPostalCode: shippingAddress.postalCode,
      shippingAdressCountry: shippingAddress.country,
      taxPrice: taxPrice,
      totalPrice: totalPrice,
      itemsPrice: itemsPrice,
      lieferzeitpunkt: lieferzeitpunkt,
      userId: req.user.id,
    });

    const orderItemsArray = [];
    var qty = 0;
    for (let i = 0; i < orderItems.length; i++) {
      let tmpObj = {
        qty: orderItems[i].qty,
        vk: orderItems[i].vk,
        pfand: orderItems[i].pfand,
        productId: orderItems[i].product,
        bestellungenId: createdOrder.id,
        produktname: orderItems[i].produktname,
        bildname: orderItems[i].bildname,
        pictureurl: orderItems[i].pictureurl,
      };
      qty += orderItems[i].qty;
      orderItemsArray.push(tmpObj);
    }

    const orderItemsCreated = await OrderItemsMySQL.bulkCreate(orderItemsArray);
    const order = {
      orderItems: orderItems,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
      itemsPrice: itemsPrice,
      taxPrice: taxPrice,
      shippingPrice: shippingPrice,
      totalPrice: totalPrice,
      lieferzeitpunkt: lieferzeitpunkt,
      userInfo: userInfo,
      bestellungenId: createdOrder.id,
      qty: qty,
    };
    handleSendMail(order);
    res.status(201).json(createdOrder.dataValues);
  }
});

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

// @desc send the mail for order
// @route GET /api/orders/mailSend
// @access Private
const handleSendMail = asyncHandler(async (order) => {
  sgMail.setApiKey(
    "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"
  );
  var temp1 = `<div style="max-width:680px; margin:0 auto; font-family:Roboto;">`;
  var temp2 = `</div>`
  var otherhead = `<div style="max-width:680px; margin:0 auto; font-family:Roboto;">
    <h1 class="title">Gewählte Artikel</h1>
  </div>`;
  var order_template_extra = "";

  for (var i=0; i<order.orderItems.length; i++){
    var image_url = order.orderItems[i].pictureurl + "noimage.jpg";
    if(order.orderItems[i].bildname !=""){
      order_template_extra += `<div style="flex-direction: column;padding-left: 0;margin-bottom: 0;border-radius: .25rem;">
        <div style="display: flex;flex-wrap: wrap;margin-right: -15px;margin-left: -15px;">
        <div style="display: flex;font-size: 1.2em;align-items: center;font-family: Source Sans Pro;line-height: 1.2em;justify-content: center; width:40%;padding:15px;">
          <img src="${order.orderItems[i].pictureurl}" alt="" style="width:96px; height:96px;">
        </div>
        <div style="display: flex;font-size: 1.2em;align-items: center;font-family: Source Sans Pro;line-height: 1.2em;justify-content: center;width:10%;padding:15px;"><p>${order.orderItems[i].produktname}</p></div>
        <div style="display: flex;font-size: 1.2em;align-items: center;font-family: Source Sans Pro;line-height: 1.2em;justify-content: center;width:30%;padding:15px;">
          <p class="title">${order.orderItems[i].qty} x € ${order.orderItems[i].vk} = €
          ${addDecimals(order.orderItems[i].qty * order.orderItems[i].vk)}</p>
        </div>
        <div style="display: flex;font-size: 1.2em;align-items: center;font-family: Source Sans Pro;line-height: 1.2em;justify-content: center;width:20%;padding:15px;">
          <p class="title">Pfand:  € ${order.orderItems[i].pfand}</p>
        </div>
    </div> 
  </div>`
    } else {
      order_template_extra += `<div style="flex-direction: column;padding-left: 0;margin-bottom: 0;border-radius: .25rem;">
      <div style="display: flex;flex-wrap: wrap;margin-right: -15px;margin-left: -15px;">
      <div style="display: flex;font-size: 1.2em;align-items: center;font-family: Source Sans Pro;line-height: 1.2em;justify-content: center; width:40%;padding:15px;">
        <img src="${image_url}" alt="" style="width:96px; height:96px;">
      </div>
      <div style="display: flex;font-size: 1.2em;align-items: center;font-family: Source Sans Pro;line-height: 1.2em;justify-content: center;width:10%;padding:15px;"><p>${order.orderItems[i].produktname}</p></div>
      <div style="display: flex;font-size: 1.2em;align-items: center;font-family: Source Sans Pro;line-height: 1.2em;justify-content: center;width:30%;padding:15px;">
        <p class="title">${order.orderItems[i].qty} x € ${order.orderItems[i].vk} = €
        ${addDecimals(order.orderItems[i].qty * order.orderItems[i].vk)}</p>
      </div>
      <div style="display: flex;font-size: 1.2em;align-items: center;font-family: Source Sans Pro;line-height: 1.2em;justify-content: center;width:20%;padding:15px;">
        <p class="title">Pfand:  € ${order.orderItems[i].pfand}</p>
      </div>
  </div> 
</div>`
    }
    
  }
  var email_template = `
  <div style="min-height:652px; max-width:625px; margin:0 auto; font-family:Roboto;">
    <div
        style="margin:0 auto; text-align:center; color:#fff; height:135px; justify-content:center; align-items:center;">
        <img alt=""
            src="https://firebasestorage.googleapis.com/v0/b/firestore-85536.appspot.com/o/android-icon-96x96.png?alt=media&token=776cc626-ada2-4191-b373-124726317ff7"
            style="width:96px; height:96px;">
    </div>
    <div style="margin:0 auto; text-align:center; color:#000; background:#fff;">
      <div class="email-verify-body-code">
          <h1 class="title">Bestellnr.:${order.bestellungenId}</h1>
      </div>
    </div>
      <div style="width: 100%; display: flex; flex-wrap: wrap; justify-content: space-between;">
        <div style="width: 80%;">
            <div style="font-size: 20px; font-weight: bold; line-height: 30px;">Gewählte Bezahlmethode</div>
            <div style="margin-bottom:1rem; line-height: 30px;">
                <stroing style="font-size: 20px; font-weight: 500;">Methode:</stroing> ${order.paymentMethod}
            </div>
            <div style="font-size: 20px; font-weight: bold; line-height: 30px;">Gewählte Artikel</div>
            <div style="margin-bottom:1rem; line-height: 30px;">
                <stroing style="font-size: 20px; font-weight: 500;">Anzahl:</stroing> ${order.qty}
            </div>
            <div style="font-size: 20px; font-weight: bold; line-height: 30px;">Lieferung an</div>
            <div style="line-height: 30px;">
                <stroing style="font-size: 20px; font-weight: 500;">Name:</stroing> ${order.userInfo.vorname} ${order.userInfo.nachname}
            </div>
            <div style="line-height: 30px;">
                <stroing style="font-size: 20px; font-weight: 500;">Email:</stroing> ${order.userInfo.email}
            </div>
            <div style="line-height: 30px;">
                <stroing style="font-size: 20px; font-weight: 500;">Lieferadresse</stroing>: ${order.shippingAddress.address}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.city}, ${order.shippingAddress.country}
            </div>
            <div style="line-height: 30px;">
                <stroing style="font-size: 20px; font-weight: 500;">Lieferdatum und -uhrzeit:</stroing> ${order.lieferzeitpunkt}
                04:15
            </div>
        </div>
        <div style="width: 100%; border: 1px solid #333; padding: 10px; align-self: baseline;">
            <div
                style="font-size: 20px; font-weight: bold; height: 45px; border-bottom: 1px solid #333; display: flex; align-items: center; justify-content: center;">
                <div>Zusammenfassung</div>
            </div>
            <div
                style="font-size: 20px; height: 45px; border-bottom: 1px solid #333; display: flex; align-items: center; justify-content: space-between;">
                <div>Artikel</div>
                <div>€ ${order.itemsPrice}</div>
            </div>
            <div
                style="font-size: 20px; height: 45px; border-bottom: 1px solid #333; display: flex; align-items: center; justify-content: space-between;">
                <div>Pfand</div>
                <div>Pfand berechnen</div>
            </div>
            <div
                style="font-size: 20px; height: 45px; border-bottom: 1px solid #333; display: flex; align-items: center; justify-content: space-between;">
                <div>+ Lieferung</div>
                <div>€ ${order.shippingPrice}</div>
            </div>
            
            <div
                style="font-size: 20px; height: 45px; border-bottom: 1px solid #333; display: flex; align-items: center; justify-content: space-between;">
                <div>inkl. MWSt</div>
                <div>€ ${order.taxPrice}</div>
            </div>
            <div
                style="font-size: 20px; height: 45px; display: flex; align-items: center; justify-content: space-between;">
                <div>Gesamt</div>
                <div>€ ${order.totalPrice}</div>
            </div>
        </div>
      </div>
    </div>
  
  `
  var email_full = email_template + otherhead + temp1 + order_template_extra + temp2;
  const msg = {
    to: order.userInfo.email, // Change to your recipient
    from: "regensbutler-info@walhalla-software-dev.de", // Change to your verified sender
    subject: "regensbutler-info@walhalla-software-dev.de",
    text: `Deine Bestellung: Bestellnr.:${order.bestellungenId}`,
    html: email_full,
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

// @desc Update each product star
// @route GET /api/orders/:id/star
// @access Private
const updateEachProductStar = asyncHandler(async (req, res) => {
  const orderItems = await OrderItemsMySQL.findOne({
    where: { bestellungenId: req.params.id, productId: req.body.productId },
  });

  if (orderItems) {
    orderItems.star = req.body.star;

    const updated = await OrderItemsMySQL.update(
      {
        star: orderItems.star,
      },
      {
        where: { bestellungenId: req.params.id, productId: req.body.productId },
      }
    );
    res.json(updated);
  } else {
    res.status(404);
    throw new Error("Bestellung nicht gefunden (order not found)");
  }
});

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await OrderMySQL.findByPk(req.params.id);

  const orderItems = await OrderItemsMySQL.findAll({
    where: { bestellungenId: req.params.id },
  });

  const userInfoToOrder = await UserMySQL.findOne({
    where: { id: order.userId },
    attributes: { exclude: ["passwort"] },
  });

  if (order && orderItems && userInfoToOrder) {
    res.json({
      order: order,
      orderItems: orderItems,
      userInfoToOrder: userInfoToOrder,
    });
  } else {
    res.status(404);
    throw new Error("Bestellung nicht gefunden (order not found)");
  }
});

// @desc Update order to paid
// @route GET /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await OrderMySQL.findByPk(req.params.id);

  if (order && req.body) {
    order.isPaid = true;
    var curr = new Date();
    order.paidAt = `${
      curr.getDate() < 10 ? `0${curr.getDate()}` : curr.getDate()
    }-${
      curr.getMonth() + 1 < 10 ? `0${curr.getMonth() + 1}` : curr.getMonth() + 1
    }-${curr.getFullYear()}T${curr.getHours()}:${curr.getMinutes()}:${curr.getSeconds()}`;
    order.paymentResultId = req.body.id;
    order.paymentResultStatus = req.body.status;
    order.paymentResultUpdate_time = req.body.update_time;
    order.paymentResultEmail_adress = req.body.payer.email_address;

    const updatedOrder = await OrderMySQL.update(
      {
        isPaid: order.isPaid,
        paidAt: order.paidAt,
        paymentResultId: order.paymentResultId,
        paymentResultUpdate_time: order.paymentResultUpdate_time,
        paymentResultEmail_adress: order.paymentResultEmail_adress,
      },
      { where: { id: order.id } }
    );
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Bestellung nicht gefunden (order not found)");
  }
});

// @desc Update order to delivered
// @route GET /api/orders/:id/deliver
// @access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await OrderMySQL.findByPk(req.params.id);

  if (order) {
    order.isDelivered = true;
    var curr = new Date();
    order.deliveredAt = `${
      curr.getDate() < 10 ? `0${curr.getDate()}` : curr.getDate()
    }-${
      curr.getMonth() + 1 < 10 ? `0${curr.getMonth() + 1}` : curr.getMonth() + 1
    }-${curr.getFullYear()}T${curr.getHours()}:${curr.getMinutes()}:${curr.getSeconds()}`;

    const updatedOrder = await OrderMySQL.update(
      {
        isDelivered: order.isDelivered,
        deliveredAt: order.deliveredAt,
      },
      {
        where: { id: order.id },
      }
    );
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Bestellung nicht gefunden (order not found)");
  }
});

// @desc Get logged in user order
// @route GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await OrderMySQL.findAll({ where: { userId: req.user.id } });
  res.json(orders);
});

// @desc Get all orders
// @route GET /api/orders
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await OrderMySQL.findAll();
  res.json(orders);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
  updateEachProductStar,
};
