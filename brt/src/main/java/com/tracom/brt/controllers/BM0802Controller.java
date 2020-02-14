package com.tracom.brt.controllers;

import javax.inject.Inject;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chequer.axboot.core.controllers.BaseController;
import com.tracom.brt.domain.BM0802.BM0802Service;

@RestController
@RequestMapping(value="/api/v1")
public class BM0802Controller extends BaseController{
	
	@Inject
	private BM0802Service service;
}
