import { Router } from "express";
import { populateItems } from "../init/populateDb";
import dbUtil from "../database/dbUtils";
import Items_t from "../types/items";
const router = Router();

router.get("/", async (_, res) => {
  try {
    const allItems: Items_t[] = await dbUtil.getAllItems();
    res.status(200).send({ success: true, msg: "Items data", data: allItems });
  } catch (e) {
    if (e instanceof Error)
      res.status(500).send({
        success: false,
        msg: "Items Couldn't be fetched",
        error: e.message,
      });
  }
});

router.patch("/", async (req, res) => {
  try {
    await dbUtil.updateManyItemQuantity(req.body as Items_t[]);
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

//This route is used To populate the items data which is in the init file
//You can change the item data as you wish for testing
let isPopulated = false;
router.get("/populate", async (_, res) => {
  try {
   if(!isPopulated){
     await populateItems();
     isPopulated = true;
      res.status(200).send({ success: true, msg: "Items populated!" });
   }else{
    res.status(200).send({ success: true, msg: "Items already populated!" });
   }
  } catch (e) {
    res.status(500).send({ success: false, msg: "Error populating items" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const item: Items_t = await dbUtil.getItem(id);
    res.status(200).send({ success: true, msg: "Item found", data: item });
  } catch (e) {
    if (e instanceof Error)
      res.status(500).send({
        success: false,
        msg: "Item find failed",
        error: e.message,
      });
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await dbUtil.updateItemQuantity(id, req.body as Items_t);
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
