import { useState } from "react";
import { Badge, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import "./Accountant.css"
const PatientAccountant = (props) => {
  const { patient, handleShow, setDataChangedFlag } = props;
  const navigate = useNavigate();
  return (
    <tr>
      <th>{patient.patId}</th>
      <th>{patient.firstName + " " + patient.lastName}</th>
      <th>{patient.paymentStatus}</th>
      <th>
        <Button
          variant="outline-danger"
          size="sm"
          style={{ fontSize: "small" }}
          onClick={() => {
            console.log("empid in patient component" + patient.empId);
            navigate("/accountant/patientDetails", {
              state: { patientId: patient.patId },
            });
          }}
        >
          Invoice
        </Button>
      </th>
      {/* {updateModalFlag && <UpdateEmployeeModal setShow={setShow} setUpdateModalFlag={setUpdateModalFlag} handleClose={handleClose} handleShow={handleShow}/> } */}
    </tr>
  );
};
export default PatientAccountant;
