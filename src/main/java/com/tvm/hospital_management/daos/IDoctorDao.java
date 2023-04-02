package com.tvm.hospital_management.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tvm.hospital_management.entities.Doctor;

public interface IDoctorDao extends JpaRepository<Doctor, Integer> {
	
	
	
	//under scores in name are used for easyness only no other intention
	@Modifying
	@Query(value="insert into doctors values (:id,:emp_id, :charges)",nativeQuery = true)
	int insertIntoDoctorTable(@Param("id") int id,@Param("emp_id") int emp_id,@Param("charges")double charges);
	
	@Query(value = "select id from doctors where emp_id=(select id from employees where user_id=(select id from users where first_name=:firstName and last_name=:lastName))",nativeQuery = true)
	int getDoctorIdByFirstNameAndLastName(@Param("firstName") String 	firstName,@Param("lastName") String lastName);
	
	


}
