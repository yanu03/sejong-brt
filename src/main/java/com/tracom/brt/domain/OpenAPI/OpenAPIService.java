package com.tracom.brt.domain.OpenAPI;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.SM0109.ApiVO;
import com.tracom.brt.domain.SM0109.SM0109Mapper;

@Service
public class OpenAPIService extends BaseService<BusLocationVO, String> {
	
	@Inject
	private OpenAPIMapper mapper;
	
	@Inject
	private SM0109Mapper smMapper;
	
	public static String SUCCESS_CD = "SUCCESS";
	public static String NORMAL_CD = "00";
	
	public static String FAIL_CD = "FAIL";
	
	public static String SYSTEM_ERROR = "시스템 오류";
	public static String SYSTEM_ERROR_CD = "10";
	
	public static String KEY_EXPIRED = "만료된 인증키";
	public static String KEY_EXPIRED_CD = "11";
	
	public static String KEY_NOTFOUND = "존재하지 않는 인증키";
	public static String KEY_NOTFOUND_CD = "12";
	
	public static String IP_AUTHFAIL = "접근권한 없는 IP";
	public static String IP_AUTHFAIL_CD = "13";
	
	public static String API_AUTHFAIL = "접근권한 없는 API";
	public static String API_AUTHFAIL_CD = "14";
	
	private String salt = "tracom3452TRACOM#$%@";
	
	
	/** 버스 리스트 **/
	public BusListVO getBusList(String value){
		
		BusListVO result = new BusListVO();
		
		try {
			Map<String, Object> map = new HashMap<>();
			map.put("value", value);

			result.setResult(mapper.getBusList(map));
			result.setResultCd(SUCCESS_CD);
			result.setResultDetailCd(NORMAL_CD);
			return result;
			
		} catch (Exception e) {
			result.setResultCd(FAIL_CD);
			result.setResultDetailCd(SYSTEM_ERROR_CD);
			result.setErrMsg(SYSTEM_ERROR);
			return result;
		}
		
	}
	
	
	/** 선택 버스 위치정보 **/
	public BusLocationVO getBusLocation(String busNo) {
		
		BusLocationVO result = new BusLocationVO();
		
		try {
			result.setResult(mapper.getBusLocation(busNo));
			result.setResultCd(SUCCESS_CD);
			result.setResultDetailCd(NORMAL_CD);
		
			return result;

		} catch (Exception e) {
			result.setResultCd(FAIL_CD);
			result.setResultDetailCd(SYSTEM_ERROR_CD);
			result.setErrMsg(SYSTEM_ERROR);
			
			return result;
		
		}
	}
	
	/** 모든 버스 위치정보 **/
	public BusLocationListVO getAllBusLocation() {
		BusLocationListVO result = new BusLocationListVO();
		
		try {
			result.setResult(mapper.getAllBusLocation());
			result.setResultCd(SUCCESS_CD);
			result.setResultDetailCd(NORMAL_CD);
			return result;
		}catch(Exception e) {
			result.setResultCd(FAIL_CD);
			result.setResultDetailCd(SYSTEM_ERROR_CD);
			result.setErrMsg(SYSTEM_ERROR);
			return result;
		}
	}
	
	/** 모든 전기굴절버스 위치정보 **/
	public BusLocationListVO getAllElecBusLocation() {
		BusLocationListVO result = new BusLocationListVO();
		
		try {
			result.setResult(mapper.getAllElecBusLocation());
			result.setResultCd(SUCCESS_CD);
			result.setResultDetailCd(NORMAL_CD);
			return result;
		}catch(Exception e) {
			result.setResultCd(FAIL_CD);
			result.setResultDetailCd(SYSTEM_ERROR_CD);
			result.setErrMsg(SYSTEM_ERROR);
			return result;
		}
	}
	

