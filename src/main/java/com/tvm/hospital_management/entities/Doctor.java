package com.tvm.hospital_management.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.ToString.Exclude;

@Entity@Table(name = "doctors")@Getter@Setter@AllArgsConstructor@ToString
public class Doctor {
		@Id@GeneratedValue(strategy = GenerationType.IDENTITY)
		private int id;
		//*******************************connecting doctors empid
		@Exclude
		@OneToOne(cascade = CascadeType.ALL)
		@JoinColumn(name ="emp_id" )
		private Employee employee;
		
		
		private double charges;
		
		
		@Exclude
		@OneToMany(mappedBy = "doctor",cascade = CascadeType.PERSIST)
		private List<Patient> patients;
		//doctor visits table link
		
		@Exclude
		@OneToMany(mappedBy = "doctor",cascade = CascadeType.PERSIST)
		private List<DoctorVisit> visits;
		
		
		
		public Doctor() {
			patients=new ArrayList<Patient>();
		}
		
		
		public void addPatient(Patient patient) {
			patient.setDoctor(this);
			this.patients.add(patient);
		}
		//adding visit to doctor visit
		public void addVisit(DoctorVisit visit) {
			visit.setDoctor(this);
			this.visits.add(visit);
		}
		/////***********************connecting foreign key 
		public void addEmployee(Employee e) {
			this.employee=e;
			this.employee.setDoctor(this);
			
		}

		public Doctor(int id, double charges) {
			super();
			this.id = id;
			this.charges = charges;
		}
}
