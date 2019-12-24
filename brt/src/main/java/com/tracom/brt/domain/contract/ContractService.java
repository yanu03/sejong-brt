package com.tracom.brt.domain.contract;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;

@Service
public class ContractService extends BaseService<Contract, String> {
	@Inject
    private ContractMapper contractMapper;
	
	public List<Contract> findAll(RequestParams<Contract> requestParams) {
        return contractMapper.findAll(requestParams.getString("filter"));
    }
    
    public String saveCorporation(Contract vo) {
    	contractMapper.insert(vo);
    	return vo.getConId();
    }
    
    public boolean updateCorporation(Contract vo) {
    	if(contractMapper.update(vo) > 0) {
    		return true;
    	} else {
    		return false;
    	}
    }
    
    public boolean deleteCorporation(Contract vo) {
    	if(contractMapper.delete(vo) > 0) {
    		return true;
    	} else {
    		return false;
    	}
    }

}