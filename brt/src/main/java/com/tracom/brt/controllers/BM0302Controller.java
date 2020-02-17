package com.tracom.brt.controllers;

import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import org.springframework.stereotype.Controller;
import com.chequer.axboot.core.api.response.ApiResponse;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.tracom.brt.domain.BM0302.AltContractInfoVO;
//import com.tracom.brt.domain.BM0302.BM0302;
import com.tracom.brt.domain.BM0302.BM0302Service;
import com.tracom.brt.domain.SM0105.CommonCodeDetailInfoVO;
import com.wordnik.swagger.annotations.ApiImplicitParam;
import com.wordnik.swagger.annotations.ApiImplicitParams;

import javax.inject.Inject;
import java.util.List;

@RestController
@RequestMapping(value = "/api/v1")
public class BM0302Controller extends BaseController {
	
	@Inject
	private BM0302Service service;
	
	@GetMapping("/BM0302G0S0")
    @ApiImplicitParams({
    	@ApiImplicitParam(name = "filter", value = "검색어", dataType = "String", paramType = "query")
    })
    public Responses.ListResponse BM0302G0S0(RequestParams<AltContractInfoVO> requestParams) {
        List<AltContractInfoVO> list = service.BM0302G0S0(requestParams);
        return Responses.ListResponse.of(list);
    }
	
	/* 계약모달창 그리드뷰 */
	@GetMapping("/BM0302G0S1")
    @ApiImplicitParams({
    	@ApiImplicitParam(name = "filter", value = "검색어", dataType = "String", paramType = "query")
    })
    public Responses.ListResponse BM0302G0S1(RequestParams<AltContractInfoVO> requestParams) {
        List<AltContractInfoVO> list = service.BM0302G0S1(requestParams);
        return Responses.ListResponse.of(list);
    }
	
    @GetMapping("/BM0302G1S0")
    @ApiImplicitParams({
    	@ApiImplicitParam(name = "filter", value = "검색어", dataType = "String", paramType = "query")
    })
    public Responses.ListResponse BM0302G1S0(RequestParams<AltContractInfoVO> requestParams) {
        List<AltContractInfoVO> list = service.BM0302G1S0(requestParams);
        if(list.get(0).getAltDiv() != null) {
        for(int i = 0; i<list.size(); i++) {
        	if(list.get(i).getConfirmYn().equals("Y")) {
        		System.out.println(list.get(i).getConfirmYn());
        		System.out.println("확정");
        		list.get(i).setConfirmYn("확정");
        	}else {
        		System.out.println(list.get(i).getConfirmYn());
        		System.out.println("미확정");
        		list.get(i).setConfirmYn("미확정");
        	}        	
        }
        }
        return Responses.ListResponse.of(list);
    }
    
    @PostMapping("/BM0302F0S0")
    public ApiResponse BM0302F0S0(@RequestBody AltContractInfoVO request) {
    	boolean duplicateSeq = service.BM0302F0S0(request);
    	return ok(Boolean.toString(duplicateSeq));
    }

    @PostMapping("/BM0302F0I0")
    public ApiResponse BM0302F0I0(@RequestBody AltContractInfoVO request) {
        String conId = service.BM0302F0I0(request);
        return ok(conId);
    }
    
    @PostMapping("/BM0302F0U0")
    public ApiResponse BM0302F0U0(@RequestBody AltContractInfoVO request) {
    	service.BM0302F0U0(request);
    	return ok();
    }
    
    @PostMapping("/BM0302F0U1")
    public ApiResponse BM0302F0U1(@RequestBody AltContractInfoVO request) {
    	service.BM0302F0U1(request);
    	return ok();
    }
    
    @PostMapping("/BM0302F0U2")
    public ApiResponse BM0302F0U2(@RequestBody AltContractInfoVO request) {
    	System.out.println("확정해제");
    	System.out.println(request.getConfirmYn());
    	service.BM0302F0U2(request);
    	return ok();
    }
    
    @PostMapping("/BM0302G1D0")
    public ApiResponse BM0302G1D0(@RequestBody AltContractInfoVO request) {
    	service.BM0302G1D0(request);
    	return ok();
    }
}