import React from 'react';
import { useState } from "react";
import { Modal, Button, Badge } from "react-bootstrap";
import 'react-phone-number-input/style.css'
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from '../../../config';
import { useNavigate } from 'react-router';



const AddWardModal = (props) => {
    const { show, setShow, handleClose, setDataChangedFlag ,setAddWardModalFlag} = props;
    const [type,setType]=useState("")
    const [charges,setCharges]=useState(0)
    const [maxCapacity,setMaxCapacity]=useState(0)
    const navigate = useNavigate();
  //set token from session storage
  const [token, setToken] = useState(sessionStorage.getItem("token_admin"));
     //to set defaults of axios header
     axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  
    const addWard=()=>{
      if(type != "" && charges!=0 && maxCapacity != 0){
        const url = `${URL}/ward/addWard`;
      const body = {
        type,
        charges,
        maxCapacity
      };
      
      setDataChangedFlag(true)
      axios.post(url, body).then((res) => {
        const result = res.data;
        if(result.status=="success" && result.data=="WARD_ADDED"){
          toast.success("ward added success")
        }else
        {
          toast.warning("Ward not Added")
        }
      }).catch(err=>{
        navigate("/error");
    });
      setAddWardModalFlag(false)
      setShow(false)
       handleClose();
      }
      
       
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
            <Modal.Title>Add Ward</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              {/* ------------------------ward type---------------- */}
          <div className="form-group needs-validation">
              <label className="form-label">Enter ward type</label>
              <input
              onChange={                
                  (e)=>{setType(e.target.value)}
               }
                type="text"
                className="form-control"
              />
              {/* empid validation */}
              {type == "" ? (
                <h6 className="emptyFieldWarning">
                  *ward type cannot be empty
                </h6>
              ) : (
                <div></div>
              )}
            </div>
            {/* ------------------------ward charges--------------- */}
            <div className="form-group needs-validation">
              <label className="form-label">Enter ward charges</label>
              <input
              onChange={                
                  (e)=>{setCharges(e.target.value)}
               }
                type="number"
                className="form-control"
              />
              {/* empid validation */}
              {charges == 0 ? (
                <h6 className="emptyFieldWarning">
                  *ward charges cannot be empty
                </h6>
              ) : (
                <div></div>
              )}
            </div>
            {/* -----------------max capacity-------------- */}
            <div className="form-group needs-validation">
              <label className="form-label">Enter ward max capacity</label>
              <input
              onChange={                
                  (e)=>{setMaxCapacity(e.target.value)}
               }
                type="number"
                className="form-control"
              />
              {/* empid validation */}
              {maxCapacity == 0 ? (
                <h6 className="emptyFieldWarning">
                  *ward max capacity cannot be empty
                </h6>
              ) : (
                <div></div>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div style={{ position: "relative", left: "-120px" }}>
              <Button size="sm" variant="warning" onClick={()=>{
                 setAddWardModalFlag(false)
                 setShow(false)}}>
                Go back
              </Button>
            </div>
  
            <Button size="sm" variant="success" onClick={addWard} >
            Add Ward 
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
};

export default AddWardModal;
