package com.tracom.brt.domain.BM0901;


import java.util.List;

import javax.inject.Inject;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;

@EnableScheduling
@Service
public class BM0901Service extends BaseService<ElecRouterVO, String>{

	@Inject
	private BM0901Mapper mapper;
	
    public List<ElecRouterVO> BM0901G0S0(RequestParams<ElecRouterVO> requestParams) {
        return mapper.BM0901G0S0(requestParams.getString("filter"));
    }
    
    public String BM0901G0I0(ElecRouterVO vo) {
    	int result = mapper.BM0901G0I0(vo);
    	return vo.getSetId();
    }
    
    public boolean BM0901G0U0(ElecRouterVO vo) {
    	int result = mapper.BM0901G0U0(vo);
    	return result(result);
    }
    
    public boolean BM0901G0D0(ElecRouterVO vo) {
    	int result = mapper.BM0901G0D0(vo);
    	return result(result);
    }
    
    public boolean result(int i) {
    	if(i > 0) {
    		return true;
    	}
    	else {
    		return false;
    	}
    }
}
