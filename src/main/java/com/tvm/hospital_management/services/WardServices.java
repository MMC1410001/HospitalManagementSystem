package com.tvm.hospital_management.services;
import static com.tvm.hospital_management.dtos.WardDataBackinBean.*;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tvm.hospital_management.daos.IEmployeeDao;
import com.tvm.hospital_management.daos.IUserDao;
import com.tvm.hospital_management.daos.IWardDao;
import com.tvm.hospital_management.dtos.WardDataBackinBean;
import com.tvm.hospital_management.entities.Ward;

@Service @Transactional
public class WardServices {
	@Autowired
	IUserDao userDao;
	@Autowired
	IEmployeeDao employeeDao;
	@Autowired
	IWardDao wardDao;
	
	public List<WardDataBackinBean> getAllWards() {
		List<Ward> wards=wardDao.findAll();
		List<WardDataBackinBean> wardDetails=createWardsList(wards);
		
		return wardDetails;
		
	}
	public WardDataBackinBean getWardById(int wardId) {
		Ward ward=wardDao.getById(wardId);
		return createWard(ward);
	}
	public String increaseBedCount(WardDataBackinBean wardData) {
		Ward ward=wardDao.getById(wardData.getWardId());
		if(ward.getAvailability()<(ward.getMaxCapacity())&&(ward.getAvailability()>-1)) {
			ward.setAvailability(ward.getAvailability()+1);
			Ward savedWard = wardDao.save(ward);
			return "SUCCESS";
			
		}else {
			return "FAILURE";
			
		}
		
	}
	public String decreaseBedCount(WardDataBackinBean wardData) {
		System.out.println("before success");
		//41 //40max
		Ward ward=wardDao.getById(wardData.getWardId());
		if((ward.getAvailability()<(ward.getMaxCapacity()+1))&&ward.getAvailability()>0) 
		{	System.out.println("inside if success");
			ward.setAvailability(ward.getAvailability()-1);
			Ward savedWard = wardDao.save(ward);
			return "SUCCESS";
			
		}else {
			System.out.println("outside if success");
			return "FAILURE";
			
		}
		
	}
	public int addWard(WardDataBackinBean ward) {
		return wardDao.insertIntoWardTable(0, ward.getType(), ward.getCharges(), ward.getMaxCapacity(), ward.getMaxCapacity());
		
	}
	public int removeWard(int wardId) {
		Ward byId = wardDao.getById(wardId);
		if(byId.getPatients().isEmpty()) {
		 System.out.println("inside ward delete");
			wardDao.deleteById(wardId);
			return 1;
		}
		return 0;
		
		
		
	}
	
	

}
