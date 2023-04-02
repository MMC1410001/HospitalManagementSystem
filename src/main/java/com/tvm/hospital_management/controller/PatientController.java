package com.tvm.hospital_management.controller;

import java.util.List;

import javax.annotation.security.RolesAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tvm.hospital_management.dtos.ChargesCalculationBeanPatient;
import com.tvm.hospital_management.dtos.MedicineAssignedDataBackinBean;
import com.tvm.hospital_management.dtos.PatientDataBacking;
import com.tvm.hospital_management.dtos.Response;
import com.tvm.hospital_management.services.PatientServices;
//@EnableGlobalMethodSecurity(prePostEnabled = true,jsr250Enabled = true)
@CrossOrigin("*")
@RestController
@RequestMapping("/api/patient")
public class PatientController {
	@Autowired
	PatientServices pServices;
	//@RolesAllowed("ROLE_RECEPTION")
	@PostMapping("/addPatient")
	public ResponseEntity<?> addPatient(@RequestBody PatientDataBacking patientData) {
		int updateCount = pServices.addPatient(patientData);
		if (updateCount == 1)
			return Response.success("added");
		return Response.error("adding failed");
	}
//	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MANAGER')")
//	@PreAuthorize("hasRole('ROLE_PATIENT' )")
//	@Secured("ROLE_ADMIN")
//	@PreAuthorize("hasRole('ROLE_ADMIN' )")
	
	@GetMapping("/getAllPatients")@RolesAllowed({"ROLE_RECEPTION","ROLE_ACCOUNTANT"})
	public ResponseEntity<?> getAllPatients() {
		List<PatientDataBacking> patients = pServices.getAllPatients();

		return Response.success(patients);
	}

//	@PreAuthorize("hasRole('ROLE_PATIENT' )")
	@RolesAllowed({"ROLE_RECEPTION","ROLE_ACCOUNTANT","ROLE_PATIENT","ROLE_DOCTOR"})
	@GetMapping("/getPatient/{id}")
	public ResponseEntity<?> getPatientById(@PathVariable("id") int patientId) {
		PatientDataBacking patient = pServices.getPatientById(patientId);
		if (patient != null)
			return Response.success(patient);
		return Response.success("failed invalid patient id");

	}
	@RolesAllowed({"ROLE_RECEPTION"})
	@DeleteMapping("/removePatient/{id}")
	public ResponseEntity<?> deletePatientById(@PathVariable("id") int patientId) {
		pServices.removePatientById(patientId);
		return Response.success("success removed");

	}
	@RolesAllowed({"ROLE_RECEPTION"})
	@PostMapping("/updatePatient")
	public void updatePatient(@RequestBody PatientDataBacking patientData) {
		pServices.updatePatientDetails(patientData);
	}
	@RolesAllowed({"ROLE_RECEPTION","ROLE_PATIENT","ROLE_DOCTOR"})
	@GetMapping("/getMedicines/{id}")
	public ResponseEntity<?> getMedicineByPatId(@PathVariable("id") int patientId) {
		List<MedicineAssignedDataBackinBean> medicines = pServices.getMedicineByPatId(patientId);
		if (medicines != null)
			return Response.success(medicines);
		return Response.success("failed invalid medicines id");

	}
	@RolesAllowed({"ROLE_RECEPTION","ROLE_PATIENT","ROLE_DOCTOR","ROLE_ACCOUNTANT"})
	@GetMapping("/getCharges/{id}")
	public ResponseEntity<?> getChargesByPatId(@PathVariable("id") int patientId) {
		ChargesCalculationBeanPatient patientTotalCharges = pServices.calculateChargesByPatId(patientId);
		if (patientTotalCharges != null)
			return Response.success(patientTotalCharges);
		return Response.error("INVALID_PATIENT_ID");

	}
	@RolesAllowed({"ROLE_ACCOUNTANT"})
	@PostMapping("/updatePatientPaymentStatus")
	public void updatePatientPaymentStatus(@RequestBody PatientDataBacking patientData) {
		pServices.updatePaymentStatusByPatId(patientData);
	}
	@RolesAllowed({"ROLE_RECEPTION"})
	@PostMapping("/bedExists")
	public ResponseEntity<?> checkIfBedIsFree(@RequestBody PatientDataBacking bedData) {
		Boolean bedStatus = pServices.checkIfBedAvailable(bedData);
		if (bedStatus == true)
			return Response.success("BED_NOT_AVAILABLE");
		else
			return Response.success("BED_AVAILABLE");

	}

}
