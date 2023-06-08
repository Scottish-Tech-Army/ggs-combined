import React from "react";

// Stuff from react bootstrap:
import Modal from "react-bootstrap/Modal";

// components:
import GGSbuttonOne from "./GGSbuttonOne";



const GeolocErrorModal = ({
  errorMessage,
handleClose
}) => {
  
  return (
    <Modal
      show={true}
      backdrop="static"
      keyboard={false}
      className="custom-modal login-modal"
    >
      <Modal.Header className="border-0 mb-n4">
       
      </Modal.Header>
      <Modal.Body className="mt-n3">
        <h1>Error!</h1>
        
          <div>
            <p>{errorMessage}</p>
          </div>
      </Modal.Body>
      <div className="positionModalCloseButton">
          <GGSbuttonOne
 buttonDivCSSclass = {"largeButton1New positionButton"}
 pTextCSSclass = {"buttonOperable"}
 clickHandler = {handleClose}
 pText = {"Close"}
          />
          </div>
    </Modal>
  );
};

export default GeolocErrorModal;
