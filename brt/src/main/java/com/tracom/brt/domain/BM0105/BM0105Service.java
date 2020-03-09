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
import com.tracom.brt.domain.BM0104.BmRoutNodeInfoVO;
import com.tracom.brt.domain.BM0107.BM0107Mapper;
import com.tracom.brt.domain.BM0107.BM0107Service;
import com.tracom.brt.domain.Interface.DataInterface;
import com.tracom.brt.domain.SM0105.CommonCodeDetailInfoVO;
import com.tracom.brt.domain.SM0105.SM0105Mapper;

@Service
public class BM0105Service extends BaseService<BmStaInfoVO, String> {
    @Inject
    private BM0105Mapper mapper;
    
    @Inject
    private BM0107Mapper BM0107Mapper;
    
    @Inject
    private SM0105Mapper codeMapper;
    
    @Inject
    private BM0107Service BM0107Service;
    
    @Inject
    private DataInterface di;
    
    public List<BmStaInfoVO> BM0105G1S0(RequestParams<BmStaInfoVO> requestParams) {
    	Map<String, String> map = new HashMap<>();
    	map.put("filter", requestParams.getString("filter"));
    	map.put("routId", requestParams.getString("routId"));
        return mapper.BM0105G1S0(map);
    }

    //정류장 연계
    @Transactional
    public List<String> BM0105G0U0(List<BmRoutInfoVO> requestParams) {
    	List<String> resultList = new ArrayList<>();
    	
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
    	
    	for(BmRoutInfoVO vo : requestParams) {//노선에 걸리는 for문
    		routId = "SJB" + vo.getInterRoutId();
    		url = baseUrl + "serviceKey=" + apiKey + "&cityCode=12&routeId="+ routId;
    		int seq = 1;
    		BmStaInfoVO inputVO = new BmStaInfoVO();
    		List<BmStaInfoVO> staList = new ArrayList<>();
    		
    		NodeList nodeList = di.interface_XML(url);
    		
    		for(int i = 0; i < nodeList.getLength(); i++) { //노선별 정류장에 걸리는 for문
    			BmStaInfoVO tmp = new BmStaInfoVO();
    			Node child = nodeList.item(i);

    			//한 노선의 정류장 parse
    			if(child.getNodeType() == Node.ELEMENT_NODE) {
    				Element eElement = (Element)child;
    				tmp.setRoutId(vo.getRoutId()/*routId.substring(3)*/);
    				tmp.setStaId(di.getTagValue("nodeid", eElement).substring(3));
    				tmp.setStaNm(di.getTagValue("nodenm", eElement));
    				tmp.setStaNm(di.getTagValue("nodenm", eElement));
    				tmp.setStaNo(di.getTagValue("nodeno", eElement));
    				tmp.setLati(Float.valueOf(di.getTagValue("gpslati", eElement)));
    				tmp.setLongi(Float.valueOf(di.getTagValue("gpslong", eElement)));
    				tmp.setSeq(seq);
    				staList.add(tmp);
    				seq++;
    			}
    			//staList 인서트쿼리 예정
    		}
    		
    		//첫번째 정류장과 마지막 정류장이 같은 경우 (순환노선)
    		//첫번째 정류장 삭제
    		if(staList.size() > 0) {
	    		if(staList.get(0).getStaId().equals(staList.get(staList.size()-1).getStaId())) {
	    			staList.remove(0);
	    		}
    		}
    		
    		inputVO.setVoList(staList);

    		if(staList.size() > 0) {
	    		//삽입,업데이트 정류장갯수
	    		mapper.BM0105G1D0(vo.getRoutId());
	    		//route-station
	    		int RScnt = mapper.BM0105G1I0(inputVO);
	    		//station info
	    		int SIcnt = mapper.BM0105G1I1(inputVO);
	    		
	    		//TODO: name 테이블에 넣어줄것임
	    		BmStaInfoVO tmpVO = new BmStaInfoVO();
	    		tmpVO.setVoList(staList);
	    		List<BmStaInfoVO> newStaList = mapper.getNewStaList(tmpVO);
	    		
	    		resultList.add(vo.getRoutId());
    		}
    		//staList.clear();

    		//정류장리스트 바아옴
    		finalFusion(vo, mapper.getNodeList(vo), mapper.getStaList(vo));
    	}
    	
    	
    	return resultList;
    }
    
    //정류장 + 노선경로
    @Transactional
    public void finalFusion(BmRoutInfoVO routVO, List<BmRoutNodeInfoVO> nodeList, List<BmRoutNodeInfoVO> staList) {
		//노드리스트+정류장리스트
    	List<BmRoutNodeInfoVO> voList = new ArrayList<>();
    	BmRoutNodeInfoVO insertVO = new BmRoutNodeInfoVO();
    	int returnCount = 0;
    	
		voList = BM0107Service.insertSta(nodeList, staList);
		insertVO.setVoList(voList);
		
		BM0107Mapper.BM0107G1D0(routVO);
		//인서트쿼리
		
		if(BM0107Mapper.BM0107G1I0(insertVO) > 0) {
			returnCount++;
		}
		
		//result테이블에 추가
		Map<String, String> map = new HashMap<>();
		map.put("routId", routVO.getRoutId());
		
		List<BmRoutNodeInfoVO> nodeStaList = BM0107Mapper.BM0107G1S0(map);
		List<BmRoutNodeInfoVO> audioList = BM0107Mapper.BM0107G4S0(routVO);
		List<BmRoutNodeInfoVO> finalList = BM0107Service.insertSta(nodeStaList, audioList);
		
		//result테이블 삭제
		BM0107Mapper.BM0107G3D0(routVO);
		
		//RESULT테이블에 추가
		BmRoutNodeInfoVO finalVO = new BmRoutNodeInfoVO();
		finalVO.setVoList(finalList);
		
		BM0107Mapper.BM0107G3I1(finalVO);
		
    }

}