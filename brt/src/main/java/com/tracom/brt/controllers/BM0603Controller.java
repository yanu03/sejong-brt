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
import com.tracom.brt.domain.BM0603.BM0603Service;
import com.wordnik.swagger.annotations.ApiImplicitParam;
import com.wordnik.swagger.annotations.ApiImplicitParams;

@RestController
@RequestMapping(value="/api/v1")
public class BM0603Controller extends BaseController{
	
	@Inject
	private BM0603Service service;
	
	@GetMapping("/BM0603G0S0")
	@ApiImplicitParams({
		@ApiImplicitParam(name="filter" , value="검색어" , dataType = "String" , paramType = "query")
	})
	public Responses.ListResponse BM0603G0S0(RequestParams<NewsVO> requestParams){
		List<NewsVO> list = service.BM0603G0S0(requestParams);
		
		for(int i = 0; list.size() > i; i++) {
			if(list.get(i).getUseYn().equals("Y")) {
				System.out.println("true");
				list.get(i).setUseYn("true");
			}else {
				System.out.println("false");
				list.get(i).setUseYn("false");
			}
		}		
		return Responses.ListResponse.of(list);
	}
	
	@PostMapping("/BM0603F0I0")
    public ApiResponse BM0603F0I0(@RequestBody NewsVO request) {
    	System.out.println(request);
        service.BM0603F0I0(request);
        return ok();
    }
	
	@PostMapping("/BM0603F0U0")
    public ApiResponse BM0603F0U0(@RequestBody NewsVO request) {
        System.out.println("업데이트");
        System.out.println(request);
        
        for(int i = 0; request.getUpList().size() > i; i++) {
        	if(request.getUpList().get(i).getUseYn().equals("true")) {
        		request.getUpList().get(i).setUseYn("Y");
        	}else {
        		request.getUpList().get(i).setUseYn("N");
        	}
        }
        if(request.getUseYn().equals("true")) {
        	request.setUseYn("Y");
        }else {
        	request.setUseYn("N");
        }       
        service.BM0603F0U0(request);
        return ok();
    }

}
