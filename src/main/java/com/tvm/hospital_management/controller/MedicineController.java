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

import com.tvm.hospital_management.dtos.MedicineAssignedDataBackinBean;
import com.tvm.hospital_management.dtos.Response;
import com.tvm.hospital_management.services.MedicineServices;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/medicine")
public class MedicineController {
	@Autowired
	MedicineServices medicineServices;
	@RolesAllowed({"ROLE_ADMIN","ROLE_DOCTOR"})
	@GetMapping("getAllMedicines")
	public ResponseEntity<?> getAllMedicine() {
		List<MedicineAssignedDataBackinBean> allMedicines = medicineServices.getAllMedicines();
		if (allMedicines != null)
			return Response.success(allMedicines);
		return Response.error("NO_LIST_FOUND");
	}
	@RolesAllowed({"ROLE_ADMIN"})
	@PostMapping("/addMedicine")
	public ResponseEntity<?> addMedicine(@RequestBody MedicineAssignedDataBackinBean medicineData) {
		int updateCount = medicineServices.addMedicine(medicineData);
		if (updateCount == 1)
			return Response.success("MEDICINE_ADDED");
		return Response.success("FAILED");
	}
	@RolesAllowed({"ROLE_DOCTOR","ROLE_ADMIN"})
	@GetMapping("/removeMedicine/{id}") 
	public ResponseEntity<?> removeMedicine(@PathVariable("id") int medicineId) {
		medicineServices.removeMedicine(medicineId);
		return Response.success("MEDICINE_REMOVED");
	}

}
