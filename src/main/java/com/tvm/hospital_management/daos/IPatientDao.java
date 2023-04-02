package com.tvm.hospital_management.daos;

import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tvm.hospital_management.entities.Patient;

public interface IPatientDao extends JpaRepository<Patient,Integer> {
	//under scores in name are used for easy ness only no other intention
	@Modifying
	@Query(value = "insert into patients values (:id, :user_id, :ward_id, :doctor_id, :date_of_admission"
			+ ", :blood_group, :dob, :prescription, :bed_alloted, :payment_status, :patient_problem)",nativeQuery = true)
	int insertIntoPatients(@Param("id") int id ,@Param("user_id") int user_id ,@Param("doctor_id") int doctor_id,@Param("ward_id") int ward_id
			,@Param("date_of_admission") Date date_of_admission,@Param("blood_group") String blood_group ,@Param("dob") Date dob ,
			@Param("prescription") String prescription ,@Param("bed_alloted") int bed_alloted,@Param("payment_status") String payment_status ,@Param("patient_problem") String patient_problem);
	//update patients dob bedalloted blood group using patId
	
	@Modifying
	@Query(value = "update patients set prescription= :prescription  where id= :patId",nativeQuery = true)
	int updatePatientPrescription(@Param("prescription") String prescription,@Param("patId") int patId);

	//querry to calculate difference between the date of admission and today
//	select datediff(date_of_admission,date(now())) from patients where id=37;
	@Query(value="select datediff(date(now()),date_of_admission) from patients where id = :patId",nativeQuery = true)
	int calculateDaysOfStayOfPatient(@Param("patId") int patId);
	
	//to check if bed is not alloted 
	Boolean existsByBedAllotedAndWardId(int bedNo,int wardId);
	//to update visits
	Patient findByUserId(int userId);
}
