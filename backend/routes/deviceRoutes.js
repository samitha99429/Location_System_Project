const express = require("express");
const router = express.Router();

const {
  addDevice,
  getDevice,
  updateDevice,
  removeDevice,
  getsingledevice,
} = require("../controllers/deviceController");

router.get("/all", getDevice);
router.post("/", addDevice);
router.put("/:id", updateDevice);
router.delete("/:id", removeDevice);
router.get("/:id", getsingledevice);

module.exports = router;
