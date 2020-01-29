package com.tracom.brt.domain.BM0602;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;

@Service
public class BM0602Service extends BaseService<NewsVO, String>{

	@Inject
	private BM0602Mapper mapper;

	public List<NewsVO> BM0602G0S0(RequestParams<NewsVO> requestParams) {
		return mapper.BM0602G0S0(requestParams.getString("filter"));
	}

	public String BM0602F0I0(NewsVO request) {
		mapper.BM0602F0I0(request);
		return request.getProvId();
	}

	public boolean BM0602G0D0(NewsVO request) {
		if(mapper.BM0602G0D0(request) > 0) {			
			return true;
		}else {
			return false;
		}
	}

	public boolean BM0602F0U0(NewsVO request) {
		if(mapper.BM0602F0U0(request)>0) {
			return true;
		}else {
			return false;			
		}
	}
}
