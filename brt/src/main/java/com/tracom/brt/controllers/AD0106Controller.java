package com.tracom.brt.controllers;

import javax.inject.Inject;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.AD0103.AdInstDlVO;
import com.tracom.brt.domain.AD0106.AD0106Service;

@RestController
@RequestMapping(value = "/api/v1")
public class AD0106Controller extends BaseController {

    @Inject
    private AD0106Service service;

    @GetMapping("/AD0106G0S0")
    public Responses.ListResponse AD0106G0S0(RequestParams<AdInstDlVO> requestParams) {
        return Responses.ListResponse.of(service.AD0106G0S0(requestParams));
    }
}