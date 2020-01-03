package com.tracom.brt.domain.BM0105;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;

@Service
public class BM0105Service extends BaseService<BmStaInfoVO, String> {
    @Inject
    private BM0105Mapper mapper;
    
    
    public List<BmStaInfoVO> BM0105G0S0(RequestParams<BmStaInfoVO> requestParams) {
        return mapper.BM0105G0S0(requestParams.getString("filter"));
    }

    public String BM0105F0I0(BmStaInfoVO vo) {
    	mapper.BM0105F0I0(vo);
    	return vo.getStaId();
    }
    
    public boolean BM0105F0U0(BmStaInfoVO vo) {
    	if(mapper.BM0105F0U0(vo) > 0) {
    		return true;
    	} else {
    		return false;
    	}
    }
    
    public boolean BM0105G0D0(BmStaInfoVO vo) {
    	if(mapper.BM0105G0D0(vo) > 0) {
    		return true;
    	} else {
    		return false;
    	}
    }
}