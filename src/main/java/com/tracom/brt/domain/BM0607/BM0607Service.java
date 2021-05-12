package com.tracom.brt.domain.BM0607;


import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import javax.inject.Inject;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jcraft.jsch.SftpException;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.handler.FTPHandler;

@EnableScheduling
@Service
public class BM0607Service extends BaseService<VdoRsvVO, String>{

	@Inject
	private BM0607Mapper mapper;
	
	@Inject
	private FTPHandler handler;
	
	public List<VdoRsvVO> BM0607G1S0(){
		return mapper.BM0607G1S0();
	}

	@Transactional
	public boolean BM0607G1I0(VdoRsvVO vo){
		List<String> impList = new ArrayList<>();
		for(VdoRsvVO v : vo.getVoList()) {
			impList.add(v.getMngId().substring(0, 10));
		}
		
		List<String> impDisList = new ArrayList<>();
		HashSet<String> distinctList = new HashSet<String>(impList);
		//관리아이디 목록
		impDisList = new ArrayList<String>(distinctList);
		
		/** 영상 복사 **/
		for(VdoRsvVO v : vo.getVoList()) {
			v.setRsvDate(vo.getRsvDate());
			v.setOrgaId(vo.getOrgaId());
			v.setImpId(v.getMngId().substring(0, 10));
			v.setDvcId(v.getMngId().substring(10));
			
			try {
				boolean t = handler.reserveVideo(v);
				if(t == false) {
					return false;
				}
				if(mapper.BM0607G1I0(v) > 0) {
					if(mapper.BM0607G1I1(v) <= 0) {
						return false;
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
				return false;
			}
			/*
			 * if(mapper.BM0607G1I0(v) > 0) { if(mapper.BM0607G1I1(v) > 0) {
			 * v.setImpId(v.getMngId().substring(0, 10));
			 * v.setDvcId(v.getMngId().substring(10)); try { boolean t =
			 * handler.reserveVideo(v); if(t == false) { return false; } } catch (Exception
			 * e) { e.printStackTrace(); return false; }
			 * 
			 * } }
			 */
		}
		
		/**예약 종료 후 파일정리**/
		for(String impId : impDisList) {
			List<String> screenList = mapper.getScreenId(impId);
			List<String> impVdoList;
			try {
				impVdoList = handler.impVdoFiles(impId, screenList);
			} catch (IOException e) {
				e.printStackTrace();
				return false;
			}
			String toPath = Paths.get(handler.getRootLocalPath(), "/vehicle", "/", impId, "/device/passenger").toString();
			File path = new File(toPath);
			File[] files = path.listFiles();
			
			try {
				handler.getForDel(files, impVdoList, impId);
			} catch (SftpException e) {
				e.printStackTrace();
				return false;
			}
			
		}
		
		/** 영상 싱크로나이즈 **/
		for(VdoRsvVO v : vo.getVoList()) {
			handler.syncVdoFile(v);
		}
		
		return true;
	}
}