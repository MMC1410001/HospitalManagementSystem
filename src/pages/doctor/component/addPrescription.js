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

function AddPrescription(props) {
  //=========================all constants and variables=============================
  const { handleClose, patientDetails, show, setEditPatientFlag,toggleDataChangeFlag } = props;
  const [prescription, setPrescription] = useState(patientDetails.prescription);
  const [dataChangeFlag, setDataChangeFlag] = useState(false);
  const [patientId, setPatientId] = useState(patientDetails.patId);
  const [doctorId, setDoctorId] = useState(patientDetails.doctorId);
  const [patId,setPatId]= useState(patientDetails.patId);
  const [token, setToken] = useState(sessionStorage.getItem("token_doctor"));
      //to set defaults of axios header
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  //========================checking area==============

  
  //========================functions=================================

  const ModalHandling = () => {
    handleClose();
    setEditPatientFlag(false);
  };
  //finction to increase visit count
  const increaseVisits=()=>{
    const url = `${URL}/doctor/increaseVisitCount`;

    const body = {
      patientId,doctorId
      
    };
    //reset doctor fields hidden again

    axios.post(url, body).then((res) => {
      
     
      const result = res.data;
      if(result.status=="success" && result.data=="increamented"){
        toast.success("you visited patient :"+patientDetails.firstName)
      }
      
      console.log(result);
    });


  }
  //==========================function to save data on server============
  const EditPatient = () => {
    const url = `${URL}/doctor/addPrescription`;

    const body = {
      patId,
      prescription,
    };
    //reset doctor fields hidden again

    axios.post(url, body).then((res) => {
      setDataChangeFlag(true);
      console.log(
        "data change flag --edit patient--in GetDoctorsFromServer before click-->" +
          dataChangeFlag
      );
      
      const result = res.data;
      toggleDataChangeFlag();
    //  window.location.reload();
      increaseVisits();
      console.log(result);
    });

    handleClose();
    setEditPatientFlag(false);
  };

  useEffect(() => {
    console.log(
      "data change flag --edit patient--useeffect-->" + dataChangeFlag
    );
  }, [dataChangeFlag]);

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add prescription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Add Prescription Here</label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              
              
              rows="3" onChange={(e) => {
                setPrescription(e.target.value);
                console.log("changing presc---->"+prescription)
              }}
            >{prescription}</textarea>
          </div>
         
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={
            ()=>{
            
              ModalHandling();
            }
            }>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              EditPatient();

            }}
          >
            Add Prescription
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddPrescription;
