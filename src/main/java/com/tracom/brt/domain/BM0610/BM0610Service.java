package com.tracom.brt.domain.BM0610;


import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.handler.FTPHandler;

@EnableScheduling
@Service
public class BM0610Service extends BaseService<InnerLEDVO, String>{

	@Inject
	private BM0610Mapper mapper;
	
	@Inject
	private FTPHandler handler;
	
	public List<InnerLEDVO> BM0610G0S0(RequestParams<InnerLEDVO> requestParams){
		return mapper.BM0610G0S0(requestParams.getString("filter"));
	}

	public String BM0610F0I0(InnerLEDVO vo) {
		vo.setSeq(mapper.getSeq());
		mapper.BM0610F0I0(vo);
		handler.makeIld(vo);
		List<InnerLEDVO> list = mapper.BM0610G0S0("");
		handler.makeIldList(list);
		return vo.getIldId();
	}
	
	public boolean BM0610F0U0(InnerLEDVO vo) {
		if(mapper.BM0610F0U0(vo) > 0) {
			handler.makeIld(vo);
			List<InnerLEDVO> list = mapper.BM0610G0S0("");
			handler.makeIldList(list);
			return true;
		}else {
			return false;			
		}
	}
	
	public boolean BM0610G0D0(InnerLEDVO vo) {
		if(mapper.BM0610G0D0(vo) > 0) {
			int result = 0;
			List<InnerLEDVO> list = mapper.BM0610G0S0("");
			
			for(int i=0; i<list.size(); i++) {
				InnerLEDVO ivo = list.get(i);
				if(mapper.BM0610G0U1(ivo) > 0) {
					ivo.setSeq(Integer.toString(i+1));
					result ++;
				}
			}
			
			if(result == list.size()) {
				List<InnerLEDVO> list2 = mapper.BM0610G0S0("");
				handler.makeIldList(list2);
			}
			return true;

		}else {
			return false;			
		}
	}
	
	@Transactional
	public boolean BM0610G0U1(InnerLEDVO vo) {
		List<InnerLEDVO> list = vo.getVoList();
		int result = 0;
		for(InnerLEDVO ivo : list) {
			if(mapper.BM0610G0U1(ivo) > 0) {
				result ++;
			}
		}
		
		if(result == list.size()) {
			List<InnerLEDVO> list2 = mapper.BM0610G0S0("");
			handler.makeIldList(list2);
			return true;
		}else {
			return false;
		}
		
	}
	
	public int getMax() {
		return mapper.getMax().getNumVal4().intValue();
	}
	
	public List<Map<String, Object>> selectIldHelp() {
		return mapper.selectIldHelp();
	}
	
	public String currentLength(String str) {
		return mapper.currentLength(str);
	}
}
