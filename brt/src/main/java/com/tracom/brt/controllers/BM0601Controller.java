package com.tracom.brt.controllers;

import java.util.List;

import javax.inject.Inject;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chequer.axboot.core.api.response.Responses;
import com.chequer.axboot.core.controllers.BaseController;
import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BM0601.BM0601Service;
import com.tracom.brt.domain.BM0601.WeatAtmoVO;
import com.wordnik.swagger.annotations.ApiImplicitParam;
import com.wordnik.swagger.annotations.ApiImplicitParams;

@RestController
@RequestMapping(value="/api/v1")
public class BM0601Controller extends BaseController{

	@Inject
	private BM0601Service service;
	
	@GetMapping("/BM0601F0S0")
	@ApiImplicitParams({
		@ApiImplicitParam(name ="filter" , value="검색어" , dataType = "String" , paramType = "query")
	})
	public Responses.ListResponse BM0601F0S0(RequestParams<WeatAtmoVO> requestParams){
		List<WeatAtmoVO> list = service.BM0601F0S0(requestParams);
		List<WeatAtmoVO> vo = service.BM0601F0S1(requestParams);
		
		list.get(0).setSkyCond(vo.get(0).getSkyCond());
		list.get(0).setTempc(vo.get(0).getTempc());
		list.get(0).setTempMini(vo.get(0).getTempMini());
		list.get(0).setTempHigh(vo.get(0).getTempHigh());
		list.get(0).setHumi(vo.get(0).getHumi());
		list.get(0).setRainPro(vo.get(0).getRainPro());
		list.get(0).setRainFall(vo.get(0).getRainFall());
		return Responses.ListResponse.of(list);
	}
	
	@GetMapping("/BM0601G1S0")
	@ApiImplicitParams({
		@ApiImplicitParam(name="filter" , value="검색어" , dataType = "String" , paramType = "query")
	})
	public Responses.ListResponse BM0601G1S0(RequestParams<WeatAtmoVO> requestParams){
		List<WeatAtmoVO> list = service.BM0601G1S0(requestParams);
		return Responses.ListResponse.of(list);
	}
	
	@GetMapping("/BM0601G1S1")
	@ApiImplicitParams({
		@ApiImplicitParam(name ="filter" , value="검색어" , dataType = "String" , paramType = "query")
	})
	public Responses.ListResponse BM0601G1S1(RequestParams<WeatAtmoVO> requestParams){
		List<WeatAtmoVO> list = service.BM0601G1S1(requestParams);
		return Responses.ListResponse.of(list);
	}
	
	@GetMapping("/BM0601G2S1")
	@ApiImplicitParams({
		@ApiImplicitParam(name ="filter" , value="검색어" , dataType = "String" , paramType = "query")
	})
	public Responses.ListResponse BM0601G2S1(RequestParams<WeatAtmoVO> requestParams){
		List<WeatAtmoVO> list = service.BM0601G2S1(requestParams);
		return Responses.ListResponse.of(list);
	}
	
	@GetMapping("/BM0601M0S0")
	@ApiImplicitParams({
		@ApiImplicitParam(name="filter" , value="검색어" , dataType = "String" , paramType = "query")
	})
	public Responses.ListResponse BM0601M0S0(RequestParams<WeatAtmoVO> requestParams){
		List<WeatAtmoVO> list = service.BM0601M0S0(requestParams);
		return Responses.ListResponse.of(list);
	}
}