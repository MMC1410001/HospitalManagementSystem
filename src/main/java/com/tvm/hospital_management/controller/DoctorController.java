package com.tvm.hospital_management.controller;

import java.util.List;

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

import com.tvm.hospital_management.dtos.DoctorDataBackinBean;
import com.tvm.hospital_management.dtos.DoctorVisitsDataBackinBean;
import com.tvm.hospital_management.dtos.PatientDataBacking;
import com.tvm.hospital_management.dtos.Response;
import com.tvm.hospital_management.services.DoctorServices;
import com.tvm.hospital_management.services.DoctorVisitsServices;
import com.tvm.hospital_management.services.PatientServices;


@CrossOrigin
@RestController @RequestMapping("/api/doctor")
public class DoctorController  {
	
	
	@GetMapping("/test")
	public String test()
	{
		return "Test";
	}
	@Autowired
	DoctorServices  doctorServices;
	@Autowired
	DoctorVisitsServices visitService;
	@Autowired
	PatientServices patientService;
	
	//...........pending
	@GetMapping("/getAllDoctors")@RolesAllowed({"ROLE_DOCTOR","ROLE_RECEPTION"})
	public ResponseEntity<?> getAllPatients(){
		List<DoctorDataBackinBean> doctors=doctorServices.getAllDoctors();
		
		return Response.success(doctors);
	}
	//@RolesAllowed({"ROLE_DOCTOR"})
	@PostMapping("/addPrescription")
	public void updatePatient(@RequestBody PatientDataBacking patientData) {
		
		doctorServices.updatePatientDetails(patientData);
	}
	//@RolesAllowed({"ROLE_DOCTOR"})
	@PostMapping("/increaseVisitCount")
	public ResponseEntity<?> increaseVisitCount(@RequestBody DoctorVisitsDataBackinBean visitData) {
		visitService.increaseVisitCount(visitData);
		return Response.success("increamented");
	}
	//@RolesAllowed({"ROLE_DOCTOR"})
	@GetMapping("/getPatients/{id}")
	public ResponseEntity<?> getPatientsOfDoctor(@PathVariable int id){
		List<PatientDataBacking> patientList=patientService.getPatientsOfDocter(id);
		return Response.success(patientList);
	}

}
