package com.tracom.brt.domain.BM0201;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.BM0302.AltContractInfoVO;

@Service
public class BM0201Service extends BaseService<VhcDeviceVO, String>{
	
	@Inject
	private BM0201Mapper mapper;

	public List<VhcDeviceVO> BM0201G0S0(RequestParams<VhcDeviceVO> requestParams) {
        return mapper.BM0201G0S0(requestParams.getString("filter"));
    }

	public List<VhcDeviceVO> BM0201F0S0(RequestParams<VhcDeviceVO> requestParams) {
		return mapper.BM0201F0S0(requestParams.getString("filter"));
	}
	
	public List<VhcDeviceVO> BM0201G1S0(RequestParams<VhcDeviceVO> requestParams) {
        return mapper.BM0201G1S0(requestParams.getString("vhcId"));
    }
	
	public List<VhcDeviceVO> BM0201M0S0(RequestParams<VhcDeviceVO> requestParams) {
		return mapper.BM0201M0S0(requestParams.getString("filter"));
	}
	
	public boolean BM0201F0S1(VhcDeviceVO vo) {
		if(mapper.BM0201F0S1(vo.getDvcId()) == null) {
			return true;
		} else {
			return false;
		}
	}
    
    public String BM0201F0I0(VhcDeviceVO vo) {
    	mapper.BM0201F0I0(vo);
    	return vo.getVhcId();
		
	}
    
    public String BM0201M0I0(VhcDeviceVO vo) {
    	mapper.BM0201M0I0(vo);
    	return vo.getDvcId();
		
	}
    
    public boolean BM0201F0U0(VhcDeviceVO vo) {
    	if(mapper.BM0201F0U0(vo) > 0 ) {
    		return true;
    	}else {   		
    		return false;
    	}  	
    	
    }
    
    public boolean BM0201G1D0(VhcDeviceVO vo) {
    	if(mapper.BM0201G1D0(vo) > 0) {
    		return true;
    	}else {
    		return false;
    	}
		
	}

}
