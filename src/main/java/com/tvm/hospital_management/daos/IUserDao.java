package com.tvm.hospital_management.daos;

import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;

import com.tvm.hospital_management.entities.User;

@Component
public interface IUserDao extends JpaRepository<User, Integer> {
	

	
	boolean existsByEmail(String email);
	
	User findByEmailAndPassword(String email,String password);
	//updating employees details
	@Modifying
	@Query(value = "update users u "
			+ "inner join employees e on e.user_id =u.id "
			+ "set u.first_name = :firstName,u.last_name=:lastName ,e.dob=:dob,u.cell_no=:cellNo where u.id=:userId ",nativeQuery = true)
	int updateFirstNameLastNameDobCellNo(@Param("firstName")String firstName,@Param("lastName") String lastName,@Param("dob") Date dob,@Param("cellNo") String cellNo,@Param("userId") int userId);
//delete employee using cell and userId
	@Modifying
	@Query(value = "delete from users u where u.id=:userId and cell_no=:cellNo",nativeQuery = true)
	int deleteUsingCellNoAndUserId(@Param("userId") int userId,@Param("cellNo") String cellNo);
	//inserting patient details in user
	@Modifying
	@Query(value = "insert into users values(:id,:firstName,:lastName,:email"
			+ ",:password,:cellNo,:role,:securityQuestion,:securityAnswer)",nativeQuery = true)
	int insertIntoUsers(@Param("id") int userId,@Param("firstName") String firstName,
			@Param("lastName") String lastName,@Param("email") String email,@Param("password") String password,@Param("cellNo") String cellNo,@Param("role") String role,@Param("securityQuestion") String securityQuestion,@Param("securityAnswer") String securityAnswer);

	@Modifying
	@Query(value = "update users set first_name= :firstName,last_name= :lastName,cell_no= :cellNo where id= :userId",nativeQuery = true)
	int updatePatientFirstNameLastNameCellNoWithUserId(@Param("firstName") String firstName,@Param("lastName") String lastName,@Param("cellNo") String cellNo,@Param("userId") int userId);
	//to implenent spring security
	User findByEmail(String email);
	
	
	//extra try............
//	@Modifying
//	@Query(value = "select u.id from users u where u.email= :email",nativeQuery = true)
//	int findUserByEmail(@Param("email") String email);
}
