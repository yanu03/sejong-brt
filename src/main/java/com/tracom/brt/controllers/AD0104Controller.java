package com.tracom.brt.controllers;

import javax.inject.Inject;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.AD0103.AdInstInfoVO;
import com.tracom.brt.domain.AD0104.AD0104Service;

@RestController
@RequestMapping(value = "/api/v1")
public class AD0104Controller extends BaseController {

    @Inject
    private AD0104Service service;

    @GetMapping("/AD0104G0S0")
    public Responses.ListResponse AD0104G0S0(RequestParams<AdInstInfoVO> requestParams) {
        return Responses.ListResponse.of(service.AD0104G0S0(requestParams));
    }
}