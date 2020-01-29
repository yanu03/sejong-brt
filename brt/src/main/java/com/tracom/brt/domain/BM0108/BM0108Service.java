package com.tracom.brt.domain.BM0108;
 
import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.net.URLConnection;
import java.nio.file.Paths;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.voice.VoiceInfoVO;
import com.tracom.brt.handler.FTPHandler;
 
@Service
public class BM0108Service extends BaseService<EplyInfoVO, String> {

	@Inject
	private BM0108Mapper mapper;
	
	@Inject
	private FTPHandler handler;
	
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
		String eplyId = requestParams.getString("eplyId");
		
		File file = null;
		String path = Paths.get(handler.getRootLocalPath(), "/common/employee").toString();
		
		try {
			file = Paths.get(path, eplyId + ".jpg").toFile();
			//File tempFile = new File(handler.getRootLocalPath(), "/temp/" + eplyId + ".jpg");
			
			String mimeType = URLConnection.guessContentTypeFromName(file.getName());
			if (mimeType == null) {
				mimeType = "application/octet-stream";
			}
			if(file.exists()) {
				response.setContentType(mimeType);
				response.setHeader("Content-Disposition", String.format("inline; filename=\"" + file.getName() + "\""));
				response.setContentLength((int) file.length());
			
				InputStream is = new BufferedInputStream(new FileInputStream(file));
				FileCopyUtils.copy(is, response.getOutputStream());
				is.close();
			}else if(!file.exists()) {
				
				file = Paths.get(path, "EmployeeDefault" + ".jpg").toFile();
				
				mimeType = URLConnection.guessContentTypeFromName(file.getName());
				
				response.setContentType(mimeType);
				response.setHeader("Content-Disposition", String.format("inline; filename=\"" + file.getName() + "\""));
				response.setContentLength((int) file.length());
			
				InputStream is = new BufferedInputStream(new FileInputStream(file));
				FileCopyUtils.copy(is, response.getOutputStream());
				is.close();
			}
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
		
    
    
}