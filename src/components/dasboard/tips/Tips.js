import { Fragment, useState,useEffect } from "react";
import Layout from "../Layout";
import "./tip.css";
import { Accordion, Modal, Button, Form } from "react-bootstrap";
import Constants from "../../../system/constants";
import swal from "sweetalert";
import axios from "axios";
import Secure from "../../../system/helpers/secureLs";
const DashContent = () => {
    const [showDialog, setShowDialog] = useState(false);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState("");

    const getToken = async () => {
    const bearerToken = await Secure.getToken();
    setToken(bearerToken);
    };
    useEffect(() => {
        getToken();
      }, []);
      
    const handleSaveChanges = (event) => {
      event.preventDefault();
      console.log("Title", title);
      console.log("Body", body);
       const bodyData={
        tip_name:"SPORT",
         title:title,
        description:body
       }
      

       axios.post(Constants.BACKEND_URL + Constants.endpoints.ADDTIP, {...bodyData}, { headers: { "Authorization": "Bearer " + token } })
       .then(response => {
         console.log(response);
         setLoading(false);
       })
       .catch(error => {
         console.error(error);
         setLoading(false);
         swal('Adding tip failed!', error || 'Check the requirements', 'error')
           .then(() => {
             setLoading(false);
           });
       });
    };
    
    const checkBUttonLoading=()=>{
        return(
            loading? <Button variant="primary" onClick={handleSaveChanges}>Loading</Button>: <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
        )
    }
    const createTip = () => {
      return (
        <Modal show={showDialog} onHide={() => setShowDialog(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: "20px", width: "100%" }}>
          <Modal.Header closeButton>
            <Modal.Title>Create a Tip</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formTipTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter title" value={title} onChange={e => setTitle(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formTipBody">
                <Form.Label>Body</Form.Label>
                <Form.Control as="textarea" rows="10" placeholder="Enter tip body" style={{ height: '100px' }} value={body} onChange={ev => setBody(ev.target.value)} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {checkBUttonLoading()}
          </Modal.Footer>
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
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Tip title 1</Accordion.Header>
                    <Accordion.Body>
                      tip body, this will contains more details About the tip
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Tip title 1</Accordion.Header>
                    <Accordion.Body>
                      tip body, this will contains more details About the tip
                    </Accordion.Body>
                  </Accordion.Item>
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
