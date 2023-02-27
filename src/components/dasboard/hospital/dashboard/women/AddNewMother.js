import { useState,useEffect } from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import Constants from "../../../../../system/constants";
import Secure from "../../../../../system/helpers/secureLs";

export default function AddNewMother() {
  const [show, setShow] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState('');
  const [mother, setMother] = useState({
    firstName: "",
    lastName: "",
    residance: "",
    phoneNumber: "",
    email: "",
    height: "",
    age: "",
    weight: "",
    idnumber: "",
    hospitalId: 0,
  });
  const [hospitals, setHospitals] = useState([]);
  const token = Secure.getToken();

const headers = {
  "Content-Type": "application/json",
  "Authorization": "Bearer " + token
};


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = Constants.BACKEND_URL + Constants.endpoints.ADDMOTHER;
    fetch(url, {
      method: "POST",
      headers:headers,
      body: JSON.stringify(mother),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        handleClose();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setMother((prevMother) => {
      return { ...prevMother, [name]: value };
    });
  };
  const handleHospitalSelect = (event) => {
    const selectedHospital = hospitals.find((hospital) => hospital.id === parseInt(event.target.value));
    console.log('selectedHospital:', selectedHospital);
    setSelectedHospital(selectedHospital.hospitalname);
  
    setMother((prevMother) => {
      return { ...prevMother, hospitalId: event.target.value };
    });
  };

  const fetchHospitals = () => {
    const url = Constants.BACKEND_URL + Constants.endpoints.GETALLHOSPITALS;
    fetch(url,{
        headers: headers
      })
    . then((response) => response.json())
.then((data) => {
    console.log("Hosipitals",data)
setHospitals(data);
})
.catch((error) => {
console.error("Error:", error);
});
};

// Fetch hospitals on component mount
useEffect(() => {
fetchHospitals();
}, []);

return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add New Mother
      </Button>
  

      <Modal show={show} onHide={handleClose} centered  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: "20px", width: "100%" }}>

          <Modal.Header closeButton>
            <Modal.Title>Add New Mother</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col sm={6}>
                  <Form.Group controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={mother.firstName}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={mother.lastName}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="residance">
                <Form.Label>Residance</Form.Label>
                <Form.Control
                  type="text"
                  name="residance"
                  value={mother.residance}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Row>
                <Col sm={6}>
                  <Form.Group controlId="phoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="phoneNumber"
                      value={mother.phoneNumber}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={mother.email}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col sm={6}>
                  <Form.Group controlId="height">
                    <Form.Label>Height</Form.Label>
                    <Form.Control
                      type="text"
                      name="height"
                      value={mother.height}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group controlId="age">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      type="text"
                      name="age"
                      value={mother.age}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="weight">
                <Form.Label>Weight</Form.Label>
                <Form.Control
                  type="text"
                  name="weight"
                  value={mother.weight}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="idnumber">
                <Form.Label>ID NUMBER</Form.Label>
                <Form.Control
                  type="text"
                  name="idnumber"
                  value={mother.idnumber}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="hospitalId">
  <Form.Label>Select Hospital</Form.Label>
     
  <Form.Select onChange={handleHospitalSelect}>
                {hospitals.map((hospital, index) => (
                  <option key={index} value={hospital.id}>{hospital.hospitalname}</option>
                ))}
              </Form.Select>
  <div>{selectedHospital}</div>
</Form.Group>
 <Button variant="primary" type="submit" className="mt-2">
          Submit
        </Button>
      </Form>
    </Modal.Body>
  </Modal>
  
</>
)
}