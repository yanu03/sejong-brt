package com.tracom.brt.domain.BM0205;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
		for(VhcDvcUpdateVO uv : vo.getUpList()) {
			handler.uploadBM0205(uv.getMngId(), vo.getDvcFileUp());
		}
		
		return vo.getDvcId();
	}
	
	@Transactional
	public void BM0205Reservation(VhcDvcUpdateVO vo) {
		for(VhcDvcUpdateVO uv : vo.getUpList()) {
			uv.setRsvDate(vo.getRsvDate());
			uv.setVerInfo(vo.getVerInfo());
			mapper.BM0205Reservation(uv);
			mapper.BM0205I0(uv);
		}
	}

	public boolean BM0205G0S1(VhcDvcUpdateVO vo) {
		boolean mngCheck = true;
		List<VhcDvcUpdateVO> list = mapper.BM0205G0S1(vo);
		if(list != null) {
		  for(int i = 0; i<list.size(); i++) {
			  for(int j = 0; j< vo.getUpList().size(); j++) {
				  if(list.get(i).getMngId().equals(vo.getUpList().get(j).getMngId())) {
					  System.out.println("예약불가능함");
					  System.out.println(list.get(i).getMngId());
					  System.out.println(vo.getUpList().get(j).getMngId());
					  mngCheck = false;
					  break;
				  }else {
					  System.out.println("예약가능함");
					  System.out.println(list.get(i).getMngId());
					  System.out.println(vo.getUpList().get(j).getMngId());
					  mngCheck = true;
				  }
			  }
			  if(mngCheck == false) {
				  break;
			  }
		  }
		  if(mngCheck == true) {
			   return true;
			}else {
				return false;
			}
		}else {
			return true;
		}
	}
}
