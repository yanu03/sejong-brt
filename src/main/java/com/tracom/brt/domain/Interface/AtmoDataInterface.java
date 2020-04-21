package com.tracom.brt.domain.Interface;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
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
public class AtmoDataInterface {

	public String LINK_SET = "LINK_SET";
	//공공데이터포털 API KEY
	public String API_KEY = "KEY_API";
	
	//공공데이터포털 대기검색 URL
	public String URL_CODE_OPENAPI_ROUT_ATMO = "CD041";
	
	//공공데이터포털 대기검색 KEY
	public String KEY_CODE_OPENAPI_ROUT_ATMO = "CD042";
	
	//공공데이터포털 기상검색 URL
	public String URL_CODE_OPENAPI_ROUT_WEAT = "CD039";
		
	//공공데이터포털 기상검색 KEY
	public String KEY_CODE_OPENAPI_ROUT_WEAT = "CD040";
	
	public String NEWS_UPDATE_COUNT = "CD043";
	
	public String BASE_URL_ATMO = "http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?numOfRows=999&pageNo=1&sidoName=세종&ver=1.3";
	
	//교통정보시스템 노선검색 URL
	
	public String atmoInterface(String routId) {
		String baseUrl = "http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?numOfRows=999&pageNo=1&sidoName=세종&ver=1.3";
		return interface_URL("POST", baseUrl);
	}
	
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
            return null;
        }
	}
	
	//기상 파싱
	public NodeList weatInterface_XML(String inputUrl) {
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

            XPathExpression expr = xpath.compile(".//data");
            NodeList nodeList = (NodeList) expr.evaluate(doc, XPathConstants.NODESET);
            
            return nodeList;
         
        } catch (Exception e) {
            return null;
        }
	}
	
	//뉴스 파싱
	public NodeList newsInterface_XML(String inputUrl) throws ParserConfigurationException {
		BufferedReader br = null;
		BufferedReader brr = null;
		//DocumentBuilderFactory 생성
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		factory.setNamespaceAware(true);
		DocumentBuilder builder = factory.newDocumentBuilder();
		Document doc = null;
        try {
        	doc = builder.parse(inputUrl);
        	XPathFactory xpathFactory = XPathFactory.newInstance();
        	XPath xpath = xpathFactory.newXPath();
        	XPathExpression expr = xpath.compile("//channel/item");
        	NodeList nodeList = (NodeList) expr.evaluate(doc, XPathConstants.NODESET);
        	return nodeList;
            
        	
        	//OpenApi호출
        	
            /*필요없는코든데...왜이렇게??
            URL url = new URL(inputUrl);
            HttpURLConnection urlconnection = (HttpURLConnection) url.openConnection();
            
            //응답 읽기
            br = new BufferedReader(new InputStreamReader(urlconnection.getInputStream(), "EUC-KR"));
            
            String result = "";
            String line;
            while ((line = br.readLine()) != null) {
                result = result + line.trim();// result = URL로 XML을 읽은 값
            }
            
            // xml 파싱하기
            String result_utf = "";
            String line_utf;
            int idx = result.indexOf(">");
            String resultSet = result.substring(0, idx+1);
            System.out.println(resultSet);
            
            if(resultSet.contains("utf-8") || resultSet.contains("UTF-8")) {
            	URL urlUtf = new URL(inputUrl);
                HttpURLConnection urlconnectionUtf = (HttpURLConnection) urlUtf.openConnection();
//            	brr = new BufferedReader(new InputStreamReader(urlconnectionUtf.getInputStream(), "UTF-8"));
            	brr = new BufferedReader(new InputStreamReader(urlUtf.openStream(), StandardCharsets.UTF_8));
            	
            	while ((line_utf = brr.readLine()) != null) {
            		result_utf = result_utf + line_utf.trim();// result = URL로 XML을 읽은 값
                }
            	
            	
            	InputSource is = new InputSource(new StringReader(result_utf));
            	doc = builder.parse(inputUrl);
            	XPathFactory xpathFactory = XPathFactory.newInstance();
            	XPath xpath = xpathFactory.newXPath();
            	XPathExpression expr = xpath.compile("//channel/item");
            	System.out.println(expr.toString());
            	NodeList nodeList = (NodeList) expr.evaluate(doc, XPathConstants.NODESET);
            	return nodeList;
            }else {           	
            	InputSource is = new InputSource(new StringReader(result));
            	doc = builder.parse(is);
            	XPathFactory xpathFactory = XPathFactory.newInstance();
            	XPath xpath = xpathFactory.newXPath();
            	
            	XPathExpression expr = xpath.compile("//channel/item");
            	NodeList nodeList = (NodeList) expr.evaluate(doc, XPathConstants.NODESET);
            	return nodeList;
            }
		*/
         
        } catch (Exception e) {
            return null;
        }
	}
	
	public static String getTagValue(String tag, Element eElement) {
		if(tag == null) {
			return null;
		} 
		NodeList nList = eElement.getElementsByTagName(tag).item(0).getChildNodes();
		Node node = (Node)nList.item(0);
		
		if(node == null) {
			return null;
		}
		return node.getNodeValue();
	}
	
}
