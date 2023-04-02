package com.tvm.hospital_management.dtos;

import java.util.ArrayList;
import java.util.List;

import com.tvm.hospital_management.entities.Doctor;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Getter@Setter@NoArgsConstructor@AllArgsConstructor@ToString
public class DoctorDataBackinBean {
	private int doctorId;
	private String firstName;
	private String lastName;
	
	public static List<DoctorDataBackinBean> createDoctorsList(List<Doctor> doctors){
		List<DoctorDataBackinBean> createDoctorDtoList=new ArrayList<DoctorDataBackinBean>();
		
		
		for(Doctor doctor:doctors) {
			DoctorDataBackinBean createDoctorDto=new DoctorDataBackinBean();
			
			createDoctorDto.setFirstName(doctor.getEmployee().getUser().getFirstName());
			createDoctorDto.setLastName(doctor.getEmployee().getUser().getLastName());
			createDoctorDto.setDoctorId(doctor.getId());
			createDoctorDtoList.add(createDoctorDto);
			
		}
		
		return createDoctorDtoList;
		
		
	}

}
