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
import com.chequer.axboot.core.code.ApiStatus;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BM0103.VHCInfoVO;
import com.tracom.brt.domain.BM0104.BmRoutInfoVO;
import com.tracom.brt.domain.BM0104.BmRoutNodeInfoVO;
import com.tracom.brt.domain.BM0107.BM0107Service;
import com.tracom.brt.domain.Interface.DataInterface;
import com.wordnik.swagger.annotations.ApiImplicitParam;
import com.wordnik.swagger.annotations.ApiImplicitParams;

@RestController
@RequestMapping(value = "/api/v1")
public class BM0107Controller extends BaseController {

    @Inject
    private BM0107Service service;

    @GetMapping("/BM0107G0S0")
    @ApiImplicitParams({
    	@ApiImplicitParam(name = "filter", value = "검색어", dataType = "String", paramType = "query")
    })
    public Responses.ListResponse BM0107G0S0(RequestParams<BmRoutInfoVO> requestParams) {
        List<BmRoutInfoVO> list = service.BM0107G0S0(requestParams);
        return Responses.ListResponse.of(list);
    }
    
    @GetMapping("/BM0107G1S0")
    @ApiImplicitParams({
    	@ApiImplicitParam(name = "routId", value = "선택", dataType = "String", paramType = "query"),
    	@ApiImplicitParam(name = "filter1", value = "검색어", dataType = "String", paramType = "query")
    })
    public Responses.ListResponse BM0107G1S0(RequestParams<BmRoutNodeInfoVO> requestParams) {
        List<BmRoutNodeInfoVO> list = service.BM0107G1S0(requestParams);
        return Responses.ListResponse.of(list);
    }
    
    @PostMapping("/BM0107G0U0")
    public ApiResponse BM0107G0U0(@RequestBody List<BmRoutInfoVO> requestParams) {
    	int result = service.BM0107G1I0(requestParams);
    	
    	if(result > 0) {
    		return ok();
    	} else {
    		return ApiResponse.of(ApiStatus.SYSTEM_ERROR, "FAIL");    		
    	}
    }
    
    @PostMapping("/BM0107G1D1")
    public ApiResponse BM0107G1D1(@RequestBody BmRoutNodeInfoVO request) {
    	service.BM0107G1D1(request);
    	return ok();
    }

}