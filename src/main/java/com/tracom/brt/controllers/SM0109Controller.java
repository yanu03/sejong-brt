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
import com.tracom.brt.domain.SM0109.ApiVO;
import com.tracom.brt.domain.SM0109.SM0109Service;
import com.wordnik.swagger.annotations.ApiImplicitParam;
import com.wordnik.swagger.annotations.ApiImplicitParams;

@RestController
@RequestMapping(value = "/api/v1")
public class SM0109Controller extends BaseController {

    @Inject
    private SM0109Service service;

    @GetMapping("/SM0109G0S0")
    @ApiImplicitParams({
    	@ApiImplicitParam(name = "filter", value = "검색어", dataType = "String", paramType = "query")
    })
    public Responses.ListResponse SM0109G0S0(RequestParams<ApiVO> requestParams) {
        List<ApiVO> list = service.SM0109G0S0(requestParams);
        
        for(ApiVO vo : list) {
        	String ip[] = vo.getAllowedIp().split("\\.");
        	
        	if(ip.length == 4) {
        		vo.setAllowedIp1(ip[0]);
        		vo.setAllowedIp2(ip[1]);
        		vo.setAllowedIp3(ip[2]);
        		vo.setAllowedIp4(ip[3]);        		
        	}
        }
        
        return Responses.ListResponse.of(list);
    }

    @PostMapping("/SM0109F0I0")
    public ApiResponse SM0109F0I0(@RequestBody ApiVO request) {
    	String ip1= "", ip2 = "", ip3 = "", ip4 = "";
    	
    	if(request.getAllowedIp1().contains("*")) {
    		ip1 = "*";    		
    	}else {
    		ip1 = request.getAllowedIp1();
    	}
    	
    	if(request.getAllowedIp2().contains("*")) {
    		ip2 = "*";    		
    	}else {
    		ip2 = request.getAllowedIp2();
    	}
    	
    	if(request.getAllowedIp3().contains("*")) {
    		ip3 = "*";    		
    	}else {
    		ip3 = request.getAllowedIp3();
    	}
    	
    	if(request.getAllowedIp4().contains("*")) {
    		ip4 = "*";    		
    	}else {
    		ip4 = request.getAllowedIp4();
    	}
    	
    	String ip = ip1 + "." + 
					ip2 + "." +
					ip3 + "." +
					ip4;
    	request.setAllowedIp(ip);
        String apiId = service.SM0109F0I0(request);
        return ok(apiId);
    }
    
    @PostMapping("/SM0109F0U0")
    public ApiResponse SM0109F0U0(@RequestBody ApiVO request) {
    	String ip1= "", ip2 = "", ip3 = "", ip4 = "";
    	
    	if(request.getAllowedIp1().contains("*")) {
    		ip1 = "*";    		
    	}else {
    		ip1 = request.getAllowedIp1();
    	}
    	
    	if(request.getAllowedIp2().contains("*")) {
    		ip2 = "*";    		
    	}else {
    		ip2 = request.getAllowedIp2();
    	}
    	
    	if(request.getAllowedIp3().contains("*")) {
    		ip3 = "*";    		
    	}else {
    		ip3 = request.getAllowedIp3();
    	}
    	
    	if(request.getAllowedIp4().contains("*")) {
    		ip4 = "*";    		
    	}else {
    		ip4 = request.getAllowedIp4();
    	}
    	
    	String ip = ip1 + "." + 
					ip2 + "." +
					ip3 + "." +
					ip4;
    	request.setAllowedIp(ip);
	
    	service.SM0109F0U0(request);
    	return ok();
    }
    
    @PostMapping("/SM0109G0D0")
    public ApiResponse SM0103G0D0(@RequestBody ApiVO request) {
    	service.SM0109G0D0(request);
    	return ok();
    }
}