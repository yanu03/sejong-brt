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
		System.out.println("service 파일");
		System.out.println(vo.getUpList().get(0).getMngId());
		System.out.println(vo.getDvcFileUp());
		handler.uploadBM0205(vo.getUpList().get(0).getMngId(), vo.getDvcFileUp());
		return vo.getDvcId();
	}
	
	@Transactional
	public void BM0205Reservation(VhcDvcUpdateVO vo) {
		Map<String, String> map = new HashMap<>();
		System.out.println("service 예약");
		System.out.println(vo);
		mapper.BM0205Reservation(vo);
		map.put("rsvDate", vo.getRsvDate());
		for(int i = 0; i< vo.getUpList().size(); i++) {
			map.put("mngId", vo.getUpList().get(i).getMngId());
			System.out.println(map);
			VhcDvcUpdateVO list = mapper.BM0205S0(map);
			System.out.println(list);
			vo.getUpList().get(i).setMngId(list.getMngId());
			vo.getUpList().get(i).setRsvId(list.getRsvId());
		}
		mapper.BM0205I0(vo);
		System.out.println("rsvId값 return");
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
