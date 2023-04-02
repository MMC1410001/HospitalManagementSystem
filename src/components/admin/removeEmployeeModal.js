import { useState } from "react";
import { Modal, Button, Badge } from "react-bootstrap";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "../../config";
import { useNavigate } from "react-router";

const RemoveEmployeeModal = (props) => {
 
  //set token from session storage
  const [token, setToken] = useState(sessionStorage.getItem("token_admin"));
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  const { Rshow, employees,setRShow, RhandleClose, RhandleShow,setDataChangedFlag ,setRemoveEmployee} = props;
  const [cellNo,setCellNo]=useState("enter phone no")
  const [empId,setEmpId]=useState(0)
  const employee={empId,cellNo};
  const navigate=useNavigate();
  const RemoveEmployee=()=>{
    if(empId != 0){
      const url = `${URL}/employee/deleteEmployee`;
    const body = {
      empId,
      cellNo
    };
    
    setDataChangedFlag(true)
    axios.post(url, body).then((res) => {
      const result = res.data;
      if(result.status=="success" && result.data=="deleted_success"){
        toast.success("remove success")
      }else
      {
        toast.warning("employee not removed")
      }
    }).catch(err=>{
      navigate("/error");
 });
    setRemoveEmployee(false)
    setRShow(false)
     RhandleClose();
    }
    
     
  }
  /**==================================================================== */
  return (
    <div className="">
      {/* <Button variant="primary" onClick={handleShow}>
      Launch static backdrop modal
    </Button> */}

      <Modal
        show={Rshow}
        onHide={RhandleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header >
          <Modal.Title>Remove employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="form-group needs-validation">
            <label className="form-label">Employee Id</label>
            <input
            onChange={                
                (e)=>{setEmpId(e.target.value)}
             }
              type="number"
              className="form-control"
            />
            {/* empid validation */}
            {empId == 0 ? (
              <h6 className="emptyFieldWarning">
                *Employee id cannot be empty
              </h6>
            ) : (
              <div></div>
            )}
          </div>
          
            
         
        </Modal.Body>
        <Modal.Footer>
          <div style={{ position: "relative", left: "-120px" }}>
            <Button size="sm" variant="warning" onClick={()=>{setRShow(false)}}>
              Go back
            </Button>
          </div>

          <Button size="sm" variant="success" onClick={RemoveEmployee} >
          Remove Employee 
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default RemoveEmployeeModal;
