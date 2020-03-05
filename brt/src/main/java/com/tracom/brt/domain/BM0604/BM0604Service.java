package com.tracom.brt.domain.BM0604;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.BM0602.NewsVO;
import com.tracom.brt.handler.TimsAuthHandler;

@Service
public class BM0604Service extends BaseService<NewsVO, String>{

	@Inject
	private BM0604Mapper mapper;
	
	@Inject
	private TimsAuthHandler timsAuthHandler;
	
	public List<NewsVO> BM0604G0S0(RequestParams<NewsVO> requestParams) {
		return mapper.BM0604G0S0(requestParams.getString("filter"));
	}

	public List<NewsVO> BM0604G0S1(RequestParams<NewsVO> requestParams) {
		return mapper.BM0604G0S1(requestParams.getString("filter"));
	}

	public List<NewsVO> BM0604G1S0(RequestParams<NewsVO> requestParams) {
		return mapper.BM0604G1S0(requestParams.getString("filter"));
	}

	public boolean BM0604F0U0(NewsVO request) {
		for(int i = 0; request.getUpList().size() > i; i++) {
			  NewsVO vo = request.getUpList().get(i);
			  System.out.println(vo.getCategory());
			  if(vo.getProvNm().equals("세종도시교통공사")) {
				  System.out.println("세종도시교통공사");
				  mapper.BM0604F0U1(vo);
			  }else {
				  System.out.println("다른놈들");
				  mapper.BM0604F0U0(vo);
			  }
		  }		  
		   if(request.getUpList().size() > 0 ) {
			   timsAuthHandler.sendNews();
			   return true; 
		  }else {
			  return false;
		  }
	}

}
