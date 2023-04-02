package com.tvm.hospital_management.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tvm.hospital_management.daos.IDoctorVisitDao;
import com.tvm.hospital_management.daos.IEmployeeDao;
import com.tvm.hospital_management.daos.IUserDao;
import com.tvm.hospital_management.daos.IWardDao;
import com.tvm.hospital_management.dtos.DoctorVisitsDataBackinBean;
import com.tvm.hospital_management.entities.DoctorVisit;

@Service @Transactional
public class DoctorVisitsServices {
	@Autowired
	IUserDao userDao;
	@Autowired
	IEmployeeDao employeeDao;
	@Autowired
	IWardDao wardDao;
	@Autowired 
	IDoctorVisitDao visitsDao;
	
	public int addVisit(DoctorVisitsDataBackinBean visitData)  {
		return visitsDao.insertIntoDoctorVisitsTable(0, visitData.getPatientId(), visitData.getDoctorId(), 0);
	}
	public void increaseVisitCount(DoctorVisitsDataBackinBean visitData) {
		
		DoctorVisit visit=visitsDao.getVisitsByPatIdAndDoctorId(visitData.getPatientId(),visitData.getDoctorId());
		visit.setVisits(visit.getVisits()+1);
		visitsDao.save(visit);
	}


}
