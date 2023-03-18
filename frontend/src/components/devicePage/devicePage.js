import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Device = () => {
  const [devices, setDevices] = useState([]);
  const [serialNumber, setSerialNumber] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('');

  const fetchDevices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/device/all');
      setDevices(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const handleAddDevice = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/device/', {
        serialNumber,
        type,
        image,
        status,
      });
      setSerialNumber('');
      setType('');
      setImage('');
      setStatus('');
      fetchDevices();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
    <h1>Devices</h1>
    <form onSubmit={handleAddDevice}>
      <label htmlFor="serialNumber">Serial Number:</label>
      <input
        type="text"
        id="serialNumber"
        value={serialNumber}
        onChange={(event) => setSerialNumber(event.target.value)}
      />
      <br />
      <label htmlFor="type">Type:</label>
      <select
        id="type"
        value={type}
        onChange={(event) => setType(event.target.value)}
      >
        <option value="pos">POS</option>
        <option value="kiosk">Kiosk</option>
        <option value="signage">Signage</option>
      </select>
      <br />
      <label htmlFor="image">Image:</label>
      <input
        type="text"
        id="image"
        value={image}
        onChange={(event) => setImage(event.target.value)}
      />
      <br />
      <label htmlFor="status">Status:</label>
      <select
        id="status"
        value={status}
        onChange={(event) => setStatus(event.target.value)}
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <br />
      <button type="submit" className="btn btn-primary">Add Device</button>
    </form>
    <h2>Devices List</h2>
    <table className="table">
      <thead>
        <tr>
          <th>Serial Number</th>
          <th>Type</th>
          <th>Image</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {devices.map((device) => (
          <tr key={device.id}>
            <td>{device.serialNumber}</td>
            <td>{device.type}</td>
            <td>{device.image}</td>
            <td>{device.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default Device;
