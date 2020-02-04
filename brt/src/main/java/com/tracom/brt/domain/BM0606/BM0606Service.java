package com.tracom.brt.domain.BM0606;
 
import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.file.FileService;
import com.tracom.brt.handler.FTPHandler;
 
@Service
public class BM0606Service extends BaseService<VideoInfoVO, String> {

	@Inject
	private BM0606Mapper mapper;
	
	@Inject
	private FTPHandler handler;
	
	@Inject
	private FileService fileService;
	
	//왼쪽그리드 SELECT
    public List<VideoInfoVO> BM0606G0S0(RequestParams<VideoInfoVO> requestParams) {
        return mapper.BM0606G0S0(requestParams.getString("filter"));
    }
		
    //폼 INSERT
    @Transactional
    public String BM0606F0I0(VideoInfoVO vo) {
    	String type;
    	if(vo.getFileType().equals("AV001")) {
    		type = "video";
    	}else {
    		type = "image";
    	}
    	mapper.BM0606F0I0(vo);
    	handler.uploadBM0606(vo.getVdoId(), vo.getVdoFile(), type);
    	return vo.getVdoId();
    }
    
    //폼 update
    @Transactional
    public String BM0606F0U0(VideoInfoVO vo) {
    	String type;
    	if(vo.getFileType().equals("AV001")) {
    		type = "video";
    	}else {
    		type = "image";
    	}
    	mapper.BM0606F0U0(vo);
    	handler.uploadBM0606(vo.getVdoId(), vo.getVdoFile(), type);
    	return vo.getVdoId();
    }
    
}