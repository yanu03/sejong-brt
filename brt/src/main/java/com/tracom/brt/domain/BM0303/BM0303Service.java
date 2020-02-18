package com.tracom.brt.domain.BM0303;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;

@Service
public class BM0303Service extends BaseService<ContractViewVO, String>{

	@Inject
    private BM0303Mapper mapper;

    public List<ContractViewVO> BM0303G1S0(RequestParams<ContractViewVO> requestParams) {
        return mapper.BM0303G1S0(requestParams.getString("conId"));
    }

	public List<ContractViewVO> BM0303G2S0(RequestParams<ContractViewVO> requestParams) {
		return mapper.BM0303G2S0(requestParams.getString("conId"));
	}

	public List<ContractViewVO> BM0303G2S1(RequestParams<ContractViewVO> requestParams) {
		return mapper.BM0303G2S1(requestParams.getString("conId"));
	}
    
	
   
}
