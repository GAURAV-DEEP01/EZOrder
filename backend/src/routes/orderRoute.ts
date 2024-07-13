import { Router } from "express";
import { Orders_t, OrderedItem_t } from "../types/orders";
import dbUtil from "../database/dbUtils";
import mongoose from "mongoose";
import AppError from "../types/AppError";
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

router.get("/:id", async (req, res) => {
  try {
    const order: Orders_t = await dbUtil.getOrder(req.params as Orders_t);
    res.status(200).send({ success: true, msg: "Order found", data: order });
  } catch (e) {
    if (e instanceof AppError)
      res.status(e.statusCode).send({
        success: false,
        msg: e.type,
        error: e.message,
      });
    else if (e instanceof Error)
      res.status(500).send({
        success: false,
        msg: "Unable to retrive Order",
        error: e.message,
      });
  }
});

router.post("/", async (req, res) => {
  try {
    const order: Orders_t = await dbUtil.placeOrder(
      req.body as OrderedItem_t[]
    );
    res.status(200).send({
      success: true,
      msg: "Order Placed",
      data: order,
    });
  } catch (e) {
    if (e instanceof Error)
      res.status(501).send({
        success: false,
        msg: "Couldn't place Order",
        error: e.message,
      });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    await dbUtil.updateOrder(req.params as Orders_t, req.body as Orders_t);
    res.status(200).send({ success: true, msg: "Update Complete" });
  } catch (e) {
    if (e instanceof Error)
      res.status(500).send({
        success: false,
        msg: "Updation failed",
        error: e.message,
      });
  }
});

export default router;
