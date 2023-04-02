package com.tvm.hospital_management.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tvm.hospital_management.entities.Ward;

public interface IWardDao extends JpaRepository<Ward, Integer> {
	
	//under scores in name are used for easyness only no other intention
	@Modifying
	@Query(value = "insert into wards values (:id, :type, :charges, :availability, :max_capacity)",nativeQuery = true)
	int insertIntoWardTable( @Param("id")int id,@Param("type")String type,@Param("charges")double charges,@Param("availability")double availability,@Param("max_capacity")double max_capacity);
	
	@Query(value="select id from wards where type=:type",nativeQuery = true)
	int getWardIdByTypeOfWard(String type);
	
	@Query
	Ward findByType(String type);
	
}
