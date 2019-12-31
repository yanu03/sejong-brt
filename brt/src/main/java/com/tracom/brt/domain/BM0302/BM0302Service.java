package com.tracom.brt.domain.BM0302;

import org.springframework.stereotype.Service;
import com.tracom.brt.domain.BaseService;
import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import java.util.List;

@Service
public class BM0302Service extends BaseService<AltContractInfoVO, String> {
	
	@Inject
    private BM0302Mapper mapper;

    public List<AltContractInfoVO> BM0302G0S0(RequestParams<AltContractInfoVO> requestParams) {
        return mapper.BM0302G0S0(requestParams.getString("filter"));
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
    
    public boolean BM0302G0D0(AltContractInfoVO vo) {
    	if(mapper.BM0302G0D0(vo) > 0) {
    		return true;
    	}else {
    		return false;
    	}
		
	}
}