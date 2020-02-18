package com.tracom.brt.domain.BM0205;

import java.util.List;

import javax.inject.Inject;

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
		System.out.println("service 파일");
		System.out.println(vo.getUpList().get(0).getMngId());
		System.out.println(vo.getDvcFileUp());
		handler.uploadBM0205(vo.getUpList().get(0).getMngId(), vo.getDvcFileUp());
		return vo.getDvcId();
	}
	
	public List<VhcDvcUpdateVO> BM0205Reservation(VhcDvcUpdateVO vo) {
		System.out.println("service 예약");
		System.out.println(vo);
		List<VhcDvcUpdateVO> dvc = mapper.BM0205Reservation(vo);
		System.out.println("rsvId값 return");
		System.out.println(dvc);
		return dvc;
	}

	public boolean BM0205G0S1(VhcDvcUpdateVO vo) {
		System.out.println("service 기존예약 있는지 체크");
		boolean mngFCheck = false;
		boolean mngCheck = true;
		List<VhcDvcUpdateVO> list = mapper.BM0205G0S1(vo);
		System.out.println("여긴가 그러면?");
		  for(int i = 0; i<list.size(); i++) {
			  for(int j = 0; j< vo.getUpList().size(); j++) {
				  if(list.get(i).getMngId().equals(vo.getUpList().get(j).getMngId())) {
					  System.out.println("false");
					  mngFCheck = false;
					  mngCheck = false;
					  break;
				  }else {
					  System.out.println("true");
					  mngFCheck = true;
				  }
			  }
			  if(mngCheck == false) {
				  break;
			  }
		  }
		  System.out.println("gogo");
		  if(mngFCheck == true) {
			   return true;
			}else {
				return false;
			}
	}
}
