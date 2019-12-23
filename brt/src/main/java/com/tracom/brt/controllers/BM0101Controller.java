package com.tracom.brt.controllers;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.chequer.axboot.core.api.response.ApiResponse;
import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BM0101.CorpInfoVo;
import com.tracom.brt.domain.BM0101.BM0101Service;
import com.wordnik.swagger.annotations.ApiImplicitParam;
import com.wordnik.swagger.annotations.ApiImplicitParams;

@Controller
@RequestMapping(value = "/api/v1")
public class BM0101Controller extends BaseController {

    @Inject
    private BM0101Service corporationService;

    @RequestMapping(value = "/BM0101G0S0", method = RequestMethod.GET, produces = APPLICATION_JSON)
    @ApiImplicitParams({
    	@ApiImplicitParam(name = "filter", value = "검색어", dataType = "String", paramType = "query")
    })
    public Responses.ListResponse list(RequestParams<CorpInfoVo> requestParams) {
        List<CorpInfoVo> list = corporationService.BM0101G0S0(requestParams);
        return Responses.ListResponse.of(list);
    }

    @RequestMapping(value = "/BM0101F0I0", method = RequestMethod.POST, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody CorpInfoVo request) {
        String corpId = corporationService.BM0101F0I0(request);
        
        return ok(corpId);
    }
    
    @RequestMapping(value = "/BM0101F0U0", method = RequestMethod.POST, produces = APPLICATION_JSON)
    public ApiResponse update(@RequestBody CorpInfoVo request) {
    	corporationService.BM0101F0U0(request);
    	return ok();
    }
    
    @RequestMapping(value = "/BM0101G0D0", method = RequestMethod.POST, produces = APPLICATION_JSON)
    public ApiResponse delete(@RequestBody CorpInfoVo request) {
    	corporationService.BM0101G0D0(request);
    	return ok();
    }
}