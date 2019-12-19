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
import com.tracom.brt.domain.corporation.Corporation;
import com.tracom.brt.domain.corporation.CorporationService;
import com.wordnik.swagger.annotations.ApiImplicitParam;
import com.wordnik.swagger.annotations.ApiImplicitParams;

@Controller
@RequestMapping(value = "/api/v1/corporation")
public class CorporationController extends BaseController {

    @Inject
    private CorporationService corporationService;

    @RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON)
    @ApiImplicitParams({
    	@ApiImplicitParam(name = "filter", value = "검색어", dataType = "String", paramType = "query")
    })
    public Responses.ListResponse list(RequestParams<Corporation> requestParams) {
        List<Corporation> list = corporationService.findAll(requestParams);
        return Responses.ListResponse.of(list);
    }

    @RequestMapping(method = RequestMethod.POST, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody Corporation request) {
        corporationService.saveCorporation(request);
        return ok();
    }
    
    @RequestMapping(method = RequestMethod.PUT, produces = APPLICATION_JSON)
    public ApiResponse update(@RequestBody Corporation request) {
    	corporationService.updateCorporation(request);
    	return ok();
    }
    
    @RequestMapping(method = RequestMethod.DELETE, produces = APPLICATION_JSON)
    public ApiResponse delete(@RequestBody Corporation request) {
    	corporationService.deleteCorporation(request);
    	return ok();
    }
}