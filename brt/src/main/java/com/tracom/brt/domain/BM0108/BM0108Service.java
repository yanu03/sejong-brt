package com.tracom.brt.domain.BM0108;
 
import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.file.FileService;
import com.tracom.brt.handler.FTPHandler;
 
@Service
public class BM0108Service extends BaseService<EplyInfoVO, String> {

	@Inject
	private BM0108Mapper mapper;
	
	@Inject
	private FTPHandler handler;
	
	@Inject
	private FileService fileService;
	
	//Select
    public List<EplyInfoVO> BM0108G0S0(RequestParams<EplyInfoVO> requestParams) {
        return mapper.BM0108G0S0(requestParams.getString("filter"));
    }
    
    //Insert
    public String BM0108F0I0(EplyInfoVO vo) {
    	mapper.BM0108F0I0(vo);
    	handler.uploadBM0108(vo.getEplyId(), vo.getImgFile());
    	return vo.getEplyId();
    }
    
    //Update
    public boolean BM0108F0U0(EplyInfoVO vo) {
    	if(mapper.BM0108F0U0(vo) > 0) {
    		handler.uploadBM0108(vo.getEplyId(), vo.getImgFile());
    		return true;
    	} else {
    		return false;
    	}
    }
    
    //Delete
    public boolean BM0108G0D0(EplyInfoVO vo) {
    	if(mapper.BM0108G0D0(vo) > 0) {
    		return true;
    	} else {
    		return false;
    	}
    }
    
	public void BM0108F0S0(RequestParams<EplyInfoVO> requestParams, HttpServletRequest request, HttpServletResponse response) {
		fileService.preview(requestParams, response);
	}
		
    
    
}