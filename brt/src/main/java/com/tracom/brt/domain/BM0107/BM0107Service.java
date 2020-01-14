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

@Service
public class BM0107Service extends BaseService<BmRoutInfoVO, String> {
    @Inject
    private BM0107Mapper mapper_107;
    
    @Inject
    private BM0104Mapper mapper_104;
    
    
    public List<BmRoutInfoVO> BM0107G0S0(RequestParams<BmRoutInfoVO> requestParams) {
        return mapper_107.BM0107G0S0(requestParams.getString("filter"));
    }
    
    public List<BmRoutNodeInfoVO> BM0107G1S0(RequestParams<BmRoutNodeInfoVO> requestParams) {
    	HashMap<String, String> map = new HashMap<String, String>();
    	map.put("routId", requestParams.getString("routId"));
    	map.put("filter1", requestParams.getString("filter1"));
        return mapper_107.BM0107G1S0(map);
    }
    
    public int BM0107G1I0() {
    	String baseUrl = "http://bis.sejong.go.kr/web/traffic/searchBusRouteDetail.do?busRouteId=";
    	DataInterface dif = new DataInterface();
    	int return_count = 0;
    	int count;
    	List<BmRoutInfoVO> routList = mapper_104.BM0104G0S0("");
    	count = routList.size();
    	for(BmRoutInfoVO routVo : routList) {
    		String json = dif.interface_URL("POST", baseUrl + routVo.getRoutId()); 
    		parseJson_RouteNode(json);
    		BmRoutNodeInfoVO vo = new BmRoutNodeInfoVO();
    		vo.setVoList(parseJson_RouteNode(json));
    		if(mapper_107.BM0107G1I0(vo) > 0) {
    			return_count++;
    		}
    	}
    	
    	if(return_count == count) {
    		return 1;
    	}
    	else {
    		return 0;
    	}
    }
    
    
    public List<BmRoutNodeInfoVO> parseJson_RouteNode(String jsonString) {
		JsonParser Parser = new JsonParser();
		JsonObject jsonObj = (JsonObject) Parser.parse(jsonString);
		JsonArray busRouteDetailMapVoList = (JsonArray) jsonObj.get("busRouteDetailMapVoList");
		
		int i=1;
		List<BmRoutNodeInfoVO> result = new ArrayList<BmRoutNodeInfoVO>();
		
		for(Object o : busRouteDetailMapVoList) {
			BmRoutNodeInfoVO vo = new BmRoutNodeInfoVO();
			JsonObject ob = (JsonObject)o;
			String route_ord = ob.get("route_ord").toString().replace("\"", "");
			String ord = ob.get("ord").toString().replace("\"", "");
			String route_id = ob.get("route_id").toString().replace("\"", "");
			float lati = Float.valueOf(ob.get("lat").toString().replace("\"", ""));
			float longi = Float.valueOf(ob.get("lng").toString().replace("\"", ""));
			
			vo.setNodeNm(route_id + "_" + route_ord + "_" + ord);
			vo.setLati(lati);
			vo.setLongi(longi);
			vo.setSeq(i*100);
			vo.setRoutId(route_id);
			vo.setStaId(null);

			result.add(vo);
			i++;
		}
		return result;
	}
}