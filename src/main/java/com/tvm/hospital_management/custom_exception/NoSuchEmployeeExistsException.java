package com.tvm.hospital_management.custom_exception;

public class NoSuchEmployeeExistsException extends RuntimeException {
	public NoSuchEmployeeExistsException(String msg) {
		super(msg);
	}

}
