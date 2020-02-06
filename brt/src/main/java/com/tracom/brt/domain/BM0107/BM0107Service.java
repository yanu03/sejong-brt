package com.tracom.brt.domain.BM0107;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.chequer.axboot.core.parameter.RequestParams;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.BM0104.BM0104Mapper;
import com.tracom.brt.domain.BM0104.BmRoutInfoVO;
import com.tracom.brt.domain.BM0104.BmRoutNodeInfoVO;
import com.tracom.brt.domain.Interface.DataInterface;
import com.tracom.brt.domain.Interface.InsertNode;
import com.tracom.brt.domain.Interface.LocationVO;

@Service
public class BM0107Service extends BaseService<BmRoutInfoVO, String> {
    @Inject
    private BM0107Mapper mapper_107;
    
    @Inject
    private BM0104Mapper mapper_104;
    
    @Inject
    private InsertNode insertNode;
    
    public List<BmRoutInfoVO> BM0107G0S0(RequestParams<BmRoutInfoVO> requestParams) {
        return mapper_107.BM0107G0S0(requestParams.getString("filter"));
    }
    
    public List<BmRoutNodeInfoVO> BM0107G1S0(RequestParams<BmRoutNodeInfoVO> requestParams) {
    	HashMap<String, String> map = new HashMap<String, String>();
    	map.put("routId", requestParams.getString("routId"));
    	map.put("filter1", requestParams.getString("filter1"));
        return mapper_107.BM0107G1S0(map);
    }
    
    @Transactional
    public int BM0107G1I0(List<BmRoutInfoVO> requestParams) {
    	String baseUrl = "http://bis.sejong.go.kr/web/traffic/searchBusRouteDetail.do?busRouteId=";
    	DataInterface dif = new DataInterface();
    	int returnCount = 0;
    	int count;
    	int delCnt;
    	count = requestParams.size();
    	for(BmRoutInfoVO routVO : requestParams) {
    		//0. 이전 경로 삭제->이전경로 trash 테이블로 이동
    		//delCnt = mapper_107.BM0107G1D0(routVO);
    		
    		//trash 삭제
    		mapper_107.BM0107G2D0(routVO);
    		//trash로 옮기고
    		mapper_107.BM0107G2I0(routVO);
    		//삭제
    		mapper_107.BM0107G1D0(routVO);

    		
    		
    		String json = dif.interface_URL("POST", baseUrl + routVO.getRoutId()); 
    		
    		parseJsonRouteNode(json);
    		BmRoutNodeInfoVO insertVO = new BmRoutNodeInfoVO();
    		
    		List<BmRoutNodeInfoVO> voList = new ArrayList<>();
    		//1.노드리스트생성
    		List<BmRoutNodeInfoVO> nodeList = parseJsonRouteNode(json);
    		//2.정류장리스트생성
    		List<BmRoutNodeInfoVO> staList = mapper_107.BM0107M0S0(routVO);

    		//노드리스트+정류장리스트
    		voList = insertSta(nodeList, staList);
    		insertVO.setVoList(voList);
    		
    		//인서트쿼리
    		if(mapper_107.BM0107G1I0(insertVO) > 0) {
    			returnCount++;
    		}
    		//result테이블에 추가
    		Map<String, String> map = new HashMap<>();
    		map.put("routId", routVO.getRoutId());
    		List<BmRoutNodeInfoVO> nodeStaList = mapper_107.BM0107G1S0(map);
    		List<BmRoutNodeInfoVO> audioList = mapper_107.BM0107G4S0(routVO);
    		List<BmRoutNodeInfoVO> finalList = insertSta(nodeStaList, audioList);
    		
    		//result테이블 삭제
    		mapper_107.BM0107G3D0(routVO);
    		
    		//RESULT테이블에 추가
    		BmRoutNodeInfoVO finalVO = new BmRoutNodeInfoVO();
    		finalVO.setVoList(finalList);
    		for(BmRoutNodeInfoVO vo : finalList) {
    			System.out.println(vo);
    		}
    		mapper_107.BM0107G3I1(finalVO);
    		
    		
    	}
    	
    	
    	if(returnCount == count) {
    		return 1;
    	}
    	else {
    		return 0;
    	}
    }
    
    
    public List<BmRoutNodeInfoVO> parseJsonRouteNode(String jsonString) {
		JsonParser Parser = new JsonParser();
		JsonObject jsonObj = (JsonObject) Parser.parse(jsonString);
		JsonArray busRouteDetailMapVoList = (JsonArray) jsonObj.get("busRouteDetailMapVoList");
		
		int i=1;
		int tmp = 0;
		float tmpLati = 0;
		float tmpLongi = 0;
		
		List<BmRoutNodeInfoVO> resultList = new ArrayList<>();

		for(int j = 0; j < busRouteDetailMapVoList.size(); j++) {//
			BmRoutNodeInfoVO vo = new BmRoutNodeInfoVO();
			Object o = busRouteDetailMapVoList.get(j);//
			JsonObject ob = (JsonObject)o;
			
			String route_ord = ob.get("route_ord").toString().replace("\"", "");
			String ord = ob.get("ord").toString().replace("\"", "");
			String route_id = ob.get("route_id").toString().replace("\"", "");
			float lati = Float.valueOf(ob.get("lat").toString().replace("\"", ""));
			float longi = Float.valueOf(ob.get("lng").toString().replace("\"", ""));
			int nodeType = 1;
			if(j == 0) {
				tmp = Integer.valueOf(route_ord);
			}
			
			if(tmp != Integer.valueOf(route_ord)){
				tmp = Integer.valueOf(route_ord);
				continue;
			}
			if(tmpLati == lati && tmpLongi == longi) {
				
			}
			else {				
			vo.setNodeNm(route_id + "_" + route_ord + "_" + ord);
			vo.setLati(lati);
			vo.setLongi(longi);
			vo.setSeq(i*100);
			vo.setRoutId(route_id);
			vo.setStaId(null);
			vo.setNodeType(nodeType);
			resultList.add(vo);
			i++;
			}
			
			tmpLati = lati;
			tmpLongi = longi;
		}
		return resultList;
	}
    
