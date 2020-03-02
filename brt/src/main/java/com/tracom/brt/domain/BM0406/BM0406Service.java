package com.tracom.brt.domain.BM0406;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.BM0103.VHCInfoVO;
import com.tracom.brt.domain.BM0104.BmRoutInfoVO;
import com.tracom.brt.domain.BM0405.VoiceOrganizationVO;
import com.tracom.brt.domain.routeReservation.RouteReservationService;

@Service
public class BM0406Service extends BaseService<VoiceOrganizationVO, String> {
	@Inject
	private BM0406Mapper mapper;
	
	@Inject
	private RouteReservationService service;
	
	public List<VHCInfoVO> BM0406G1S0(RequestParams<BmRoutInfoVO> requestParams) {
		return mapper.BM0406G1S0();
	}
	
	@Transactional
	public void BM0406G1I0(Map<String, Object> param) {
		List<Map<String, Object>> routeList = (List<Map<String, Object>>) param.get("routeList");
		
		for(Map<String, Object> route : routeList) {
			service.makeRouteFile(route.get("routId").toString());
		}
		mapper.insertVoiceReservation(param);
		mapper.insertVoiceReservationResult(param);
	}
}