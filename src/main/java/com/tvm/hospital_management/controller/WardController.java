package com.tvm.hospital_management.controller;

import java.util.List;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tvm.hospital_management.dtos.Response;
import com.tvm.hospital_management.dtos.WardDataBackinBean;
import com.tvm.hospital_management.services.WardServices;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/ward")
public class WardController {
	@Autowired
	WardServices wardServices;
	@PermitAll
	@GetMapping("/getAllWards")
	public ResponseEntity<?> getAllWards() {
		List<WardDataBackinBean> allWards = wardServices.getAllWards();

		return Response.success(allWards);
	}
	@RolesAllowed({"ROLE_RECEPTION"})
	@PostMapping("/increaseBedCount")
	public ResponseEntity<?> increaseBedCount(@RequestBody WardDataBackinBean wardData) {
String increaseBedCount = wardServices.increaseBedCount(wardData);
		System.out.println(("-------------------------request-----------increase"));
		if(increaseBedCount.equals("SUCCESS"))
		return Response.success("INCREASED");
		return Response.success("FAILED");

	}
	@RolesAllowed({"ROLE_RECEPTION"})
	@PostMapping("/decreaseBedCount")
	public ResponseEntity<?> decreaseBedCount(@RequestBody WardDataBackinBean wardData) {
		System.out.println(("-------------------------request-----------decrease"));
		String increaseBedCount = wardServices.decreaseBedCount(wardData);
		
		if(increaseBedCount.equals("SUCCESS"))
		return Response.success("DECREASED");
		return Response.success("FAILED");
		
	}
	
	@RolesAllowed({"ROLE_ADMIN"})
	@PostMapping("/addWard")
	public ResponseEntity<?> addWard(@RequestBody WardDataBackinBean wardData) {
		int updateCount = wardServices.addWard(wardData);
		if (updateCount == 1)
			return Response.success("WARD_ADDED");
		return Response.success("FAILED");
	}
	@RolesAllowed({"ROLE_ADMIN","ROLE_RECEPTION"})
	@GetMapping("/removeWard/{id}")
	public ResponseEntity<?> getPatientById(@PathVariable("id") int wardId) {
		int status = wardServices.removeWard(wardId);
		if(status==1)
		return Response.success("WARD_REMOVED");
		else
		return Response.success("WARD_NOT_REMOVED");
			
	}

}
