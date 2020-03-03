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
    
    /** 노선 연계 **/
    @Transactional
    public void interfaceRout(List<BmRoutInfoVO> voList){

    	//volist는 갱신모달에 뜨는 데이터이다
    	//이전과의 변경점 : 연계노선으로 업데이트하기 때문에 여러개의 데이터가 업데이트될 수 있다.
    	//갱신순서
    	//1. 테이블에서  routId와 매칭되는 interRoutId가 있는지 리스트를 받아온다
    	//1-1 없다면 삽입 후, 교통정보시스템에서 데이터를 받아와 업데이트하고 마무리
    	//1-2 있다면 해당 interRoutId의 정보를 업데이트하고 마무리
    	
    	//갱신할 노선 만큼
    	for(BmRoutInfoVO vo : voList) {
    		//기본 설정
    		String baseUrl = "http://bis.sejong.go.kr/web/traffic/searchBusRouteDetail.do?busRouteId=";
    		String json = di.interface_URL("POST", baseUrl + vo.getRoutId());
    		
    		
    		//1. 매칭되는 interRoutId가 있는지 리스트를 받아온다
    		List<BmRoutInfoVO> routIdList = mapper.getRoutIdByinterId(vo);

    		//삽입된 노선이 있다면?
    		if(routIdList.size() > 0 ) {
				//기본정보 업데이트
				mapper.updateRout(vo);
				//추가정보 업데이트
				mapper.BM0104G0U2(di.parseJson_RouteInfo(json));
    		}
    		//삽입된 노선이 없다면?
    		else {
    			//인서트
    			mapper.insertRout(vo);
    			//첫 삽입이니 유저 정보까지 업데이트필요 
    			mapper.BM0104G0U0(di.parseJson_RouteInfo(json));
    		}
    	}
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