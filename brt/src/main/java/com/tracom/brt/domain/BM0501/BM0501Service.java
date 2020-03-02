package com.tracom.brt.domain.BM0501;


import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
		
		String fileNameHeader = DLCDMapper.SM0105G2S1(vo.getDvcKindCd()).getTxtVal2();
		//String updown = DLCDMapper.SM0105G2S2(vo.getUserWayDiv());
		String fileNameTail = ".SCH";
		String fileName = fileNameHeader + vo.getDvcName() + fileNameTail;
		return ftpHandler.readSCH(fileName);
	}

	public List<DestinationVO> selectSCHFileLOGO(DestinationVO vo) throws Exception{
		String fileNameHeader = vo.getDvcKind();
		String fileNameTail = ".SCH";
		String fileName = fileNameHeader + "LOGO" + fileNameTail;
		return ftpHandler.readSCH(fileName);
	}
	
	@Transactional
	public boolean saveBM0501(DestinationVO vo) {
		if(writeBmpFile(vo)) {
			if(writeSCHFile(vo)) {
				return true;
			}else {
				return false;
			}
		}else {
			return false;
		}
	}
	
	public boolean writeBmpFile(DestinationVO vo) {
		if(vo.getAttFile() != null) {
			String fileNameHeader = DLCDMapper.SM0105G2S1(vo.getDvcKindCd()).getTxtVal2();
			//String updown = DLCDMapper.SM0105G2S2(vo.getUserWayDiv());
			String fileNameTail = ".BMP";
			String fileName = fileNameHeader + vo.getDvcName() + fileNameTail;
			return ftpHandler.writeBmp(fileName, vo.getAttFile());
		}else {
			return true;
		}
	}
	
	public boolean writeSCHFile(DestinationVO vo) {
		String fileNameHeader = DLCDMapper.SM0105G2S1(vo.getDvcKindCd()).getTxtVal2();
		//String updown = DLCDMapper.SM0105G2S2(vo.getUserWayDiv());
		String fileNameTail = ".SCH";
		String fileName = fileNameHeader + vo.getDvcName() + fileNameTail;
		return ftpHandler.writeSCH(vo.getVoList(), fileName);
	}
	
	public boolean writeBmpFileLOGO(DestinationVO vo) {
		if(vo.getAttFile() != null) {
			String fileNameHeader = vo.getDvcKind();
			String fileNameTail = ".BMP";
			String fileName = fileNameHeader + vo.getDvcName() + fileNameTail;
			return ftpHandler.writeBmp(fileName, vo.getAttFile());
		}else {
			return true;
		}
	}
	
	public boolean writeSCHFileLOGO(DestinationVO vo) {
		String fileNameHeader = vo.getDvcKind();
		String fileNameTail = ".SCH";
		String fileName = fileNameHeader + vo.getDvcName() + fileNameTail;
		return ftpHandler.writeSCH(vo.getVoList(), fileName);
	}
	
	public CommonCodeDetailInfoVO getHeader(String value) {
		return DLCDMapper.SM0105G2S1(value);
	}
	
}
