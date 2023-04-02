import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Route, useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { URL } from "../../config";
import "./Accountant.css";
import PaymentStatusModal from "./paymentStatus";

function PatientDetailsAccountant(props) {
  const location = useLocation();
  const { patientId } = location.state;
  const [show, setShow] = useState(false);
  const [editPatientFlag, setEditPatientFlag] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [patientDetails, setPatientDetails] = useState("");
  const [dataChangedFlag, setDataChangedFlag] = useState(false);
  const [patientCharges, setPatientCharges] = useState({});
  const [patId, setPatId] = useState(patientDetails.patId);
 
  //set token from session storage
  const [token, setToken] = useState(sessionStorage.getItem("token_accountant"));
   //to set defaults of axios header
   axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  const [paymentStatus, setPaymentStatus] = useState(
    patientDetails.paymentStatus
  );
  const [paymentStatusModalFlag, setPaymentStatusModalFlag] = useState(false);
  //checkk if id is recieved
  console.log("id recieved in patientDetailsReception : " + patientId);
  //toggle update status modal
  const ToggleUpdateStatusModal = () => {
    setPatId(patientId);
    console.log("in update payment status toggle -->");
    console.log("update status patId -->" + patId);
    console.log("update status paymentstatus -->" + paymentStatus);
    handleShow();
    setPaymentStatusModalFlag(true);
  };
  //update patient paymentstaus by id
  const UpdatePatientPaymentStatus = () => {
    const url = `${URL}/patient/updatePatientPaymentStatus`;
    const body = {
      patId,
      paymentStatus,
    };
    console.log("before sending data to update paymentStatus -->");
    console.log("update status patId -->" + patId);
    console.log("update status paymentstatus -->" + paymentStatus);
    axios.post(url, body).then((res) => {
      const result = res.data;
      if (result.status == "success") {
        console.log(res);
      } else {
        console.log("unable to fetch result");
      }
    }).catch(err=>{
      navigate("/error");
  });
  };
  //get total charges from server by patId
  const GetPatientChargesFromServer = () => {
    const url = `${URL}/patient/getCharges/${patientId}`;
    axios.get(url).then((res) => {
      const result = res.data;
      if (result.status == "success") {
        setPatientCharges(result.data);
        console.log(res);
      } else {
        console.log("unable to fetch result");
      }
    }).catch(err=>{
      navigate("/error");
  });
  };
  // ==========================get patient from server

  const getPatientsFromServer = () => {
    const url = `${URL}/patient/getPatient/${patientId}`;
    axios.get(url).then((res) => {
      setDataChangedFlag(false);
      console.log("data flag inside getEmployeesFromServer " + dataChangedFlag);
      const result = res.data;
      if (result.status == "success") {
        setPatientDetails(result.data);
        console.log(res);
      } else {
        console.log("unable to fetch result");
      }
    }).catch(err=>{
      navigate("/error");
  });
  };
  //to toglethe datachange flag to refresh the page
  const SetDataChangeFlag = () => {
    setDataChangedFlag(true);
  };
  useEffect(() => {
    getPatientsFromServer();
    GetPatientChargesFromServer();
    console.log(
      "inside useEffect of patientDetails------>reception" +
        " dataflag ===>" +
        dataChangedFlag
    );
  }, [dataChangedFlag]);
  const navigate = useNavigate();

  // ===========================remove patient

  return (
    <div className="patientDetailsAccountant">
      <div class="d-flex justify-content-between container-fluid">
        <div class="p-2 bd-highlight">
          <Button
            variant="primary"
            onClick={() => {
              navigate("/");
            }}
          >
            Logout
          </Button>
        </div>
        <div class="p-2 bd-highlight">
          <Button
            variant="warning"
         
            onClick={ToggleUpdateStatusModal}
          >
            Update Status
          </Button>
        </div>
        { paymentStatus=="paid"? <div class="p-2 bd-highlight">
          <Button variant="success" style={{color:"yellow",fontWeight:"bold"}} >
            {patientDetails.paymentStatus}
          </Button>
        </div> :<div class="p-2 bd-highlight">
          <Button variant="danger" style={{color:"yellow",fontWeight:"bold"}} >
            {patientDetails.paymentStatus}
          </Button>
        </div>}
       

        <div class="p-2 bd-highlight">
          <Button
            variant="secondary"
            onClick={() => {
              navigate("/accountant");
            }}
          >
            Goback
          </Button>
        </div>
      </div>
      <table
        className="table table-hover patientDetailsAccountantTable"
        style={{ backgroundColor: "bisque" }}
      >
        <tbody>
          <tr>
            <th>Name:</th>{" "}
            <th>{patientDetails.firstName + " " + patientDetails.lastName}</th>
          </tr>
          <tr>
            <th>Doctor Alloted </th>{" "}
            <th>
              {patientDetails.doctorFirstName +
                " " +
                patientDetails.doctorLastName}
            </th>
          </tr>
          <tr>
            <th>Doctor Alloted </th> <th>{patientDetails.doctorCellNo}</th>
          </tr>
          <tr>
            <th>Date of admission </th>{" "}
            <th>{patientDetails.dateOfAdmission}</th>
          </tr>
          <tr>
            <th>Payment status </th> <th >{patientDetails.paymentStatus}</th>
          </tr>
        </tbody>
      </table>
      <table
        className="chargesTable table"
        style={{ backgroundColor: "aquamarine" }}
      >
        <tr>
          <th>Sr.no</th>
          <th>Charges type</th>
          <th>Charges(Rs.)</th>
        </tr>
        <tr>
          <td>1</td> <td>Doctor charges</td>{" "}
          <td>{"Rs." + patientCharges.doctorCharges}</td>
        </tr>
        <tr>
          <td>1</td> <td>medicine charges</td>{" "}
          <td>{"Rs." + patientCharges.medicineCharges}</td>
        </tr>
        <tr>
          <td>1</td> <td>ward charges</td>{" "}
          <td>{"Rs." + patientCharges.wardCharges}</td>
        </tr>
        <tr>
          <td></td> <td style={{fontWeight:"bold" ,fontSize:"larger"}}>Total</td>{" "}
          <td style={{backgroundColor:"green",fontWeight:"bold" ,fontSize:"larger"}}>
            Rs.
            {patientCharges.wardCharges +
              patientCharges.medicineCharges +
              patientCharges.doctorCharges}
          </td>
        </tr>
      </table>
      <table
        className="chargesTable table"
        style={{ backgroundColor: "azure" }}
      >
        <tr>
          <th>Total Bill :</th>
          <th >
            Rs.
            {patientCharges.wardCharges +
              patientCharges.medicineCharges +
              patientCharges.doctorCharges}
          </th>
        </tr>
        <tr>
          <th>Payment Status</th>
          <th>{patientDetails.paymentStatus}</th>
        </tr>
      </table>
      {/* to toggle the updatestatus modal */}
      {paymentStatusModalFlag && (
        <PaymentStatusModal
          setPaymentStatusModalFlag={setPaymentStatusModalFlag}
          UpdatePatientPaymentStatus={UpdatePatientPaymentStatus}
          SetDataChangeFlag={SetDataChangeFlag}
          setPaymentStatus={setPaymentStatus}
          show={show}
          paymentStatus={paymentStatus}
          setShow={setShow}
          handleShow={handleShow}
          handleClose={handleClose}
        />
      )}
    </div>
  );
}

export default PatientDetailsAccountant;
