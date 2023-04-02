import { useState } from "react";
import { Badge, Button } from "react-bootstrap";
import UpdateEmployeeModal from "./updateEmployee";

const Employee = (props) => {
  const { employee, handleShow, updateEmployee } = props;

  return (
    <tr>
      <th>{employee.empId}</th>
      <th>{employee.firstName + " " + employee.lastName}</th>
      <th>{employee.cellNo}</th>
      <th>{employee.role}</th>
      <th>{employee.dob}</th>
      <th>{employee.hireDate}</th>
      <th>{employee.salary}</th>
      <th>
        <Button
          variant="outline-danger"
          size="sm"
          style={{ fontSize: "small" }}
          onClick={() => {
            console.log("empid in employee component" + employee.empId);
            updateEmployee(employee.empId,employee);
          }}
        >
          update
        </Button>
      </th>
      {/* {updateModalFlag && <UpdateEmployeeModal setShow={setShow} setUpdateModalFlag={setUpdateModalFlag} handleClose={handleClose} handleShow={handleShow}/> } */}
    </tr>
  );
};
export default Employee;
