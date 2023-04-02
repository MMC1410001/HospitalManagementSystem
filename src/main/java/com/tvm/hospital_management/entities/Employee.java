package com.tvm.hospital_management.entities;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.ToString.Exclude;

@Entity @Table(name = "employees")@Getter @Setter @ToString @JsonInclude(value = Include.NON_NULL)
public class Employee {
	@Id@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Temporal(TemporalType.DATE)
	private Date dob;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@Temporal(TemporalType.DATE)
	private Date hireDate;
	
	@Exclude
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name ="user_id" )
	private User user;
	
	private double salary;
	
	@Exclude
	@OneToOne(mappedBy = "employee",cascade = CascadeType.ALL)
	private Doctor doctor;
	
	
	public void addDoctor(Doctor d) {
		doctor=d;
		doctor.setEmployee(this);
	}

	public Employee() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Employee(Date dob, Date hireDate, User user, double salary) {
		super();
		this.dob = dob;
		this.hireDate = hireDate;
		this.user = user;
		this.user.setEmployee(this);
		this.salary = salary;
	}
	

	public Employee(Date dob, Date hireDate, double salary) {
		super();
		this.dob = dob;
		this.hireDate = hireDate;
		this.salary = salary;
	}


}
