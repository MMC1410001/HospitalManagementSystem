package com.tvm.hospital_management.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.tvm.hospital_management.dtos.EmployeeUserDataBacking;
import com.tvm.hospital_management.dtos.Response;
import com.tvm.hospital_management.services.EmployeeServices;

@CrossOrigin
@RestController
@RequestMapping("/api/employee")//@RolesAllowed("ROLE_ADMIN")
public class EmployeeController {
	@Autowired
	EmployeeServices eServices;

	// *********************************get mapping to get all
	// employees****************************
	
	@GetMapping("/getAllEmployees")
	public ResponseEntity<?> getAll() {
		List<EmployeeUserDataBacking> result = eServices.getAllEmployees();
		return Response.success(result);
	}

	// ********************************************************************************************

	@PostMapping("/addEmployee")
	public @ResponseBody String addEmployee(@RequestBody EmployeeUserDataBacking userData) {
		System.out.println("recieved password : " + userData.getPassword());
		eServices.addEmployee(userData);
		return "employee added success";

	}

	// ***********************to update employee***********************
	
	@PostMapping("/updateEmployee")
	public @ResponseBody String updateEmployee(@RequestBody EmployeeUserDataBacking userData) {
		System.out.println("recieved password : " + userData.getPassword());
		eServices.updateEmployee(userData);
		return "employee added success";

	}

	@PostMapping("/deleteEmployee")
	public ResponseEntity<?> deleteEmployee(@RequestBody EmployeeUserDataBacking userData) {
		int deletedNo = eServices.deleteUserByCellNoAndUserId(userData);
		if (deletedNo == 1)
			return Response.success("deleted_success");
		return Response.error("employee_not_deleted");

	}

}
