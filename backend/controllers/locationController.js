const Location = require("../models/location");
const Device = require("../models/device");

const addLocation = (req, res) => {
  const { Name, Address, Phone, Devices } = req.body;
  const newLocation = new Location({
    Name,
    Address,
    Phone,
    Devices,
  });

  newLocation
    .save()
    .then((createdLocation) => {
      res.json(createdLocation);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getLocation = async (req, res) => {
  try {
    const locations = await Location.find().populate("Devices");
    res.status(200).json(locations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getSinglelocation = async (req, res) => {
  try {
    const id = req.params.id;
    const location = await Location.findById(id).populate("Devices");
    console.log(location);
    res.status(200).json(location);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Invalid location ID" });
  }
};

const updateLocation = async (req, res) => {
  const Location_id = req.params.id;

  try {
    const location = await Location.findById(Location_id);

    if (!location) {
      return res.status(404).json("Location not found");
    }

    const { Name, Address, Phone, Devices } = req.body;
    const loc = await Location.findByIdAndUpdate(Location_id, {
      Name,
      Address,
      Phone,
      Devices,
    });

    res.status(201).json({ updated: true });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const removeLocation = async (req, res) => {
  const Location_id = req.params.id;

  try {
    const location = await Location.findById(Location_id);

    if (!location) {
      return res.status(404).json("Location not found");
    }

    const removeLocation = await Location.findByIdAndDelete(Location_id);
    res.status(200).json(removeLocation);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// add device to location
const addDeviceToLocation = async (req, res) => {
  const Location_id = req.params.id;
  const { serialNumber, type, image, status } = req.body;

  try {
    const location = await Location.findById(Location_id);

    if (!location) {
      return res.status(404).json("Location not found");
    }

    const device = new Device({
      serialNumber,
      type,
      image,
      status,
    });

    //device.save();

    if (!location.Devices) {
      location.Devices = [];
    }

    location.Devices.push(device._id);
    await location.save();
    res.status(201).json(device);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// remove devices in a location
const removeDevices = async (req, res) => {
  const Location_id = req.params.id;
  const Device_id = req.params.deviceId;

  try {
    const location = await Location.findById(Location_id);

    if (!location) {
      return res.status(404).json("Location not found");
    }

    const device = location.Devices.find((device) => device._id == Device_id);

    if (!device) {
      return res.status(404).json("Device not found");
    }

    location.Devices = location.Devices.filter(
      (device) => device._id != Device_id
    );
    await location.save();
    res.status(204).json({ message: "Device removed successfully" });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  addLocation,
  getLocation,
  addDeviceToLocation,
  updateLocation,
  getSinglelocation,
  removeLocation,
  removeDevices,
};
