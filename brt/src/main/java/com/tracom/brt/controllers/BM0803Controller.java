package com.tracom.brt.controllers;


import java.util.List;

import javax.inject.Inject;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BM0803.BM0803Service;
import com.tracom.brt.domain.BM0803.MapVO;
import com.wordnik.swagger.annotations.ApiImplicitParam;
import com.wordnik.swagger.annotations.ApiImplicitParams;


@RestController
@RequestMapping(value = "/api/v1")
public class BM0803Controller extends BaseController{
	
	@Inject
	private BM0803Service service;
	
	@GetMapping("/BM0803G0S0")
	public Responses.ListResponse BM0803G0S0(RequestParams<MapVO> requestParams){
		List<MapVO> list = service.BM0803G0S0(requestParams);
		return Responses.ListResponse.of(list);
	}
	
	@GetMapping("/BM0803G1S0")
	@ApiImplicitParams({
    	@ApiImplicitParam(name = "filter", value = "검색어", dataType = "String", paramType = "query")
    })
	public Responses.ListResponse BM0803G1S0(RequestParams<MapVO> requestParams){
		List<MapVO> list = service.BM0803G1S0(requestParams);
		return Responses.ListResponse.of(list);
	}

}
