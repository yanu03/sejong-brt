package com.tracom.brt.domain.routeReservation;

import java.io.IOException;
import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.BM0104.BmRoutInfoVO;
import com.tracom.brt.domain.BM0104.BmRoutNodeInfoVO;
import com.tracom.brt.domain.BM0405.VoiceOrganizationVO;
import com.tracom.brt.handler.FTPHandler;

@Service
public class RouteReservationService extends BaseService<RouteReservationVO, String> {

	@Inject
	private RouteReservationMapper mapper;
	
	@Inject
	private FTPHandler ftpHandler;
	
	/** 노선 예약 **/
	public void makeRouteFile(String routId) {
		//노선 리스트, 노선별 파일명
		List<BmRoutInfoVO> routeList = rsvRouteList();
		String maxVersion = mapper.rsv_maxVersion();
		
		//노선별 노드리스트
		for(BmRoutInfoVO vo : routeList) {
			//vo.setFileName(vo.getRoutId() + "_" + vo.getVersion() + "_" + vo.getDvcName() + "");
			vo.setNodeList(rsvRouteNode(vo));
		}
		
		List<BmRoutNodeInfoVO> stopList = rsvBusStopList();
		List<BmRoutNodeInfoVO> nodeList = rsvNodeList();
		
		
		try {
			//busstop_version.csv
			ftpHandler.uploadBusstop(stopList, "busstop_" + maxVersion + ".csv");
			
			//node_version.csv
			ftpHandler.uploadNodeList(nodeList, "node_" + maxVersion + ".csv");
			
			//routelist.csv
			ftpHandler.uploadRouteList(routeList, "routelist.csv");
			
			//노선별노드리스트.csv
			ftpHandler.uploadRouteNodeList(routeList);
			
			//노선 플레이리스트.csv
			VoiceOrganizationVO vo = new VoiceOrganizationVO();
			vo.setRoutId(routId);
			ftpHandler.uploadVoicePlayList(routId, mapper.selectVoiceOrganization(vo));
			
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		
		//TODO
		//1. FTPHANDLER에 엑셀파일을 받아서 
		//routelist가 완성되었음
	}
	
	/** 노선 리스트, 노선별 파일명쿼리 (routelist.csv) **/
	public List<BmRoutInfoVO> rsvRouteList() {
		return mapper.rsv_routelist();
	}
	
	/** 모든 노드 리스트쿼리 (nodelist.csv) **/
	public List<BmRoutNodeInfoVO> rsvNodeList() {
		return mapper.rsv_nodelist();
	}
	
	/** 모든 정류장, 음성 노드 리스트쿼리 (busstoplist.csv) **/
	public List<BmRoutNodeInfoVO> rsvBusStopList() {
		return mapper.rsv_busstoplist();
	}
	
	/** 노선별 노드 리스트쿼리 (seq순, 노선파일명.csv) **/
	public List<BmRoutNodeInfoVO> rsvRouteNode(BmRoutInfoVO vo) {
		return mapper.rsv_routenode(vo);
	}
}
