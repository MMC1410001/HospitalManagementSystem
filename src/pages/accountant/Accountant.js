import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Patient from "../../components/patient/patient";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { URL } from "../../config";
import "./Accountant.css";
import PatientDisplayAccountant from "./patientAccountant";
import accountantPatient from "./patientAccountant";
import PatientAccountant from "./patientAccountant";

const Accountant = () => {
  // ============================all constants=======================
  const [addNewPatientModalFlag, setAddNewPatientModalFlag] = useState(false);
  const [show, setShow] = useState(false);
  const [patients, setPatients] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [dataChangedFlag, setDataChangedFlag] = useState(false);
  const [search, setSearch] = useState("");
  //set token from session storage
  const [token, setToken] = useState(
    sessionStorage.getItem("token_accountant")
  );
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  //************************=======fuctions=========--------------- */

  const getPatientsFromServer = () => {
    const url = `${URL}/patient/getAllPatients`;
    axios
      .get(url)
      .then((res) => {
        setDataChangedFlag(false);
        console.log(
          "data flag inside getEmployeesFromServer " + dataChangedFlag
        );
        const result = res.data;
        if (result.status == "success") {
          setPatients(result.data);
        } else {
          console.log("unable to fetch result");
        }
      })
      .catch((err) => {
        navigate("/error");
      });
  };
  useEffect(() => {
    getPatientsFromServer();
    console.log("inside useEffect of adminDetails");
  }, [dataChangedFlag]);
  const navigate = useNavigate();
  //******************=-------------=======----------=======------------- */
  return (
    <div className="doctorContainer">
      <Navbar bg="" expand="lg" sticky="top">
        <Container>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={{
              color: "brown",
              fontWeight: "bold",
              background: "chartreuse",
            }}
          >
            Click For Options
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* ==============================ato log out==================== */}
              <Nav.Link>
                <Button size="sm" variant="warning">
                  {" "}
                  Search Patient
                </Button>
                <input
                  style={{
                    borderStyle: "solid",
                    borderRadius: "20px",
                    marginLeft: "10px",
                  }}
                  placeholder="  enter name.. "
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  type="text"
                />
              </Nav.Link>
              <Nav.Link>
                {/* fourth menu operration */}
                <Button
                  variant="primary"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Logout
                </Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <hr />

      {/* =======================================table container of patients====================================== */}
      <div className="cointainer-fluid accountantTableContainer">
        <table class="table table-dark table-hover ">
          <thead>
            <tr>
              <th scope="col">Patient Id</th>
              <th scope="col">Name</th>
              <th scope="col">Payment Status</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tbody>
            {patients
              .filter((e) => {
                if (search == "") return e;
                else if (
                  (e.firstName + e.lastName).toLowerCase().includes(search)
                ) {
                  return e;
                }
              })
              .map((e) => {
                return (
                  <PatientAccountant
                    patient={e}
                    setDataChangedFlag={setDataChangedFlag}
                  />
                );
              })}
          </tbody>
        </table>
      </div>
      {/* ================================================table container over========================== */}
    </div>
  );
};

export default Accountant;
