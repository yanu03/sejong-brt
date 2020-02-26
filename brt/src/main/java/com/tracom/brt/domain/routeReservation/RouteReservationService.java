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
		
		/**TODO:
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

		//노선 리스트, 노선별 파일명
		List<BmRoutInfoVO> routeList = rsvRouteList();
		String maxVersion = mapper.rsv_maxVersion();
		String routVer = "";
		
		//노선별 노드리스트
		for(BmRoutInfoVO vo : routeList) {
			//vo.setFileName(vo.getRoutId() + "_" + vo.getVersion() + "_" + vo.getDvcName() + "");
			vo.setNodeList(rsvRouteNode(vo));
		}
		
		List<BmRoutNodeInfoVO> stopList = rsvBusStopList();
		List<BmRoutNodeInfoVO> nodeList = rsvNodeList();
		
		
		try {
			//busstop.csv
			ftpHandler.uploadBusstop(stopList, "busstop.csv", routVer);
			
			//node.csv
			ftpHandler.uploadNodeList(nodeList, "node.csv", routVer);
			
			//routelist.csv
			ftpHandler.uploadRouteList(routeList, "routelist.csv", routVer);
			
			//노선별노드리스트.csv
			ftpHandler.uploadRouteNodeList(routeList, routVer);
			
			//노선 플레이리스트.csv
			VoiceOrganizationVO vo = new VoiceOrganizationVO();
			vo.setRoutId(routId);
			ftpHandler.uploadVoicePlayList(routId, mapper.selectVoiceOrganization(vo));
			
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		
		
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
