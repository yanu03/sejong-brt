package com.tracom.brt.domain.BM0205;

import java.util.List;

import javax.inject.Inject;
import javax.jdo.annotations.Transactional;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.handler.FTPHandler;

@Service
public class BM0205Service extends BaseService<VhcDvcUpdateVO, String>{
	
	@Inject
	private BM0205Mapper mapper;
	
	@Inject
	private FTPHandler handler;
	
	
	
	public List<VhcDvcUpdateVO> BM0205G0S0(RequestParams<VhcDvcUpdateVO> requestParams) {
        return mapper.BM0205G0S0(requestParams.getString("filter"));
    }
	
	public String BM0205FileUp(VhcDvcUpdateVO vo) {
		System.out.println("service");
		System.out.println(vo.getUpList().get(0).getMngId());
		System.out.println(vo.getDvcFileUp());
		handler.uploadBM0205(vo.getUpList().get(0).getMngId(), vo.getDvcFileUp());
		return vo.getDvcId();
	}
	
	public String BM0205Reservation(VhcDvcUpdateVO vo) {
		System.out.println("service");
		System.out.println(vo);
		mapper.BM0205Reservation(vo);
		return vo.getDvcId();
	}

	public boolean BM0205G0S1(VhcDvcUpdateVO vo) {
		System.out.println("service");
		boolean mngFCheck = false;
		List<VhcDvcUpdateVO> list = mapper.BM0205G0S1(vo);
		  for(int i = 0; i<list.size(); i++) {
			  for(int j = 0; j< vo.getUpList().size(); j++) {
				  if(list.get(i).getMngId() != vo.getUpList().get(j).getMngId()) {
					  mngFCheck = true;
				  }else {
					  mngFCheck = false;
					  break;
				  }
			  }
		  }
		  if(mngFCheck == true) {
			   return true;
			}else {
				return false;
			}
	}
}
