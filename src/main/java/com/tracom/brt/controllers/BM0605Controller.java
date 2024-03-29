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
import com.tracom.brt.domain.BM0605.BM0605Service;
import com.tracom.brt.domain.BM0605.VideoInfoVO;
import com.wordnik.swagger.annotations.ApiImplicitParam;
import com.wordnik.swagger.annotations.ApiImplicitParams;
 
@RestController
@RequestMapping(value = "/api/v1")
public class BM0605Controller extends BaseController {
 
    @Inject
    private BM0605Service service;
 
    @GetMapping("/BM0605G0S0")
    @ApiImplicitParams({
    	@ApiImplicitParam(name = "filter", value = "검색어", dataType = "String", paramType = "query")
    })
    public Responses.ListResponse BM0605G0S0(RequestParams<VideoInfoVO> requestParams) {
        List<VideoInfoVO> list = service.BM0605G0S0(requestParams);
        return Responses.ListResponse.of(list);
    }
    
    @PostMapping("/BM0605F0I0")
    public ApiResponse BM0605F0I0(@ModelAttribute VideoInfoVO request) throws Exception {
    	String vdoId = service.BM0605F0I0(request);
    	return ok(vdoId);
    }
    
    @PostMapping("/BM0605F0U0")
    public ApiResponse BM0605F0U0(@ModelAttribute VideoInfoVO request) throws Exception {
    	String vdoId = service.BM0605F0U0(request);
    	return ok(vdoId);
    }
    
    @PostMapping("/BM0605G0D0")
    public ApiResponse BM0605G0D0(@RequestBody VideoInfoVO request) throws Exception {
    	String flag = "";
    	if(service.BM0605G0D0(request)) {
    		flag = "true";
    	}else {
    		flag = "false";
    	}
    	return ok(flag);
    }
}