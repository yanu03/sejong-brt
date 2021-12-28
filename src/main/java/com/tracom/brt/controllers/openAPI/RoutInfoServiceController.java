package com.tracom.brt.controllers.openAPI;

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
import com.tracom.brt.domain.OpenAPI.ErrorVO;
import com.tracom.brt.domain.OpenAPI.OpenAPIService;
import com.tracom.brt.domain.OpenAPI.RoutInfoVO;
import com.tracom.brt.domain.OpenAPI.RoutNodeVO;

@RestController
@RequestMapping("/api/open/routInfoService")
public class RoutInfoServiceController extends BaseController {
	
	@Inject
	private OpenAPIService service;  

	/** 노선 리스트, 노선 정보 **/
	@GetMapping("/getRoutList")
    public Object getRoutList(@RequestParam(value="serviceKey", required=true, defaultValue="") String serviceKey) {
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes()).getRequest();
		
		if(serviceKey.equals("")) {
			ErrorVO result = service.returnParamError();
			service.insertApiLog(request, result.getResultCd(), result.getResultDetailCd());
			return result;
		}
		
		Map<String, Object> authResult = service.authKey(serviceKey, request);
		if(authResult.getOrDefault("resultCd", "FAIL").equals("SUCCESS")) {
			RoutInfoVO result = service.getRoutList();
			service.insertApiLog(request, result.getResultCd(), result.getResultDetailCd());
			return result;
		}else {
			service.insertApiLog(request, authResult.getOrDefault("resultCd", null).toString(), authResult.getOrDefault("resultDetailCd", null).toString());
			return authResult;
		}
	}
	
	
	/** 노선 별 경로 정보 **/
	@GetMapping("/getRoutNodeList")
    public Object getRoutNodeList(@RequestParam(value="routId", required=true, defaultValue="") String routId
    							, @RequestParam(value="serviceKey", required=true, defaultValue="") String serviceKey) {
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes()).getRequest();
		
		if(serviceKey.equals("") || routId.equals("")) {
			ErrorVO result = service.returnParamError();
			service.insertApiLog(request, result.getResultCd(), result.getResultDetailCd());
			return result;
		}
		
		Map<String, Object> authResult = service.authKey(serviceKey, request);
		if(authResult.getOrDefault("resultCd", "FAIL").equals("SUCCESS")) {
			RoutNodeVO result = service.getRoutNodeList(routId);
			service.insertApiLog(request, result.getResultCd(), result.getResultDetailCd());
			return result;
		}else {
			service.insertApiLog(request, authResult.getOrDefault("resultCd", null).toString(), authResult.getOrDefault("resultDetailCd", null).toString());
			return authResult;
		}
	}
	
	
	/** 노선 별 정류장 정보 **/
	@GetMapping("/getRoutStnList")
    public Object getRoutStnList(@RequestParam(value="routId", required=true, defaultValue="") String routId
    							, @RequestParam(value="serviceKey", required=true, defaultValue="") String serviceKey) {
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes()).getRequest();
		
		if(serviceKey.equals("") || routId.equals("")) {
			ErrorVO result = service.returnParamError();
			service.insertApiLog(request, result.getResultCd(), result.getResultDetailCd());
			return result;
		}
		
		Map<String, Object> authResult = service.authKey(serviceKey, request);
		if(authResult.getOrDefault("resultCd", "FAIL").equals("SUCCESS")) {
			RoutNodeVO result = service.getRoutStnList(routId);
			service.insertApiLog(request, result.getResultCd(), result.getResultDetailCd());
			return result;
		}else {
			service.insertApiLog(request, authResult.getOrDefault("resultCd", null).toString(), authResult.getOrDefault("resultDetailCd", null).toString());
			return authResult;
		}
	}
 
}
