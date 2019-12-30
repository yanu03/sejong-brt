package com.tracom.brt.domain.altercontract;

import org.springframework.stereotype.Service;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.BM0301.BM0301Mapper;

import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import java.util.List;

@Service
public class AltercontractService extends BaseService<Altercontract, Altercontract.AltercontractId> {

    @Inject
    private AltercontractMapper altercontractMapper;

    public List<Altercontract> findAll(RequestParams<Altercontract> requestParams) {
        return altercontractMapper.findAll(requestParams.getString("filter"));
    }
    
    public String saveCorporation(Altercontract vo) {
    	altercontractMapper.insert(vo);
    	return vo.getConId();
    }
    
    public boolean updateCorporation(Altercontract vo) {
    	if(altercontractMapper.update(vo) > 0) {
    		return true;
    	} else {
    		return false;
    	}
    }
    
    public boolean deleteCorporation(Altercontract vo) {
    	if(altercontractMapper.delete(vo) > 0) {
    		return true;
    	} else {
    		return false;
    	}
    }
}