package com.tvm.hospital_management.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tvm.hospital_management.dtos.EmployeeUserDataBacking;
import com.tvm.hospital_management.dtos.Response;
import com.tvm.hospital_management.services.UserServices;
//import com.tvm.spring_security.UserDetailsService;
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RestController 
@RequestMapping("/api/user")
public class UserController {
	@Autowired
	UserServices  services;
	
	@GetMapping("/test")
	public String get()
	{
		return "TEST";
	}

	@PostMapping("/authenticate")
	public ResponseEntity<?> authenticateUser(@RequestBody EmployeeUserDataBacking useData) throws Exception { 
		System.out.println("In user authenticate");
		EmployeeUserDataBacking user=services.getUserByEmailAndPassword(useData);
		if(user!=null) {
			if(user.getPassword()!=null&&user.getPassword().equals(useData.getPassword())) {
				return Response.success(user);
			}
				
			return Response.error("invalid_password");
		}
		else
		return Response.error("invalid_user");
		
	}
  
       
	@PostMapping("/emailExists")
	public ResponseEntity<?> checkIfEmailExists(@RequestBody EmployeeUserDataBacking useData ){
		Boolean emailExists=services.checkIfEmailExists(useData);
		if(emailExists==true)
		return Response.success("DUPLICATE_EMAIL");
		else
		return Response.success("UNIQUE_EMAIL");
	}
	
	@PostMapping("/validateSecurityAnswer")
	public ResponseEntity<?> checkIfUserExistByEmailAndSecurity(@RequestBody EmployeeUserDataBacking useData ){
		Boolean emailExists=services.checkByEmailAndSecurity(useData);
		if(emailExists==true)
		return Response.success("VALID");
		else
		return Response.success("INVALID");
	}
	@PostMapping("/updatePassword")
	public ResponseEntity<?> updatePassword(@RequestBody EmployeeUserDataBacking useData ){
		Boolean emailExists=services.updatePassword(useData);
		if(emailExists==true)
		return Response.success("PASSWORD_CHANGED");
		else
		return Response.success("INVALID");
	}

}
