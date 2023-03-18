import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const LocationDetails = () => {
  const { id } = useParams();
  const { id: locationId } = useParams();
  const [location, setLocation] = useState({});
  const [devices, setDevices] = useState([]);
  const [serialNumber, setSerialNumber] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('active');

  useEffect(() => {
    console.log("id:", id);
    if (id) {
      console.log("id>>>",id)
      axios.get(`http://localhost:5000/api/location/${id}`).then((response) => {
        console.log("response:", response.data);
        setLocation(response.data.location);
        setDevices(response.data.Devices);
      }).catch((error) => {
        console.log(error);
      });
    }
  }, [id]);

  const handleAddDevice = (e) => {
    e.preventDefault();
    const newDevice = { serialNumber, type, image, status };
    axios
      .post(`http://localhost:5000/api/location/${id}/devices`, newDevice)
      .then((response) => {
        setDevices([...devices, response.data]);
        setSerialNumber('');
        setType('');
        setImage('');
        setStatus('active');
      })
      .catch((error) => console.log(error));
  };

  const handleRemoveDevice = (id) => {
    if (!id) {
      console.log('Invalid device ID');
      return;
    }
  
    axios
      .delete(`http://localhost:5000/api/location/${locationId}/devices/${id}`)
      .then(() => {
        const updatedDevices = devices.filter((device) => device._id !== id);
        setDevices(updatedDevices);
      })
      .catch((error) => console.log(error));
  };


  return (
    <div class="container">
  <h1 class="mb-3">{location?.Name}</h1>
  <p class="mb-3">Address: {location?.Address}</p>
  <p class="mb-3">Phone: {location?.Phone}</p>

  <h2 class="mb-3">Devices</h2>
  <ul class="list-group mb-3">
    {devices && devices.map((device) => (
      <li class="list-group-item" key={device._id}>
        <h3 class="mb-2">Serial Number: {device.serialNumber}</h3>
        <p class="mb-1">Type: {device.type}</p>
        <p class="mb-1">Status: {device.status}</p>
        <button class="btn btn-danger" onClick={() => handleRemoveDevice(device._id)}>Remove</button>
      </li>
    ))}
  </ul>

  <h2 class="mb-3">Add Device</h2>
  <form class="mb-3" onSubmit={handleAddDevice}>
    <div class="mb-3">
      <label class="form-label">
        Serial Number:
        <input
          type="text"
          class="form-control"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
          required
        />
      </label>
    </div>
    <div class="mb-3">
      <label class="form-label">
        Type:
        <select class="form-select" value={type} onChange={(e) => setType(e.target.value)} required>
          <option value="">Select Type</option>
          <option value="pos">POS</option>
          <option value="kiosk">Kiosk</option>
          <option value="signage">Signage</option>
        </select>
      </label>
    </div>
    <div class="mb-3">
      <label class="form-label">
        Image:
        <input
          type="text"
          class="form-control"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
      </label>
    </div>
    <div class="mb-3">
      <label class="form-label">
        Status:
        <select class="form-select" value={status} onChange={(e) => setStatus(e.target.value)} required>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </label>
    </div>
    <button type="submit" class="btn btn-primary">Add Device</button>
  </form>
</div>

  );
};

export default LocationDetails;


