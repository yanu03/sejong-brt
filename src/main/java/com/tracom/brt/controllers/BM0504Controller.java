package com.tracom.brt.controllers;

import java.util.List;

import javax.inject.Inject;

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
import com.tracom.brt.domain.BM0205.VhcDvcUpdateVO;
import com.tracom.brt.domain.BM0504.BM0504Service;
import com.wordnik.swagger.annotations.ApiImplicitParam;
import com.wordnik.swagger.annotations.ApiImplicitParams;

@RestController
@RequestMapping(value="/api/v1")
public class BM0504Controller extends BaseController{

	@Inject
	private BM0504Service service;
	
    @GetMapping("/BM0504G0S0")
    @ApiImplicitParams({
    	@ApiImplicitParam(name = "filter", value = "검색어", dataType = "String", paramType = "query"),
    	@ApiImplicitParam(name = "dvcKind", value = "장치종류", dataType = "String", paramType = "query")
    })
    public Responses.ListResponse BM0504G0S0(RequestParams<VhcDvcUpdateVO> requestParams) {
        List<VhcDvcUpdateVO> list = service.BM0504G0S0(requestParams);
        return Responses.ListResponse.of(list);
    }
    
    @PostMapping("/BM0504G0S1")
    public ApiResponse BM0504G0S1(@RequestBody VhcDvcUpdateVO vo) {
    	boolean mngIdCheck = service.BM0504G0S1(vo);
    	return ok(Boolean.toString(mngIdCheck));
    }
    
    @PostMapping("/BM0504FileUp")
    public ApiResponse BM0504F0I0(@ModelAttribute VhcDvcUpdateVO vo) {
    	service.BM0504FileUp(vo);
    	return ok();
    }
    
    @PostMapping("/BM0504Reservation")
    public ApiResponse BM0504Reservation(@RequestBody VhcDvcUpdateVO vo) {  	
    	service.BM0504Reservation(vo);
    	return ok();
    }
	
}
