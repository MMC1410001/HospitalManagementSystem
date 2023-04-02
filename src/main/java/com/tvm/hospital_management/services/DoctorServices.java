package com.tvm.hospital_management.services;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tvm.hospital_management.custom_exception.NoSuchPatientFoundException;
import com.tvm.hospital_management.daos.IDoctorDao;
import com.tvm.hospital_management.daos.IEmployeeDao;
import com.tvm.hospital_management.daos.IPatientDao;
import com.tvm.hospital_management.daos.IUserDao;
import com.tvm.hospital_management.dtos.DoctorDataBackinBean;
import com.tvm.hospital_management.dtos.PatientDataBacking;
import com.tvm.hospital_management.entities.Doctor;
import static com.tvm.hospital_management.dtos.DoctorDataBackinBean.*;

@Service @Transactional
public class DoctorServices {
	@Autowired
	IUserDao userDao;
	@Autowired
	IEmployeeDao employeeDao;
	@Autowired
	IDoctorDao doctorDao;
	@Autowired
	IPatientDao patientDao;
	
	public List<DoctorDataBackinBean> getAllDoctors() {
		List<Doctor> doctors=doctorDao.findAll();
		List<DoctorDataBackinBean> doctorDetail=createDoctorsList(doctors);
		
		return doctorDetail;
		
	}

	public void updatePatientDetails(PatientDataBacking patientData) throws NoSuchPatientFoundException  {
		int updateCount;
		if(patientDao.existsById(patientData.getPatId()))
		 updateCount=patientDao.updatePatientPrescription(patientData.getPrescription(),patientData.getPatId());
		else
		throw new NoSuchPatientFoundException("patient  with id "+patientData.getPatId()+" does not exists");
	}
	
	

}
