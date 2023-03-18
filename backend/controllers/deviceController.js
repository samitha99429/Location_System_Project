const Device = require("../models/device.js");

const addDevice = (req, res) => {
  const { serialNumber, type, image, status, location } = req.body;
  const newDevice = new Device({
    serialNumber,
    type,
    image,
    status,
    location,
  });

  newDevice
    .save()
    .then((createdDevice) => {
      res.json(createdDevice);
    })
    .catch((error) => {
      console.log(error);
    });
};

/////Retriev/////

const getDevice = async (req, res) => {
  try {
    const devices = await Device.find().populate("location");
    res.json(devices);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getsingledevice = async (req, res) => {
  try {
    const id = req.params.id;
    const device = await Device.findById(id).populate("location");
    res.status(200).json(device);
  } catch (error) {
    res.status(400).json(error);
  }
};

/////Update//////
const updateDevice = async (req, res) => {
  const Device_id = req.params.id;

  try {
    const device = await Device.findById(Device_id);

    if (!device) {
      return res.status(404).json("There is a no device");
    }
    const { serialNumber, type, image, status, location } = req.body;
    const dev = await Device.findByIdAndUpdate(Device_id, {
      serialNumber,
      type,
      image,
      status,
      location,
    });

    res.status(201).json({ Updated: true });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

////////////Remove Device////////////////

const removeDevice = async (req, res) => {
  const Device_id = req.params.id;

  try {
    const device = await Device.findById(Device_id);

    if (!device) {
      return res.status(404).json("There is no device");
    }

    const removeDevice = await Device.findByIdAndDelete(Device_id);
    res.status(200).json(removeDevice);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  addDevice,
  getDevice,
  updateDevice,
  getsingledevice,
  removeDevice,
};