	/** 모든 Cng버스 위치정보 **/
	public BusLocationListVO getAllCngBusLocation() {
		BusLocationListVO result = new BusLocationListVO();
		
		try {
			result.setResult(mapper.getAllCngBusLocation());
			result.setResultCd(SUCCESS_CD);
			result.setResultDetailCd(NORMAL_CD);
			return result;
		}catch(Exception e) {
			result.setResultCd(FAIL_CD);
			result.setResultDetailCd(SYSTEM_ERROR_CD);
			result.setErrMsg(SYSTEM_ERROR);
			return result;
		}
	}
	
	/** 위치정보 히스토리 **/
	public BusLocationListVO getBusLocationHistory(Map<String, Object> param) {
		BusLocationListVO result = new BusLocationListVO();
		
		try {
			result.setResult(mapper.getBusLocationHistory(param));
			result.setResultCd(SUCCESS_CD);
			result.setResultDetailCd(NORMAL_CD);
			return result;
		}catch(Exception e) {
			result.setResultCd(FAIL_CD);
			result.setResultDetailCd(SYSTEM_ERROR_CD);
			result.setErrMsg(SYSTEM_ERROR);
			return result;
		}
	}
	
	/** 노선 목록 조회 **/
	public RoutInfoVO getRoutList() {
		RoutInfoVO result = new RoutInfoVO();
		
		try {
			result.setResult(mapper.getRoutList());
			result.setResultCd(SUCCESS_CD);
			result.setResultDetailCd(NORMAL_CD);
			return result;
		}catch(Exception e) {
			result.setResultCd(FAIL_CD);
			result.setResultDetailCd(SYSTEM_ERROR_CD);
			result.setErrMsg(SYSTEM_ERROR);
			return result;
		}
	}
	
	/** 노선별 노드 목록 조회 **/
	public RoutNodeVO getRoutNodeList(String routId) {
		RoutNodeVO result = new RoutNodeVO();
		
		try {
			result.setResult(mapper.getRoutNode(routId));
			result.setResultCd(SUCCESS_CD);
			result.setResultDetailCd(NORMAL_CD);
			return result;
		}catch(Exception e) {
			result.setResultCd(FAIL_CD);
			result.setResultDetailCd(SYSTEM_ERROR_CD);
			result.setErrMsg(SYSTEM_ERROR);
			return result;
		}
	}
	
	/** 노선별 정류장 목록 조회 **/
	public RoutNodeVO getRoutStnList(String routId) {
		RoutNodeVO result = new RoutNodeVO();
		try {
			result.setResult(mapper.getRoutStn(routId));
			result.setResultCd(SUCCESS_CD);
			result.setResultDetailCd(NORMAL_CD);
			return result;
		}catch(Exception e) {
			result.setResultCd(FAIL_CD);
			result.setResultDetailCd(SYSTEM_ERROR_CD);
			result.setErrMsg(SYSTEM_ERROR);
			return result;
		}
	}
	
	/** 로깅  **/
	public void insertApiLog(HttpServletRequest request, String resultCd, String resultDetailCd)  {
		ApiLogVO vo = new ApiLogVO();
		vo.setEndPoint(request.getRequestURI());
		vo.setQuery(request.getQueryString());
		vo.setIp(getIp(request));
		vo.setResultCd(resultCd);
		vo.setResultDetailCd(resultDetailCd);
		
		try {
			mapper.insertApiLog(vo);
		} catch (Exception e) {
			return;
		}
	}
	
