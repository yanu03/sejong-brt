package com.tracom.brt.domain.BM0302;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;

@Service
public class BM0302Service extends BaseService<AltContractInfoVO, String> {
	
	@Inject
    private BM0302Mapper mapper;
	
	//Select
    public List<AltContractInfoVO> BM0302G0S0(RequestParams<AltContractInfoVO> requestParams) {
    	Map<String, String> map = new HashMap<>();
    	map.put("filter", requestParams.getString("filter"));
    	map.put("conEd", requestParams.getString("conEd"));
        return mapper.BM0302G0S0(map);
    }

    public List<AltContractInfoVO> BM0302G1S0(RequestParams<AltContractInfoVO> requestParams) {
        return mapper.BM0302G1S0(requestParams.getString("conId"));
    }
    public List<AltContractInfoVO> BM0302G0S1(RequestParams<AltContractInfoVO> requestParams) {
    	return mapper.BM0302G0S1(requestParams.getString("filter"));
    }
    
    public boolean BM0302F0S0(AltContractInfoVO vo) {
		if(mapper.BM0302F0S0(vo.getSeq()) == null) {
			return true;
		} else {
			return false;
		}
	}
    
    public String BM0302F0I0(AltContractInfoVO vo) {
    	mapper.BM0302F0I0(vo);
    	return vo.getConId();		
	}
    
    public boolean BM0302F0U0(AltContractInfoVO vo) {
    	if(mapper.BM0302F0U0(vo) > 0 ) {
    		return true;
    	}else {   		
    		return false;
    	}  	
    	
    }
    
    public boolean BM0302F0U1(AltContractInfoVO vo) {
		if(mapper.BM0302F0U1(vo) > 0 ) {
			return true;
		}else {
			return false;
		}
	}
    
    public boolean BM0302F0U2(AltContractInfoVO vo) {
		if(mapper.BM0302F0U2(vo) > 0 ) {
			return true;
		}else {
			return false;
		}
	}
    
    public boolean BM0302G1D0(AltContractInfoVO vo) {
    	if(mapper.BM0302G1D0(vo) > 0) {
    		return true;
    	}else {
    		return false;
    	}
		
	}

}