package com.tvm.hospital_management.entities;

import java.util.List;

import javax.annotation.Generated;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity@Table(name = "medicines")@Getter@Setter@NoArgsConstructor@AllArgsConstructor
public class Medicine {
//	id, name, price
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private Double price;
	
	@OneToMany(mappedBy = "medicine",cascade = CascadeType.PERSIST)
	private List<MedicineAssigned> mappedMedicines;
	
	//to set the medicine id in assigned medicine
	public void addAssignedMedicine(MedicineAssigned medicineAssigned) {
		medicineAssigned.setMedicine(this);
		mappedMedicines.add(medicineAssigned);
		
	}
	

}
