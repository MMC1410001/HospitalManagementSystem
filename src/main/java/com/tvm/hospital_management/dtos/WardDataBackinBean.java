package com.tvm.hospital_management.dtos;

import java.util.ArrayList;
import java.util.List;

import com.tvm.hospital_management.entities.Ward;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Getter@Setter@NoArgsConstructor@AllArgsConstructor@ToString
public class WardDataBackinBean {
	private int wardId;
	private String type;
	private double charges;
	private double availability;
	private double maxCapacity;
	
	public static List<WardDataBackinBean> createWardsList(List<Ward> wards){
		List<WardDataBackinBean> wardsDtoList=new ArrayList<WardDataBackinBean>();
		
		
		for(Ward w:wards) {
			WardDataBackinBean wardDto=new WardDataBackinBean();
			wardDto.setWardId(w.getId());
			wardDto.setType(w.getType());
			wardDto.setCharges(w.getCharges());
			wardDto.setAvailability(w.getAvailability());
			wardDto.setMaxCapacity(w.getMaxCapacity());
			wardsDtoList.add(wardDto);
		}
		
		return wardsDtoList;
		
		
	}
	public static WardDataBackinBean createWard(Ward ward) {
		WardDataBackinBean wardToSend=new WardDataBackinBean();
		wardToSend.setAvailability(ward.getAvailability());
		wardToSend.setCharges(ward.getCharges());
		wardToSend.setMaxCapacity(ward.getMaxCapacity());
		wardToSend.setType(ward.getType());
		wardToSend.setWardId(ward.getId());
		return wardToSend;
	}

}
