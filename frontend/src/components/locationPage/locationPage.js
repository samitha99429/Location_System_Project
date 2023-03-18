import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

const Location = () => {
  const [locations, setLocations] = useState([]);
  const [Name, setName] = useState();
  const [Address, setAddress] = useState();
  const [Phone, setPhone] = useState();
  const { id } = useParams();

  useEffect(() => {
    axios.get('http://localhost:5000/api/location/all')
      .then(res => {
        setLocations(res.data);
      })
      .catch(err => {
        console.log(err);
        setLocations([]);
      });
  }, []);

  function sendLocationData(e) {
    e.preventDefault();
    alert("would you like to update");

    const newLocation = {
      Name,
      Address,
      Phone,
    }

    axios.put(`http://localhost:8000/api/location/${id}`, newLocation).then(() => {
    });

    alert("Successfully updated");

    window.location.href = "./locationdetails";
  }

  return (
    <div className="container">
      <h1>Locations</h1>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Devices</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {locations && locations.map(location => (
            <tr key={location._id}>
            
              <td>{location.Name}</td>
              <td>{location.Address}</td>
              <td>{location.Phone}</td>
              <td>
                {location.devices && location.devices.map(device => (
                  <div className="device" key={device.serialNumber}>
                    <p>{device.type}</p>
                    <img src={device.image} alt={device.type} />
                    <p>{device.status}</p>
                  </div>
                ))}
              </td>
              <td>
              <Link to={`/locationdetails/${location._id}`} className="btn btn-primary btn-sm me-2">
  Action
</Link>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Location;



