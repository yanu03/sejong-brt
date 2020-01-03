package com.tracom.brt.controllers;

import java.util.List;

import javax.inject.Inject;

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
	    public Responses.ListResponse list(RequestParams<ContractViewVO> requestParams) {
	        List<ContractViewVO> list = service.BM0303G1S0(requestParams);
	        return Responses.ListResponse.of(list);
	    }
	
}