    public List<BmRoutNodeInfoVO> insertSta(List<BmRoutNodeInfoVO> nodeList, List<BmRoutNodeInfoVO> staList) {
    	//정류장 갯수만큼 for문 돌릴거임
    	for(BmRoutNodeInfoVO sta : staList) {
    		sta.setNodeType(30);
    		int seq = 0;
    		int flag = 0;
    		int forseq = 0;
    		LocationVO resultVO = new LocationVO();
    		LocationVO tmpVO = new LocationVO();
    		resultVO.setDistance(999999999);
    		/*    		
    		for(int i = 0; i < nodeList.size()-1; i++) {
    			//링크마다 거리 계산함. 정류장이 링크에 직교하는점이 있으면 그 점 반환, 없으면 null 반환
    			tmpVO = insertNode.getDistanceToLine(sta.getLongi(), sta.getLati(),
    					nodeList.get(i).getLongi(),	nodeList.get(i).getLati(),
    					nodeList.get(i+1).getLongi(), nodeList.get(i+1).getLati()	);
    		
    			
    			//만약 직교한다면
    			if(tmpVO != null) {
    				//가장 짧은값이라면
    				if(tmpVO.getDistance() < resultVO.getDistance()) {
    					//바꿔치기함
    					resultVO = tmpVO;
    					//시퀀스는 전노드랑 다음노드의 평균으로 함
    					seq = (nodeList.get(i).getSeq() + nodeList.get(i+1).getSeq())/2;
    					//forseq는 리스트에 삽입할 순서
    					forseq = i+1;
    				}
    			}
    		}
    		sta.setSeq(seq);
    		
    		nodeList.add(forseq, sta);
    		 */
    		int shortestNodeSeq = 0;
    		double shortestNodeDst = 999999999;
    		for(int i = 0; i < nodeList.size() - 1; i++) {
    			//노드마다 거리 계산할것임
    			double tmp = insertNode.getDistanceBetween(sta.getLongi(), sta.getLati(), nodeList.get(i).getLongi(), nodeList.get(i).getLati());
    			//가장 가까운 노드 순서
    			if(tmp < shortestNodeDst) {
    				shortestNodeDst = tmp;
    				shortestNodeSeq = i;
    			}
    		}
    		    		
    		for(int j = -2; j < 2; j++) {
    			if(shortestNodeSeq + j >= nodeList.size() -1) {
    				break;
    			}
    			tmpVO = insertNode.getDistanceToLine(sta.getLongi(), sta.getLati(),
    					nodeList.get(shortestNodeSeq+j).getLongi(),	nodeList.get(shortestNodeSeq+j).getLati(),
    					nodeList.get(shortestNodeSeq+j+1).getLongi(), nodeList.get(shortestNodeSeq+j+1).getLati());
    			
    			//만약 직교한다면
    			if(tmpVO != null) {
    				//가장 짧은값이라면
    				if(tmpVO.getDistance() < resultVO.getDistance()) {
    					//바꿔치기함
    					resultVO = tmpVO;
    					//시퀀스는 전노드랑 다음노드의 평균으로 함
    					seq = (nodeList.get(shortestNodeSeq+j).getSeq() + nodeList.get(shortestNodeSeq+j+1).getSeq())/2;
    					//forseq는 리스트에 삽입할 순서
    					forseq = shortestNodeSeq+j+1;
    					flag = 1;
    				}
    			}
    		}
	    	if(flag == 0) {
    			seq = 0;
    		}
    		sta.setSeq(seq);
    		
    		nodeList.add(forseq, sta);
    		
    	}//정류장for end
    	
    	return nodeList;
    	
    }
}