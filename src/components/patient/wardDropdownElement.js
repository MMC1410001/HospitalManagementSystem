import React from 'react'
import { Dropdown } from 'react-bootstrap';

function WardDropdownElement(props) {
    const {ward,HandleWardDropdown,setWardFullFlag}=props;
    return (
        <div>
             <Dropdown.Item as="Button">
                <div
                  onClick={(e) => {
                    setWardFullFlag(false)
                    HandleWardDropdown(ward.wardId,ward.type);
                  }}
                >
                  {ward.type}
                </div>
              </Dropdown.Item>
            
        </div>
    )
}

export default WardDropdownElement
