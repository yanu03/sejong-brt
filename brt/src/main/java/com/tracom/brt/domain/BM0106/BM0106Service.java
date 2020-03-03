package com.tracom.brt.domain.BM0106;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.BM0105.BmStaInfoVO;

@Service
public class BM0106Service extends BaseService<BmStaNmInfoVO, String> {
    @Inject
    private BM0106Mapper mapper;
    
    
    public List<BmStaNmInfoVO> BM0106G0S0(RequestParams<BmStaNmInfoVO> requestParams) {
        return mapper.BM0106G0S0(requestParams.getString("filter"));
    }

    public String BM0106F0I0(BmStaNmInfoVO vo) {
    	mapper.BM0106F0I0(vo);
    	return vo.getStaId();
    }
    
    public boolean BM0106F0U0(BmStaNmInfoVO vo) {
    	if(mapper.BM0106G0S1(vo.getStaId()) > 0) {
    		if(mapper.BM0106F0U0(vo) > 0 ) {
    			return true;
    		}else {
    			return false;
    		}
    	}
    	else {
    		if(mapper.BM0106F0I0(vo) > 0) {
    			return true;
    		}else {
    			return false;
    		}
    	}
    }
    
    public boolean BM0106G0D0(BmStaNmInfoVO vo) {
    	if(mapper.BM0106G0D0(vo) > 0) {
    		return true;
    	} else {
    		return false;
    	}
    }
    
    /** 정류장 정리 **/
    @Transactional
    public boolean sweepSta() {
    	List<BmStaInfoVO> list = mapper.getSwpList();
    	BmStaInfoVO vo = new BmStaInfoVO();
    	vo.setVoList(list);
    	if(mapper.deleteStaNmInfo(vo) > 0) {
    		if(mapper.deleteStaInfo(vo) > 0) {
    			return true;
    		}else {
    			return false;
    		}
    	}else {
    		return false;
    	}
    }
}