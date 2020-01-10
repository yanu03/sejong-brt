package com.tracom.brt.domain.BM0104;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;


public class DataInterface {

	public String routeNodeInterface(String routId) {
		String baseUrl = "http://bis.sejong.go.kr/web/traffic/searchBusRouteDetail.do?busRouteId=";
		try {
			HttpResponse<String> response = Unirest.post(baseUrl + routId).asString();
			parseJson_RouteNode(response.getBody());
			return response.getBody();
		} catch (UnirestException e) {
			e.printStackTrace();
			return "false";
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
