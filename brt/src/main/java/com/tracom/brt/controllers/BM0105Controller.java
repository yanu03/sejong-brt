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
import com.tracom.brt.domain.BM0104.BmRoutInfoVO;
import com.tracom.brt.domain.BM0105.BM0105Service;
import com.tracom.brt.domain.BM0105.BmStaInfoVO;
import com.wordnik.swagger.annotations.ApiImplicitParam;
import com.wordnik.swagger.annotations.ApiImplicitParams;

@RestController
@RequestMapping(value = "/api/v1")
public class BM0105Controller extends BaseController {
 
    @Inject
    private BM0105Service service;
 
    @GetMapping("/BM0105G1S0")
    @ApiImplicitParams({
    	@ApiImplicitParam(name = "filter", value = "검색어", dataType = "String", paramType = "query"),
    	@ApiImplicitParam(name = "routId", value = "노선ID", dataType = "String", paramType = "query")
    })
    public Responses.ListResponse BM010510S0(RequestParams<BmStaInfoVO> requestParams) {
    	System.out.println(requestParams);
        List<BmStaInfoVO> list = service.BM0105G1S0(requestParams);
        return Responses.ListResponse.of(list);
    }
    
    @PostMapping("/BM0105G2U0")
    public Responses.ListResponse BM0105G2U0(@RequestBody List<BmRoutInfoVO> requestParams) {
    	List<String> list = service.BM0105G0U0(requestParams); 
    	return Responses.ListResponse.of(list);
    }
}