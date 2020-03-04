package com.tracom.brt.controllers;

import java.util.List;

import javax.inject.Inject;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BM0801.BM0801Service;
import com.tracom.brt.domain.BM0801.StatisticsVO;

@RestController
@RequestMapping(value="/api/v1")
public class BM0801Controller extends BaseController{
	
	@Inject
	private BM0801Service service;
	
	@GetMapping("/BM0801G0S0")
	public Responses.ListResponse BM0801G0S0(RequestParams<StatisticsVO> requestParams){
		List<StatisticsVO> list = service.BM0801G0S0(requestParams);
		return Responses.ListResponse.of(list);
	}
	
	@PostMapping("/insertAdLog")
	public ApiResponse insertAdLog() {
		service.insertAdLog();
		return ok();
	}
}
