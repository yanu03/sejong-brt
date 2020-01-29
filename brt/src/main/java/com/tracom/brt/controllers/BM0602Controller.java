package com.tracom.brt.controllers;

import java.util.List;

import javax.inject.Inject;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BM0602.BM0602Service;
import com.tracom.brt.domain.BM0602.NewsVO;
import com.wordnik.swagger.annotations.ApiImplicitParam;
import com.wordnik.swagger.annotations.ApiImplicitParams;

@RestController
@RequestMapping(value="/api/v1")
public class BM0602Controller extends BaseController{

	@Inject
	private BM0602Service service;
	
	@GetMapping("/BM0602G0S0")
	@ApiImplicitParams({
		@ApiImplicitParam(name="filter" , value="검색어" , dataType = "String" , paramType = "query")
	})
	public Responses.ListResponse BM0602G0S0(RequestParams<NewsVO> requestParams){
		List<NewsVO> list = service.BM0602G0S0(requestParams);
		return Responses.ListResponse.of(list);
	}	
	@PostMapping("/BM0602F0I0")
    public ApiResponse BM0602F0I0(@RequestBody NewsVO request) {
    	System.out.println(request);
        String vhcId = service.BM0602F0I0(request);
        return ok(vhcId);
    }
	
	@PostMapping("/BM0602G0D0")
    public ApiResponse BM0602G0D0(@RequestBody NewsVO request) {
    	System.out.println(request);
        service.BM0602G0D0(request);
        return ok();
    }
	
	@PostMapping("/BM0602F0U0")
    public ApiResponse BM0602F0U0(@RequestBody NewsVO request) {
        service.BM0602F0U0(request);
        return ok();
    }
}
