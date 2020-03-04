package com.tracom.brt.controllers;

import java.util.List;

import javax.inject.Inject;
import javax.jdo.annotations.Transactional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BM0801.BM0801Service;
import com.tracom.brt.domain.BM0801.StatisticsVO;
import com.wordnik.swagger.annotations.ApiImplicitParam;
import com.wordnik.swagger.annotations.ApiImplicitParams;

@RestController
@RequestMapping(value="/api/v1")
public class BM0801Controller extends BaseController{
	
	@Inject
	private BM0801Service service;
	
	@GetMapping("/BM0801G0S0")
	public Responses.ListResponse BM0801G0S0(RequestParams<StatisticsVO> requestParams){
		List<StatisticsVO> list = service.BM0801G0S0(requestParams);
		System.out.println("음성");
		System.out.println(list);
		return Responses.ListResponse.of(list);
	}
	
	@GetMapping("/BM0801G0S1")
	public Responses.ListResponse BM0801G0S1(RequestParams<StatisticsVO> requestParams){
		List<StatisticsVO> list = service.BM0801G0S1(requestParams);
		System.out.println("영상");
		System.out.println(list);
		return Responses.ListResponse.of(list);
	}
	
}
