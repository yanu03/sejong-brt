package com.tracom.brt.controllers;

import java.util.List;

import javax.inject.Inject;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BM0802.BM0802Service;
import com.tracom.brt.domain.BM0802.RaceHistoryVO;
import com.wordnik.swagger.annotations.ApiImplicitParam;
import com.wordnik.swagger.annotations.ApiImplicitParams;

@RestController
@RequestMapping(value="/api/v1")
public class BM0802Controller extends BaseController{
	
	@Inject
	private BM0802Service service;
	
	@GetMapping("/BM0802G0S0")
	@ApiImplicitParams({
		@ApiImplicitParam(name ="filter" , value="검색어" , dataType = "String" , paramType = "query")
	})
	public Responses.ListResponse BM0802G0S0(RequestParams<RaceHistoryVO> requestParams){
		List<RaceHistoryVO> list = service.BM0802G0S0(requestParams);
		System.out.println(list);
		return Responses.ListResponse.of(list);
	}
}
