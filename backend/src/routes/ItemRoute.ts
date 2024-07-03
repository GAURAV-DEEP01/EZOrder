import { Router } from "express";
import { populateItems } from "../init/populateDb";
import { dbUtil } from "../database/dbUtils";
const router = Router();

router.get("/", async (req, res) => {
  try {
    const allItems = await dbUtil.getAllItems();
    if (!allItems) throw new Error("Items find failed");
    res.status(200).send({ success: true, msg: "Items data", items: allItems });
  } catch (e) {
    if (e instanceof Error)
      res.status(500).send({
        success: false,
        msg: "Items Couldn't be fetched",
        error: e.message,
      });
  }
});

//Call this route only once!!!! to populate the items data which is in init file
//you can change the item data as you wish for testing
router.get("/populate", async (req, res) => {
  try {
    await populateItems();
    res.status(200).send({ success: true, msg: "Items populated!" });
  } catch (e) {
    res.status(500).send({ success: false, msg: "Error populating items" });
  }
});

export default router;