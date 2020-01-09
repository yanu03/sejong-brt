package com.tracom.brt.domain.BM0104;

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

    public String BM0104F0I0(BmRoutInfoVO vo) {
    	mapper.BM0104F0I0(vo);
    	return vo.getRoutId();
    }
    
    public boolean BM0104F0U0(BmRoutInfoVO vo) {
    	if(mapper.BM0104F0U0(vo) > 0) {
    		return true;
    	} else {
    		return false;
    	}
    }
    
    public boolean BM0104G0D0(BmRoutInfoVO vo) {
    	if(mapper.BM0104G0D0(vo) > 0) {
    		return true;
    	} else {
    		return false;
    	}
    }
}