	/**
	 * 키 인증
	 * 키가 있는지 확인 후 정상적인접근인지 확인
	 * **/
	public Map<String, Object> authKey(String authKey, HttpServletRequest request) {
		List<ApiVO> list = smMapper.IfKeyExists(authKey);
		Map<String, Object> resultMap = new HashMap<>();
		String resultCd = FAIL_CD;
		
		if(list.size() > 0) { //호오오오오오옥시나 hash값이 같을수도있으니
			for(ApiVO vo : list) {
				boolean pmu = patternMatchUrl(request.getRequestURI(), vo.getApiEndPoint());
				boolean pmi = patternMatchIp(getIp(request), vo.getAllowedIp());
				boolean keyAlive = smMapper.KeyAlives(authKey);
				
				if(pmu && pmi) {
					if(keyAlive) {
						//SUCCESS
						resultCd = SUCCESS_CD;
						resultMap.put("resultDetailCd", NORMAL_CD);
						
					}else {
						//error : 키가 만료되었습니다.
						resultCd = FAIL_CD;
						resultMap.put("resultDetailCd", KEY_EXPIRED_CD);
						resultMap.put("msg", KEY_EXPIRED);
					}
					
				}else if(!pmu && pmi) {
					//api 접근권한이 없습니다.(uri)
					resultCd = FAIL_CD;
					resultMap.put("resultDetailCd", API_AUTHFAIL_CD);
					resultMap.put("msg", API_AUTHFAIL);
					
				}else if(pmu && !pmi) {
					//api 접근권한이 없습니다. (ip)
					resultCd = FAIL_CD;
					resultMap.put("resultDetailCd", IP_AUTHFAIL_CD);
					resultMap.put("msg", IP_AUTHFAIL);
					
				}else {
					//둘다없으면 다음꺼
					continue;
				}
			}
			
		}else {
			//error : key 인증 실패.
			resultCd = FAIL_CD;
			resultMap.put("resultDetailCd", KEY_NOTFOUND_CD);
			resultMap.put("msg", KEY_NOTFOUND);
		}

		resultMap.put("resultCd", resultCd);
		return resultMap;
	}
	
	//미사용
	public boolean patternMatchUrl(String requestUrl, String authenticatedUrl) {
		//실제 요청받은 uri
		String[] reqUrlArr = requestUrl.split("/");
		
		//auth있는 endpoint
		String[] authUrlArr = authenticatedUrl.split("/");
				
		return true;
	}
	
	public boolean patternMatchIp(String requestIp, String authenticatedIp) {
		String[] authIpArr = authenticatedIp.split("\\.");
		String[] reqIpArr = requestIp.split("\\.");
		
		int arrSize = authIpArr.length;
		
		boolean ipTF[] = new boolean[4];
		
		if(reqIpArr.length > 4) {
			return false;
		}
		
		for(int i = 0; i < arrSize; i++) {
			if(authIpArr[i].equals("*") || authIpArr[i] == "*") {
				ipTF[i] = true;
			}else if(authIpArr[i].equals(reqIpArr[i]) || authIpArr[i] == reqIpArr[i]) {
				ipTF[i] = true;
			}else {
				ipTF[i] = false;
			}
		}
		
		if(ipTF[0] && ipTF[1] && ipTF[2] && ipTF[3]) {
			return true;
		}else {
			return false;
		}
	}
	
	
	
	/** Get IP 
	 * IPv6를 반환함
	 * 개발시 IDE 설정
	 * 배포시 톰캣 설정 필요
	 * 로드밸런싱할경우 getRemoteAddr의 경우 로드밸런스IP를 반환하기때문에 헤더에서 찾음
	 * **/
	public String getIp(HttpServletRequest request) {

        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null) {
            ip = request.getHeader("HTTP_CLIENT_IP");
        }
        if (ip == null) {
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
        }
        if (ip == null) {
          	ip = request.getRemoteAddr();
        }
		return ip;
	}
	
	/**
	 * 키 생성 
	 * SHA256 해시
	 * ip
	 * salt = tracomKey & endPoint 
	 *  **/
	public String makeHash(String ip, String endPoint) {
		MessageDigest md = null;
		String salt2 = endPoint;
		String salt3 = String.valueOf(Math.random());
		String msg = ip + salt + salt2 + salt3;
		
		String result = "";
		try {
			md = MessageDigest.getInstance("SHA-256");
			md.update(msg.getBytes());
			byte msgByte[] = md.digest();
			StringBuffer sb = new StringBuffer();
			
			for(int i = 0; i < msgByte.length; i++) {
				sb.append(Integer.toString((msgByte[i]&0xff) + 0x100, 16).substring(1));
			}
			
			result = sb.toString();
			
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
			result = null;
		}
		
		return result;
	}
	
}