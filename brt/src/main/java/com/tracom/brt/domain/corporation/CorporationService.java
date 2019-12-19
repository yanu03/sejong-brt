package com.tracom.brt.domain.corporation;

import org.springframework.stereotype.Service;
import com.tracom.brt.domain.BaseService;
import javax.inject.Inject;
import com.chequer.axboot.core.parameter.RequestParams;
import java.util.List;

@Service
public class CorporationService extends BaseService<Corporation, String> {
    @Inject
    private CorporationMapper corporationMapper;

    public List<Corporation> findAll(RequestParams<Corporation> requestParams) {
        return corporationMapper.findAll(requestParams.getString("filter"));
    }
    
    public String saveCorporation(Corporation vo) {
    	corporationMapper.insert(vo);
    	return vo.getCorpId();
    }
    
    public boolean updateCorporation(Corporation vo) {
    	if(corporationMapper.update(vo) > 0) {
    		return true;
    	} else {
    		return false;
    	}
    }
    
    public boolean deleteCorporation(Corporation vo) {
    	if(corporationMapper.delete(vo) > 0) {
    		return true;
    	} else {
    		return false;
    	}
    }
}