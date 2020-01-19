package com.tracom.brt.domain.BM0205;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;

@Service
public class BM0205Service extends BaseService<VhcDvcUpdateVO, String>{
	
	@Inject
	private BM0205Mapper mapper;
	
	public List<VhcDvcUpdateVO> BM0205G0S0(RequestParams<VhcDvcUpdateVO> requestParams) {
        return mapper.BM0205G0S0(requestParams.getString("filter"));
    }
	
	
	public String BM0205FileUp(VhcDvcUpdateVO vo) {
		System.out.println("service");
		System.out.println(vo);
		mapper.BM0205FileUp(vo);
		return vo.getDvcId();
	}
	
	public String BM0205Reservation(VhcDvcUpdateVO vo) {
		
		System.out.println("service");
		System.out.println(vo);
		mapper.BM0205Reservation(vo);
		return vo.getDvcId();
	}
		
}
