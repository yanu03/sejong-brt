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
import com.tracom.brt.domain.SM0105.CommonCodeDetailInfoVO;
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
		System.out.println("그리드 체크박스");
		System.out.println(list.get(0).getUseYn());
		
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
	
	@GetMapping("/BM0602M0S0")
	@ApiImplicitParams({
		@ApiImplicitParam(name="filter" , value="검색어" , dataType = "String" , paramType = "query")
	})
	public Responses.ListResponse BM0602M0S0(RequestParams<NewsVO> requestParams){
		List<NewsVO> list = service.BM0602M0S0(requestParams);
		
		list.get(0).setNumVal4(list.get(0).getNumVal4().substring(0, 1)+"시");
		list.get(0).setNumVal5(list.get(0).getNumVal5().substring(0, 2)+"시");
		list.get(0).setNumVal6(list.get(0).getNumVal6().substring(0, 3)+"분");
		return Responses.ListResponse.of(list);
	}
	@PostMapping("/BM0602F0I0")
    public ApiResponse BM0602F0I0(@RequestBody NewsVO request) {
    	System.out.println(request);
        String vhcId = service.BM0602F0I0(request);
        return ok(vhcId);
    }
	
	@PostMapping("/BM0602M0I0")
    public ApiResponse BM0602M0I0(@RequestBody NewsVO request) {
    	System.out.println(request);
        String vhcId = service.BM0602M0I0(request);
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
        service.BM0602F0U0(request);
        return ok();
    }
}
