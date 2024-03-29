package com.tracom.brt.domain.BM0601;


import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.jdo.annotations.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.Interface.AtmoDataInterface;
import com.tracom.brt.domain.SM0105.CommonCodeDetailInfoVO;
import com.tracom.brt.domain.SM0105.SM0105Mapper;
import com.tracom.brt.domain.file.FileService;

@EnableScheduling
@Service
public class BM0601Service extends BaseService<WeatAtmoVO, String>{
	
	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Inject
	private BM0601Mapper mapper;
	
	@Inject
	private SM0105Mapper mapper_0105;
	
	@Inject
	private AtmoDataInterface ai;
	
	@Transactional
	public List<WeatAtmoVO> BM0601F0S0(RequestParams<WeatAtmoVO> requestParams) {
		return mapper.BM0601F0S0(requestParams.getString("measDt"));
	}

	public List<WeatAtmoVO> BM0601G1S0(RequestParams<WeatAtmoVO> requestParams) {		
		return mapper.BM0601G1S0(requestParams.getString("filter"));
	}

	public List<WeatAtmoVO> BM0601G1S1(RequestParams<WeatAtmoVO> requestParams) {
		return mapper.BM0601G1S1(requestParams.getString("filter"));
	}

	public List<WeatAtmoVO> BM0601G2S1(RequestParams<WeatAtmoVO> requestParams) {
		return mapper.BM0601G2S1(requestParams.getString("filter"));
	}

	public List<WeatAtmoVO> BM0601F0S1(RequestParams<WeatAtmoVO> requestParams) {
		return mapper.BM0601F0S1(requestParams.getString("filter"));
	}

	public List<WeatAtmoVO> BM0601M0S0(RequestParams<WeatAtmoVO> requestParams) {
		return mapper.BM0601M0S0(requestParams.getString("filter"));
	}

	@Transactional
	public String BM0601M0I0(WeatAtmoVO request) {
		Map<String, String> weatApiKey = new HashMap<>();
		Map<String, String> atmoApiKey = new HashMap<>();
		
		weatApiKey.put("weatApiKey" , request.getWeatApiKey());
		atmoApiKey.put("atmoApiKey" , request.getAtmoApiKey());
		
		mapper.BM0601M0U3(weatApiKey);
		mapper.BM0601M0U4(atmoApiKey);
		
		return request.getDvcId();
	}
	
