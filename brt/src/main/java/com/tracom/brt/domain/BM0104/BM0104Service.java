package com.tracom.brt.domain.BM0104;

import java.util.HashMap;
import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;

@Service
public class BM0104Service extends BaseService<BmRoutInfoVO, String> {
    @Inject
    private BM0104Mapper mapper;
    
    
    public List<BmRoutInfoVO> BM0104G0S0(RequestParams<BmRoutInfoVO> requestParams) {
        return mapper.BM0104G0S0(requestParams.getString("filter"));
    }
    
    public List<BmRoutNodeInfoVO> BM0104G1S0(RequestParams<BmRoutNodeInfoVO> requestParams) {
    	HashMap<String, String> map = new HashMap<String, String>();
    	map.put("routId", requestParams.getString("routId"));
    	map.put("filter1", requestParams.getString("filter1"));
        return mapper.BM0104G1S0(map);
    }

}