package com.tracom.brt.domain.BM0301;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;

@Service
public class BM0301Service extends BaseService<ContractInfoVO, String> {
	@Inject
    private BM0301Mapper mapper;
	
	public List<ContractInfoVO> BM0301G0S0(RequestParams<ContractInfoVO> requestParams) {
		Map<String, String> map = new HashMap<>();
		map.put("filter", requestParams.getString("filter"));
		map.put("conStat", requestParams.getString("conStat"));
        return mapper.BM0301G0S0(map);
    }
	
	public List<ContractInfoVO> BM0301G0S1(RequestParams<ContractInfoVO> requestParams) {
        return mapper.BM0301G0S1(requestParams.getString("conId"));
    }
    
    public String BM0301F0I0(ContractInfoVO vo) {
    	mapper.BM0301F0I0(vo);
    	return vo.getConId();
    }
    
    public boolean BM0301F0U0(ContractInfoVO vo) {
    	if(mapper.BM0301F0U0(vo) > 0) {
    		return true;
    	} else {
    		return false;
    	}
    }
    
    public boolean BM0301F0U1(ContractInfoVO vo) {
    	if(mapper.BM0301F0U1(vo) > 0) {
    		return true;
    	} else {
    		return false;
    	}
    }
    
    public boolean BM0301F0U2(ContractInfoVO vo) {
    	if(mapper.BM0301F0U2(vo) > 0) {
    		return true;
    	} else {
    		return false;
    	}    	
    }
    public boolean BM0301G0D0(ContractInfoVO vo) {
    	if(mapper.BM0301G0D0(vo) > 0) {
    		return true;
    	} else {
    		return false;
    	}
    }

    public int confirmN(ContractInfoVO vo) {
    	return mapper.confirmN(vo);
    }
    
    public List<ContractInfoVO> cntAds(ContractInfoVO vo) {
    	return mapper.cntAds(vo);
    }

}