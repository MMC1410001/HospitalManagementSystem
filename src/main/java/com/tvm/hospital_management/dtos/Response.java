package com.tvm.hospital_management.dtos;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class Response {

	public static ResponseEntity<?> success(Object data) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("status", "success");
		if (data != null) {
			map.put("data", data);
		}
		return ResponseEntity.ok(map);
	}

	public static ResponseEntity<?> error(Object error) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("status", "success");
		if (error != null)
			map.put("data", error);
		return ResponseEntity.ok(map);
	}
	public static ResponseEntity<?> exception(Object error) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("status", "exception");
		if (error != null)
			map.put("data", error);
		return ResponseEntity.ok(map);
	}

	public static ResponseEntity<?> status(HttpStatus status) {

		return ResponseEntity.status(status).build();
	}
}
