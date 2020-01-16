package com.tracom.brt.domain.BM0205;

import java.util.List;

import javax.inject.Inject;
import javax.jdo.annotations.Transactional;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.voice.VoiceInfoVO;

@Service
public class BM0205Service extends BaseService<VhcDvcUpdateVO, String>{
	
	@Inject
	private BM0205Mapper mapper;
	
	public List<VhcDvcUpdateVO> BM0205G0S0(RequestParams<VhcDvcUpdateVO> requestParams) {
        return mapper.BM0205G0S0(requestParams.getString("filter"));
    }
	
	@Transactional
	public String BM0205F0I0(VhcDvcUpdateVO vo) {
		mapper.BM0205F0I0(vo);
		return vo.getDvcId();
	}
	
	public List<VhcDvcUpdateVO> BM0205Reservation(RequestParams<VhcDvcUpdateVO> requestParams) {
        return mapper.BM0205Reservation(requestParams.getString("filter"));
    }
}