	@Scheduled(cron="0 5 5-23,0 * * *")
	public void NewAtmoScheduler() {
		/* 대기 */	
		CommonCodeDetailInfoVO codeVO = new CommonCodeDetailInfoVO();
    	codeVO.setCoCd(ai.LINK_SET);
    	codeVO.setDlCd(ai.URL_CODE_OPENAPI_ROUT_ATMO);
    	CommonCodeDetailInfoVO codeVO2 = mapper_0105.SM0105G1S1(codeVO);
    	   	
    	String baseUrl = codeVO2.getRemark();

    	
		codeVO.setCoCd(ai.LINK_SET); 
		codeVO.setDlCd(ai.KEY_CODE_OPENAPI_ROUT_ATMO);
		codeVO2= mapper_0105.SM0105G1S1(codeVO);
    	
    	String apiKey = codeVO2.getRemark();
    	
    	try {
			baseUrl = encodeURIStandard(baseUrl);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
    	
    	String url = baseUrl + "&serviceKey=" + apiKey;

    	NodeList nodeList = ai.interface_XML(url);
    	
    	
    	WeatAtmoVO vo = new WeatAtmoVO();
    	
    	
    	//파싱 tag값 가져오는 for문
    	for(int i = 0; i<nodeList.getLength(); i++) {
    		Node child = nodeList.item(i);
            if(child.getNodeType() == Node.ELEMENT_NODE) {
            	Element eElement = (Element)child;           	
            	if(ai.getTagValue("stationName", eElement).equals("아름동")) {
            		vo.setMeasDt(ai.getTagValue("dataTime", eElement));
            		vo.setSdc(ai.getTagValue("so2Value", eElement));
            		vo.setCmc(ai.getTagValue("coValue", eElement));
            		vo.setOzonec(ai.getTagValue("o3Value", eElement));
            		vo.setNdc(ai.getTagValue("no2Value", eElement));
            		vo.setDustc(ai.getTagValue("pm10Value", eElement));
            		vo.setSDustc(ai.getTagValue("pm25Value", eElement));
            	}
            }
    	}
    	List<WeatAtmoVO> measDtCk = mapper.BM0601F0S0(vo.getMeasDt());
    	if(measDtCk.size() != 0) {
    		if(!measDtCk.get(0).getMeasDt().substring(0, measDtCk.get(0).getMeasDt().length()-5).equals(vo.getMeasDt())) {
    			mapper.BM0601F0I0(vo);
    		}else {
    			System.out.println("발표시간이 중복되었습니다.");
    		}    		
    	}else {
    		mapper.BM0601F0I0(vo);
    	}
		/* 대기 */  	   	
	}
	
	@Scheduled(cron="0 5 5-23,0 * * *")
	public void NewWeatScheduler() {
		/* 기상 */
		 CommonCodeDetailInfoVO codeVO = new CommonCodeDetailInfoVO();
		 WeatAtmoVO weatVO = new WeatAtmoVO();
		 WeatAtmoVO weatCheckVO = new WeatAtmoVO();
		 codeVO.setCoCd(ai.LINK_SET);
		 SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		 Date time = new Date();
		 String notiDate = dateFormat.format(time);
		 codeVO.setDlCd(ai.URL_CODE_OPENAPI_ROUT_WEAT); 
		 CommonCodeDetailInfoVO weatCodeVO = mapper_0105.SM0105G1S1(codeVO);
		 codeVO.setCoCd("SKY_COND");
		 List<CommonCodeDetailInfoVO> skyCheckVO = mapper_0105.SM0105G1S2(codeVO);
		 
		 String waetBaseUrl = weatCodeVO.getRemark();
		 
		 try {
			waetBaseUrl = encodeURIStandard(waetBaseUrl);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		  
		 NodeList weatList = ai.weatInterface_XML(waetBaseUrl);
		 
			 Node child = weatList.item(0); 
			 if(child.getNodeType() == Node.ELEMENT_NODE) {
				 Element eElement = (Element)child; 				 
					 weatVO.setNotiDt(ai.getTagValue("hour", eElement));
					 int notiDatetime = Integer.parseInt(weatVO.getNotiDt());
					 int checkNotiDt = notiDatetime-3;
					 int checkSky = 0;
					 int checkPty = 0;
					 String notiDt;
					 String skyCheck;
					 if(checkNotiDt < 10) {
						 String finalNotiDt = "0"+String.valueOf(checkNotiDt);						
						 notiDt = notiDate.substring(0, 11)+finalNotiDt+":00:00";
						 weatVO.setNotiDt(notiDt);
					 }else {
						 notiDt = notiDate.substring(0, 11)+checkNotiDt+":00:00";
						 weatVO.setNotiDt(notiDt);
					 }
					 
					 weatVO.setTempc(ai.getTagValue("temp", eElement));
					 weatVO.setTempHigh(ai.getTagValue("tmx", eElement));
					 weatVO.setTempMini(ai.getTagValue("tmn", eElement));
					 if((checkSky = Integer.parseInt(ai.getTagValue("sky", eElement))) + (checkPty =Integer.parseInt(ai.getTagValue("pty", eElement))) < 5) {
						 for(int i =0; i<skyCheckVO.size(); i++) {
							 skyCheck = String.valueOf(skyCheckVO.get(i).getNumVal4()).substring(0, 1);
							 if(skyCheck.equals(ai.getTagValue("sky", eElement))) {
								 weatVO.setSkyCond(skyCheckVO.get(i).getDlCd());
							 	}	
						 	}
					 } else {
						 for(int i = 0; i<skyCheckVO.size(); i++) {
							 skyCheck = String.valueOf(skyCheckVO.get(i).getNumVal4()).substring(0, 1);
							 if(skyCheck.equals(ai.getTagValue("pty", eElement))) {
								 weatVO.setSkyCond(skyCheckVO.get(i+4).getDlCd());
							 }
						 }
					 }
					 weatVO.setRainPro(ai.getTagValue("pop", eElement));
					 weatVO.setRainFall(ai.getTagValue("r12", eElement));
					 weatVO.setHumi(ai.getTagValue("reh", eElement));				 	
			 
			 weatCheckVO = mapper.BM0601F0S2("filter");
			 if(!weatCheckVO.getNotiDt().substring(0, weatCheckVO.getNotiDt().length()-2).equals(weatVO.getNotiDt())) {
				 mapper.BM0601F0I1(weatVO);				 
			 }
		     
		/* 기상 */		
	    }
	}

	public List<WeatAtmoVO> BM0601G2S2(RequestParams<WeatAtmoVO> requestParams) {
		return mapper.BM0601G2S2(requestParams.getString("filter"));
	}
	
    public String encodeURIStandard(String strURI) throws UnsupportedEncodingException {

        return URLEncoder.encode(strURI, "UTF-8")
                .replace("%3A", ":")
                .replace("%2F", "/")
                .replace("%3D", "=")
                .replace("%2B", "+")
                .replace("%26", "&")
                .replace("%3F", "?");

    }
}
