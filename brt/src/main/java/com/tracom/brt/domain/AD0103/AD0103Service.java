package com.tracom.brt.domain.AD0103;

import java.util.HashMap;
import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.BM0104.BmRoutInfoVO;
import com.tracom.brt.domain.BM0104.BmRoutNodeInfoVO;

@Service
public class AD0103Service extends BaseService<BmRoutInfoVO, String>{
	
	@Inject
	private AD0103Mapper mapper;
	
	//좌측상단 그리드 select
	public List<BmRoutInfoVO> BM0804G0S0(RequestParams<BmRoutInfoVO> requestParams){
		return mapper.BM0804G0S0(requestParams.getString("filter"));
	}
	
	//좌측하단 그리드 select
	public List<BmRoutNodeInfoVO> BM0804G1S0(RequestParams<BmRoutNodeInfoVO> requestParams){
    	HashMap<String, String> map = new HashMap<String, String>();
    	map.put("routId", requestParams.getString("routId"));
    	map.put("filter1", requestParams.getString("filter1"));
		return mapper.BM0804G1S0(map);
	}
	
	public void BM0804G1I0(List<BmRoutNodeInfoVO> voList) {
		BmRoutNodeInfoVO vo = new BmRoutNodeInfoVO();
		String routId = null;
		for(BmRoutNodeInfoVO tmp : voList) {
			if(tmp.getRoutId() != null) {
				routId = tmp.getRoutId();
				break;
			}
		}
		vo.setRoutId(routId);
		vo.setVoList(voList);
		if(routId == null) {
			mapper.BM0804G1I1(vo);
		}else {
			mapper.BM0804G1D0(vo.getRoutId());
			mapper.BM0804G1I0(vo);			
		}
	}
	
	public boolean BM0804G0D0(BmRoutNodeInfoVO vo) {
		if(mapper.BM0804G0D0(vo) > 0) {
			return true;
		}else {
			return false;
		}
	}
}
