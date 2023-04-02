package com.tvm.hospital_management.services;
//import static com.tvm.dtos.WardDataBackinBean.*;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tvm.hospital_management.daos.IEmployeeDao;
import com.tvm.hospital_management.daos.IMedicineAssignedDao;
import com.tvm.hospital_management.daos.IMedicineDao;
import com.tvm.hospital_management.daos.IUserDao;
import com.tvm.hospital_management.daos.IWardDao;
import com.tvm.hospital_management.dtos.MedicineAssignedDataBackinBean;
import com.tvm.hospital_management.entities.Medicine;
import static com.tvm.hospital_management.dtos.MedicineAssignedDataBackinBean.*;
@Service @Transactional
public class MedicineServices {
	@Autowired
	IUserDao userDao;
	@Autowired
	IEmployeeDao employeeDao;
	@Autowired
	IWardDao wardDao;
	@Autowired
	IMedicineDao medicineDao;
	@Autowired
	IMedicineAssignedDao medicineAssingedDao;
	
	public List<MedicineAssignedDataBackinBean> getAllMedicines(){
		List<Medicine> medicine=medicineDao.findAll();
		List<MedicineAssignedDataBackinBean> medicinesTosend=createAllMedicineList(medicine);
		return medicinesTosend;
		
	}

	public int addMedicine(MedicineAssignedDataBackinBean medicineData) {
		return  medicineDao.insertIntoMedicineTable(0, medicineData.getMedicineName(), medicineData.getMedicinePrice());
		
	}

	public void removeMedicine(int medicineId) {
		medicineDao.deleteById(medicineId);
		
	}

}
