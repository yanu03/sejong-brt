package com.tracom.brt.domain.routeReservation;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import com.tracom.brt.domain.BM0104.BmRoutInfoVO;
import com.tracom.brt.domain.BM0104.BmRoutNodeInfoVO;

public interface RouteReservationMapper extends MyBatisMapper {
	
	/** 노선 리스트, 노선별 파일명 (routelist.csv) **/
	public List<BmRoutInfoVO> rsv_routelist();
	
	/** 모든 노드 리스트 (nodelist.csv) **/
	public List<BmRoutNodeInfoVO> rsv_nodelist();
	
	/** 모든 정류장, 음성 노드 리스트 (busstoplist.csv) **/
	public List<BmRoutNodeInfoVO> rsv_busstoplist();
	
	/** 노선별 노드 리스트(seq순, 노선파일명.csv) **/
	public List<BmRoutNodeInfoVO> rsv_routenode(BmRoutInfoVO vo);
	
	/** 최신 버전 **/
	public String rsv_maxVersion();
}
