package com.tracom.brt.controllers;



import java.util.List;

import javax.inject.Inject;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import com.gargoylesoftware.htmlunit.javascript.host.Console;
import com.tracom.brt.domain.BM0203.BM0203Service;
import com.tracom.brt.domain.BM0203.DvcConditionVO;
import com.wordnik.swagger.annotations.ApiImplicitParam;
import com.wordnik.swagger.annotations.ApiImplicitParams;

@RestController
@RequestMapping(value = "/api/v1")
public class BM0203Controller extends BaseController{
	
	@Inject
	private BM0203Service service;
	
	@GetMapping("/BM0203G0S0")
	@ApiImplicitParams({
		@ApiImplicitParam(name="filter" , value="검색어", dataType="String", paramType = "query")
	})
	public Responses.ListResponse BM0203G0S0(RequestParams<DvcConditionVO> requestParams){
		List<DvcConditionVO> list = service.BM0203G0S0(requestParams);
		
		for(int i = 0; i<list.size(); i++) {
			String dlCdNm = list.get(i).getDlCdNm();
			int dlCdNmInt = Integer.parseInt(dlCdNm);
			
			if(dlCdNmInt == 3) {
				list.get(i).setDlCdNm("비정상");
			}else {
				list.get(i).setDlCdNm("정상");
			}
		}
		return Responses.ListResponse.of(list);
	}
	
	@GetMapping("/BM0203G1S0")
    @ApiImplicitParams({
    	@ApiImplicitParam(name ="filter", value = "검색어", dataType = "String", paramType = "query")
    })
    public Responses.ListResponse BM0203G1S0(RequestParams<DvcConditionVO> requestParams) {
        List<DvcConditionVO> list = service.BM0203G1S0(requestParams);
        System.out.println(list);
        return Responses.ListResponse.of(list);
    }
	
}
