import { useState } from 'react';
import Axios from "axios";
import './addlocation.css';

function AddLocation() {
  const [Name, setName] = useState('');
  const [Address, setAddress] = useState('');
  const [Phone, setPhone] = useState('');
  const [listoflocations, setListofLocations] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate());
    sub();
    setIsSubmit(true);

};
const validate = () => {
  const errors = {};

  //validation of fields//
 
  if (!Name) {
      errors.Name = " Name is required!";

  }
  if (!Address) {
      errors.Address = "Address is required!";
  }
  
  if (!Phone) {
      errors.Phone = "Phone is required!";
  } else if (Phone.length !== 10) {
      errors.Phone = "Phone is Invalid!"

  }

  return errors;
}
const sub = () => {

  if (Object.keys(formErrors).length == 0 && isSubmit) {
      AddNewlocation
          ();

  }
}

  const AddNewlocation = () => {
    Axios.post("http://localhost:5000/api/location/", {
      Name,
      Address,
      Phone,
    })
    .then((response) => {

    setListofLocations([
      ...listoflocations,
      {
        Name,
        Address,
        Phone,
      },
    ]);
  });
  alert("Location added sucessfully");



  window.location.href = "/locationpage";


};
  return (
    <div class="container">
  <h1>Add Location</h1>
  <form onSubmit={handleFormSubmit}>
    <div class="form-group">
      <label for="name">Name:</label>
      <input type="text" class="form-control" id="name" value={Name} onChange={(e) => setName(e.target.value)} required/>
     <p class="alert-txt">{formErrors.Name}</p>
    </div>
    <div class="form-group">
      <label for="address">Address:</label>
      <input type="text" class="form-control" id="address" value={Address} onChange={(e) => setAddress(e.target.value)} required/>
      <p class="alert-txt">{formErrors.Address}</p>
    </div>
    <div class="form-group">
      <label for="phone">Phone:</label>
      <input type="text" class="form-control" id="phone" value={Phone} onChange={(e) => setPhone(e.target.value)} required/>
      <p class="alert-txt">{formErrors.Phone}</p>
    </div>
    <button type="submit" class="btn btn-primary">Add Location</button>
  </form>
</div>

  );
  }


export default AddLocation;
