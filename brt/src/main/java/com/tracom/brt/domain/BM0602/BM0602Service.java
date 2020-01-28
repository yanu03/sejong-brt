package com.tracom.brt.domain.BM0602;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.BM0201.VhcDeviceVO;
import com.tracom.brt.domain.BM0601.WeatAtmoVO;

@Service
public class BM0602Service extends BaseService<NewsVO, String>{

	@Inject
	private BM0602Mapper mapper;

	public List<NewsVO> BM0602G0S0(RequestParams<NewsVO> requestParams) {
		return mapper.BM0602G0S0(requestParams.getString("filter"));
	}

	public String BM0602F0I0(NewsVO request) {
		return mapper.BM0602F0I0(request);
	}
}
