package com.tracom.brt.domain.Interface;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpression;
import javax.xml.xpath.XPathFactory;

import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import com.tracom.brt.domain.BM0104.BmRoutInfoVO;
import com.tracom.brt.domain.BM0104.BmRoutNodeInfoVO;

@Service
public class DataInterface {
	
	public String INTERFACE_URL = "INTERFACE_URL";
	public String API_KEY = "KEY_API";
	
	//공공데이터포털 노선검색 URL
	public String URL_CODE_OPENAPI_ROUT = "IU002";
	public String URL_CODE_OPENAPI_ROUT_STA = "IU003";
	
	//공공데이터포털 노선검색 KEY
	public String KEY_CODE_OPENAPI_ROUT = "KA001";
	
	//교통정보시스템 노선검색 URL
	
	/** 노선, 정류장, 노드 **/
	public String routeNodeInterface(String routId) {
		String baseUrl = "http://bis.sejong.go.kr/web/traffic/searchBusRouteDetail.do?busRouteId=";
		String url = baseUrl + routId;
		return interface_URL("POST", url);
	}
	
	public String interface_URL(String requestType, String url) {
		try {
			HttpResponse<String> response = null;
			if(requestType.equals("GET")) {
				response = Unirest.get(url).asString();
			}
			else if(requestType.equals("POST")) {
				response = Unirest.post(url).asString();				
			}
			
			return response.getBody();
			
		} catch (UnirestException e) {
			e.printStackTrace();
			return "false";
		}
	}
	
	public NodeList interface_XML(String inputUrl) {
		BufferedReader br = null;
		//DocumentBuilderFactory 생성
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		factory.setNamespaceAware(true);
		DocumentBuilder builder;
		Document doc = null;
        try {
            //OpenApi호출
            
            URL url = new URL(inputUrl);
            HttpURLConnection urlconnection = (HttpURLConnection) url.openConnection();
            
            //응답 읽기
            br = new BufferedReader(new InputStreamReader(urlconnection.getInputStream(), "UTF-8"));
            String result = "";
            String line;
            while ((line = br.readLine()) != null) {
                result = result + line.trim();// result = URL로 XML을 읽은 값
            }
            
            // xml 파싱하기
            InputSource is = new InputSource(new StringReader(result));
            builder = factory.newDocumentBuilder();
            doc = builder.parse(is);
            XPathFactory xpathFactory = XPathFactory.newInstance();
            XPath xpath = xpathFactory.newXPath();

            XPathExpression expr = xpath.compile("//items/item");
            NodeList nodeList = (NodeList) expr.evaluate(doc, XPathConstants.NODESET);
            
            return nodeList;
         
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
	}
	
	public static String getTagValue(String tag, Element eElement) {
		NodeList nList = eElement.getElementsByTagName(tag).item(0).getChildNodes();
		
		Node node = (Node)nList.item(0);
		if(node == null) {
			return null;
		}
		return node.getNodeValue();
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
	
	public BmRoutInfoVO parseJson_RouteInfo(String jsonString) {
		JsonParser Parser = new JsonParser();
		JsonObject jsonObj = (JsonObject) Parser.parse(jsonString);
		JsonArray busRouteDetailList = (JsonArray) jsonObj.get("busRouteDetailList");
		
		BmRoutInfoVO vo = new BmRoutInfoVO();
		
		JsonObject ob = (JsonObject)busRouteDetailList.get(0);

		String routId	= ob.get("route_id").toString().replace("\"", "");
		String routNm	= ob.get("route_name").toString().replace("\"", "");
		String wayDiv	= ob.get("route_direction").toString().replace("\"", "");
		String turnDiv	= ob.get("turn_useflag").toString().replace("\"", "");

		vo.setRoutId(routId);
		vo.setRoutNm(routNm);
		vo.setWayDiv(wayDiv);
		vo.setTurnDiv(turnDiv);
		
		return vo;
	}
	
	
	
	
}
