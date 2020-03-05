package com.tracom.brt.controllers;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.jdo.annotations.Transactional;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.poi.util.ArrayUtil;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.AD0102.AD0102Service;
import com.tracom.brt.domain.AD0102.VhcLocVO;

@RestController
@RequestMapping(value = "/api/v1")
public class AD0102Controller extends BaseController{
	
	@Inject
	private AD0102Service service;
	
	@GetMapping("/AD0102G1S0")
    public Responses.ListResponse AD0102G1S0(RequestParams<VhcLocVO> requestParams) {
        List<VhcLocVO> list = service.AD0102G1S0(requestParams);
        
        //adPos값으로 checkbox값 표현하기
        for(int i = 0; i< list.size(); i++) {
        	if(list.get(i).getAdPos() != null) {
        		list.get(i).setAdPosYn("true");
        	}else {
        		list.get(i).setAdPosYn("false");
        	}
        }
       
        return Responses.ListResponse.of(list);
    }
	
	@PostMapping("/AD0102G1I0")
	@Transactional
    public ApiResponse AD0102G1I0(@RequestBody VhcLocVO request) {
		VhcLocVO vo = new VhcLocVO();
		List<VhcLocVO> list = new ArrayList<VhcLocVO>();
		
    	service.AD0102G1D0(request);
    	
    	for(int i = 0; i< request.getUpList().size(); i++) {
    		if(request.getUpList().get(i).getAdPosYn().equals("true")) {
    			request.getUpList().get(i).setVhcId(request.getVhcId()); 
    			list.add(request.getUpList().get(i));
    		}else {
    			System.out.println("adPosYn = false ");
    		}
    	}
    	vo.setUpList(list);
        service.AD0102G1I0(vo);
        return ok();
    }

}
