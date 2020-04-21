package com.tracom.brt.controllers;

import javax.inject.Inject;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.AD0103.AdInstDlVO;
import com.tracom.brt.domain.AD0105.AD0105Service;

@RestController
@RequestMapping(value = "/api/v1")
public class AD0105Controller extends BaseController {

    @Inject
    private AD0105Service service;

    @GetMapping("/AD0105G0S0")
    public Responses.ListResponse AD0105G0S0(RequestParams<AdInstDlVO> requestParams) {
        return Responses.ListResponse.of(service.AD0105G0S0(requestParams));
    }
}