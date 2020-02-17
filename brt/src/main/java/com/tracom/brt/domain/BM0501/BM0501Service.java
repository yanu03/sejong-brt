package com.tracom.brt.domain.BM0501;


import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.SM0105.CommonCodeDetailInfoVO;
import com.tracom.brt.domain.SM0105.SM0105Mapper;
import com.tracom.brt.handler.FTPHandler;

@Service
public class BM0501Service extends BaseService<DestinationVO, String>{

	@Inject
	SM0105Mapper DLCDMapper;
	
	@Inject
	FTPHandler ftpHandler;
	
	
	public List<CommonCodeDetailInfoVO> selectBox(){
		return DLCDMapper.SM0105G2S0();
	}
	
	public List<DestinationVO> selectSCHFile(DestinationVO vo) throws Exception{
		
		System.out.println(vo);
		
		String fileNameHeader = DLCDMapper.SM0105G2S1(vo.getDvcKindCd()).getTxtVal2();
		String fileNameTail = ".SCH";
		String fileName =  fileNameHeader + vo.getDvcName() + fileNameTail;

		return ftpHandler.readSCH(fileName);
		
	}

	public CommonCodeDetailInfoVO getHeader(String value) {
		return DLCDMapper.SM0105G2S1(value);
	}
	
}
