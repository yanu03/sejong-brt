package com.tracom.brt.domain.BM0108;
 
import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
 
@Service
public class BM0108Service extends BaseService<EplyInfoVO, String> {

	@Inject
	private BM0108Mapper mapper;
	
	//Select
    public List<EplyInfoVO> BM0108G0S0(RequestParams<EplyInfoVO> requestParams) {
        return mapper.BM0108G0S0(requestParams.getString("filter"));
    }
    
    //Insert
    public String BM0108F0I0(EplyInfoVO vo) {
    	mapper.BM0108F0I0(vo);
    	return vo.getEplyId();
    }
    
    //Update
    public boolean BM0108F0U0(EplyInfoVO vo) {
    	if(mapper.BM0108F0U0(vo) > 0) {
    		return true;
    	} else {
    		return false;
    	}
    }
    
    //Delete
    public boolean BM0108G0D0(EplyInfoVO vo) {
    	if(mapper.BM0108G0D0(vo) > 0) {
    		return true;
    	} else {
    		return false;
    	}
    }
    
}