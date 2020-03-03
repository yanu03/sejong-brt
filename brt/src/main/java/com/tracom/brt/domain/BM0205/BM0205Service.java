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
		handler.uploadBM0205(vo.getUpList().get(0).getMngId(), vo.getDvcFileUp());
		return vo.getDvcId();
	}
	
	@Transactional
	public void BM0205Reservation(VhcDvcUpdateVO vo) {
		Map<String, String> map = new HashMap<>();
		mapper.BM0205Reservation(vo);
		map.put("rsvDate", vo.getRsvDate());
		for(int i = 0; i< vo.getUpList().size(); i++) {
			map.put("mngId", vo.getUpList().get(i).getMngId());
			VhcDvcUpdateVO list = mapper.BM0205S0(map);
			vo.getUpList().get(i).setMngId(list.getMngId());
			vo.getUpList().get(i).setRsvId(list.getRsvId());
		}
		mapper.BM0205I0(vo);
	}

	public boolean BM0205G0S1(VhcDvcUpdateVO vo) {
		boolean mngFCheck = false;
		boolean mngCheck = true;
		List<VhcDvcUpdateVO> list = mapper.BM0205G0S1(vo);
		if(list != null) {
		  for(int i = 0; i<list.size(); i++) {
			  for(int j = 0; j< vo.getUpList().size(); j++) {
				  if(list.get(i).getMngId().equals(vo.getUpList().get(j).getMngId())) {
					  mngFCheck = false;
					  mngCheck = false;
					  break;
				  }else {
					  mngFCheck = true;
				  }
			  }
			  if(mngCheck == false) {
				  break;
			  }
		  }
		  if(mngFCheck == true) {
			   return true;
			}else {
				return false;
			}
		}else {
			return true;
		}
	}
}
