import { useState } from "react";
import {
  Modal,
  Button,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import axios from "axios";
import { URL } from "../../config";
import { MdTaskAlt, MdUnpublished } from "react-icons/md";
import { useNavigate } from "react-router";

/**======================================================================= */
const AddNewEmployeeModal = (props) => {
  /***********============================================================= */
  const {
    show,
    employees,
    setShow,
    handleClose,
    handleShow,
    setEmployeeModal,
    dataChangedFlag,
    setDataChangedFlag,
  } = props;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("select role");
  const [cellNo, setCellNo] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [dob, setDob] = useState("");
  const [salary, setSalary] = useState(0);
  const [securityQuestion, setSecurityQuestion] = useState(
    "select security question"
  );
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [doctorOptionFlag, setDoctorOptionFlag] = useState(false); //to show extra options of doctor
  const [doctorCharges, setDoctorCharges] = useState(0);
   //to check if email is unique
   const [uniqueEmail, setUniqueEmail] = useState("");
   const navigate = useNavigate();
   //set token from session storage
   const [token, setToken] = useState(sessionStorage.getItem("token_admin"));
   axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  /***========================================================================== */
   //check on server if email exists
   const CheckForEmailDupicacyOnServer = () => {
    const body = {
      email,
    };
    const url = `${URL}/user/emailExists`;
    axios.post(url, body).then((res) => {
      const result = res.data;
      console.log(result);
      if (result.status == "success") {
        setUniqueEmail(result.data);
      }
    }).catch(err=>{
      
      
      navigate("/error");
 });
  };
 
  const AddEmployee = () => {
    //to validate the data
    if (
      firstName.length > 2 &&
      lastName.length > 2 &&
      email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) &&
      password.length > 2 &&
      hireDate != "" &&
      cellNo != "+91 0000000000" &&
      securityQuestion != "select security question" &&
      securityAnswer != "" &&
      salary != 0 &&
      uniqueEmail == "UNIQUE_EMAIL" &&
      role !="select role"
    ) {
      const url = `${URL}/employee/addEmployee`;
    const body = {
      firstName,
      lastName,
      role,
      dob,
      hireDate,
      cellNo,
      email,
      password,
      securityAnswer,
      securityQuestion,
      salary,
      doctorCharges,
    };
    setDoctorOptionFlag(false); //reset doctor fields hidden again
    setDataChangedFlag(true);
    console.log("data flag inside add new employee " + dataChangedFlag);
    axios.post(url, body).then((res) => {
      const result = res.data;
      
    }).catch(err=>{
      
      
      navigate("/error");
 });

    console.log("--patt==employee modal")
    
    setEmployeeModal(false);
    handleClose();
    }
    
  };
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
          <Modal.Title>Add new Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group needs-validation"></div>
          <div className="form-group needs-validation">
            <label className="form-label">First Name</label>
            <input
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              type="text"
              className="form-control"
            />
            {firstName.length < 3 ? (
              <h6 className="emptyFieldWarning">
                *cannot be empty and lenght greater than 3
              </h6>
            ) : (
              <div></div>
            )}
          </div>
          {/* ========================================================= */}
          <div className="form-group needs-validation">
            <label className="form-label">Last Name</label>
            <input
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              type="text"
              className="form-control"
              placeholder="enter last name"
            />
            {lastName.length < 3 ? (
              <h6 className="emptyFieldWarning">
                *cannot be empty and lenght greater than 3
              </h6>
            ) : (
              <div></div>
            )}
          </div>
          {/* ===============================email===================================== */}
          <div className="form-group needs-validation">
            <label className="form-label">email</label>
            <input
              onFocus={CheckForEmailDupicacyOnServer}
              onBlur={CheckForEmailDupicacyOnServer}
              onChange={(e) => {
                setUniqueEmail("");
                console.log(email);
                setEmail(e.target.value);
                CheckForEmailDupicacyOnServer();
              }}
              type="email"
              className="form-control"
            />
            {email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)  && email.endsWith(".com") ? (
              <div className=""> </div>
            ) : (
              <h6 className="emptyFieldWarning">*enter valid email</h6>
            )}
            {/* ======================checking if email is unique==== */}

            {uniqueEmail == "DUPLICATE_EMAIL" &&
            email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) ? (
              <div>
                <MdUnpublished style={{ color: "red" }} />{" "}
                <h6 style={{ color: "red" }}>not available</h6>
              </div>
            ) : (
              <div></div>
            )}
            {uniqueEmail == "UNIQUE_EMAIL" &&
            email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) && email.endsWith(".com") ? (
              <div>
                <MdTaskAlt style={{ color: "green" }} />
                <h6 style={{ color: "green" }}>available</h6>
              </div>
            ) : (
              <div></div>
            )}
          </div>

          {/* =========================password======================== */}
          <div className="form-group needs-validation">
            <label className="form-label">password</label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="text"
              className="form-control"
              placeholder="confirm password"
            />
            {/* password validation */}
            {password.length < 4 ? (
              <h6 className="emptyFieldWarning">
                *cannot be empty min length 4
              </h6>
            ) : (
              <div></div>
            )}
          </div>
          {role == "select role" ? (
              <h6 className="emptyFieldWarning">*role cannot be empty</h6>
            ) : (
              <div></div>
            )}
          {/* ====================================role================================= */}
          <DropdownButton
            size="sm"
            title={role}
            style={{ marginTop: "10px" }}
            variant="warning"
          >
            <Dropdown.Item as="Button">
              <div
                onClick={(e) => {
                  setDoctorOptionFlag(false);
                  setRole(e.target.innerText);
                }}
              >
                admin
              </div>
            </Dropdown.Item>
            <Dropdown.Item>
              <div
                onClick={(e) => {
                  setDoctorOptionFlag(false);
                  setRole(e.target.innerText);
                }}
              >
                accountant
              </div>
            </Dropdown.Item>
            <Dropdown.Item>
              <div
                onClick={(e) => {
                  setDoctorOptionFlag(false);
                  setRole(e.target.innerText);
                }}
              >
                reception
              </div>
            </Dropdown.Item>
           
            <Dropdown.Item>
              <div
                onClick={(e) => {
                  setDoctorOptionFlag(true);
                  setRole(e.target.innerText);
                  // adding additional functionalities of doctor
                }}
              >
                doctor
              </div>
            </Dropdown.Item>
          </DropdownButton>
          {/* ===================================doctor options=============== */}
          {doctorOptionFlag && (
            <div>
              <label className="form-label">Doctor Charges</label>
              <input
                onChange={(e) => {
                  setDoctorCharges(e.target.value);
                }}
                type="number"
                className="form-control"
              />
              {doctorCharges == 0 ? (
              <h6 className="emptyFieldWarning">*charges cannot be 0</h6>
            ) : (
              <div></div>
            )}
            </div>
          )}
          {/* ====================================dob================================= */}
          <div className="form-group needs-validation">
            <label className="form-label">Date of Birth</label>
            <input
              onChange={(e) => {
                setDob(e.target.value);
              }}
              type="date"
              className="form-control"
            />
          </div>
          {/* ====================================hire date================================= */}
          <div>
            <label className="form-label">Date of Hiring</label>
            <input
              onChange={(e) => {
                setHireDate(e.target.value);
              }}
              type="date"
              className="form-control"
            />
            {/* hire date validation */}
            {hireDate == "" ? (
              <h6 className="emptyFieldWarning">*hire date cannot be empty</h6>
            ) : (
              <div></div>
            )}
          </div>
          {/* ====================================cell no================================= */}
          <div>
            <label className="form-label">Mobile Number</label>
            <PhoneInput
              className="form-control"
              value={cellNo}
              onChange={setCellNo}
              
            />
            {cellNo.length < 13 ? (
              <div>
                <MdUnpublished style={{ color: "red" }} />{" "}
                <h6 style={{ color: "red" }}>
                  invalid number(enter with country code eg..(+91)
                </h6>
              </div>
            ) : (
              <div>
                <MdTaskAlt style={{ color: "green" }} />
                <h6 style={{ color: "green" }}>valid</h6>
              </div>
            )}
          </div>
          {/* ====================================salary================================= */}
          <div>
            <label className="form-label">salary</label>
            <input
              onChange={(e) => {
                setSalary(e.target.value);
              }}
              type="number"
              className="form-control"
            />
            {/* salary validation */}
            {salary ==0  ? (
              <h6 className="emptyFieldWarning">*salary cannot be empty </h6>
            ) : (
              <div></div>
            )}
          </div>
          {/* ====================================security question================================= */}
          <div>
            <DropdownButton
              size="sm"
              title={securityQuestion}
              style={{ marginTop: "10px" }}
              variant="warning"
            >
              <Dropdown.Item as="Button">
                <div
                  onClick={(e) => {
                    setSecurityQuestion(e.target.innerText);
                  }}
                >
                  my pet name
                </div>
              </Dropdown.Item>
            </DropdownButton>
            {/* security question validation */}
            {securityQuestion == "select security question" ? (
              <h6 className="emptyFieldWarning">
                * security question cannot be empty
              </h6>
            ) : (
              <div></div>
            )}
          </div>
          {/* ========================================security answer============================================== */}
          <div>
            <label className="form-label">security answer</label>
            <input
              onChange={(e) => {
                setSecurityAnswer(e.target.value);
              }}
              type="text"
              className="form-control"
              placeholder="xyz"
            />
            {securityAnswer == "" ? (
              <h6 className="emptyFieldWarning">*answer cannot be empty</h6>
            ) : (
              <div></div>
            )}
          </div>
          {/* ========================================================================================== */}
        </Modal.Body>
        <Modal.Footer>
          <div style={{ position: "relative", left: "-120px" }}>
            <Button size="sm" variant="warning" onClick={()=>{handleClose();setEmployeeModal(false)}}>
              Go back
            </Button>
          </div>

          <Button size="sm" variant="success" onClick={AddEmployee}>
            Add New Employee
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default AddNewEmployeeModal;
