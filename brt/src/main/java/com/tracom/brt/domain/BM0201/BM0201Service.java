package com.tracom.brt.domain.BM0201;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.handler.FTPHandler;

@Service
public class BM0201Service extends BaseService<VhcDeviceVO, String>{
	
	@Inject
	private BM0201Mapper mapper;
	
	@Inject
	private FTPHandler handler;

	public List<VhcDeviceVO> BM0201G0S0(RequestParams<VhcDeviceVO> requestParams) {
        return mapper.BM0201G0S0(requestParams.getString("filter"));
    }
	
	public List<VhcDeviceVO> BM0201G1S0(RequestParams<VhcDeviceVO> requestParams) {
        return mapper.BM0201G1S0(requestParams.getString("vhcId"));
    }
	public List<VhcDeviceVO> BM0201F0S2(RequestParams<VhcDeviceVO> requestParams) {
		return mapper.BM0201F0S2(requestParams.getString("dvcId"));
	}
	
	public List<VhcDeviceVO> BM0201M0S0(RequestParams<VhcDeviceVO> requestParams) {
		return mapper.BM0201M0S0(requestParams.getString("filter"));
	}
	
	public boolean BM0201F0S1(VhcDeviceVO vo) {
		Map<String,String> hm = new HashMap<>();
		hm.put("vhcId", vo.getVhcId());
		hm.put("mngId", vo.getMngId());		
		if(mapper.BM0201F0S1(hm) == null) {
			return true;
		} else {
			return false;
		}
	}
    
    public String BM0201F0I0(VhcDeviceVO vo) {
    	handler.deviceFolder(vo.getMngId());
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

	public List<VhcDeviceVO> BM0201G1S1(RequestParams<VhcDeviceVO> requestParams) {
		return mapper.BM0201G1S1(requestParams.getString("dvcId"));
	}

	public boolean BM0201G1U1(VhcDeviceVO vo) {
		System.out.println("여기로 오는건가?");
		if(mapper.BM0201G1U1(vo) > 0) {
			return true;
		}else {
			return false;
		}
	}

	public boolean BM0201G1U0(VhcDeviceVO vo) {
		if(mapper.BM0201G1U0(vo) > 0) {
			return true;
		}else {
			return false;
		}
	}
}
