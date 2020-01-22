package com.tracom.brt.domain.BM0107;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

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
    
    public int BM0107G1I0(List<BmRoutInfoVO> requestParams) {
    	String baseUrl = "http://bis.sejong.go.kr/web/traffic/searchBusRouteDetail.do?busRouteId=";
    	DataInterface dif = new DataInterface();
    	int returnCount = 0;
    	int count;
    	int delCnt;
    	count = requestParams.size();
    	for(BmRoutInfoVO routVO : requestParams) {
    		//0. 이전 경로 삭제
    		System.out.println(routVO);
    		delCnt = mapper_107.BM0107G1D0(routVO);
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
			
			if(j == 0) {
				tmp = Integer.valueOf(route_ord);
			}
			
			if(tmp != Integer.valueOf(route_ord)){
				tmp = Integer.valueOf(route_ord);
				continue;
			}
			
			vo.setNodeNm(route_id + "_" + route_ord + "_" + ord);
			vo.setLati(lati);
			vo.setLongi(longi);
			vo.setSeq(i*100);
			vo.setRoutId(route_id);
			vo.setStaId(null);

			resultList.add(vo);
			i++;
			
		}
		return resultList;
	}
    
    public List<BmRoutNodeInfoVO> insertSta(List<BmRoutNodeInfoVO> nodeList, List<BmRoutNodeInfoVO> staList) {
    	List<BmRoutNodeInfoVO> resultList = new ArrayList<>();
    	for(BmRoutNodeInfoVO sta : staList) {
    		int seq = 0;
    		int forseq = 0;
    		LocationVO resultVO = new LocationVO();
    		LocationVO tmpVO = new LocationVO();
    		resultVO.setDistance(999999999);
    		for(int i = 0; i < nodeList.size()-1; i++) {
    			tmpVO = insertNode.getDistanceToLine(sta.getLongi(), sta.getLati(), nodeList.get(i).getLongi()
    					, nodeList.get(i).getLati(), nodeList.get(i+1).getLongi(), nodeList.get(i+1).getLati());
    			if(tmpVO != null && tmpVO.getDistance() < resultVO.getDistance()) {
    				resultVO = tmpVO;
    				seq = (nodeList.get(i).getSeq() + nodeList.get(i+1).getSeq())/2;
    				forseq = i+1;
    			}	
    		}
    		sta.setSeq(seq);
    		nodeList.add(forseq, sta);
    	}
    	
    	return nodeList;
    	
    }
}