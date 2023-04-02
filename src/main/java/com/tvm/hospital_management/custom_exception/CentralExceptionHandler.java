package com.tvm.hospital_management.custom_exception;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.tvm.hospital_management.dtos.Response;

//import io.jsonwebtoken.MalformedJwtException;
//import io.jsonwebtoken.SignatureException;

@RestControllerAdvice@Order(Ordered.HIGHEST_PRECEDENCE)
public class CentralExceptionHandler {
//	@ExceptionHandler(NoSuchPatientFoundException.class)
//	public ResponseEntity<?> patientException(NoSuchPatientFoundException e){
//		return new ResponseEntity<>("no such patient found!!", HttpStatus.NOT_FOUND);
//	}
	
	//
	@ExceptionHandler(NoSuchEmployeeExistsException.class)
	public ResponseEntity<?> noSuchEmployeeFound(NoSuchEmployeeExistsException e){
		return Response.success("NO_EMPLOYEE_FOUND");
	}
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<?> allException(Exception e){
		return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
	}

}
