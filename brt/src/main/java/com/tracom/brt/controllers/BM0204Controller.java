package com.tracom.brt.controllers;


import java.util.List;

import javax.inject.Inject;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BM0204.BM0204Service;
import com.tracom.brt.domain.BM0204.ObeConditionVO;
import com.wordnik.swagger.annotations.ApiImplicitParam;
import com.wordnik.swagger.annotations.ApiImplicitParams;

@RestController
@RequestMapping(value = "/api/v1")
public class BM0204Controller extends BaseController{
	
	
	@Inject
	private BM0204Service service;
	
	@GetMapping("/BM0204G0S0")
	@ApiImplicitParams({
		@ApiImplicitParam(name = "filter", value = "검색어", dataType = "String", paramType = "query")
	})
	public Responses.ListResponse BM0204G0S0(RequestParams<ObeConditionVO> requestParams){
		List<ObeConditionVO> list = service.BM0204G0S0(requestParams);
		Float latiConfirm;
		Float longiConfirm;
		System.out.println(list);
		
		 //gps 상태확인 코드
		for(int i = 0;  i <list.size(); i++ ) {
			latiConfirm = list.get(i).getLati();
			longiConfirm = list.get(i).getLongi();
			
			if(latiConfirm == null || latiConfirm == 0 || longiConfirm == null || longiConfirm == 0) {
				list.get(i).setGps("비정상");
			}else {
				list.get(i).setGps("정상");
				  }
			}
			
			return Responses.ListResponse.of(list);
		}
}
