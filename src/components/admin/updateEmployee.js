import { useState } from "react";
import {
  Modal,
  Button
} 
from "react-bootstrap";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import axios from "axios";
import { URL } from "../../config";
import { MdTaskAlt, MdUnpublished } from "react-icons/md";
import { useNavigate } from "react-router";
const UpdateEmployeeModal = (props) => {
  const { show, employeeUpdate,setShow, handleClose,EmpId, handleShow ,setUpdateModalFlag,dataChangedFlag,setDataChangedFlag} = props;
  /**===================check if employee recieved======== */
  console.log("eployee recied from update modal : "+employeeUpdate.email)
  
  
  const [firstName, setFirstName] = useState(employeeUpdate.firstName);
  const [lastName, setLastName] = useState(employeeUpdate.lastName);

  const [cellNo, setCellNo] = useState(employeeUpdate.cellNo);
  const [hireDate, setHireDate] = useState("");
  const [dob, setDob] = useState(employeeUpdate.dob);
  const [empId, setEmpId] = useState(EmpId);
  const [email, setEmail] = useState("");

  //set token from session storage
  const [token, setToken] = useState(sessionStorage.getItem("token_admin"));
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  const navigate = useNavigate();
  const updateEmployee=()=>{
    const url = `${URL}/employee/updateEmployee`;
    const body = {
      empId,
      firstName,
      lastName,
      dob,cellNo
     
    };


    setDataChangedFlag(true)
    
    axios.post(url, body).then((res) => {
      const result = res.data;
      console.log(result);

    }).catch(err=>{
      
      
      navigate("/error");
 });
     
     
            setUpdateModalFlag(false)
      handleClose();
     
  }
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
        <Modal.Header >
          <Modal.Title>update Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="form-group needs-validation">
            <label className="form-label">EmpId</label>
            <input
              onChange={(e) => {
                setEmpId(e.target.value);
              }}
              type="number"
              className="form-control"
              value={EmpId}
              readOnly
            />
          </div>
          <div className="form-group needs-validation">
            <label className="form-label">First Name</label>
            <input
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              type="text"
              value={firstName}
              className="form-control"
            />
            
          </div>
          {/* ========================================================= */}
          <div className="form-group needs-validation">
            <label className="form-label">Last Name</label>
            <input
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              type="text"
              className="form-control"
              value={lastName}
              
            />
            
          </div>
          {/* ===============================email===================================== */}
          <div className="form-group needs-validation">
            <label className="form-label">email</label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="text"
              value={employeeUpdate.email}
              className="form-control"
              readOnly
            />
          </div>

          {/* =========================password======================== */}
         
          {/* ====================================role================================= */}
         
          {/* ====================================dob================================= */}
          <div className="form-group needs-validation">
            <label className="form-label">Date of Birth</label>
            <input
              onChange={(e) => {
                setDob(e.target.value);
              }}
              type="date"
              placeholder={dob}
              value={dob}
              
            />
          </div>
          {/* ====================================hire date================================= */}
          
          {/* ====================================cell no================================= */}
          <div>
            
            
            <label className="form-label">Mobile Number</label>
            <PhoneInput
              className="form-control"
              value={cellNo}
              onChange={setCellNo}
            />
            {cellNo.length < 13 ? (
              <div>
                <MdUnpublished style={{ color: "red" }} />{" "}
                <h6 style={{ color: "red" }}>
                  invalid number(enter with country code eg..(+91)
                </h6>
              </div>
            ) : (
              <div>
                <MdTaskAlt style={{ color: "green" }} />
                <h6 style={{ color: "green" }}>valid</h6>
              </div>
            )}
          </div>
          {/* ====================================salary================================= */}
         
          {/* ====================================security question================================= */}
         
          {/* ========================================security answer============================================== */}
         
          {/* ========================================================================================== */}
        </Modal.Body>
        <Modal.Footer>
          <div style={{ position: "relative", left: "-120px" }}>
            <Button size="sm" variant="warning" onClick={handleClose}>
              Go back
            </Button>
          </div>

          <Button size="sm" variant="success" onClick={updateEmployee}>
            Update Employee
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default UpdateEmployeeModal;
