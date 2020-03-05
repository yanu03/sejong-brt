package com.tracom.brt.domain.BM0605;
 
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
public class BM0605Service extends BaseService<VideoInfoVO, String> {

	@Inject
	private BM0605Mapper mapper;
	
	@Inject
	private FTPHandler handler;
	
	@Inject
	private FileService fileService;
	
	//왼쪽그리드 SELECT
    public List<VideoInfoVO> BM0605G0S0(RequestParams<VideoInfoVO> requestParams) {
        return mapper.BM0605G0S0(requestParams.getString("filter"));
    }
		
    //폼 INSERT
    @Transactional
    public String BM0605F0I0(VideoInfoVO vo) throws Exception{
    	String type;
    	String ext;
    	if(vo.getFileType().equals("AV001")) {
    		type = "video";
    		ext = "mp4";
    		mapper.BM0605F0I0(vo);
    		handler.uploadBM0605(vo.getVdoId(), vo.getVdoFile(), type);
    		VideoInfoVO o = handler.parseMp4(vo.getVdoId() + "." + ext);
    		vo.setPlayTm(o.getPlayTm());
    	}else {
    		type = "image";
    		ext = "jpg";
    		handler.uploadBM0605(vo.getVdoId(), vo.getVdoFile(), type);
    		vo.setPlayTm(vo.getImgPlayTm());
    		mapper.BM0605F0I0(vo);
    		handler.uploadBM0605(vo.getVdoId(), vo.getVdoFile(), type);
    		vo.setPlayTm(vo.getImgPlayTm());
    	}
    	mapper.BM0605F0U0(vo);
    	return vo.getVdoId();
    }
    
    //폼 update
    @Transactional
    public String BM0605F0U0(VideoInfoVO vo) throws Exception {
    	String type;
    	String ext;
    	VideoInfoVO o = new VideoInfoVO();
    	System.out.println("------------");
    	System.out.println(vo);
    	if(!vo.getVdoFile().isEmpty()) {
	    	if(vo.getFileType().equals("AV001")) {
	    		type = "video";
	    		ext = "mp4";
	    		handler.uploadBM0605(vo.getVdoId(), vo.getVdoFile(), type);
	        	o = handler.parseMp4(vo.getVdoId() + "." + ext);
	        	vo.setPlayTm(o.getPlayTm());
	    	}else {
	    		type = "image";
	    		ext = "jpg";
	    		vo.setPlayTm(vo.getImgPlayTm());
	    		handler.uploadBM0605(vo.getVdoId(), vo.getVdoFile(), type);
	    		vo.setPlayTm(vo.getImgPlayTm());
	    	}
    	}else {
    		vo.setPlayTm(-999);
    	}
    	
    	//handler.uploadBM0605(vo.getVdoId(), vo.getVdoFile(), type);
    	//VideoInfoVO o = handler.parseMp4(vo.getVdoId() + "." + ext);
    	mapper.BM0605F0U0(vo);
    	return vo.getVdoId();
    }
    
    //그리드 삭제
    public boolean BM0605G0D0(VideoInfoVO vo) {
    	List<VideoInfoVO> voList = mapper.validationBeforeDelete(vo.getVdoId());
    	boolean flag = false;
    	
    	for(VideoInfoVO v : voList) {
    		if(v.getOrgaId() != null) {
    			flag = true;
    		}
    	}
    	if(!flag) {
	    	if(mapper.BM0605G0D0(vo) > 0) {
	    		return true;
	    	}else {
	    		return false;
	    	}
    	}else {
    		return false;
    	}
    }
}