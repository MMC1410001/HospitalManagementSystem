import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Route, useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { URL } from "../../../config";
import AddPrescription from "./addPrescription";
import "../doctor.css";
import Medicine from "../../../components/medicine/Medicine";
import AddMedicines from "./addMedicine";
import MedicineForDoctorPage from "./doctorPatientMedicine";
function PatientDetailsDoctor(props) {
  const location = useLocation();
  const { patientId } = location.state;
  const [show, setShow] = useState(false);
  const [editPatientFlag, setEditPatientFlag] = useState(false);
  const [addMedicineFlag, setAddMedicineFlag] = useState(false);
  const [medicineAssignedId,setMedicineAssignedId]=useState(0)

  const handleShow = () => setShow(true);
  const [patientDetails, setPatientDetails] = useState("");
  const [dataChangedFlag, setDataChangedFlag] = useState(false);
      
       //set token from session storage
       const [token, setToken] = useState(sessionStorage.getItem("token_doctor"));
        //to set defaults of axios header
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  const handleClose = () => {
    setShow(false);
  };
  // medicines corrusponding to patient
  const [medicines, setMedicines] = useState([]);


//function to remove assigned medicine by assigned medicineid
const deleteById=(id)=>{
  
  console.log("id recieved to delete in remove assinged medicine ---->"+id)
    const url = `${URL}/medicinesAssigned/removeMedicineAssigned/${id}`;
    axios.delete(url).then((res) => {
      
      const result = res.data;
      if (result.status == "success") {
       
        console.log(res);
      } else {
        console.log("unable to fetch result");
      }
    });

}
//--------------------toggle data change flag
const toggleDataChangeFlag=()=>{
  setDataChangedFlag(true);
}

  // ====================togling edit modal
  const ToggleEditPatientModal = () => {
    setEditPatientFlag(true);
    handleShow();
  };
  //toggle add medicine button
  const ToggleAddMedicineModal = () => {
    setDataChangedFlag(true);
    setAddMedicineFlag(true);
    handleShow();
  };
  //checkk if id is recieved
  console.log("id recieved in PatientDetailsDoctor : " + patientId);
  const GetAllMedicineOfPatientFromServer = () => {
    setDataChangedFlag(false); //to refresh the page to update to current values
    const url = `${URL}/patient/getMedicines/${patientId}`;
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

  // ==========================*****************get patient from server

  const getPatientFromServer = () => {
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
    });
  };
  const setDataToTrue=()=>{
    setDataChangedFlag(true);
  }
  useEffect(() => {
    getPatientFromServer();
    GetAllMedicineOfPatientFromServer();
    
  }, [dataChangedFlag]);
  const navigate = useNavigate();

  return (
    <div>
      <div class="d-flex justify-content-between container-fluid">
        <div class="p-2 bd-highlight">
          <Button onClick={ToggleEditPatientModal} variant="warning">
            Add Remark
          </Button>
        </div>

        {/* add medicine button */}
        <div class="p-2 bd-highlight">
          <Button onClick={ToggleAddMedicineModal} variant="warning">
            Add Medicine
          </Button>
        </div>

        <div class="p-2 bd-highlight">
          <Button
            variant="secondary"
            onClick={() => {
              console.log("doctor id----->"+patientDetails.doctorId)
              navigate("/doctor", { state: { doctorId: patientDetails.doctorId } });
            }}
          >
            Goback
          </Button>
        </div>
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
        {/* --------------------------to add medicine---------------------------------------------- */}
        {addMedicineFlag && (
          <AddMedicines
            patientDetails={patientDetails}
            setDataToTrue={setDataToTrue}
            setDataChangedFlag={setDataChangedFlag}
            dataChangedFlag={dataChangedFlag}
            setAddMedicineFlag={setAddMedicineFlag}
            handleClose={handleClose}
            show={show}
          />
        )}

        {/* --------------------------to add prescription---------------------------------------------- */}
        {editPatientFlag && (
          <AddPrescription
            patientDetails={patientDetails}
            toggleDataChangeFlag={toggleDataChangeFlag}
            dataChangedFlag={dataChangedFlag}
            setEditPatientFlag={setEditPatientFlag}
            handleClose={handleClose}
            show={show}
          />
        )}
      </div>
      <table class="table table-hover doctorPatientList">
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
            <th>Blood group </th> <th>{patientDetails.bloodGroup}</th>
          </tr>
          <tr>
            <th>Bed alloted </th>{" "}
            <th>{patientDetails.type + "-" + patientDetails.bedAlloted}</th>
          </tr>
          <tr>
            <th>Patient Problem </th> <th>{patientDetails.patientProblem}</th>
          </tr>
          <tr>
            <th>Prescription </th>{" "}
            <th>
              <div class="form-group">
                <textarea
                  class="form-control"
                  value={patientDetails.prescription}
                  id="exampleFormControlTextarea1"
                  rows="2"
                  readOnly
                ></textarea>
              </div>
            </th>
          </tr>

          <tr>
            <th>Medicine alloted </th>
            <th>
              <table className="medicineList">
                <tr>
                  <th>medicine</th>
                  <th>No of tablets</th>
                  <th>prescription</th>
                </tr>
                
                { medicines.map((medicine) => {
                  return <MedicineForDoctorPage setDataToTrue={setDataToTrue}  deleteById={deleteById} medicine={medicine} />;
                })}
              </table>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PatientDetailsDoctor;
