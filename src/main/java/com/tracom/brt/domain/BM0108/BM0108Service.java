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
    /** 0401 전자노선도 관련 변경사항으로 CERTI삭제, jpg -> png 변경 **/
    public String BM0108F0I0(EplyInfoVO vo) {
    	mapper.BM0108F0I0(vo);
    	if(vo.getEmployeeImg() != null) {
    		handler.uploadBM0108(vo.getEplyId() + ".png", vo.getEmployeeImg());    		
    		/*  2020-09-29 추가
    		 *  설명: .jpg 이미지와 CERTI 이미지가 없을 경우 운전자 단말기에서 로그인이 되지 않음. 따라서 아래 코드 추가함
    		 */
    		handler.uploadBM0108(vo.getEplyId() + ".jpg", vo.getEmployeeImg());
    		handler.uploadBM0108(vo.getEplyId() + "_CERTI.jpg", vo.getEmployeeImg());
    		/****************/
    	}
    	return vo.getEplyId();
    }
    
    //Update
    public boolean BM0108F0U0(EplyInfoVO vo) {
    	if(mapper.BM0108F0U0(vo) > 0) {
    		if(!vo.getEmployeeImg().isEmpty()) {
    			handler.uploadBM0108(vo.getEplyId() + ".png", vo.getEmployeeImg());
    			/*  2020-09-29 추가
        		 *  설명: .jpg 이미지와 CERTI 이미지가 없을 경우 운전자 단말기에서 로그인이 되지 않음. 따라서 아래 코드 추가함
        		 */
        		handler.uploadBM0108(vo.getEplyId() + ".jpg", vo.getEmployeeImg());
        		handler.uploadBM0108(vo.getEplyId() + "_CERTI.jpg", vo.getEmployeeImg());
        		/****************/
    		}
    		return true;
    	} else {
    		return false;
    	}
    }
    
    //Delete
    public boolean BM0108G0D0(EplyInfoVO vo) throws Exception {
    	if(mapper.BM0108G0D0(vo) > 0) {
    		handler.deleteBM0108(vo);
    		return true;
    	} else {
    		return false;
    	}
    }
    
	public void BM0108F0S0(RequestParams<EplyInfoVO> requestParams, HttpServletRequest request, HttpServletResponse response) {
		fileService.preview(requestParams, response);
	}
		
    
    
}