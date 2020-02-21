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
		
		list.get(0).setSdc(list.get(0).getSdc()+"ppm");
		list.get(0).setCmc(list.get(0).getCmc()+"ppm");
		list.get(0).setNdc(list.get(0).getNdc()+"ppm");
		list.get(0).setOzonec(list.get(0).getOzonec()+"ppm");
		list.get(0).setDustc(list.get(0).getDustc()+"㎍/㎥");
		list.get(0).setSDustc(list.get(0).getSDustc()+"㎍/㎥");
		list.get(0).setSkyCond(vo.get(0).getSkyCond());
		list.get(0).setSkyCondCode(vo.get(0).getSkyCondCode());
		list.get(0).setTempc(vo.get(0).getTempc()+"℃");
		if(vo.get(0).getTempHigh().equals("-999.0")) {
			list.get(0).setTempHigh("0.0℃");
			list.get(0).setTempMini("0.0℃");
		}else {
			list.get(0).setTempHigh(vo.get(0).getTempHigh()+"℃");
			list.get(0).setTempMini(vo.get(0).getTempMini()+"℃");			
		}
		list.get(0).setHumi(vo.get(0).getHumi()+"%");
		list.get(0).setRainPro(vo.get(0).getRainPro()+"%");
		list.get(0).setRainFall(vo.get(0).getRainFall()+"mm");
		list.get(0).setRenewDt(vo.get(0).getRenewDt().substring(0, 19));
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
		list.get(0).setNumVal4(list.get(0).getNumVal4().substring(0, 1)+"시");
		list.get(0).setNumVal5(list.get(0).getNumVal5().substring(0, 2)+"시");
		list.get(0).setNumVal6(list.get(0).getNumVal6().substring(0, 2)+"분");
		return Responses.ListResponse.of(list);
	}
	
	@PostMapping("/BM0601M0I0")
    public ApiResponse BM0601M0I0(@RequestBody WeatAtmoVO request) {		
        return ok(service.BM0601M0I0(request));
    }
}
