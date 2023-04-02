import { useEffect, useState } from "react";

import { Modal, Button, DropdownButton, Dropdown } from "react-bootstrap";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import axios from "axios";
import { URL } from "../../config";
import DoctorDropDownElement from "../doctor/doctorList";
import WardDropdownElement from "./wardDropdownElement";
import "./AddNewPatient.css";
//=================================icons
import { MdTaskAlt, MdUnpublished } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function AddNewPatientModal(props) {
  //=========================all constants and variables=============================
  const { handleClose, show, setAddNewPatientModalFlag, ToggleDataChangeFlag } =
    props;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("patient");
  const [cellNo, setCellNo] = useState("");
  const [dateOfAdmission, setDateOfAdmission] = useState("");
  const [dob, setDob] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [securityQuestion, setSecurityQuestion] = useState(
    "select security question"
  );
  const [doctorName, setDoctorName] = useState("select doctor");
  const [bedAlloted, setBedAlloted] = useState(0);
  const [type, setType] = useState("select ward type");
  const [bloodGroup, setBloodGroup] = useState("select Blood group");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //to check if email is unique
  const [uniqueEmail, setUniqueEmail] = useState("");
  //to check if bed no is available
  const [uniqueBedAlloted, setUniqueBedAllted] = useState("");

  const [patientProblem, setPatientProblem] = useState("");
  // to get doctors from server
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState(0);
  //wards related
  const [wardId, setWardId] = useState(0);
  const [wards, setWards] = useState([]);
  const [wardFullFlag, setWardFullFlag] = useState(false);
  //========================functions=================================
  const navigate = useNavigate();
  //set token from session storage
  const [token, setToken] = useState(sessionStorage.getItem("token_reception"));
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  const ModalHandling = () => {
    handleClose();
    setAddNewPatientModalFlag(false);
  };

  // decrease bed count
  const DecreaseBedCount = () => {
    if (wardId != 0) {
      console.log("ward---id- inside decrease->" + wardId);
      const body = {
        wardId,
      };
      const url = `${URL}/ward/decreaseBedCount`;
      axios.post(url, body).then((res) => {
        const result = res.data; //DECREASED
        console.log(result); //INCREASED
        if (result.status == "success" && result.data == "FAILED") {
          setWardFullFlag(true);
          toast.warning(" ward full!!!");
        } else {
          toast.success("bed available in ward");
        }
      }).catch(err=>{
        navigate("/error");
    });
    } else {
      toast.warning("set ward type first");
    }
  };
  //increase bed count
  const IncreaseBedCount = () => {
    if (wardId != 0) {
      console.log("ward--increse-id-->" + wardId);
      const body = {
        wardId,
      };
      const url = `${URL}/ward/increaseBedCount`;
      axios.post(url, body).then((res) => {
        const result = res.data; //DECREASED
        console.log(result); //INCREASED
        if (result.status == "success" && result.data == "FAILED") {
          setWardFullFlag(true);
        } else {
        }
      }).catch(err=>{
        navigate("/error");
    });
    } else {
    }
  };
  //==========================function to save data on server============
  const addPatient = () => {
    if (
      firstName.length > 3 &&
      lastName.length > 3 &&
      email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) &&
      password.length > 3 &&
      dateOfAdmission != "" &&
      cellNo != "" &&
      doctorId != 0 &&
      bloodGroup != "select Blood group" &&
      bedAlloted != 0 &&
      type != "select ward type" &&
      securityQuestion != "select security question" &&
      securityAnswer != "" &&
      patientProblem.length > 4 &&
      uniqueEmail == "UNIQUE_EMAIL" &&
      uniqueBedAlloted == "BED_AVAILABLE" &&
      wardFullFlag == false
    ) {
      const url = `${URL}/patient/addPatient`;

      const body = {
        firstName,
        lastName,
        role,
        dob,
        dateOfAdmission,
        cellNo,
        email,
        password,
        securityAnswer,
        securityQuestion,
        bedAlloted,
        wardId,
        patientProblem,
        bloodGroup,
        doctorId,
        paymentStatus,
      };

      //reset doctor fields hidden again

      axios.post(url, body).then((res) => {
        const result=res.data;
        if (result.status == "exception") {
          toast.warning(result.data);
        } else {
          toast.success("bed alloted successfull ");
        }
        
        console.log(result);

      }).catch(err=>{
        navigate("/error");
    });
      //--------------------------to decrese bed count
      const bodyDecreseBed = {
        wardId,
      };
      const urlDecrease = `${URL}/ward/decreaseBedCount`;
      axios.post(urlDecrease, bodyDecreseBed).then((res) => {
        const result = res.data; //DECREASED
        console.log(result); //INCREASED
        if (result.status == "success" && result.data == "FAILED") {
          toast.warning(" bed not alloted !!!");
        } else {
          toast.success("bed alloted successfull ");
        }
      }).catch(err=>{
        navigate("/error");
    });

      //-------------------------------
      ToggleDataChangeFlag();
      handleClose();
      setAddNewPatientModalFlag(false);
      setWardFullFlag(false);
    } else {
    }
  }; //end of if

  // ==================================function to get doctors from server==========

  const GetDoctorsFromServer = () => {
    const url = `${URL}/doctor/getAllDoctors`;
    axios.get(url).then((res) => {
      const result = res.data;
      console.log(result);
      if (result.status == "success") setDoctors(result.data);
    }).catch(err=>{
      navigate("/error");
  });
  };
  const GetWardsFromServer = () => {
    const url = `${URL}/ward/getAllWards`;
    axios.get(url).then((res) => {
      const result = res.data;
      console.log(result);
      if (result.status == "success") setWards(result.data);
    }).catch(err=>{
      navigate("/error");
  });
  };
  const HandleDoctorDropdown = (id, firstN, lastN) => {
    setDoctorId(id);
    setDoctorName(firstN + " " + lastN);
  };
  const HandleWardDropdown = (id, type) => {
    setWardId(id);
    setType(type);
  };
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
  //check on server if bed exists
  const CheckForBedDupicacyOnServer = () => {
    const url = `${URL}/patient/bedExists`;
    const body = {
      bedAlloted,
      wardId,
    };
    axios.post(url, body).then((res) => {
      const result = res.data;
      console.log(result);
      if (result.status == "success") {
        setUniqueBedAllted(result.data);
      }
    }).catch(err=>{
      navigate("/error");
  });
  };

  useEffect(() => {
    GetDoctorsFromServer();
    GetWardsFromServer();
  }, []);

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Enter Patient Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
              placeholder="patient last name"
              required
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
            {email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) &&
            email.endsWith(".com") ? (
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
            email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) &&
            email.endsWith(".com") ? (
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
              placeholder="enter password"
              required
            />
            {password.length < 4 ? (
              <h6 className="emptyFieldWarning">
                *cannot be empty min length 4
              </h6>
            ) : (
              <div></div>
            )}
          </div>

          {/* ====================================dob================================= */}
          <div className="form-group needs-validation">
            <label className="form-label">Date of Birth</label>
            <input
              onChange={(e) => {
                setDob(e.target.value);
              }}
              type="date"
              className="form-control"
              required
            />
          </div>
          {/* ====================================admission date================================= */}
          <div>
            <label className="form-label">Date of Admission</label>
            <input
              onChange={(e) => {
                setDateOfAdmission(e.target.value);
              }}
              type="date"
              className="form-control"
              required
            />
            {dateOfAdmission == "" ? (
              <h6 className="emptyFieldWarning">*cannot be empty</h6>
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
          {/* ==================================doctorAlloted=========================== */}
          <div style={{ marginTop: "15px" }}>
            {doctorId == 0 ? (
              <h6 style={{ color: "red" }}>*please select doctor</h6>
            ) : (
              <div></div>
            )}
            <DropdownButton size="sm" title={doctorName} variant="warning">
              {doctors.map((doctor) => {
                return (
                  <DoctorDropDownElement
                    doctor={doctor}
                    HandleDoctorDropdown={HandleDoctorDropdown}
                  />
                );
              })}
            </DropdownButton>
          </div>

          {/* ====================================blood group and ward type================= */}
          <div style={{ marginTop: "15px" }}>
            {bloodGroup == "select Blood group" ? (
              <h6 className="emptyFieldWarning">
                *blood group cannot be empty
              </h6>
            ) : (
              <div></div>
            )}
            <DropdownButton size="sm" title={bloodGroup} variant="warning">
              <Dropdown.Item as="Button">
                <div
                  onClick={(e) => {
                    setBloodGroup(e.target.innerText);
                  }}
                >
                  O+
                </div>
              </Dropdown.Item>
              <Dropdown.Item>
                <div
                  onClick={(e) => {
                    setBloodGroup(e.target.innerText);
                  }}
                >
                  O-
                </div>
              </Dropdown.Item>
              <Dropdown.Item>
                <div
                  onClick={(e) => {
                    setBloodGroup(e.target.innerText);
                  }}
                >
                  A+
                </div>
              </Dropdown.Item>
              <Dropdown.Item>
                <div
                  onClick={(e) => {
                    setBloodGroup(e.target.innerText);
                  }}
                >
                  A-
                </div>
              </Dropdown.Item>
              <Dropdown.Item>
                <div
                  onClick={(e) => {
                    setBloodGroup(e.target.innerText);
                  }}
                >
                  AB+
                </div>
              </Dropdown.Item>
              <Dropdown.Item>
                <div
                  onClick={(e) => {
                    setBloodGroup(e.target.innerText);
                  }}
                >
                  AB-
                </div>
              </Dropdown.Item>
            </DropdownButton>
          </div>
          {/*----------------------------------- ward type-------------------  */}
          <div style={{ marginTop: "15px" }}>
            {type == "select ward type" ? (
              <h6 className="emptyFieldWarning">*ward cannot be empty</h6>
            ) : (
              <div></div>
            )}
            <DropdownButton size="sm" title={type} variant="warning">
              {wards.map((ward) => {
                return (
                  <WardDropdownElement
                    ward={ward}
                    HandleWardDropdown={HandleWardDropdown}
                    setWardFullFlag={setWardFullFlag}
                  />
                );
              })}
            </DropdownButton>
          </div>
          {/* ===============================bed alloted==================== */}
          {/* <div>1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,</div> */}
          <div>
            <label className="form-label">Bed alloted</label>
            <input
              onFocus={DecreaseBedCount}
              onBlur={() => {
                CheckForBedDupicacyOnServer();
                if (wardFullFlag == false) {
                  IncreaseBedCount();
                }
              }}
              onChange={(e) => {
                CheckForBedDupicacyOnServer();
                setBedAlloted(e.target.value);
              }}
              type="number"
              className="form-control"
              placeholder="enter bed no"
            />

            {/* <div style={{ color: "green" }} onClick={decreaseBedCount}>
              {" "}
              check availability
            </div>
            <div style={{ color: "red" }} onClick={increaseBedCount}>
              {" "}
              remove bed
            </div> */}
            {/* checking on server for bed is allocated or not */}
            {wardFullFlag ? (
              <div style={{ color: "red" }}>*ward is full</div>
            ) : (
              <div></div>
            )}
            {bedAlloted == 0 ? (
              <h6 className="emptyFieldWarning">
                *bed alloted cannot be empty
              </h6>
            ) : (
              <div></div>
            )}

            {uniqueBedAlloted == "BED_AVAILABLE" && bedAlloted != 0 ? (
              <div>
                <MdTaskAlt style={{ color: "green" }} />
                <h6 style={{ color: "green" }}>available</h6>
              </div>
            ) : (
              <div></div>
            )}
            {(uniqueBedAlloted == "BED_NOT_AVAILABLE" && bedAlloted != 0) ||
            wardFullFlag ? (
              <div>
                <MdUnpublished style={{ color: "red" }} />{" "}
                <h6 style={{ color: "red" }}>not available</h6>
              </div>
            ) : (
              <div></div>
            )}
          </div>

          {/* ====================================security question================================= */}
          <div>
            {securityQuestion == "select security question" ? (
              <h6 className="emptyFieldWarning">
                * security question cannot be empty
              </h6>
            ) : (
              <div></div>
            )}
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
              placeholder="enter your pet name"
              required
            />
            {securityAnswer == "" ? (
              <h6 className="emptyFieldWarning">*answer cannot be empty</h6>
            ) : (
              <div></div>
            )}
          </div>
          {/* ===================================problem================== */}
          <div>
            <label className="form-label">problem</label>
            <input
              onChange={(e) => {
                setPatientProblem(e.target.value);
              }}
              type="text-area"
              className="form-control"
              required
            />
            {patientProblem.length < 5 ? (
              <h6 className="emptyFieldWarning">
                *problem cannot be empty min length 5{" "}
              </h6>
            ) : (
              <div></div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ModalHandling}>
            close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              // IncreaseBedCount();//compensation for checking
              addPatient();
            }}
          >
            add patient
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddNewPatientModal;
