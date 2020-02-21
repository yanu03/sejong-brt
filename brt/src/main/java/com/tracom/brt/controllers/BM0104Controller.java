package com.tracom.brt.controllers;

import java.io.FileNotFoundException;
import java.io.IOException;
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
import com.tracom.brt.domain.BM0104.BM0104Service;
import com.tracom.brt.domain.BM0104.BmRoutInfoVO;
import com.tracom.brt.domain.BM0104.BmRoutInterfaceVO;
import com.tracom.brt.utils.ExcelUtils;
import com.wordnik.swagger.annotations.ApiImplicitParam;
import com.wordnik.swagger.annotations.ApiImplicitParams;

@RestController
@RequestMapping(value = "/api/v1")
public class BM0104Controller extends BaseController {

    @Inject
    private BM0104Service service;

    /** 갱신된 노선 그리드 출력 
     * @throws IOException 
     * @throws FileNotFoundException **/
    @GetMapping("/BM0104G0S0")
    @ApiImplicitParams({
    	@ApiImplicitParam(name = "filter", value = "검색어", dataType = "String", paramType = "query")
    })
    public Responses.ListResponse BM0104G0S0(RequestParams<BmRoutInfoVO> requestParams) throws FileNotFoundException, IOException {
        List<BmRoutInfoVO> list = service.BM0104G0S0(requestParams);
        return Responses.ListResponse.of(list);
    }

    /** 갱신할 노선 그리드 출력**/
    @GetMapping("/BM0104G1S0")
    @ApiImplicitParams({
    	@ApiImplicitParam(name = "filter", value = "검색어", dataType = "String", paramType = "query")
    })
    public Responses.ListResponse BM0104G1S0(RequestParams<BmRoutInterfaceVO> requestParams){
    	List<BmRoutInfoVO> list = service.BM0104G1S0(requestParams);
    	return Responses.ListResponse.of(list);
    }
    
    /** 갱신할 노선 선택 후 갱신 **/
    @PostMapping("/BM0104G0U0")
    public ApiResponse BM0104G0U0(@RequestBody List<BmRoutInfoVO> requestParams) {
    	return ok(service.BM0104G0U0(requestParams));
    }
    
    /** 상하행구분 수정 **/
    @PostMapping("/BM0104G0U1")
    public ApiResponse BM0104G0U1(@RequestBody List<BmRoutInfoVO> requestParams) {
    	return ok(service.BM0104G0U2(requestParams));
    }
    
    
    /**폼업데이트**/
    @PostMapping("/BM0104F0U0")
    public ApiResponse BM0104F0U0(@RequestBody BmRoutInfoVO requestParams) {
    	if(service.BM0104F0S1(requestParams)) {
    		if(service.BM0104F0U0(requestParams) > 0) {
    			return ok();    			
    		}
    		else {
    			return ok("error");
    		}
    	} else {
    		return ok("error");
    	}
    }
    
    /**폼인서트**/
    @PostMapping("/BM0104F0I0")
    public ApiResponse BM0104F0I0(@RequestBody BmRoutInfoVO requestParams) {
    	if(service.BM0104F0S1(requestParams)) {
    		String routId = service.BM0104F0I0(requestParams);
    		if(routId != null) {
    			return ok(routId);    			
    		}
    		else {
    			return ok("error");
    		}
    	} else {
    		return ok("error");
    	}
    }
    
    /** 노선 삭제 **/
    @PostMapping("/BM0104F0D0")
    public ApiResponse BM0104F0D0(@RequestBody BmRoutInfoVO requestParams) {
    	if(service.BM0104F0D0(requestParams) > 0) {
    		return ok();
    	}else {
    		return ok("error");
    	}
    }
    
}