package com.tracom.brt.domain.BM0105;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.BM0104.BmRoutInfoVO;
import com.tracom.brt.domain.Interface.DataInterface;
import com.tracom.brt.domain.SM0105.CommonCodeDetailInfoVO;
import com.tracom.brt.domain.SM0105.SM0105Mapper;

@Service
public class BM0105Service extends BaseService<BmStaInfoVO, String> {
    @Inject
    private BM0105Mapper mapper;
    
    @Inject
    private SM0105Mapper codeMapper;
    
    @Inject
    private DataInterface di;
    
    public List<BmStaInfoVO> BM0105G1S0(RequestParams<BmStaInfoVO> requestParams) {
    	Map<String, String> map = new HashMap<>();
    	map.put("filter", requestParams.getString("filter"));
    	map.put("routId", requestParams.getString("routId"));
        return mapper.BM0105G1S0(map);
    }

    @Transactional
    public void BM0105G0U0(List<BmRoutInfoVO> requestParams) {
    	
    	CommonCodeDetailInfoVO codeVO = new CommonCodeDetailInfoVO();
    	codeVO.setCoCd(di.INTERFACE_URL);
    	codeVO.setDlCd(di.URL_CODE_OPENAPI_ROUT_STA);
    	CommonCodeDetailInfoVO codeVO2 = codeMapper.SM0105G1S1(codeVO);
    	
    	String baseUrl = codeVO2.getRemark();
    	
    	codeVO.setCoCd(di.API_KEY);
    	codeVO.setDlCd(di.KEY_CODE_OPENAPI_ROUT);
    	codeVO2 = codeMapper.SM0105G1S1(codeVO);
    	
    	String apiKey = codeVO2.getRemark();
    	String url = "";
    	String routId;
    	
    	for(BmRoutInfoVO vo : requestParams) {
    		routId = "SJB" + vo.getRoutId();
    		url = baseUrl + "serviceKey=" + apiKey + "&cityCode=12&routeId="+ routId;
    		int seq = 1;
    		BmStaInfoVO inputVO = new BmStaInfoVO();
    		
    		NodeList nodeList = di.interface_XML(url);
    		
    		
    		System.out.println("-=-------------------------------=-");
    		System.out.println(routId);
    		for(int i = 0; i < nodeList.getLength(); i++) {
    			BmStaInfoVO tmp = new BmStaInfoVO();
    			Node child = nodeList.item(i);

    			//한 노선 안의 정류장 리스트 vo
    			List<BmStaInfoVO> staList = new ArrayList<>();
    			
    			//한 노선의 정류장 파싱
    			if(child.getNodeType() == Node.ELEMENT_NODE) {
    				Element eElement = (Element)child;
    				tmp.setRoutId(routId.substring(3));
    				tmp.setStaId(di.getTagValue("nodeid", eElement).substring(3));
    				tmp.setStaNm(di.getTagValue("nodenm", eElement));
    				tmp.setStaNo(di.getTagValue("nodeno", eElement));
    				tmp.setLati(Float.valueOf(di.getTagValue("gpslati", eElement)));
    				tmp.setLongi(Float.valueOf(di.getTagValue("gpslong", eElement)));
    				tmp.setSeq(seq);
    				staList.add(tmp);
    				seq++;
    			}
    			//staList 인서트쿼리 예정
    			System.out.println(staList);
    			inputVO.setVoList(staList);
    			int cnt = mapper.BM0105G1I0(inputVO);
    			//mergeinto로 정류장에 넣어둠
    			staList.clear();
    		}
    	}
    	//1.rout_id 리스트를 이용해서 xml 불러옴
    	//2.xml 파싱해서 순서대로 인서트
    	//3.인서트한 노선 정보 리스트에 저장함
    	//4.반환
    }

}