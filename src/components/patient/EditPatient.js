import { useEffect, useState } from "react";

import {
  Modal,
  Button,
  Badge,
  Form,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import axios from "axios";
import { URL } from "../../config";
import { toast } from "react-toastify";
import DoctorDropDownElement from "../doctor/doctorList";
import WardDropdownElement from "./wardDropdownElement";
//=================================icons
import { MdTaskAlt, MdUnpublished } from "react-icons/md";
import { useNavigate } from "react-router";

function EditPatient(props) {
  //=========================all constants and variables=============================
  const {
    handleClose,
    patientDetails,
    show,
    setEditPatientFlag,
    toggleDataFlag,
  } = props;
  const [firstName, setFirstName] = useState(patientDetails.firstName);
  const [dataChangeFlag, setDataChangeFlag] = useState(false);
  const [lastName, setLastName] = useState(patientDetails.lastName);
  const [cellNo, setCellNo] = useState(patientDetails.cellNo);
  const [dob, setDob] = useState(patientDetails.dob);
  const [userId, setUserId] = useState(patientDetails.userId);
  const [patId, setPatId] = useState(patientDetails.patId);
  const [bedAlloted, setBedAlloted] = useState(patientDetails.bedAlloted);
  const [type, setType] = useState(patientDetails.type);
  const [bloodGroup, setBloodGroup] = useState(patientDetails.bloodGroup);
  
  //set token from session storage
  const [token, setToken] = useState(sessionStorage.getItem("token_reception"));
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  const [doctorFirstName, setDoctorFirstName] = useState(
    patientDetails.doctorFirstName
  );
  const [doctorLastName, setDoctorLastName] = useState(
    patientDetails.doctorLastName
  );
  // to get doctors from server
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState(patientDetails.doctorId);
  const [doctorName, setDoctorName] = useState(
    patientDetails.doctorFirstName + " " + patientDetails.doctorLastName
  ); //set doctorname on dropdown
  //wards related
  const [wardId, setWardId] = useState(patientDetails.wardId);
  const [wards, setWards] = useState([]);
  //to check if bed no is available
  const [uniqueBedAlloted, setUniqueBedAllted] = useState("");
  const [wardFullFlag, setWardFullFlag] = useState(false);
  //========================checking area==============
  console.log("userId -reception--editpatient-->" + userId);
  console.log("patId -reception--editpatient-->" + patId);
  console.log("data change flag --edit patient--start-->" + dataChangeFlag);
  //========================functions=================================
  const navigate = useNavigate();
  const ModalHandling = () => {
    handleClose();
    setEditPatientFlag(false);
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
  //==========================function to save data on server============
  const EditPatient = () => {
    const url = `${URL}/patient/updatePatient`;
    const body = {
      firstName,
      lastName,
      dob,
      cellNo,
      bedAlloted,
      bloodGroup,
      userId,
      patId,
      doctorId,
      wardId,
    };
    //reset doctor fields hidden again

  

    axios.post(url, body).then((res) => {
      setDataChangeFlag(true);
      console.log(
        "data change flag --edit patient--in GetDoctorsFromServer before click-->" +
          dataChangeFlag
      );
      const result = res.data;
      toggleDataFlag();
      // window.location.reload();//earlier implementation
      console.log(result);
    }).catch(err=>{
      navigate("/error");
  });

    handleClose();
  };
  // ==================================function to get doctors from server==========

  const GetDoctorsFromServer = () => {
    setDataChangeFlag(false);
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
    setDataChangeFlag(true);
    setDoctorId(id);
    setDoctorName(firstN + " " + lastN);
  };
  const HandleWardDropdown = (id, type) => {
    setWardId(id);
    setType(type);
  };
  useEffect(() => {
    console.log(
      "data change flag --edit patient--useeffect-->" + dataChangeFlag
    );

    GetDoctorsFromServer();
    GetWardsFromServer();
  }, [dataChangeFlag]);

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
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
              value={firstName}
              className="form-control"
            />
          </div>
          {/* ========================================================= */}
          <div className="form-group needs-validation">
            <label className="form-label">Last Name</label>
            <input
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              type="text"
              value={lastName}
              className="form-control"
              placeholder="confirm password"
            />
          </div>

          {/* ====================================dob================================= */}
          <div className="form-group needs-validation">
            <label className="form-label">Date of Birth</label>
            <input
              onChange={(e) => {
                setDob(e.target.value);
              }}
              type="date"
              value={dob}
              className="form-control"
            />
          </div>
          {/* ====================================admission date================================= */}

          {/* ====================================cell no================================= */}
          <div>
            <label className="form-label">Mobile Number</label>
            <PhoneInput
              className="form-control"
              value={cellNo}
              onChange={setCellNo}
            />
          </div>

          {/* ====================================blood group and ward type================= */}
          <div style={{ marginTop: "15px" }}>
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

          {/* -------------------ward type======================= */}
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
            {uniqueBedAlloted == "BED_NOT_AVAILABLE" &&
            bedAlloted != 0 ||
            wardFullFlag==true ? (
              <div>
                <MdUnpublished style={{ color: "red" }} />{" "}
                <h6 style={{ color: "red" }}>not available</h6>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          {/* =======================change doctor============= */}
          {/* ==================================doctorAlloted=========================== */}
          <div style={{ marginTop: "15px" }}>
            <DropdownButton size="sm" title={doctorName} variant="warning">
              {doctors.map((doctor) => {
                return (
                  <DoctorDropDownElement
                    doctor={doctor}
                    setDoctorId={setDoctorId}
                    HandleDoctorDropdown={HandleDoctorDropdown}
                  />
                );
              })}
            </DropdownButton>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ModalHandling}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              EditPatient();
            }}
          >
            update Patient
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditPatient;
