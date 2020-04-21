package com.tracom.brt.domain.BM0803;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.Interface.BusDataInterface;
import com.tracom.brt.domain.SM0105.CommonCodeDetailInfoVO;
import com.tracom.brt.domain.SM0105.SM0105Mapper;

@Service
public class BM0803Service extends BaseService<MapVO, String>{

	@Inject
	private BM0803Mapper mapper;
	
	@Inject
	private SM0105Mapper mapper_0105;
	
	@Inject
	private BusDataInterface bi;
	
	public List<MapVO> BM0803G0S0(RequestParams<MapVO> requestParams) {
		return mapper.BM0803G0S0(requestParams.getString("filter"));
	}
	
	//현재 공공데이터포털에서 가져오는 버스위치정보 파싱
	public List<MapVO> BM0803G1S0(MapVO requestParams) {
		
		System.out.println("803");
		System.out.println(requestParams);
		CommonCodeDetailInfoVO codeVO = new CommonCodeDetailInfoVO();
    	codeVO.setCoCd(bi.INTERFACE_URL);
    	codeVO.setDlCd(bi.KEY_CODE_OPENAPI_ROUT_BUS);
    	CommonCodeDetailInfoVO codeVO2 = mapper_0105.SM0105G1S1(codeVO);
    	   	
    	String baseUrl = codeVO2.getRemark();
    			
		codeVO.setCoCd(bi.API_KEY); 
		codeVO.setDlCd(bi.KEY_CODE_OPENAPI_ROUT_BUS_KEY);
		codeVO2= mapper_0105.SM0105G1S1(codeVO);
    	
    	String apiKey = codeVO2.getRemark();
    	
    	codeVO.setCoCd(bi.INTER_ROUT_ID);
    	
    	
    	List<MapVO> list = new ArrayList<MapVO>();
    	
		String url = baseUrl +"&routeId=SJB" + requestParams.getRoutId() + "&serviceKey=" + apiKey;
		System.out.println(url);
		//String url = baseUrl +"&routeId="+ listCode.get(i).getTxtVal1() +"&serviceKey=" + apiKey;
		NodeList nodeList = bi.busInterface_XML(url);
		
		//파싱 tag값 가져오는 for문
		for(int j = 0; j<nodeList.getLength(); j++) {
			MapVO vo = new MapVO();
			Node child = nodeList.item(j);
			if(child.getNodeType() == Node.ELEMENT_NODE) {
				Element eElement = (Element)child;           	
				vo.setLati(bi.getTagValue("gpslati", eElement));
				vo.setLongi(bi.getTagValue("gpslong", eElement));
				vo.setNodeId(bi.getTagValue("nodeid", eElement));
				vo.setRoutNm(bi.getTagValue("routenm", eElement));
				vo.setVhcNo(bi.getTagValue("vehicleno", eElement));
				
				list.add(vo);
			}
		}
		return list;
	}
}
