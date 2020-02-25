package com.tracom.brt.controllers;

import javax.inject.Inject;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chequer.axboot.core.controllers.BaseController;
import com.tracom.brt.domain.BM0406.BM0406Service;

@RestController
@RequestMapping(value = "/api/v1")
public class BM0406Controller extends BaseController {

	@Inject
    private BM0406Service service;
}