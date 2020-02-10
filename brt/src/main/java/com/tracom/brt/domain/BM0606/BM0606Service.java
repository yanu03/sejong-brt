package com.tracom.brt.domain.BM0606;
 
import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.BM0605.VideoInfoVO;
 
@Service
public class BM0606Service extends BaseService<VdoOrgaVO, String> {

	@Inject
	BM0606Mapper mapper;
	
	//왼쪽그리드 SELECT
    public List<VdoOrgaVO> BM0606G0S0(RequestParams<VdoOrgaVO> requestParams) {
        return mapper.BM0606G0S0(requestParams.getString("filter"));
    }
    
    //편성된 목록 가져오기
    public List<VideoInfoVO> BM0606G2S0(VdoOrgaVO vo){
    	return mapper.BM0606G2S0(vo);
    }
}