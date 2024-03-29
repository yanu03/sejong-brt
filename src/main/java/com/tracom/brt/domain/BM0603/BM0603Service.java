package com.tracom.brt.domain.BM0603;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.BM0602.NewsVO;

@Service
public class BM0603Service extends BaseService<NewsVO, String>{
	
	@Inject
	private BM0603Mapper mapper;

	public List<NewsVO> BM0603G0S0(RequestParams<NewsVO> requestParams) {
		return mapper.BM0603G0S0(requestParams.getString("filter"));
	}

	public String BM0603F0I0(NewsVO request) {		
		mapper.BM0603F0I0(request);
		return request.getUserNewsId(); 	
	}

	public boolean BM0603F0U0(NewsVO request) {
		mapper.BM0603F0U0(request);

		for(int i = 0; request.getUpList().size() > i; i++) {
			NewsVO vo = request.getUpList().get(i);
			mapper.useYn(vo);
		}
		  
		if(request.getUpList().size() > 0 ) {
			return true; 
		}else {
			return false;
		}
	}
	
	public boolean BM0603G0D0(NewsVO vo) {
		if(mapper.BM0603G0D0(vo) > 0) {
			return true;
		}else {
			return false;
		}
	}
}
