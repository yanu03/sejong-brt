package com.tracom.brt.domain.BM0503;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;

@Service
public class BM0503Service extends BaseService<RoutRsvVO, String> {
    @Inject
    private BM0503Mapper mapper;

    
    public List<RoutRsvVO> BM0503G0S0(RequestParams<RoutRsvVO> requestParams) {
        return mapper.BM0503G0S0(requestParams.getString("filter"));
    }
    
    public List<RoutRsvVO> BM0503G1S0(RequestParams<RoutRsvVO> requestParams){
    	return mapper.BM0503G1S0();
    }
}