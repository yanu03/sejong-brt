package com.tracom.brt.domain.routeReservation;

import java.io.IOException;
import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
		
		/**
		 * 
		 * 00. route/routeId/playlist 빈폴더 생성/
		 * 0. 노선ID를 이용, ROUT_INFO 테이블의 PUBDATE,PUBSEQ를 조회 후 
		 * 		- PUBDATE가 NULL
		 * 			오늘날짜, 00으로 초기화
		 * 		- PUBDATE가 오늘이면
		 * 			PUBSEQ+1
		 * 		- PUBDATE가 오늘이 아니면
		 * 			PUBDATE 오늘날짜 PUBSEQ = 00
		 * 
		 * 1. 앞서얻은 버전을 이용, BUSSTOP.CSV파일에 ADD
		 * 2. 앞서 얻은 버전을 이용, BUSSTOP.CSV파일에 ADD
		 * 3. 노선아이디를 이용해 ROUT_RESULT 테이블 조회 후 CSV파일 생성 (ROUTID.CSV파일)
		 * 4. 앞서 얻은 버전을 받아감. ROUTLIST.CSV파일을 불러와 VO 리스트로 만듬
		 * 		같은 아이디가 있다면 새로운 내용을 SET하여 CSV파일 새로 갱신
		 * 		같은 아이디가 없다면 새로운 ROW로 추가
		 * **/
		
		
		//노선정보 쿼리
		BmRoutInfoVO routInfo = rsv_routInfo(routId);
		
		
		//노선id 받아서 노드 리스트 생성
		List<BmRoutNodeInfoVO> routeNodeList = rsvRouteNode(routId);
		
		//정류장리스트 생성
		List<BmRoutNodeInfoVO> stopList = rsvBusStopList();
		//노드리스트 생성
		List<BmRoutNodeInfoVO> nodeList = rsvNodeList();
		
		
		try {
			//01. playlist폴더가 없다면 playlist 폴더 생성
			ftpHandler.makeDir(routId);
			
			//02. ver 생성
			String routVer = newVersion(routInfo);
			String maxVer = mapper.rsv_getMaxVersion();
			//03. busstop.csv 파일 생성
			ftpHandler.uploadBusstop(stopList, "busstop.csv", maxVer);
			
			//04. node.csv 파일 생성
			ftpHandler.uploadNodeList(nodeList, "node.csv", maxVer);
			
			//05. 노선.csv 파일 생성
			ftpHandler.uploadRouteNodeList(routeNodeList, routId, routVer);
			
			RoutListCSVVO newRow = mapper.rsv_routListRow(routId);
			//06. routlist.csv 파일 생성
			ftpHandler.uploadRouteList(routId, "routelist.csv", routVer, maxVer, newRow);
			
			
			//노선 플레이리스트.csv
			VoiceOrganizationVO vo = new VoiceOrganizationVO();
			vo.setRoutId(routId);
			ftpHandler.uploadVoicePlayList(routId, mapper.selectVoiceOrganization(vo));
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
	
	/**노선 삭제 시 route폴더 내 노선 삭제
	 * @throws IOException **/
	@Transactional
	public void deleteRoute(BmRoutInfoVO vo) throws IOException {
		//01. route/routemap/routelist.csv 내 row 삭제
		String maxVer = mapper.rsv_getMaxVersion();
		
		if(maxVer == null) {
			maxVer = "00000000";
		}
		ftpHandler.deleteRouteList(vo.getRoutId(), maxVer);
		//02. route/routemap/노선명.csv 삭제
		//03. route/노선명 폴더 삭제
		ftpHandler.deleteRoutemap(vo.getRoutId());
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
	public List<BmRoutNodeInfoVO> rsvRouteNode(String routId) {
		return mapper.rsv_routenode(routId);
	}
	
	/** 노선 정보 쿼리 **/
	public BmRoutInfoVO rsv_routInfo(String routId) {
		return mapper.rsv_routInfo(routId);
	}
	

	/** 버전정보를 구해보자 **/
	public String newVersion(BmRoutInfoVO vo) {
		String routId = vo.getRoutId();
		String version;
		//없으면 넣고
		//있으면 
		if(vo.getPubDate() == null || vo.getPubSeq() == null) {
			mapper.rsv_startPub(routId);
		}else{
			if(vo.getFlag().equals("TRUE")) {
				mapper.rsv_addPubSeq(routId);
			}else {
				mapper.rsv_startPub(routId);
			}
		}
		version = mapper.rsv_getVersion(routId);
		return version;
	}
	
	
	
}
