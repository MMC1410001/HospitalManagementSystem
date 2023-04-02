import React from 'react'
import { Dropdown } from 'react-bootstrap';

function DoctorDropDownElement(props) {
    const {doctor,HandleDoctorDropdown}=props;
    return (
        <div>
            <Dropdown.Item as="Button">
                <div
                  onClick={(e) => {
                    
                    HandleDoctorDropdown(doctor.doctorId,doctor.firstName,doctor.lastName);
                  }}
                >
                  {doctor.firstName+" "+doctor.lastName}
                </div>
              </Dropdown.Item>
        </div>
    )
}

export default DoctorDropDownElement
