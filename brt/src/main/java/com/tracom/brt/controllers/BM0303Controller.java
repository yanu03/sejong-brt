package com.tracom.brt.controllers;

import java.util.List;

import javax.inject.Inject;
import javax.jdo.annotations.Transactional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BM0302.AltContractInfoVO;
import com.tracom.brt.domain.BM0303.BM0303Service;
import com.tracom.brt.domain.BM0303.ContractViewVO;
import com.wordnik.swagger.annotations.ApiImplicitParam;
import com.wordnik.swagger.annotations.ApiImplicitParams;

@RestController
@RequestMapping(value = "/api/v1")
public class BM0303Controller extends BaseController{

	@Inject
	private BM0303Service service;
	
	 @GetMapping("/BM0303G1S0")
	    @ApiImplicitParams({
	    	@ApiImplicitParam(name = "filter", value = "검색어", dataType = "String", paramType = "query")
	    })
	    public Responses.ListResponse BM0303G1S0(RequestParams<ContractViewVO> requestParams) {
	        List<ContractViewVO> list = service.BM0303G1S0(requestParams);
	        for(int i = 0; i<list.size(); i++) {
	        	if(list.get(i).getConfirmYn().equals("Y")) {
	        		list.get(i).setConfirmYn("확정");
	        	}else {
	        		list.get(i).setConfirmYn("미확정");
	        	}
	        }
	        return Responses.ListResponse.of(list);
	    }
	 	@GetMapping("/BM0303G2S0")
	    public Responses.ListResponse BM0303G2S0(RequestParams<ContractViewVO> requestParams) {
	        List<ContractViewVO> list = service.BM0303G2S0(requestParams);
	        List<ContractViewVO> vo = service.BM0303G2S1(requestParams);
	        /*
	        for(int i = 0; i<vo.size(); i++) {
	        	if(vo.get(i).getVocId() != null) {
	        		list.add(list.size(), vo.get(i));
	        		System.out.println(list);
	        	}
	        }
	        */
	        System.out.println(list);
	        return Responses.ListResponse.of(list);
	    }
	 	
	 	@GetMapping("/BM0303G2S1")
	    public Responses.ListResponse BM0303G2S1(RequestParams<ContractViewVO> requestParams) {
	        List<ContractViewVO> list = service.BM0303G2S1(requestParams);

	        System.out.println(list);
	        return Responses.ListResponse.of(list);
	    }
	 
	
}
