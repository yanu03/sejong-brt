package com.tracom.brt.controllers;

import java.util.List;

import javax.inject.Inject;
import javax.jdo.annotations.Transactional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BM0201.BM0201Service;
import com.tracom.brt.domain.BM0201.VhcDeviceVO;
import com.wordnik.swagger.annotations.ApiImplicitParam;
import com.wordnik.swagger.annotations.ApiImplicitParams;

@RestController
@RequestMapping(value = "/api/v1")
public class BM0201Controller extends BaseController{
	
	@Inject
	private BM0201Service service;
	
	
    @GetMapping("/BM0201G0S0")
    @ApiImplicitParams({
    	@ApiImplicitParam(name = "filter", value = "검색어", dataType = "String", paramType = "query")
    })
    public Responses.ListResponse BM0201G0S0(RequestParams<VhcDeviceVO> requestParams) {
        List<VhcDeviceVO> list = service.BM0201G0S0(requestParams);
        return Responses.ListResponse.of(list);
    }
    
    @GetMapping("/BM0201G1S0")
    @ApiImplicitParams({
    	@ApiImplicitParam(name = "filter", value = "검색어", dataType = "String", paramType = "query")
    })
    public Responses.ListResponse BM0201G1S0(RequestParams<VhcDeviceVO> requestParams) {
        List<VhcDeviceVO> list = service.BM0201G1S0(requestParams);
        return Responses.ListResponse.of(list);
    }
    
    @GetMapping("/BM0201M0S0")
    public Responses.ListResponse BM0201M0S0(RequestParams<VhcDeviceVO> requestParams) {
        List<VhcDeviceVO> list = service.BM0201M0S0(requestParams);
        return Responses.ListResponse.of(list);
    }
    
    @GetMapping("/BM0201F0S2")
    public Responses.ListResponse BM0201F0S2(RequestParams<VhcDeviceVO> requestParams) {
    	List<VhcDeviceVO> list = service.BM0201F0S2(requestParams);
    	return Responses.ListResponse.of(list);
    }
    
    @GetMapping("/BM0201G1S1")
    public Responses.ListResponse BM0201G1S1(RequestParams<VhcDeviceVO> requestParams) {
    	List<VhcDeviceVO> list = service.BM0201G1S1(requestParams);
    	return Responses.ListResponse.of(list);
    }
    
    @PostMapping("/BM0201F0S1")
    public ApiResponse BM0201F0S1(@RequestBody VhcDeviceVO request) {
    	boolean duplicateSeq = service.BM0201F0S1(request);
    	return ok(Boolean.toString(duplicateSeq));
    }
    
    
    @PostMapping("/BM0201F0I0")
    public ApiResponse BM0201F0I0(@RequestBody VhcDeviceVO request) {
        String vhcId = service.BM0201F0I0(request);
        return ok(vhcId);
    }
    
    @PostMapping("/BM0201M0I0")
    @Transactional
    public ApiResponse BM0201M0I0(@RequestBody VhcDeviceVO request) {
        String dvcId = service.BM0201M0I0(request);
        if(request.getWorkType().equals("CD025")){
        	 service.BM0201G1U0(request);
        }else {
        	service.BM0201G1U1(request);
        }
        return ok(dvcId);
    }
    
    @PostMapping("/BM0201F0U0")
    public ApiResponse BM0201F0U0(@RequestBody VhcDeviceVO request) {
    	service.BM0201F0U0(request);
    	return ok();
    }
    
    @PostMapping("/BM0201G1D0")
    public ApiResponse BM0201G1D0(@RequestBody VhcDeviceVO request) {
    	service.BM0201G1D0(request);
    	return ok();
    }
}
