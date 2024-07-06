import { Router } from "express";
import { Orders_t, OrderedItem_t } from "../types/orders";
import dbUtil from "../database/dbUtils";
import mongoose from "mongoose";
const router = Router();

router.get("/", async (req, res) => {
  try {
    const AllOrders: Orders_t[] = await dbUtil.getAllOrders();
    res
      .status(200)
      .send({ success: true, msg: "Orders found", data: AllOrders });
  } catch (e) {
    if (e instanceof Error)
      res.status(500).send({
        success: false,
        msg: "Unable to retrive Orders",
        error: e.message,
      });
  }
});

router.post("/", async (req, res) => {
  try {
    const orderid: mongoose.Schema.Types.ObjectId = await dbUtil.placeOrder(
      req.body as OrderedItem_t[]
    );
    res.status(200).send({
      success: true,
      msg: "Order Placed",
      orderId: orderid,
    });
  } catch (e) {
    if (e instanceof Error)
      res
        .status(500)
        .send({ succes: false, msg: "Couldn't place Order", error: e.message });
  }
});

export default router;
