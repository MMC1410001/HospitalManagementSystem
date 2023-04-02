package com.tvm.hospital_management.dtos;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.tvm.hospital_management.entities.Patient;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

 @NoArgsConstructor @Getter @Setter @ToString @AllArgsConstructor@JsonInclude(value = Include.NON_NULL)
public class PatientDataBacking {
	
	    private int userId;
		private String firstName;
		private String lastName;
		private String email;
		@JsonProperty(access = Access.WRITE_ONLY)
		private String password;
		private String role;
		private String cellNo;
		private String securityQuestion;
		private String securityAnswer;
		
//********************Patient extra Details*************************************************
		
		private int patId;
		@DateTimeFormat(pattern = "yyyy-MM-dd")
		private Date dob;
		@DateTimeFormat(pattern = "yyyy-MM-dd")
		private Date dateOfAdmission;
		private int wardId;
		private int doctorId;
		private String bloodGroup;
		private String prescription;
		private int bedAlloted;
		private String paymentStatus;
		private String patientProblem;
		private String doctorFirstName;
		private String doctorLastName;
		private String type;
		private String doctorCellNo;
		//medicine assigned list
		
		
		
		public static List<PatientDataBacking> createPatient(List<Patient> employees){
			List<PatientDataBacking> employeeDetails= new ArrayList<PatientDataBacking>();
			for(Patient p:employees) {
				PatientDataBacking createdPatient= new PatientDataBacking();
				createdPatient.setFirstName(p.getUser().getFirstName());
				createdPatient.setLastName(p.getUser().getLastName());
				createdPatient.setRole(p.getUser().getRole());
				createdPatient.setCellNo(p.getUser().getCellNo());
				createdPatient.setDob(p.getDob());
				createdPatient.setEmail(p.getUser().getEmail());
				createdPatient.setPatId(p.getId());
				createdPatient.setUserId(p.getUser().getId());
				createdPatient.setWardId(p.getWard().getId());
				createdPatient.setDoctorId(p.getDoctor().getId());
				createdPatient.setDateOfAdmission(p.getDateOfAdmission());
				createdPatient.setBloodGroup(p.getBloodGroup());
				if(p.getPrescription()==null) {
					createdPatient.setPrescription("doctor will prescribe you");//to see if prescription is empty or not 
				}else {
					createdPatient.setPrescription(p.getPrescription());
				}

				createdPatient.setBedAlloted(p.getBedAlloted());
				createdPatient.setPaymentStatus(p.getPaymentStatus());
				createdPatient.setPatientProblem(p.getPatientProblem());
				createdPatient.setDoctorFirstName(p.getDoctor().getEmployee().getUser().getFirstName());
				createdPatient.setDoctorLastName(p.getDoctor().getEmployee().getUser().getLastName());
				createdPatient.setPrescription(p.getPrescription());
				createdPatient.setType(p.getWard().getType());
				createdPatient.setDoctorCellNo(p.getUser().getCellNo());
				employeeDetails.add(createdPatient);
			}
			
			return employeeDetails;
		}
		//=====================================patient to send to front end
		
		public static PatientDataBacking getByIdPatient(Patient p) {
			PatientDataBacking createdPatient=new PatientDataBacking();
			createdPatient.setFirstName(p.getUser().getFirstName());
			createdPatient.setLastName(p.getUser().getLastName());
			createdPatient.setRole(p.getUser().getRole());
			createdPatient.setCellNo(p.getUser().getCellNo());
			createdPatient.setDob(p.getDob());
			createdPatient.setEmail(p.getUser().getEmail());
			createdPatient.setPatId(p.getId());
			createdPatient.setUserId(p.getUser().getId());
			createdPatient.setWardId(p.getWard().getId());
			createdPatient.setDoctorId(p.getDoctor().getId());
			createdPatient.setDateOfAdmission(p.getDateOfAdmission());
			createdPatient.setBloodGroup(p.getBloodGroup());
			createdPatient.setPrescription(p.getPrescription());
			createdPatient.setBedAlloted(p.getBedAlloted());
			createdPatient.setPaymentStatus(p.getPaymentStatus());
			createdPatient.setPatientProblem(p.getPatientProblem());
			createdPatient.setDoctorFirstName(p.getDoctor().getEmployee().getUser().getFirstName());
			createdPatient.setDoctorLastName(p.getDoctor().getEmployee().getUser().getLastName());
			createdPatient.setPrescription(p.getPrescription());
			createdPatient.setType(p.getWard().getType());
			createdPatient.setDoctorCellNo(p.getDoctor().getEmployee().getUser().getCellNo());
			
			return createdPatient;
			
		}
		
		
		
//***********************************patients of doctor**********************************
		public static List<PatientDataBacking> createPatientsOfDoctor(List<Patient> employees,int doctorId){
			List<PatientDataBacking> employeeDetails= new ArrayList<PatientDataBacking>();
			for(Patient p:employees) {
				if(p.getDoctor().getId()==doctorId) {
					
					PatientDataBacking createdPatient= new PatientDataBacking();
					createdPatient.setFirstName(p.getUser().getFirstName());
					createdPatient.setLastName(p.getUser().getLastName());
					createdPatient.setRole(p.getUser().getRole());
					createdPatient.setCellNo(p.getUser().getCellNo());
					createdPatient.setDob(p.getDob());
					createdPatient.setEmail(p.getUser().getEmail());
					createdPatient.setPatId(p.getId());
					createdPatient.setUserId(p.getUser().getId());
					createdPatient.setWardId(p.getWard().getId());
					createdPatient.setDoctorId(p.getDoctor().getId());
					createdPatient.setDateOfAdmission(p.getDateOfAdmission());
					createdPatient.setBloodGroup(p.getBloodGroup());
					if(p.getPrescription()==null) {
						createdPatient.setPrescription("doctor will prescribe you");//to see if prescription is empty or not 
					}else {
						createdPatient.setPrescription(p.getPrescription());
					}

					createdPatient.setBedAlloted(p.getBedAlloted());
					createdPatient.setPaymentStatus(p.getPaymentStatus());
					createdPatient.setPatientProblem(p.getPatientProblem());
					createdPatient.setDoctorFirstName(p.getDoctor().getEmployee().getUser().getFirstName());
					createdPatient.setDoctorLastName(p.getDoctor().getEmployee().getUser().getLastName());
					createdPatient.setPrescription(p.getPrescription());
					createdPatient.setType(p.getWard().getType());
					createdPatient.setDoctorCellNo(p.getUser().getCellNo());
					employeeDetails.add(createdPatient);
				}

				}
							
			return employeeDetails;
		}
			
		
//*********************************************************************
		
		
//***************************************************************************
		
		
///*****************************to update an employee*********************
		
		

}
