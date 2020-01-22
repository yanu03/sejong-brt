package com.tracom.brt.handler;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.Vector;
import java.util.stream.Collectors;

import javax.inject.Inject;

import org.apache.commons.io.FileDeleteStrategy;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.ChannelSftp.LsEntry;
import com.jcraft.jsch.SftpException;
import com.tracom.brt.domain.voice.VoiceInfoVO;
import com.tracom.brt.domain.voice.VoiceService;
import com.tracom.brt.utils.Utils;

@Component
public class FTPHandler {
	@Value("${sftp.remote.directory}")
    public String ROOT_SERVER_PATH;
	
	@Value("${sftp.local.directory}")
    public String ROOT_LOCAL_PATH;
	
	@Inject
	private ChannelSftp sftpChannel;
	
	@Inject
	private VoiceService voiceService;
    
	private File ROOT_LOCAL_DIRECTORY;
	
	private ArrayList<String> serverContentList;
	private ArrayList<String> pathList;
	
	// 승무사원 관리 승무사원 사진 업로드
	public void uploadBM0108(String id, MultipartFile file) {
		String dir1 = Paths.get(ROOT_LOCAL_PATH, "/common/employee").toString();
		String dir2 = Paths.get(ROOT_LOCAL_PATH, "/vehicle").toString();
		//String fileName = id + "." + FilenameUtils.getExtension(file.getOriginalFilename());
		String fileName = id + "." + "jpg";//그냥 다 jpg로 저장하게끔...
		
		File saveFile = Paths.get(dir1, fileName).toFile();
		try {
			FileUtils.writeByteArrayToFile(saveFile, file.getBytes());
			
			File[] fileList = Paths.get(dir2).toFile().listFiles();
			
			if(fileList != null) {
				for(int i = 0; i < fileList.length; i++) {
					FileUtils.writeByteArrayToFile(Paths.get(dir2, fileList[i].getName(), "/employee", fileName).toFile(), file.getBytes());
				}
			}
			
			processSynchronize();
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	
	// 음성파일(WAV, TTS) 업로드
	public void uploadVoice(VoiceInfoVO vo) {
    	if(vo.getPlayType().equals("TTS")) {
    		uploadVoiceTTS(vo);
    	} else if(vo.getPlayType().equals("WAV")) {
    		if(vo.getWavFile() != null && vo.getWavFile().getSize() != 0) {
    			uploadVoiceWAV(vo);
    		}
    	}
    }
	
	// 음성파일(WAV) 업로드
	public void uploadVoiceWAV(VoiceInfoVO vo) {
		String id = vo.getVocId();
		MultipartFile file = vo.getWavFile();
		
		String dir = Paths.get(ROOT_LOCAL_PATH, "/common/audio").toString();
		String fileName = id + "." + FilenameUtils.getExtension(file.getOriginalFilename());
		String fileNameKr = id + "_KR.wav";
		String fileNameEn = id + "_EN.wav";
		
		String routId = vo.getRoutId();
		if(routId != null && !routId.equals("")) {
			fileName = routId + "_select.wav";
		}
		
		File saveFile = Paths.get(dir, fileName).toFile();
		Path ttsKrFile = Paths.get(dir, fileNameKr);
		Path ttsEnFile = Paths.get(dir, fileNameEn);
		try {
			FileUtils.writeByteArrayToFile(saveFile, file.getBytes());
			
			vo.setPlayTm(Utils.getAudioTotalTime(saveFile));
			
			// 기존 TTS WAV파일 삭제
			Files.delete(ttsKrFile);
			Files.delete(ttsEnFile);
			
			processSynchronize();
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	// 음성 TEMP파일(WAV) MP3로 업로드
	public void uploadWavTemp(MultipartFile file) {
		String dir = Paths.get(ROOT_LOCAL_PATH, "/temp/wav_temp.wav").toString();
		File saveFile = Paths.get(dir).toFile();
		
		try {
			FileUtils.writeByteArrayToFile(saveFile, file.getBytes());
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	// 음성파일(TTS) 업로드
	public void uploadVoiceTTS(VoiceInfoVO vo) {
		String id = vo.getVocId();
		String krText = vo.getKrTts();
		String enText = vo.getEnTts();
		String chimeYn = vo.getChimeYn();
		
		String dir = Paths.get(ROOT_LOCAL_PATH, "/common/audio").toString();
		String fileName = id + ".wav";
		String fileNameKr = id + "_KR.wav";
		String fileNameEn = id + "_EN.wav";
		
		String routId = vo.getRoutId();
		if(routId != null && !routId.equals("")) {
			fileNameKr = routId + "_select.wav";
		}
		
		int ttsKrPlayTm = 0;
		int ttsEnPlayTm = 0;
		
		File ttsKrFile = Paths.get(dir, fileNameKr).toFile();
		File ttsEnFile = Paths.get(dir, fileNameEn).toFile();
		Path file = Paths.get(dir, fileName);
		try {
			if(krText != null && !krText.equals("")) {
				FileUtils.writeByteArrayToFile(ttsKrFile, voiceService.getWavBuffer(krText, 0, 0, chimeYn));
				ttsKrPlayTm = Utils.getAudioTotalTime(ttsKrFile);
			}
			
			if(enText != null && !enText.equals("")) {
				FileUtils.writeByteArrayToFile(ttsEnFile, voiceService.getWavBuffer(enText, 1, 2, "N"));
				ttsEnPlayTm = Utils.getAudioTotalTime(ttsEnFile);
			}
			
			// 재생시간 계산
			vo.setPlayTm(ttsKrPlayTm + ttsEnPlayTm);
			
			// 기존 WAV 업로드 삭제
			Files.delete(file);
			
			processSynchronize();
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	// 음성 삭제시 저장된 음성파일 삭제
	public void deleteVoice(VoiceInfoVO vo) {
		String playType = vo.getPlayType();
		String id = vo.getVocId();
		String fileName = id + ".wav";
		String fileNameKr = id + "_KR.wav";
		String fileNameEn = id + "_EN.wav";
		String dir = Paths.get(ROOT_LOCAL_PATH, "/common/audio").toString();
		
		String routId = vo.getRoutId();
		
		try {
			if(routId != null && !routId.equals("")) {
				Path path = Paths.get(dir, routId + "_select.wav");
				Files.delete(path);
			} else if(playType.equals("TTS")) {
				Path ttsKrFile = Paths.get(dir, fileNameKr);
				Path ttsEnFile = Paths.get(dir, fileNameEn);
				
				Files.delete(ttsKrFile);
				Files.delete(ttsEnFile);
			} else if(playType.equals("WAV")) {
				Path path = Paths.get(dir, fileName);
				Files.delete(path);
			}
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	// 서버FTP와 Synchronization
	private void processSynchronize() throws Exception {
		setServerDirectory();
		synchronize(ROOT_LOCAL_DIRECTORY, ROOT_SERVER_PATH);
	}
	
	/************************************************************************ FTP 공통 모듈 *****************************************************************************************/
	// 초기 디렉토리 셋팅
	private void setServerDirectory() throws SftpException {
		try{
			sftpChannel.cd(ROOT_SERVER_PATH);
		}catch(Exception e){
			System.out.println(ROOT_SERVER_PATH + " don't exist on your server!");
			e.printStackTrace();
		}
		
		ROOT_LOCAL_DIRECTORY = new File(ROOT_LOCAL_PATH);
		String serverFolder = ROOT_SERVER_PATH.substring(ROOT_SERVER_PATH.lastIndexOf('/') + 1, ROOT_SERVER_PATH.length());
		if(!ROOT_LOCAL_DIRECTORY.getName().equals(serverFolder)){
			try{
				sftpChannel.mkdir(ROOT_LOCAL_DIRECTORY.getName());
				sftpChannel.cd(ROOT_LOCAL_DIRECTORY.getName());
			} catch (Exception e){
				sftpChannel.cd(ROOT_LOCAL_DIRECTORY.getName());
			}
			ROOT_SERVER_PATH = ROOT_SERVER_PATH + "/" + ROOT_LOCAL_DIRECTORY.getName();
		}
		
		serverContentList = new ArrayList<String>();
		pathList = new ArrayList<String>();
	}
	
	// 서버 폴더 내 목록 가져오기
	public void setToContentList(String serverFolder) throws SftpException{
		@SuppressWarnings("unchecked")
		Vector<LsEntry> fileList = sftpChannel.ls(serverFolder);
		int size = fileList.size();
		for(int i = 0; i < size; i++){
			if(!fileList.get(i).getFilename().startsWith(".")){
				serverContentList.add(fileList.get(i).getFilename());
				pathList.add(serverFolder);
			}
		}
	}
	
	/*
	 * Deletes the synchronized elements from the Lists
	 */
	public void deleteFromLists(String name){
		int	position = serverContentList.lastIndexOf(name);
				
		if(position >= 0){	
			serverContentList.remove(position);
			pathList.remove(position);
		}
	}
	
	/*
	 * FTP synchronization 
	 */
	@SuppressWarnings("unchecked")
	private void synchronize(File localFolder, String serverDir) throws SftpException, FileNotFoundException{
		if(sftpChannel.pwd() != serverDir){
			sftpChannel.cd(serverDir);
		}
		setToContentList(serverDir);
		
		// 로컬 폴더 파일 리스트
		File[] localList = localFolder.listFiles();
		
		int size = localList.length;
		for(int i = 0; i < size; i++) {
			if(localList[i].isDirectory()){
				if(!checkFolder(localList[i], serverDir)){
					newFileMaster(localList[i], serverDir);
				}
				
				// 재귀 돌면서 디렉토리 구조 동기화
				synchronize(localList[i], serverDir + "/" + localList[i].getName());
				deleteFromLists("SubFolder");
			} else {
				checkFile(localList[i], serverDir);
			}
			deleteFromLists(localList[i].getName());
		}
		
		/********************************** 로컬에 없는 폴더 및 파일 FTP서버에서 삭제 **************************************/
		Vector<LsEntry> serverList = sftpChannel.ls(serverDir);
		
		serverList = serverList.stream().filter(l -> {
			return !l.getFilename().equals("..") && !l.getFilename().equals(".");
		}).collect(Collectors.toCollection(Vector::new));
		
		
		for(int i = 0; i < localList.length; i++){
			final int index = i;
			serverList = serverList.stream()
							.filter(l ->  !l.getFilename().equals(localList[index].getName()))
							.collect(Collectors.toCollection(Vector::new));
		}
		
		// 로컬 디렉토리에 없는 파일이 FTP서버에 존재할 경우 삭제
		serverList.forEach(l -> {
			String path = serverDir + "/" + l.getFilename();
			try {
				if(sftpChannel.stat(path).isDir()) {
					recursiveDirectoryDelete(serverDir + "/" + l.getFilename());
				} else {
					sftpChannel.rm(serverDir + "/" + l.getFilename());
				}
			} catch (SftpException e) {
				e.printStackTrace();
			}
		});
		//*/
		/*******************************************************************************************************/
	}
	
	/*
	 * 해당 경로에 파일 덮어쓰기
	 */
	private void newFileMaster(File sourcePath, String destPath) throws FileNotFoundException, SftpException {
    	try {
    		sftpChannel.cd(destPath);
    		if(sourcePath.isDirectory()) {
    			sftpChannel.mkdir(sourcePath.getName());
    		} else {
	    		BufferedInputStream ios = new BufferedInputStream(new FileInputStream(sourcePath));
	        	sftpChannel.put(ios, sourcePath.getName());
				ios.close();
    		}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/*
	 *  해당 폴더 및 하위 내용 모두 삭제
	 */
	@SuppressWarnings("unchecked")
	private void recursiveDirectoryDelete(String path) throws SftpException {
	    Collection<ChannelSftp.LsEntry> fileAndFolderList = sftpChannel.ls(path);

	    for (ChannelSftp.LsEntry item : fileAndFolderList) {
	        if (!item.getAttrs().isDir()) {
	            sftpChannel.rm(path + "/" + item.getFilename());
	        } else if (!(".".equals(item.getFilename()) || "..".equals(item.getFilename()))) {
	            try {
	            	sftpChannel.rmdir(path + "/" + item.getFilename());
	            } catch (Exception e) { 
	            	recursiveDirectoryDelete(path + "/" + item.getFilename());
	            }
	        }
	    }
	    sftpChannel.rmdir(path);
	}
	
	/*
	 * FTP 서버에 파일이 있는지 검사 후 없으면 생성 있으면 수정 날짜 비교 후 덮어쓰기
	 */
	private void checkFile(File file, String path) throws SftpException, FileNotFoundException{
		sftpChannel.cd(path);
		
		if(!serverContentList.contains(file.getName())){
			newFileMaster(file, path);
		} else {
			Long localTimeStamp = file.lastModified();
			Long timeStamp =  sftpChannel.stat(file.getName()).getMTime() * 1000L;
			
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date localDate = null;
			Date remoteDate = null;
			try {
				localDate = format.parse(format.format(localTimeStamp));
				remoteDate = format.parse(format.format(timeStamp));
			} catch (ParseException e) {
				e.printStackTrace();
			}

			if(localDate.compareTo(remoteDate) == 1){
				newFileMaster(file, path);
			}
		}
		deleteFromLists(file.getName());
	}
	
	/*
	 * 해당 경로의 폴더가 있는지 검사
	 */
	private boolean checkFolder(File folder, String path) throws SftpException{
		sftpChannel.cd(path);
		
		if(serverContentList.contains(folder.getName())){
			return true;
		} else { 
			return false;
		}
	}
	/*************************************************************************************************************************************************************************************/
	
	
	public String getRootServerPath() {
		return ROOT_SERVER_PATH;
	}
	
	public String getRootLocalPath() {
		return ROOT_LOCAL_PATH;
	}
}
