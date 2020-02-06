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
import com.tracom.brt.domain.BM0602.NewsVO;
import com.tracom.brt.domain.BM0604.BM0604Service;
import com.wordnik.swagger.annotations.ApiImplicitParam;
import com.wordnik.swagger.annotations.ApiImplicitParams;

@RestController
@RequestMapping(value="/api/v1")
public class BM0604Controller extends BaseController{
	
	@Inject
	private BM0604Service service;
	
	@GetMapping("/BM0604G0S0")
	@ApiImplicitParams({
		@ApiImplicitParam(name="filter" , value="검색어" , dataType = "String" , paramType = "query")
	})
	public Responses.ListResponse BM0604G0S0(RequestParams<NewsVO> requestParams){
		List<NewsVO> list = service.BM0604G0S0(requestParams);
		
		System.out.println("list1");
		System.out.println(list);
		
		for(int i = 0; list.size() > i; i++) {
			if(list.get(i).getUseYn().equals("Y")) {
				list.get(i).setUseYn("true");
			}else {
				list.get(i).setUseYn("false");
			}
		}		
		return Responses.ListResponse.of(list);
	}
	
	@GetMapping("/BM0604G0S1")
	@ApiImplicitParams({
		@ApiImplicitParam(name="filter" , value="검색어" , dataType = "String" , paramType = "query")
	})
	public Responses.ListResponse BM0604G0S1(RequestParams<NewsVO> requestParams){
		List<NewsVO> list = service.BM0604G0S1(requestParams);
		System.out.println("list2");
		System.out.println(list);
		for(int i = 0; list.size() > i; i++) {
			if(list.get(i).getUseYn().equals("Y")) {
				list.get(i).setUseYn("true");
			}else {
				list.get(i).setUseYn("false");
			}
		}		
		return Responses.ListResponse.of(list);
	}
	
	@GetMapping("/BM0604G1S0")
	@ApiImplicitParams({
		@ApiImplicitParam(name="filter" , value="검색어" , dataType = "String" , paramType = "query")
	})
	public Responses.ListResponse BM0604G1S0(RequestParams<NewsVO> requestParams){
		List<NewsVO> list = service.BM0604G1S0(requestParams);
		return Responses.ListResponse.of(list);
	}
	
	@PostMapping("/BM0604F0U0")
	public ApiResponse BM0604F0U0(@RequestBody NewsVO request) {
        System.out.println("업데이트");
        System.out.println(request);
        
        for(int i = 0; request.getUpList().size() > i; i++) {
        	if(request.getUpList().get(i).getUseYn().equals("true")) {
        		request.getUpList().get(i).setUseYn("Y");
        	}else {
        		request.getUpList().get(i).setUseYn("N");
        	}
        }     
        service.BM0604F0U0(request);
        return ok();
    }
	
	
}
