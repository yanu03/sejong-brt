package com.tracom.brt.controllers.openAPI;

import java.util.HashMap;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.chequer.axboot.core.controllers.BaseController;
import com.tracom.brt.domain.OpenAPI.BusLocationListVO;
import com.tracom.brt.domain.OpenAPI.BusLocationVO;
import com.tracom.brt.domain.OpenAPI.ErrorVO;
import com.tracom.brt.domain.OpenAPI.OpenAPIService;

@RestController
@RequestMapping("/api/open/busLocationService")
public class BusLocationServiceController extends BaseController {
	
	@Inject
	private OpenAPIService service;  

	/** 모든 굴절버스 위치 **/
	@GetMapping("/getElecBusLocation")
    public Object getElecBusLocation(@RequestParam(value="serviceKey", required=true, defaultValue="") String serviceKey) {
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes()).getRequest();
		
		if(serviceKey.equals("")) {
			ErrorVO result = service.returnParamError();
			service.insertApiLog(request, result.getResultCd(), result.getResultDetailCd());
			return result;
		}
		
		Map<String, Object> authResult = service.authKey(serviceKey, request);
		if(authResult.getOrDefault("resultCd", "FAIL").equals("SUCCESS")) {
			BusLocationListVO result = service.getAllElecBusLocation();
			service.insertApiLog(request, result.getResultCd(), result.getResultDetailCd());
			return result;
		}else {
			service.insertApiLog(request, authResult.getOrDefault("resultCd", null).toString(), authResult.getOrDefault("resultDetailCd", null).toString());
			return authResult;
		}
	}
	
	/** 모든 CNG버스 위치**/
	@GetMapping("/getCngBusLocation")
    public Object getCngBusLocation(@RequestParam(value="serviceKey", required=true, defaultValue="") String serviceKey) {
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes()).getRequest();
		
		if(serviceKey.equals("")) {
			ErrorVO result = service.returnParamError();
			service.insertApiLog(request, result.getResultCd(), result.getResultDetailCd());
			return result;
		}
		
		Map<String, Object> authResult = service.authKey(serviceKey, request);
		if(authResult.getOrDefault("resultCd", "FAIL").equals("SUCCESS")) {
			BusLocationListVO result = service.getAllCngBusLocation();
			service.insertApiLog(request, result.getResultCd(), result.getResultDetailCd());
			return result;
		}else {
			service.insertApiLog(request, authResult.getOrDefault("resultCd", null).toString(), authResult.getOrDefault("resultDetailCd", null).toString());
			return authResult;
		}
	}	
	
	
	/** 모든 굴절버스, CNG버스 위치 **/
	@GetMapping("/getAllBusLocation")
    public Object getAllBusLocation(@RequestParam(value="serviceKey", required=true, defaultValue="") String serviceKey) {
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes()).getRequest();
	
		if(serviceKey.equals("")) {
			ErrorVO result = service.returnParamError();
			service.insertApiLog(request, result.getResultCd(), result.getResultDetailCd());
			return result;
		}
		
		Map<String, Object> authResult = service.authKey(serviceKey, request);
		if(authResult.getOrDefault("resultCd", "FAIL").equals("SUCCESS")) {
			BusLocationListVO result = service.getAllBusLocation();
			service.insertApiLog(request, result.getResultCd(), result.getResultDetailCd());
			return result;
		}else {
			service.insertApiLog(request, authResult.getOrDefault("resultCd", null).toString(), authResult.getOrDefault("resultDetailCd", null).toString());
			return authResult;
		}
	}	
	
	
	/** 선택 버스 위치 **/
	@GetMapping("/getBusLocation")
    public Object getBusLocation(@RequestParam(value="busNo", required=true, defaultValue="") String busNo
    							, @RequestParam(value="serviceKey", required=true, defaultValue="") String serviceKey) {
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes()).getRequest();
		
		if(serviceKey.equals("") || busNo.equals("")) {
			ErrorVO result = service.returnParamError();
			service.insertApiLog(request, result.getResultCd(), result.getResultDetailCd());
			return result;
		}
		
		Map<String, Object> authResult = service.authKey(serviceKey, request);
		if(authResult.getOrDefault("resultCd", "FAIL").equals("SUCCESS")) {
			BusLocationVO result = service.getBusLocation(busNo);
			service.insertApiLog(request, result.getResultCd(), result.getResultDetailCd());
			return result;
		}else {
			service.insertApiLog(request, authResult.getOrDefault("resultCd", null).toString(), authResult.getOrDefault("resultDetailCd", null).toString());
			return authResult;
		}
	}
	
	/** 선택 버스 위치 이력 (최대 1주일 전부터) **/
	@GetMapping("/getBusLocationHistory")
    public Object getBusLocationHistory(@RequestParam(value="busNo", required=true, defaultValue="") String busNo
    									, @RequestParam(value="startDt", required=true, defaultValue="") String startDt
    									, @RequestParam(value="endDt", required=true, defaultValue="") String endDt
    									, @RequestParam(value="serviceKey", required=true, defaultValue="") String serviceKey) {
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes()).getRequest();
		
		if(serviceKey.equals("") || busNo.equals("") || startDt.equals("") || endDt.equals("")) {
			ErrorVO result = service.returnParamError();
			service.insertApiLog(request, result.getResultCd(), result.getResultDetailCd());
			return result;
		}
		
		Map<String, Object> param = new HashMap<>();
		param.put("busNo", busNo);
		param.put("stDt", toHyphenDate(startDt));
		param.put("edDt", toHyphenDate(endDt));
		
		Map<String, Object> authResult = service.authKey(serviceKey, request);
		if(authResult.getOrDefault("resultCd", "FAIL").equals("SUCCESS")) {
			BusLocationListVO result = service.getBusLocationHistory(param);
			service.insertApiLog(request, result.getResultCd(), result.getResultDetailCd());
			return result;
		}else {
			service.insertApiLog(request, authResult.getOrDefault("resultCd", null).toString(), authResult.getOrDefault("resultDetailCd", null).toString());
			return authResult;
		}
	}
	
	public String toHyphenDate(String dt) {
		String result = "";
		result += dt.substring(0, 4) +
				"-" +
				dt.substring(4, 6) +
				"-" +
				dt.substring(6, 8);
		return result;
	}
}
