package com.tvm.hospital_management.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tvm.hospital_management.entities.DoctorVisit;

public interface IDoctorVisitDao extends JpaRepository<DoctorVisit, Integer> {
	@Modifying
	@Query(value = "insert into doctor_visits values (:id, :pat_id, :doctor_id, :visits)",nativeQuery = true)
	int insertIntoDoctorVisitsTable( @Param("id")int id,@Param("pat_id")int patId,@Param("doctor_id")int doctorId,@Param("visits")int visits);
	//to increase visit count
	
	@Query(value="select * from doctor_visits where pat_id= :patId and doctor_id= :doctorId",nativeQuery = true)
	DoctorVisit getVisitsByPatIdAndDoctorId(@Param("patId")int patId,@Param("doctorId")int doctorId);
	

}
