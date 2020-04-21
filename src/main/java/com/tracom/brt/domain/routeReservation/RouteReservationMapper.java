package com.tracom.brt.domain.routeReservation;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import com.tracom.brt.domain.BM0104.BmRoutInfoVO;
import com.tracom.brt.domain.BM0104.BmRoutNodeInfoVO;
import com.tracom.brt.domain.BM0405.VoiceOrganizationVO;
import com.tracom.brt.domain.voice.VoiceInfoVO;

public interface RouteReservationMapper extends MyBatisMapper {
	
	/** 노선 리스트, 노선별 파일명 (routelist.csv) **/
	public List<BmRoutInfoVO> rsv_routelist();
	
	/** 모든 노드 리스트 (nodelist.csv) **/
	public List<BmRoutNodeInfoVO> rsv_nodelist();
	
	/** 모든 정류장, 음성 노드 리스트 (busstoplist.csv) **/
	public List<BmRoutNodeInfoVO> rsv_busstoplist();
	
	/** 노선별 노드 리스트(seq순, 노선파일명.csv) **/
	public List<BmRoutNodeInfoVO> rsv_routenode(String value);
	
	/** 노선 정보 **/
	public BmRoutInfoVO rsv_routInfo(String value);
	
	/** routelist.csv에 들어갈 row 셀렉트 **/
	public RoutListCSVVO rsv_routListRow(String value);
	
	/** getMaxVersion **/
	public String rsv_getMaxVersion();
	
	//버전관련
	/** 버전 새로 발행 **/
	public int rsv_startPub(String value);
	public int rsv_addPubSeq(String value);
	public String rsv_getVersion(String value);
	
	/** 음성 **/
	List<VoiceOrganizationVO> selectVoiceOrganization(VoiceOrganizationVO param);
	List<VoiceInfoVO> selectVoiceOrganizationVoiceList(VoiceOrganizationVO param);
}
