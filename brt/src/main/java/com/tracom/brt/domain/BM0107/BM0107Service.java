package com.tracom.brt.domain.BM0107;

import java.util.HashMap;
import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.BM0104.BmRoutInfoVO;
import com.tracom.brt.domain.BM0104.BmRoutNodeInfoVO;
import com.tracom.brt.domain.BM0104.DataInterface;

@Service
public class BM0107Service extends BaseService<BmRoutInfoVO, String> {
    @Inject
    private BM0107Mapper mapper;
    
    
    public List<BmRoutInfoVO> BM0107G0S0(RequestParams<BmRoutInfoVO> requestParams) {
        return mapper.BM0107G0S0(requestParams.getString("filter"));
    }
    
    public List<BmRoutNodeInfoVO> BM0107G1S0(RequestParams<BmRoutNodeInfoVO> requestParams) {
    	HashMap<String, String> map = new HashMap<String, String>();
    	map.put("routId", requestParams.getString("routId"));
    	map.put("filter1", requestParams.getString("filter1"));
        return mapper.BM0107G1S0(map);
    }
    
    public int BM0107G1I0(String routId) {
    	DataInterface dif = new DataInterface();
    	String json = dif.routeNodeInterface(routId);
    	//List<BmRoutNodeInfoVO> list = dif.parseJson_RouteNode(json);
    	BmRoutNodeInfoVO vo = new BmRoutNodeInfoVO();
    	vo.setVoList(dif.parseJson_RouteNode(json));
    	return mapper.BM0107G1I0(vo);
    }

}