import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './addDevice.css'

const AddDevice = () => {
const navigate = useNavigate();

// state variables to hold device information
const [serialNumber, setSerialNumber] = useState('');
const [type, setType] = useState('');
const [image, setImage] = useState('');
const [status, setStatus] = useState('');
const [formErrors, setFormErrors] = useState({});
const [isSubmit, setIsSubmit] = useState(false);

const handleSubmit = async (e) => {
e.preventDefault();

try {
// send POST request to add device endpoint
const response = await axios.post('http://localhost:5000/api/device/', {
serialNumber,
type,
image,
status,
});
// navigate to devices page after successful addition
alert("added succesfully");
navigate('/devicepage');
} catch (error) {
console.error(error);
}
};



return (
<div class="container">
  <h2>Add Device</h2>
  <form class="needs-validation" onSubmit={handleSubmit} novalidate>
    <div class="form-group">
      <label for="serialNumber">Serial Number</label>
      <input type="text" class="form-control" id="serialNumber" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} required/>
      <div class="invalid-feedback">
        Please enter a serial number.
      </div>
    </div>
    <div class="form-group">
      <label for="type">Type</label>
      <select class="form-control" id="type" value={type} onChange={(e) => setType(e.target.value)} required>
        <option value="">-- Select Type --</option>
        <option value="pos">POS</option>
        <option value="kiosk">Kiosk</option>
        <option value="signage">Signage</option>
      </select>
      <div class="invalid-feedback">
        Please select a device type.
      </div>
    </div>
    <div class="form-group">
      <label for="image">Image</label>
      <input type="text" class="form-control" id="image" value={image} onChange={(e) => setImage(e.target.value)} required/>
      <div class="invalid-feedback">
        Please enter an image URL.
      </div>
    </div>
    <div class="form-group">
      <label for="status">Status</label>
      <select class="form-control" id="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
        <option value="">-- Select Status --</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <div class="invalid-feedback">
        Please select a device status.
      </div>
    </div>
    <button type="submit" class="btn btn-primary">Add Device</button>
  </form>
</div>
  
);

};

export default AddDevice;