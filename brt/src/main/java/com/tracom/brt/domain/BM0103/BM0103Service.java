package com.tracom.brt.domain.BM0103;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;

@Service
public class BM0103Service extends BaseService<VHCInfoVO, String> {
    @Inject
    private BM0103Mapper mapper;
    
    
    public List<VHCInfoVO> BM0103G0S0(RequestParams<VHCInfoVO> requestParams) {
        return mapper.BM0103G0S0(requestParams.getString("filter"));
    }

    public String BM0103F0I0(VHCInfoVO vo) {
    	mapper.BM0103F0I0(vo);
    	return vo.getVhcId();
    }
    
    public boolean BM0103F0U0(VHCInfoVO vo) {
    	if(mapper.BM0103F0U0(vo) > 0) {
    		return true;
    	} else {
    		return false;
    	}
    }
    
    public boolean BM0103G0D0(VHCInfoVO vo) {
    	if(mapper.BM0103G0D0(vo) > 0) {
    		return true;
    	} else {
    		return false;
    	}
    }
}