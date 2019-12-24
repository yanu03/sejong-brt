package com.tracom.brt.domain.BM0102;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;

@Service
public class BM0102Service extends BaseService<CustInfoVo, String> {
    @Inject
    private BM0102Mapper mapper;
    
    
    public List<CustInfoVo> BM0102G0S0(RequestParams<CustInfoVo> requestParams) {
        return mapper.BM0102G0S0(requestParams.getString("filter"));
    }

    public String BM0102F0I0(CustInfoVo vo) {
    	mapper.BM0102F0I0(vo);
    	return vo.getCustId();
    }
    
    public boolean BM0102F0U0(CustInfoVo vo) {
    	if(mapper.BM0102F0U0(vo) > 0) {
    		return true;
    	} else {
    		return false;
    	}
    }
    
    public boolean BM0102G0D0(CustInfoVo vo) {
    	if(mapper.BM0102G0D0(vo) > 0) {
    		return true;
    	} else {
    		return false;
    	}
    }
}