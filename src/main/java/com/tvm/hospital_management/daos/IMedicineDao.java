package com.tvm.hospital_management.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tvm.hospital_management.entities.Medicine;

public interface IMedicineDao extends JpaRepository<Medicine, Integer> {
	//add medicine 
	@Modifying
	@Query(value = "insert into medicines values (:id, :name, :price)",nativeQuery = true)
	int insertIntoMedicineTable( @Param("id")int id,@Param("name")String name,@Param("price")double price);
	

}
