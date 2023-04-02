import React, { useState } from "react";
import { Button } from "react-bootstrap";
function MedicineForDoctorPage(props) {
  const { medicine, deleteById,setDataToTrue } = props;
  
  const removeMedicineOfPatient=()=>{
    setDataToTrue();
      deleteById(medicine.medicineAssignedId);
  }
 
  return (
    <tr>
      <td>{medicine.medicineName}</td>
      <td>{medicine.medicineQty}</td> <td>{medicine.medicinePrescription}</td>
      <td>
        <Button variant="outline-danger" size="sm" onClick={removeMedicineOfPatient}>
          Remove
        </Button>
      </td>
    </tr>
  );
}

export default MedicineForDoctorPage;
