const express = require("express");
const router = express.Router();

const {
  addLocation,
  addDeviceToLocation,
  getLocation,
  updateLocation,
  removeLocation,
  getSinglelocation,
  removeDevices,
} = require("../controllers/locationController");

router.get("/all", getLocation);
router.post("/", addLocation);
router.put("/:id", updateLocation);
router.delete("/:id", removeLocation);
router.get("/:id", getSinglelocation);

// add device to location
router.post("/:id/devices", addDeviceToLocation);

// Delete the devices in one location
router.delete("/:id/devices/:deviceId", removeDevices);

module.exports = router;
