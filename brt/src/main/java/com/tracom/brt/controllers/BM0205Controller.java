package com.tracom.brt.controllers;

import java.util.List;

import javax.inject.Inject;
import javax.jdo.annotations.Transactional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BM0205.BM0205Service;
import com.tracom.brt.domain.BM0205.VhcDvcUpdateVO;
import com.wordnik.swagger.annotations.ApiImplicitParam;
import com.wordnik.swagger.annotations.ApiImplicitParams;

@RestController
@RequestMapping(value="/api/v1")
public class BM0205Controller extends BaseController{

	@Inject
	private BM0205Service service;
	
    @GetMapping("/BM0205G0S0")
    @ApiImplicitParams({
    	@ApiImplicitParam(name = "filter", value = "검색어", dataType = "String", paramType = "query")
    })
    public Responses.ListResponse BM0205G0S0(RequestParams<VhcDvcUpdateVO> requestParams) {
        List<VhcDvcUpdateVO> list = service.BM0205G0S0(requestParams);
        for(int i = 0; i<list.size(); i++) {
        	if(list.get(i).getCompleteYn() == null) {
        		list.get(i).setCompleteYn("예약가능");
        	}
        	else if(list.get(i).getCompleteYn().equals("N")) {
        		list.get(i).setCompleteYn("예약중");
        	}else {
        		list.get(i).setCompleteYn("예약가능");
        	}
        }
        
        return Responses.ListResponse.of(list);
    }
    
    @PostMapping("/BM0205G0S1")
    public ApiResponse BM0205G0S1(@RequestBody VhcDvcUpdateVO vo) {
    	VhcDvcUpdateVO nVo = new VhcDvcUpdateVO();
    	System.out.println("controller 관리ID체크");
    	System.out.println(vo);
    	boolean mngIdCheck = service.BM0205G0S1(vo);
    	System.out.println("갔다왔니?");
    	System.out.println(mngIdCheck);
    	return ok(Boolean.toString(mngIdCheck));
    }
    
    @PostMapping("/BM0205FileUp")
    public ApiResponse BM0205F0I0(@ModelAttribute VhcDvcUpdateVO vo) {
    	System.out.println("controller");
    	System.out.println(vo);
    	service.BM0205FileUp(vo);
    	return ok();
    }
    
    @PostMapping("/BM0205Reservation")
    public ApiResponse BM0205Reservation(@RequestBody VhcDvcUpdateVO vo) {  	
    	service.BM0205Reservation(vo);
    	return ok();
    }
	
}
