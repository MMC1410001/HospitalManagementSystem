package com.tvm.hospital_management.entities;

import java.util.Date;
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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString.Exclude;

@Entity@Table(name = "patients")@Getter @Setter@NoArgsConstructor
public class Patient {
//	id	user_id		ward_id	doctor_id	date_of_admission	blood_group	
//	dob	prescription	bed_alloted	payment_status	patient_problem
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	//---------------------------------------------connection to user 
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name ="user_id" )
	private User user;
	
	
	//--------------------------------------------connection to ward table
	
	@ManyToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name ="ward_id" )
	private Ward ward;
	
	
	
	//--------------------------------------------connection to doctor table
	@ManyToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name ="doctor_id" )
	private Doctor doctor;
	//-------------------------------------------connection to doctor visits table
	@OneToMany(mappedBy = "patient",cascade = CascadeType.ALL)
	private List<DoctorVisit> visits;
	
	@Temporal(TemporalType.DATE)@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date dateOfAdmission;
	@Temporal(TemporalType.DATE)@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date dob;
	
	private String bloodGroup;
	private String prescription;
	private int bedAlloted;
	private String paymentStatus;
	private String patientProblem;
	
	
	//one patient have many medicine assigned
	@Exclude
	@OneToMany(mappedBy = "patient",cascade = CascadeType.ALL)
	private List<MedicineAssigned> medicines; 
//-------------------------------------adding patient to the doctor visit list
	public void addVisit(DoctorVisit visit) {
		visit.setPatient(this);
		visits.add(visit);
	}
	
	//*********************testing: add all to add into db
	public Patient(User user, Ward ward, Doctor doctor) {
		super();
		this.user = user;
		this.ward = ward;
		this.doctor = doctor;
	}
	public Patient(int id, Date dateOfAdmission, Date dob, String bloodGroup, String prescription, int bedAlloted,
			String paymentStatus, String patientProblem) {
		super();
		this.id = id;
		this.dateOfAdmission = dateOfAdmission;
		this.dob = dob;
		this.bloodGroup = bloodGroup;
		this.prescription = prescription;
		this.bedAlloted = bedAlloted;
		this.paymentStatus = paymentStatus;
		this.patientProblem = patientProblem;
	}
	
	//constructor created for testing purpose
	public Patient(int id, String prescription, int bedAlloted) {
		super();
		this.id = id;
		this.prescription = prescription;
		this.bedAlloted = bedAlloted;
	}
	//add medicine to the list ie store patId in medicine table
	public void medicineAssigned(MedicineAssigned medicine) {
		medicine.setPatient(this);
		medicines.add(medicine);
	}


}
