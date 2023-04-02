package com.tvm.hospital_management.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tvm.hospital_management.custom_exception.NoSuchMedicineExistsException;
import com.tvm.hospital_management.daos.IEmployeeDao;
import com.tvm.hospital_management.daos.IMedicineAssignedDao;
import com.tvm.hospital_management.daos.IMedicineDao;
import com.tvm.hospital_management.daos.IUserDao;
import com.tvm.hospital_management.daos.IWardDao;
import com.tvm.hospital_management.dtos.MedicineAssignedDataBackinBean;

@Service @Transactional
public class MedicineAssignedServices {
	@Autowired
	IUserDao userDao;
	@Autowired
	IEmployeeDao employeeDao;
	@Autowired
	IWardDao wardDao;
	@Autowired
	IMedicineAssignedDao medicineAssingedDao;
	@Autowired
	IMedicineDao medicineDao;
	
	public void addMedicineToPatient(MedicineAssignedDataBackinBean medicineData) throws NoSuchMedicineExistsException {
		
			medicineAssingedDao.addIntoMedicineAssigned(medicineData.getPatId(), medicineData.getMedicineId(), medicineData.getMedicinePrescription(), medicineData.getMedicineQty());
		
	}
	
	public void removeMedicineOfPatient(int medicineAssignId) {
		medicineAssingedDao.deleteById(medicineAssignId);
	}	

}
