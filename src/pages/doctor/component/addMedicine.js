import { useEffect, useState } from "react";

import {
  Modal,
  Button,
  Badge,
  Form,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "../../../config";
import AddMedicineDropdown from "./addMedicineDropdown";

function AddMedicines(props) {
  //=========================all constants and variables=============================
  const { handleClose, patientDetails, show, setAddMedicineFlag ,setDataChangeFlag,dataChangeFlag,setDataToTrue} = props;
  const [medicinePrescription, setMedicinePrescription] = useState(
 ""
  );
  
  const [patId, setPatId] = useState(patientDetails.patId);
  const [medicineId, setMedicineId] = useState();
  const [medicines, setMedicines] = useState([]); //to collect mediciens from server
  const [medicineName, setMedicineName] = useState("select medicine");//for displaying title of drodown
  const [medicineQty,setMedicineQty]=useState(0);
   
  //set token from session storage
  const [token, setToken] = useState(sessionStorage.getItem("token_doctor"));
      //to set defaults of axios header
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  //========================checking area==============
  
  console.log("datachange flag in checking area-->add medicine---->" + dataChangeFlag);
  console.log("patId -reception--editpatient-->" + patId);
  console.log(
    "prescription ************************--edit patient--start-->" +
      medicinePrescription
  );
  //========================functions=================================

  const ModalHandling = () => {
    handleClose();
    setAddMedicineFlag(false);
  };
  // get all medicines from server
  const GetAllMedicinesFromServer = () => {
    
    
    const url = `${URL}/medicine/getAllMedicines`;
    axios.get(url).then((res) => {
      const result = res.data;
      if (result.status == "success") {
        setMedicines(result.data);
        console.log(res);
      } else {
        console.log("unable to fetch result");
      }
    });
  };

  //==========================function to save data on server============
  const AddMedicineToPatientOnServer = () => {
    const url = `${URL}/medicinesAssigned/addMedicineToPatient`;
    setDataToTrue();
    const body = {
      patId,
      medicinePrescription,
      medicineId,
      medicineQty
    };
    //reset doctor fields hidden again

    axios.post(url, body).then((res) => {
      setMedicineName("select medicine")
      setMedicinePrescription("")
      console.log(
        "datachangeflag --edit patient--in GetDoctorsFromServer before click-->" +
          dataChangeFlag
      );
      const result = res.data;
     
      console.log(result);
    });

    handleClose();
    setAddMedicineFlag(false);
  };

  useEffect(() => {
    GetAllMedicinesFromServer();
    console.log(
      "data change flag --add medicine--useeffect-->" + dataChangeFlag
    );
  },[]);

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Medicines</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ marginTop: "15px" }}>
            <DropdownButton size="sm" title={medicineName} variant="warning">
              {medicines.map((medicine) => (
                <AddMedicineDropdown
                  medicine={medicine}
                  setMedicineId={setMedicineId}
                  setMedicineName={setMedicineName}
                  setMedicinePrescription={setMedicinePrescription}
                />
              ))}
            </DropdownButton>
            <label for="exampleFormControlTextarea1">
              Add Prescription Here
            </label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              onChange={(e) => {
                setMedicinePrescription(e.target.value);
                console.log("changing presc---->" + medicinePrescription);
              }}
            >{medicinePrescription}
            </textarea>
            <label for="exampleFormControlQuantity">
              Add the Quantity
            </label>
            <input type="number" className="form-control" onChange={(e)=>{setMedicineQty(e.target.value)}} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ModalHandling}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              AddMedicineToPatientOnServer();
            }}
          >
           Add Medicine
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddMedicines;
