package com.tracom.brt.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chequer.axboot.core.controllers.BaseController;
import com.tracom.brt.domain.BM0801.BM0801Service;

@RestController
@RequestMapping(value="/api/v1")
public class BM0801Controller extends BaseController{
	
	private BM0801Service service;
}
