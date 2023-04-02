import React from 'react'

function Medicine(props) {
    const {medicine}=props;
    return (
        <tr>
            <td>{medicine.medicineName}</td><td>{medicine.medicineQty}</td> <td>{medicine.medicinePrescription}</td>
        </tr>
       
    )
}

export default Medicine;
