package com.tracom.brt.domain.routeReservation;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.BM0104.BmRoutInfoVO;
import com.tracom.brt.domain.BM0104.BmRoutNodeInfoVO;

@Service
public class RouteReservationService extends BaseService<RouteReservationVO, String> {
	@Inject
	private RouteReservationMapper mapper;
	
	/** 노선 예약 **/
	public void rsv_route() {
		
	}
	
	/** 노선 리스트, 노선별 파일명쿼리 (routelist.csv) **/
	public BmRoutInfoVO rsv_routelist() {
		return mapper.rsv_routelist();
	}
	
	/** 모든 노드 리스트쿼리 (nodelist.csv) **/
	public BmRoutNodeInfoVO rsv_nodelist() {
		return mapper.rsv_nodelist();
	}
	
	/** 모든 정류장, 음성 노드 리스트쿼리 (busstoplist.csv) **/
	public BmRoutNodeInfoVO rsv_busstoplist() {
		return mapper.rsv_busstoplist();
	}
	
	/** 노선별 노드 리스트쿼리 (seq순, 노선파일명.csv) **/
	public BmRoutNodeInfoVO rsv_routenode(BmRoutInfoVO vo) {
		return mapper.rsv_routenode(vo);
	}
}
