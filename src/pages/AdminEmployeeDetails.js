import {
  Badge,
  Button,
  Table,
  Image,
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import Employee from "../components/admin/employee";
import "./adminDetails.css";
import { getEmployeeDetails } from "../data";
import { useEffect, useState } from "react";
import AddNewEmployeeModal from "../components/admin/addNewEmployeeModal";
import RemoveEmployeeModal from "../components/admin/removeEmployeeModal";
import UpdateEmployeeModal from "../components/admin/updateEmployee";
import titleImage from "../assets/backgroundMain1.jpg";
import titleImage2 from "../assets/backgroundMain.jpg";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../config";
import axios from "axios";
import AddWardModal from "./admin/component/AddWardModal";
import DropdownItem from "@restart/ui/esm/DropdownItem";
import DropdownMenu from "@restart/ui/esm/DropdownMenu";
import RemoveWardModal from "./admin/component/RemoveWardModal";
import AddMedicineModal from "./admin/component/AddMedicineModal";
import RemoveMedicineModal from "./admin/component/RemoveMedicineModal";
import ErrorHandle from "./errorHandling/ErrorHandle";
//to set default header to axios

const Admin = () => {
  //********************to check if data is changed========== */
  const [dataChangedFlag, setDataChangedFlag] = useState(false);
  const [employeeUpdate, setEmployeeUpdate] = useState("");
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [Rshow, setRShow] = useState(false);
  const RhandleShow = () => setRShow(true);

  const [Ushow, setUShow] = useState(true);
  const UhandleShow = () => setUShow(true);
  const UhandleClose = () => setUShow(false);

  const [updateModalFlag, setUpdateModalFlag] = useState(false);
  const [empId, setEmpid] = useState(0);

  const [employeeModal, setEmployeeModal] = useState(false);

  const [removeEmployee, setRemoveEmployee] = useState(false);

  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  // add ward modal
  const [addWardModalFlag, setAddWardModalFlag] = useState(false);
  const [removeWardModalFlag, setRemoveWardModalFlag] = useState(false);
  //add medicine
  const [addMedicineModalFlag, setAddMedicineModalFlag] = useState(false);
  const [removeMedicineModalFlag, setRemoveMedicineModalFlag] = useState(false);

  //set token from session storage
  const [token, setToken] = useState(sessionStorage.getItem("token_admin"));
  //to set default header in axios
  if (token != null)
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  //to implement search functionality
  const [search, setSearch] = useState("");
  /***************************************useEffect for updating page on start==================== */
  const updateEmployee = (id, employee) => {
    console.log(
      "inside before updateEmployee :" +
        Ushow +
        "updateModalFlag:" +
        updateModalFlag
    );
    setEmployeeUpdate(employee);
    console.log("recived name to update :" + employeeUpdate.firstName);

    setEmpid(id);
    console.log("empid recieved to update : " + empId);
    setUShow(true);
    setUpdateModalFlag(true);
  };
  useEffect(() => {
    getEmployeesFromServer();
    console.log("inside useEffect of adminDetails");
  }, [dataChangedFlag]);
  // to set header in axios
  let header = {
    headers: {
      Authorization: "Bearer " + token, //the token is a variable which holds the token
    },
  };
  /********===============================getting employees from server======================= */

  const getEmployeesFromServer = () => {
    //delete
    console.log("--------token--admin" + token);
    const url = `${URL}/employee/getAllEmployees`;
    axios.get(url).then((res) => {
      setDataChangedFlag(false);
      console.log("data flag inside getEmployeesFromServer " + dataChangedFlag);
      const result = res.data;
     
      

      if (result.status == "success") {
        setEmployees(result.data);
        console.log(res);
      } else {
        console.log("unable to fetch result");
      }
    }).catch(err=>{
      
      
      navigate("/error");
 });
  };

  return (
    <div>
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
              {/* ==============================add new employee==================== */}
              <DropdownButton
                size="sm"
                title="Employee"
                variant="warning"
                style={{ margin: "6px" }}
              >
                <Dropdown.Item>
                  <Button
                    size="sm"
                    variant="success"
                    onClick={() => {
                      handleShow();
                      setEmployeeModal(true);
                    }}
                  >
                    Add New Employee
                  </Button>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => {
                      RhandleShow();

                      setRemoveEmployee(true);
                    }}
                  >
                    Remove Employee
                  </Button>
                </Dropdown.Item>
              </DropdownButton>

              {/* ==========================add ward========================= */}
              <DropdownButton
                size="sm"
                title="Ward"
                variant="warning"
                style={{ margin: "6px" }}
              >
                <Dropdown.Item>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => {
                      handleShow();
                      setAddWardModalFlag(true);
                    }}
                  >
                    {" "}
                    Add ward
                  </Button>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      handleShow();
                      setRemoveWardModalFlag(true);
                    }}
                  >
                    {" "}
                    remove ward
                  </Button>
                </Dropdown.Item>
              </DropdownButton>

              {/* =========================add medicine=========================== */}
              <DropdownButton
                size="sm"
                title="Medicine"
                variant="warning"
                style={{ margin: "6px" }}
              >
                <Dropdown.Item>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => {
                      handleShow();
                      setAddMedicineModalFlag(true);
                    }}
                  >
                    {" "}
                    Add Medicine
                  </Button>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      handleShow();
                      setRemoveMedicineModalFlag(true);
                    }}
                  >
                    {" "}
                    remove Medicine
                  </Button>
                </Dropdown.Item>
              </DropdownButton>

              {/* ================================search employee===================== */}
              <Nav.Link>
                {/* third button */}
                <div style={{ float: "right" }}>
                  <Button size="sm" variant="secondary">
                    {" "}
                    Search employee
                  </Button>
                  <input
                    style={{
                      borderStyle: "solid",
                      borderRadius: "20px",
                      marginLeft: "10px",
                    }}
                    placeholder="enter name"
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    type="text"
                  />
                </div>
              </Nav.Link>
              <Nav.Link>
                {/* fourth menu operration */}
                <Button
                  size="sm"
                  onClick={() => {
                    navigate("/");
                  }}
                  variant="primary"
                >
                  LogOut
                </Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        {/*---------------------------- all untoggled modals------------------ */}
        {updateModalFlag && (
          <UpdateEmployeeModal
            setUpdateModalFlag={setUpdateModalFlag}
            dataChangedFlag={dataChangedFlag}
            setDataChangedFlag={setDataChangedFlag}
            employeeUpdate={employeeUpdate}
            EmpId={empId}
            show={Ushow}
            setShow={setUShow}
            handleShow={UhandleShow}
            handleClose={UhandleClose}
          />
        )}
        {/* a-------------------------add medicne-------------- */}
        {addMedicineModalFlag && (
          <AddMedicineModal
            setAddMedicineModalFlag={setAddMedicineModalFlag}
            setDataChangedFlag={setDataChangedFlag}
            show={show}
            setShow={setShow}
            handleShow={handleShow}
            handleClose={handleClose}
          />
        )}
        {/* ------------------to remove medicine---------------- */}
        {removeMedicineModalFlag && (
          <RemoveMedicineModal
            setRemoveMedicineModalFlag={setRemoveMedicineModalFlag}
            setDataChangedFlag={setDataChangedFlag}
            show={show}
            setShow={setShow}
            handleShow={handleShow}
            handleClose={handleClose}
          />
        )}
        {/* -------------------to add ward--------------------------------- */}
        {addWardModalFlag && (
          <AddWardModal
            setAddWardModalFlag={setAddWardModalFlag}
            setDataChangedFlag={setDataChangedFlag}
            show={show}
            setShow={setShow}
            handleShow={handleShow}
            handleClose={handleClose}
          />
        )}
        {removeWardModalFlag && (
          <RemoveWardModal
            setRemoveWardModalFlag={setRemoveWardModalFlag}
            setDataChangedFlag={setDataChangedFlag}
            show={show}
            setShow={setShow}
            handleShow={handleShow}
            handleClose={handleClose}
          />
        )}
        {employeeModal && (
          <AddNewEmployeeModal
            setEmployeeModal={setEmployeeModal}
            employees={employees}
            show={show}
            setShow={setShow}
            dataChangedFlag={dataChangedFlag}
            setDataChangedFlag={setDataChangedFlag}
            handleClose={handleClose}
            handleShow={handleShow}
          />
        )}
        {removeEmployee && (
          <RemoveEmployeeModal
            setRemoveEmployee={setRemoveEmployee}
            employees={employees}
            Rshow={Rshow}
            setRShow={setRShow}
            dataChangedFlag={dataChangedFlag}
            setDataChangedFlag={setDataChangedFlag}
            RhandleClose={handleClose}
            handleShow={RhandleShow}
          />
        )}
      </div>
      <div>
        <Table variant="dark" striped bordered hover>
          <thead>
            <tr>
              <th>EmpId</th>
              <th>Name</th>
              <th>cell no</th>
              <th>Role</th>
              <th>DOB</th>
              <th>Join Date</th>
              <th>Salary</th>
              <th>Update Detail</th>
            </tr>
          </thead>
          {/* (e)=>{
              if(search=="")
              return e;
              else
              if(`${e.firstName}+" "+${e.lastName}`.includes(search.toLocaleLowerCase()) )
            } */}
          <tbody>
            { employees
              .filter((e) => {
                if (search == "") return e;
                else if (
                  (e.firstName + e.lastName).toLowerCase().includes(search)
                ) {
                  return e;
                }
            // employees
            //   .filter((e) => {
            //     if (search == "") return e;
            //     else if (
            //       `${e.firstName}+" "+${e.lastName}`.includes(
            //         search.toLocaleLowerCase()
            //       )
            //     )
            //       return e;
              })
              .map((e) => {
                return (
                  <Employee
                    employee={e}
                    updateEmployee={updateEmployee}
                    index={index}
                  />
                );
              })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
export default Admin;
