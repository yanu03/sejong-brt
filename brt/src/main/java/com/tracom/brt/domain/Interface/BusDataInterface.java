package com.tracom.brt.domain.Interface;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.net.HttpURLConnection;
import java.net.URL;

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

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;

@Service
public class BusDataInterface {

	public String INTERFACE_URL = "INTERFACE_URL";
	//공공데이터포털 API KEY
	public String API_KEY = "KEY_API";
	
	//버스노선 co_cd값
	public String INTER_ROUT_ID = "INTER_ROUT_ID";
		
	//공공데이터포털 버스노선 URL
	public String KEY_CODE_OPENAPI_ROUT_BUS = "IU004";
	
	//공공데이터포털 버스노선 KEY
    public String KEY_CODE_OPENAPI_ROUT_BUS_KEY = "KA001";
	
	public String BASE_URL_BUS = "http://openapi.tago.go.kr/openapi/service/BusLcInfoInqireService/getRouteAcctoBusLcList?cityCode=12&";
	
	//교통정보시스템 노선검색 URL
	
	
	public String interface_URL(String requestType, String baseUrl) {
		try {
			HttpResponse<String> response = null;
			if(requestType.equals("GET")) {
				response = Unirest.get(baseUrl).asString();
			}
			else if(requestType.equals("POST")) {
				response = Unirest.post(baseUrl).asString();				
			}
			
			return response.getBody();
			
		} catch (UnirestException e) {
			e.printStackTrace();
			return "false";
		}
	}
	//대기 파싱 
	public NodeList busInterface_XML(String inputUrl) {
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
		if(tag == null) {
			System.out.println("null");
			return null;
		} 
		NodeList nList = eElement.getElementsByTagName(tag).item(0).getChildNodes();
		Node node = (Node)nList.item(0);
		
		if(node == null) {
			System.out.println("node = null");
			return null;
		}
		return node.getNodeValue();
	}
		
}
