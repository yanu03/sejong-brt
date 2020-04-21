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
import com.tracom.brt.domain.BM0901.BM0901Service;
import com.tracom.brt.domain.BM0901.ElecRouterVO;
import com.wordnik.swagger.annotations.ApiImplicitParam;
import com.wordnik.swagger.annotations.ApiImplicitParams;
 
@RestController
@RequestMapping(value = "/api/v1")
public class BM0901Controller extends BaseController {
 
    @Inject
    private BM0901Service service;
 
    @GetMapping("/BM0901G0S0")
    @ApiImplicitParams({
    	@ApiImplicitParam(name = "filter", value = "검색어", dataType = "String", paramType = "query")
    })
    public Responses.ListResponse BM0901G0S0(RequestParams<ElecRouterVO> requestParams) {
        List<ElecRouterVO> list = service.BM0901G0S0(requestParams);
        return Responses.ListResponse.of(list);
    }
    
    @PostMapping("/BM0901G0I0")
    public ApiResponse BM0901G0I0(@RequestBody ElecRouterVO request) {
        String setId = service.BM0901G0I0(request);
        return ok(setId);
    }
    
    @PostMapping("/BM0901G0U0")
    public ApiResponse BM0901G0U0(@RequestBody ElecRouterVO request) {
        if(service.BM0901G0U0(request)) {
        	return ok("true");
        }else {
        	return ok("false");
        }
    }
    
    @PostMapping("/BM0901G0D0")
    public ApiResponse BM0901G0D0(@RequestBody ElecRouterVO request) {
        if(service.BM0901G0D0(request)) {
        	return ok("true");
        }else {
        	return ok("false");
        }
    }

}