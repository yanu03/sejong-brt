package com.tracom.brt.controllers;
 
import java.util.List;

import javax.inject.Inject;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BM0605.VideoInfoVO;
import com.tracom.brt.domain.BM0606.BM0606Service;
import com.tracom.brt.domain.BM0606.VdoOrgaVO;
import com.wordnik.swagger.annotations.ApiImplicitParam;
import com.wordnik.swagger.annotations.ApiImplicitParams;
 
@RestController
@RequestMapping(value = "/api/v1")
public class BM0606Controller extends BaseController {
 
    @Inject
    private BM0606Service service;
 
    @GetMapping("/BM0606G0S0")
    @ApiImplicitParams({
    	@ApiImplicitParam(name = "filter", value = "검색어", dataType = "String", paramType = "query")
    })
    public Responses.ListResponse BM0606G0S0(RequestParams<VdoOrgaVO> requestParams) {
        List<VdoOrgaVO> list = service.BM0606G0S0(requestParams);
        return Responses.ListResponse.of(list);
    }
    
    @PostMapping("/BM0606G2S0")
    public Responses.ListResponse BM0606G2I0(@RequestBody VdoOrgaVO request) {
    	System.out.println(request);
    	List<VideoInfoVO> voList = service.BM0606G2S0(request);
    	return Responses.ListResponse.of(voList);
    }
    
    @PostMapping("/BM0606G2U0")
    public Responses.ListResponse BM0606G2U0(@RequestBody VdoOrgaVO orgaVO) {
    	System.out.println(orgaVO);
    	//List<VideoInfoVO> voList = service.BM0606G2S0(request);
    	//return Responses.ListResponse.of(voList);
    	return null;
    }

}