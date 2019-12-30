package com.tracom.brt.domain.BM0101;

import org.springframework.stereotype.Service;
import com.tracom.brt.domain.BaseService;
import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import java.util.List;

@Service
public class BM0101Service extends BaseService<CorpInfoVO, String> {
    @Inject
    private BM0101Mapper mapper;

    public List<CorpInfoVO> BM0101G0S0(RequestParams<CorpInfoVO> requestParams) {
        return mapper.BM0101G0S0(requestParams.getString("filter"));
    }
    
    public String BM0101F0I0(CorpInfoVO vo) {
    	mapper.BM0101F0I0(vo);
    	return vo.getCorpId();
    }
    
    public boolean BM0101F0U0(CorpInfoVO vo) {
    	if(mapper.BM0101F0U0(vo) > 0) {
    		return true;
    	} else {
    		return false;
    	}
    }
    
    public boolean BM0101G0D0(CorpInfoVO vo) {
    	if(mapper.BM0101G0D0(vo) > 0) {
    		return true;
    	} else {
    		return false;
    	}
    }
}