package com.tracom.brt.controllers;

import java.util.List;

import javax.inject.Inject;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
        return Responses.ListResponse.of(list);
    }
	
}
