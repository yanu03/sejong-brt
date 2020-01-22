package com.tracom.brt.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/v1")
public class FileController {

	@GetMapping("/getWav")
	public void getWav(@RequestParam String id) {
		System.out.println("FileController getWav Id: " + id);
	}
}