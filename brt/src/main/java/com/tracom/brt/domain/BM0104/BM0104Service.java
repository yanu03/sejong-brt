package com.tracom.brt.domain.BM0104;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.Interface.DataInterface;
import com.tracom.brt.domain.SM0105.CommonCodeDetailInfoVO;
import com.tracom.brt.domain.SM0105.SM0105Mapper;

@Service
public class BM0104Service extends BaseService<BmRoutInfoVO, String> {
    @Inject
    private BM0104Mapper mapper;
    
    @Inject
    private SM0105Mapper mapper_0105;
    
    @Inject
    private DataInterface di;
    
    public List<BmRoutInfoVO> BM0104G0S0(RequestParams<BmRoutInfoVO> requestParams) {
        return mapper.BM0104G0S0(requestParams.getString("filter"));
    }
    
   
    public List<BmRoutInfoVO> BM0104G1S0(RequestParams<BmRoutInterfaceVO> requestParams){
    	CommonCodeDetailInfoVO codeVO = new CommonCodeDetailInfoVO();
    	codeVO.setCoCd(di.INTERFACE_URL);
    	codeVO.setDlCd(di.URL_CODE_OPENAPI_ROUT);
    	CommonCodeDetailInfoVO codeVO2 = mapper_0105.SM0105G1S1(codeVO);
    	
    	
    	String baseUrl = codeVO2.getRemark();
    	
    	codeVO.setCoCd(di.API_KEY);
    	codeVO.setDlCd(di.KEY_CODE_OPENAPI_ROUT);
    	codeVO2 = mapper_0105.SM0105G1S1(codeVO);
    	
    	String apiKey = codeVO2.getRemark();
    	
    	String routNo = "";
    	if(requestParams.getString("filter") == null) {
    	}else {
    		routNo = requestParams.getString("filter");
    	}
    	
    	String url = baseUrl + "cityCode=12&routeNo=" + routNo + "&serviceKey=" + apiKey;

    	NodeList nodeList = di.interface_XML(url);
    	
    	List<BmRoutInfoVO> voList = new ArrayList<>();
    	
    	for (int i = 0; i < nodeList.getLength(); i++) {
    		BmRoutInfoVO tmp = new BmRoutInfoVO();
    		Node child = nodeList.item(i);
            if(child.getNodeType() == Node.ELEMENT_NODE) {
            	Element eElement = (Element)child;
            	tmp.setRoutId(di.getTagValue("routeid", eElement).substring(3));
            	tmp.setRoutNm(di.getTagValue("routeno", eElement));
            	tmp.setStStaNm(di.getTagValue("startnodenm", eElement));
            	tmp.setEdStaNm(di.getTagValue("endnodenm", eElement));
            	voList.add(tmp);
            }
        }
    	return voList;
    }
    
    @Transactional
    public String BM0104G0U0(List<BmRoutInfoVO> voList){
    	
    	//1. voList를 삽입함
    	BmRoutInfoVO insertVO = new BmRoutInfoVO();
    	insertVO.setVoList(voList);
    	int result1 = mapper.BM0104G0I0(insertVO);

    	String baseUrl = "http://bis.sejong.go.kr/web/traffic/searchBusRouteDetail.do?busRouteId=";
    	
    	BmRoutInfoVO resultVO = new BmRoutInfoVO();
    	List<BmRoutInfoVO> resultList = new ArrayList<>();
    	//2. for(routId : voList) 교통정보시스템에서 가져와서 연계함
    	int resultCnt = 0;
    	int update = 0;
    	String resultString = "";
    	for(BmRoutInfoVO vo : voList) {
    		//vo.getRoutId();
    		//이걸로 교통정보시스템이랑 연계할거임
    		String json = di.interface_URL("POST", baseUrl + vo.getRoutId());
    		String _div = mapper.BM0104G1S2(vo);
    		System.out.println(_div);
    		if(_div == null) {
    			update = mapper.BM0104G0U0(di.parseJson_RouteInfo(json));
    		}else {
    			update = mapper.BM0104G0U2(di.parseJson_RouteInfo(json));
    		}
    		if(update == 1) {
    			resultList.add(vo);
    			
    			resultString = resultString + vo.getRoutNm() + " (" + vo.getInterRoutId() + ")" + "\n";
    			resultCnt++;
    		}
    	}
    	String result = "갱신 노선 : " + resultCnt + "개\n" + resultString; 
    	//return resultList;
    	return result;
    }
    
    public String BM0104G0U2(List<BmRoutInfoVO> voList) {
    	BmRoutInfoVO updateVO = new BmRoutInfoVO();
    	updateVO.setVoList(voList);
    	int result = mapper.BM0104G0U2(updateVO);
    	return String.valueOf(result);
    }
    
    /** 연계노선아이디가 이미 있는지 확인 **/
    public boolean BM0104F0S1(BmRoutInfoVO vo) {
    	if(mapper.BM0104F0S1(vo) > 0) {
    		return false;
    	}else {
    		return true;
    	}
    }
    
    public String BM0104F0I0(BmRoutInfoVO vo) {
    	mapper.BM0104F0I0(vo);
    	return vo.getRoutId();
    }
    
    public int BM0104F0U0(BmRoutInfoVO vo) {
    	return mapper.BM0104F0U0(vo);
    }
    
    public int BM0104F0D0(BmRoutInfoVO vo) {
    	return mapper.BM0104F0D0(vo);
    }
}