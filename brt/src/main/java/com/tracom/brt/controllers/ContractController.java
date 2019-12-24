package com.tracom.brt.controllers;

import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import org.springframework.stereotype.Controller;
import com.chequer.axboot.core.api.response.ApiResponse;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import com.tracom.brt.domain.contract.Contract;
import com.tracom.brt.domain.contract.ContractService;

import javax.inject.Inject;
import java.util.List;

@Controller
@RequestMapping(value = "/api/v1/contract")
public class ContractController extends BaseController {

    @Inject
    private ContractService contractService;

    @RequestMapping(method = RequestMethod.GET, produces = APPLICATION_JSON)
    public Responses.ListResponse list(RequestParams<Contract> requestParams) {
        List<Contract> list = contractService.findAll(requestParams);
        return Responses.ListResponse.of(list);
    }

    @RequestMapping(method = RequestMethod.POST, produces = APPLICATION_JSON)
    public ApiResponse save(@RequestBody List<Contract> request) {
        contractService.save(request);
        return ok();
    }
}