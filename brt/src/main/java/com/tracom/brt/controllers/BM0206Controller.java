package com.tracom.brt.controllers;



import java.util.List;

import javax.inject.Inject;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BM0202.DvcHistoryVO;
import com.tracom.brt.domain.BM0206.BM0206Service;
import com.tracom.brt.domain.BM0206.UpdateHistoryVO;
import com.wordnik.swagger.annotations.ApiImplicitParam;
import com.wordnik.swagger.annotations.ApiImplicitParams;

@RestController
@RequestMapping(value = "/api/v1")
public class BM0206Controller extends BaseController{
	
	@Inject
	private BM0206Service service;
	
	@GetMapping("/BM0206G2S0")
	@ApiImplicitParams({
		@ApiImplicitParam(name ="filter" , value="검색어" , dataType = "String" , paramType = "query")
	})
	public Responses.ListResponse BM0206G2S0(RequestParams<UpdateHistoryVO> requestParams){
		List<UpdateHistoryVO> list = service.BM0206G2S0(requestParams);
		return Responses.ListResponse.of(list);
	}
	
	@GetMapping("/BM0206G2S1")
	@ApiImplicitParams({
		@ApiImplicitParam(name ="filterG2" , value="검색어" , dataType = "String" , paramType = "query"),
		@ApiImplicitParam(name ="gridDvcId" , value="검색어" , dataType = "String" , paramType = "query")
	})
	public Responses.ListResponse BM0206G2S1(RequestParams<UpdateHistoryVO> requestParams){
		List<UpdateHistoryVO> list = service.BM0206G2S1(requestParams);
		return Responses.ListResponse.of(list);
	}
	
}
