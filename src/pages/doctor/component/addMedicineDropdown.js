import React from 'react'
import { Dropdown } from 'react-bootstrap';

const AddMedicineDropdown = (props) => {
    const {medicine,setMedicineId,setMedicineName,setMedicinePrescription}=props;
    return (
        <Dropdown.Item as="Button">
        <div
          
          onClick={(e) => {
            setMedicineId(medicine.medicineId);
            setMedicineName(medicine.medicineName)
            setMedicinePrescription(medicine.medicinePrescription)
          }}
        >
          {medicine.medicineName}
        </div>
      </Dropdown.Item>
    )
}

export default AddMedicineDropdown
