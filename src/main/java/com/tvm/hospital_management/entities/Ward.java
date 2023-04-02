package com.tvm.hospital_management.entities;

import java.util.List;

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
import lombok.ToString;
import lombok.ToString.Exclude;

@Entity @Table(name = "wards")@Getter@Setter@NoArgsConstructor@AllArgsConstructor@ToString
public class Ward {
	@Id@GeneratedValue(strategy =GenerationType.IDENTITY )
	private int id;
	
	private String type;
	
	private double charges;
	 
	private double availability;
	private double maxCapacity;
	
	@Exclude
	@OneToMany(mappedBy = "ward",cascade = CascadeType.PERSIST)
	private List<Patient> patients;
	
	public void addPatient(Patient p) {
		p.setWard(this);
		patients.add(p);
		
		
	}

	public Ward(int id, String type, double charges, double availability, double maxCapacity) {
		super();
		this.id = id;
		this.type = type;
		this.charges = charges;
		this.availability = availability;
		this.maxCapacity = maxCapacity;
	}
	

}
