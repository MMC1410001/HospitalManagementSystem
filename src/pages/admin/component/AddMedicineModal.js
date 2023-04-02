import React from "react";
import { useState } from "react";
import { Modal, Button, Badge } from "react-bootstrap";
import "react-phone-number-input/style.css";
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "../../../config";
import { useNavigate } from "react-router";

const AddMedicineModal = (props) => {
  const {
    show,
    setShow,
    handleClose,
    setDataChangedFlag,
    setAddMedicineModalFlag,
  } = props;
  const [medicineName, setMedicineName] = useState("");
  const [medicinePrice, setMedicinePrice] = useState(0);
  const navigate = useNavigate();
  //set token from session storage
  const [token, setToken] = useState(sessionStorage.getItem("token_admin"));
   //to set defaults of axios header
   axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  const addMedicine = () => {
    if (medicineName != "" && medicinePrice != 0) {
      const url = `${URL}/medicine/addMedicine`;
      const body = {
        medicineName,
        medicinePrice,
      };

      setDataChangedFlag(true);
      axios.post(url, body).then((res) => {
        const result = res.data;
        if (result.status == "success" && result.data == "MEDICINE_ADDED") {
          toast.success("medicine added success");
        } else {
          toast.warning("medicine not Added");
        }
      }).catch(err=>{
        navigate("/error");
    }).catch(err=>{
      navigate("/error");
  });
      setAddMedicineModalFlag(false);
      setShow(false);
      handleClose();
    }
  };
  /**==================================================================== */
  return (
    <div className="">
      {/* <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button> */}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Add Medicine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* ------------------------ward type---------------- */}
          <div className="form-group needs-validation">
            <label className="form-label">Enter Medicine Name</label>
            <input
              onChange={(e) => {
                setMedicineName(e.target.value);
              }}
              type="text"
              className="form-control"
            />
            {/* name validation */}
            {medicineName == "" ? (
              <h6 className="emptyFieldWarning">
                *medicne name cannot be empty
              </h6>
            ) : (
              <div></div>
            )}
          </div>
          {/* ------------------------medicine charges--------------- */}
          <div className="form-group needs-validation">
            <label className="form-label">
              Enter medicine Price per tablet
            </label>
            <input
              onChange={(e) => {
                setMedicinePrice(e.target.value);
              }}
              type="number"
              className="form-control"
            />
            {/* empid validation */}
            {medicinePrice == 0 ? (
              <h6 className="emptyFieldWarning">
                *medicine price cannot be empty
              </h6>
            ) : (
              <div></div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div style={{ position: "relative", left: "-120px" }}>
            <Button
              size="sm"
              variant="warning"
              onClick={() => {
                setAddMedicineModalFlag(false);
                setShow(false);
              }}
            >
              Go back
            </Button>
          </div>

          <Button size="sm" variant="success" onClick={addMedicine}>
            Add Medicine
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddMedicineModal;
