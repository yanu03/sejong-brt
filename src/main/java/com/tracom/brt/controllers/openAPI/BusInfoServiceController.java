package com.tracom.brt.controllers.openAPI;

import java.util.Enumeration;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.chequer.axboot.core.controllers.BaseController;
import com.tracom.brt.domain.OpenAPI.BusListVO;
import com.tracom.brt.domain.OpenAPI.BusLocationVO;
import com.tracom.brt.domain.OpenAPI.OpenAPIService;

@RestController
@RequestMapping("/api/open/busInfoService")
public class BusInfoServiceController extends BaseController {
	
	@Inject
	private OpenAPIService service;  

	
	/**
	 * BM_VHC_INFO 테이블에 MODEL_NM, LF_YN 컬럼에 값이 있어야 쿼리됩니다.
	 * **/
	
	/** 전체버스리스트 출력 (조건 : LF_YN = LF010 || LF011) **/ 
	@GetMapping("/getAllBusList")
	@ResponseBody
    public Object getAllBusList(@RequestParam String serviceKey) {
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes()).getRequest();

		Map<String, Object> authResult = service.authKey(serviceKey, request);
		if(authResult.getOrDefault("resultCd", "FAIL").equals("SUCCESS")) {
			BusListVO result = service.getBusList("ALL");
			service.insertApiLog(request, result.getResultCd(), result.getResultDetailCd());
			return result;
		}else {
			service.insertApiLog(request, authResult.getOrDefault("resultCd", null).toString(), authResult.getOrDefault("resultDetailCd", null).toString());
			return authResult;
		}
	}
	
	/** 전기굴절버스리스트 출력 (조건 : LF_YN = LF010) **/
	@GetMapping("/getElecBusList")
    public Object getElecBusList(@RequestParam String serviceKey) {
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes()).getRequest();
		
		Map<String, Object> authResult = service.authKey(serviceKey, request);
		if(authResult.getOrDefault("resultCd", "FAIL").equals("SUCCESS")) {
			BusListVO result = service.getBusList("ELEC");
			service.insertApiLog(request, result.getResultCd(), result.getResultDetailCd());
			return result;			
		}else {
			service.insertApiLog(request, authResult.getOrDefault("resultCd", null).toString(), authResult.getOrDefault("resultDetailCd", null).toString());
			return authResult;
		}	
	}
	
	/** CNG버스리스트 출력 (조건 : LF_YN = LF010) **/
	@GetMapping("/getCngBusList")
    public Object getCNGBusList(@RequestParam String serviceKey) {
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes()).getRequest();
		
		Map<String, Object> authResult = service.authKey(serviceKey, request);
		if(authResult.getOrDefault("resultCd", "FAIL").equals("SUCCESS")) {
			BusListVO result = service.getBusList("CNG");
			service.insertApiLog(request, result.getResultCd(), result.getResultDetailCd());
			return result;
		}else {
			service.insertApiLog(request, authResult.getOrDefault("resultCd", null).toString(), authResult.getOrDefault("resultDetailCd", null).toString());
			return authResult;
		}
	}

	
	//노선 정류장 위치
	//노선경로정보
	//운행상태
}
