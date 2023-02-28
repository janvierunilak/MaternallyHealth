import React, { Fragment, useState, useEffect } from 'react';
import Layout from '../Layout';
import './tip.css';
import { Accordion, Modal, Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Constants from '../../../system/constants';
import swal from 'sweetalert';
import axios from 'axios';
import Secure from '../../../system/helpers/secureLs';

const TIP_NAMES = ["DIET", "SPORT", "ADVISE", "MEDICAL"];
const MAX_CHARACTER_COUNT = 255
const DashContent = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [tipName, setTipName] = useState("DIET");
  const [characterCount, setCharacterCount] = useState(0);
  const [tips, setTips] = useState([])
  const getToken = async () => {
    const bearerToken = await Secure.getToken();
    setToken(bearerToken);
  };
  useEffect(() => {
    getToken();
    getAllTips()
  }, []);

  const getAllTips =  async() => {
    await axios
      .get(Constants.BACKEND_URL + Constants.endpoints.GETALLTIPS, {
        headers: { Authorization: "Bearer " + token, 
         "Content-Type": "application/json",
       },
      })
      .then((response) => {
        console.log("TIPS",response.data);
        setTips(response.data);
      })
      .catch((error) => {
        console.error(error);
        swal("Error!", "Failed to fetch tips", "error");
      });
  };
  
  const handleSaveChanges = (event) => {
    event.preventDefault();
    console.log("Title", title);
    console.log("Body", body);
    const bodyData = {
      tip_name: tipName,
      title: title,
      description: body.slice(0,255)
    }

    const bodyJSON = JSON.stringify(bodyData);
    console.log(bodyJSON)
 
    axios
      .post(Constants.BACKEND_URL + Constants.endpoints.ADDTIP, bodyJSON, {
        headers: { Authorization: "Bearer " + token , 
         "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setLoading(false);
        setShowDialog(false);
        swal({
          title: "Success!",
          text: "Your tip has been successfully added.",
          icon: "success",
          button: "OK"
        }).then(()=>getAllTips())
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        swal(
          "Adding tip failed!",
          error.response?.data?.message || "Check the requirements",
          "error"
        ).then(() => {
          setLoading(false);
        });
      });
  };

  const checkButtonLoading = () => {
    return (
      loading ? <Button variant="primary" onClick={handleSaveChanges}>Loading</Button> : <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
    )
  }
  const handleBodyChange = (event) => {
    setBody(event.target.value);
    setCharacterCount(event.target.value.length);
  };
  const createTip = () => {
    return (
      <Modal
        show={showDialog}
        onHide={() => setShowDialog(false)}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', width: '100%' }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create a Tip</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTipName">
              <Form.Label>Tip Name</Form.Label>
              <Form.Select value={tipName} onChange={(e) => setTipName(e.target.value)}>
                {TIP_NAMES.map((tipName, index) => (
                  <option key={index} value={tipName}>{tipName}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="formTipTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formTipBody">
              <Form.Label>Body</Form.Label>
              <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-disabled">{characterCount}/{MAX_CHARACTER_COUNT}</Tooltip>}>
                <Form.Control
                  as="textarea"
                  rows="10"
                  placeholder="Enter tip body"
                  style={{ height: '100px' }}
                  value={body}
                  onChange={handleBodyChange}
                  maxLength={MAX_CHARACTER_COUNT}
                />
              </OverlayTrigger>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>{checkButtonLoading()}</Modal.Footer>
      </Modal>
    );
  };
  return (
    <Fragment>
      <section className="py-5 bg-light">
        <div className="row">
          <div className="col-9">
            <h1 className="text-center headerOfTip">Tips</h1>
          </div>
          <div className="col d-flex justify-content-lg-center align-items-lg-center">
            <Button className="btn btn-danger d-flex outline loginBtn" data-bss-hover-animate="rubberBand"
              onClick={(e) => setShowDialog(true)}>Add new Tip
            </Button>
          </div>
        </div>
        <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <Accordion flush>
            {tips.map(tip => (
              <Accordion.Item key={tip.id} eventKey={tip.id}>
                <Accordion.Header>{tip.title}</Accordion.Header>
                <Accordion.Body>
                  {tip.description}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
      </section>
      {createTip()}
    </Fragment>
  );
};


const Tips = () => {
  return (
    <Layout>
      <DashContent />
    </Layout>
  );
};

export default Tips;
