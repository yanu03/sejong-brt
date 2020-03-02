package com.tracom.brt.controllers;


import java.util.List;

import javax.inject.Inject;
import javax.jdo.annotations.Transactional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BM0202.BM0202Service;
import com.tracom.brt.domain.BM0202.DvcHistoryVO;
import com.wordnik.swagger.annotations.ApiImplicitParam;
import com.wordnik.swagger.annotations.ApiImplicitParams;

@RestController
@RequestMapping(value = "/api/v1")
public class BM0202Controller extends BaseController{
	
	@Inject
	private BM0202Service service;
	
	@GetMapping("/BM0202G2S0")
	@ApiImplicitParams({
		@ApiImplicitParam(name ="filter" , value="검색어" , dataType = "String" , paramType = "query")
	})
	public Responses.ListResponse BM0202G2S0(RequestParams<DvcHistoryVO> requestParams){
		List<DvcHistoryVO> list = service.BM0202G2S0(requestParams);
		return Responses.ListResponse.of(list);
	}
	
	@GetMapping("/BM0202G2S1")
	@ApiImplicitParams({
		@ApiImplicitParam(name ="filterG2" , value="검색어" , dataType = "String" , paramType = "query"),
		@ApiImplicitParam(name ="gridDvcId" , value="검색어" , dataType = "String" , paramType = "query")
	})
	public Responses.ListResponse BM0202G2S1(RequestParams<DvcHistoryVO> requestParams){
		List<DvcHistoryVO> list = service.BM0202G2S1(requestParams);
		return Responses.ListResponse.of(list);
	}
	
	@PostMapping("/BM0202G2D0")
	public ApiResponse BM0202G2D0(@RequestBody DvcHistoryVO request) {
		service.BM0202G2D0(request);
		return ok();
	}
	
	@PostMapping("/BM0202G2U0")
	@Transactional
	public ApiResponse BM0202G2U0(@RequestBody DvcHistoryVO request) {
		service.BM0202G2U0(request);
		if(request.getWorkType().equals("CD025")) {
			service.BM0202G1U0(request);
		}
		return ok();
	}
	
	@PostMapping("/BM0202G1U0")
	public void BM0202G1U0(@RequestBody DvcHistoryVO request) {
		System.out.println(request);
		service.BM0202G1U0(request);
	}
	
	@PostMapping("/BM0202G1U1")
	public void BM0202G1U1(@RequestBody DvcHistoryVO request) {
		System.out.println(request);
		service.BM0202G1U1(request);
	}
	
	@PostMapping("/BM0202M0S0")
	public ApiResponse BM0202M0S0(@RequestBody DvcHistoryVO request) {
		boolean workTypeCheck = service.BM0202M0S0(request);
    	return ok(Boolean.toString(workTypeCheck));
	}
	
}
