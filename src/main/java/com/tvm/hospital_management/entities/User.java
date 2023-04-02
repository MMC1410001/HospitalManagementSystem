package com.tvm.hospital_management.entities;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.ToString.Exclude;

@Entity@Data
@Table(name = "users")@Getter @Setter @NoArgsConstructor @ToString@JsonInclude(value = Include.NON_NULL)
public class User  {

//	+---------+------------+------------+-------------------+----------+------------+------------+
//	| user_userId | first_name | last_name  | email             | password | role       | cell_no    |
//	+---------+------------+------------+-------------------+----------+------------+------------+
//	|       1 | deepak     | dhormare   | deepak@gmail.com  | 1234     | admin      | 8793031484 |
//	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private int id;
	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private String role;
	private String cellNo;
	private String securityQuestion;
	private String securityAnswer;
	
	
	
	@Exclude
	@OneToOne(mappedBy = "user",cascade = CascadeType.ALL)
	private Employee employee;
	
	@Exclude
	@OneToOne(mappedBy = "user",cascade = CascadeType.ALL)
	private Patient patient ;
	
	
	//***************connection to employee 
	public void addEmployee(Employee e) {
		this.employee=e;
		this.employee.setUser(this);
		
	}
	//***************connection to patient 
	public void addPatient(Patient p) {
		this.patient=p;
		this.patient.setUser(this);
		
	}



	public User(String firstName, String lastName, String email, String password, String role, String cellNo,
			String securityQuestion, String securityAnswer) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.role = role;
		this.cellNo = cellNo;
		this.securityQuestion = securityQuestion;
		this.securityAnswer = securityAnswer;
	}


	//***********created for testing purpose
	public User(int id, String firstName) {
		super();
		this.id = id;
		this.firstName = firstName;
	}

	
}
