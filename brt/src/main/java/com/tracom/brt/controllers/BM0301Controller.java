package com.tracom.brt.controllers;

import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
/*import org.springframework.stereotype.Controller;*/
import com.chequer.axboot.core.api.response.ApiResponse;
/*import org.springframework.web.bind.annotation.RequestMethod;*/
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
/*import com.tracom.brt.domain.contract.Contract;*/
import com.wordnik.swagger.annotations.ApiImplicitParam;
import com.wordnik.swagger.annotations.ApiImplicitParams;
//import com.tracom.brt.domain.BM0101.BM0101Service;
//import com.tracom.brt.domain.BM0101.CorpInfoVo;
/*import com.tracom.brt.domain.contract.BM0301Service;*/
import com.tracom.brt.domain.BM0301.BM0301Service;
import com.tracom.brt.domain.BM0301.ContractInfoVO;

import javax.inject.Inject;
import java.util.List;

@RestController
@RequestMapping(value = "/api/v1")
public class BM0301Controller extends BaseController {

    @Inject
    private BM0301Service service;

    @GetMapping("/BM0301G0S0")
    @ApiImplicitParams({
    	@ApiImplicitParam(name = "filter", value = "검색어", dataType = "String", paramType = "query")
    })
    public Responses.ListResponse BM0301G0S0(RequestParams<ContractInfoVO> requestParams) {
        List<ContractInfoVO> list = service.BM0301G0S0(requestParams);
        
        System.out.println(list.size());
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
        return Responses.ListResponse.of(list);
    }
    
    @GetMapping("/BM0301G0S1")
    public Responses.ListResponse BM0301G0S1(RequestParams<ContractInfoVO> requestParams) {
    	System.out.println("list");
    	System.out.println(requestParams);
        List<ContractInfoVO> list = service.BM0301G0S1(requestParams);
        return Responses.ListResponse.of(list);
    }

    @PostMapping("/BM0301F0I0")
    public ApiResponse BM0301F0I0(@RequestBody ContractInfoVO request) {
        String conId = service.BM0301F0I0(request);       
        return ok(conId);
    }
    
    @PostMapping("/BM0301F0U0")
    public ApiResponse BM0301F0U0(@RequestBody ContractInfoVO request) {
    	service.BM0301F0U0(request);
    	return ok();
    }
    
    @PostMapping("/BM0301F0U1")
    public ApiResponse BM0301F0U1(@RequestBody ContractInfoVO request) {
    	service.BM0301F0U1(request);
    	return ok();
    }
    
    @PostMapping("/BM0301F0U2")
    public ApiResponse BM0301F0U2(@RequestBody ContractInfoVO request) {
    	service.BM0301F0U2(request);
    	return ok();
    }
    
    @PostMapping("/BM0301G0D0")
    public ApiResponse BM0301G0D0(@RequestBody ContractInfoVO request) {
    	System.out.println(request);
    	service.BM0301G0D0(request);
    	return ok();
    }
}