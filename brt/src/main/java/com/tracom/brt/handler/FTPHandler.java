package com.tracom.brt.handler;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Vector;
import java.util.stream.Collectors;

import javax.inject.Inject;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.SystemUtils;
import org.apache.tika.metadata.Metadata;
import org.apache.tika.parser.ParseContext;
import org.apache.tika.parser.mp4.MP4Parser;
import org.apache.tika.sax.BodyContentHandler;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.ChannelSftp.LsEntry;
import com.jcraft.jsch.SftpException;
import com.tracom.brt.code.GlobalConstants;
import com.tracom.brt.domain.BM0104.BmRoutInfoVO;
import com.tracom.brt.domain.BM0104.BmRoutNodeInfoVO;
import com.tracom.brt.domain.BM0501.DestinationVO;
import com.tracom.brt.domain.BM0605.VideoInfoVO;
import com.tracom.brt.domain.voice.VoiceInfoVO;
import com.tracom.brt.domain.voice.VoiceService;
import com.tracom.brt.utils.Utils;

@Component
public class FTPHandler {
	@Value("${sftp.remote.directory}")
	private String ROOT_SERVER_PATH;
	
	@Value("${sftp.linux.local.directory}")
	private String ROOT_LINUX_LOCAL_PATH;
	
	@Value("${sftp.windows.local.directory}")
	private String ROOT_WINDOWS_LOCAL_PATH;
	
	@Value("${sftp.audio.directory}")
	private String COMMON_AUDIO_PATH;
	
	@Value("${sftp.route.audio.directory}")
	private String ROUTE_AUDIO_PATH;
	
	@Value("${sftp.route.directory}")
	private String ROUTE_PATH;
	
	@Value("${sftp.destination.directory}")
	private String DESTINATION_PATH;
	
	@Value("${sftp.destination.images}")
	private String DESTINATION_IMAGES_PATH;
	
	@Value("${sftp.destination.list}")
	private String DESTINATION_LIST_PATH;
	
	@Inject
	private ChannelSftp sftpChannel;
	
	@Inject
	private VoiceService voiceService;
    
	private File ROOT_LOCAL_DIRECTORY;
	
	private ArrayList<String> serverContentList;
	private ArrayList<String> pathList;
	private ArrayList<String> ignoreList;
	
	// 승무사원 관리 승무사원 사진 업로드
	public void uploadBM0108(String fileName, MultipartFile file) {
		String dir1 = Paths.get(getRootLocalPath(), "/common/employee").toString();
		String dir2 = Paths.get(getRootLocalPath(), "/vehicle").toString();
		//String fileName = id + "." + FilenameUtils.getExtension(file.getOriginalFilename());
		//String fileName = id + "." + "JPG";//그냥 다 jpg로 저장하게끔...
		
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
	
	//BM0205 펌웨어파일 업로드
	public void uploadBM0205(String id, MultipartFile file) {
		String dir = Paths.get(getRootLocalPath() , "/device/firmware").toString();
		String ext = FilenameUtils.getExtension(file.getOriginalFilename());
		String fileName;
		
		//행선지안내기 OR 다른장비
		System.out.println(id.substring(10, 12));
		if(id.substring(10, 12).equals("RD")) {
			fileName = "SF2016." + ext;
		}else {
			fileName = "firmware." + ext;
		}
		File saveFile = Paths.get(dir, fileName).toFile();
		
		try {
			FileUtils.writeByteArrayToFile(saveFile, file.getBytes());
		} catch(Exception e){
			e.printStackTrace();
		}
		
	}
	

	//BM0606 영상, 이미지파일 업로드
	public void uploadBM0605(String id, MultipartFile file, String type) {
		String dir = Paths.get(getRootLocalPath(), "/common/video").toString();
		
		String ext = null;
		String fileName = null;
		File saveFile = null;
		
		switch(type) {
		case "video" : 
			ext = FilenameUtils.getExtension(file.getOriginalFilename());
			fileName = id + "." + ext;
			saveFile = Paths.get(dir, fileName).toFile();			
			break;
		case "image" : 
			ext = "JPG";
			fileName = id + "." + ext;
			saveFile = Paths.get(dir, fileName).toFile();			
			break;
		}
		
		try {
			FileUtils.writeByteArrayToFile(saveFile, file.getBytes());
		} catch(Exception e){
			e.printStackTrace();
		}
		
		
		try {
		} catch (Exception e1) {
			e1.printStackTrace();
		}
	}

	//BM0605 mp4파일 정보 리턴
	public VideoInfoVO parseMp4(String fileName) throws Exception{
		BodyContentHandler handler = new BodyContentHandler(-1);
		VideoInfoVO result = new VideoInfoVO();
		
		Metadata metadata = new Metadata();
		String path = Paths.get(getRootLocalPath(), "/common/video").toString();
		File file = new File(path + "/" + fileName);
		
		FileInputStream inputstream = new FileInputStream(file);
		ParseContext pcontext = new ParseContext();
		
		MP4Parser MP4Parser = new MP4Parser();
		MP4Parser.parse(inputstream, handler, metadata, pcontext);
		
		//String[] metadataNames = metadata.names();
		
		result.setFileSize(file.length());
		
		if(metadata.get("xmpDM:duration") != null) {
			result.setPlayTm(Math.round(Float.parseFloat((metadata.get("xmpDM:duration")))));
			return result;
		}else {
			return result;
		}
	}
	
	//null이면 공백으로 처리
	public String checkNull(Object txt) {
		if(txt == null) {
			return "";
		}
		else {
			if( txt.equals("null") || txt.equals("NULL") ) {
				return "";
			}else {
				return String.valueOf(txt);
			}
		}
	}
	//busstop_version.csv 생성
	public void uploadBusstop(List<BmRoutNodeInfoVO> stopList, String fileName) throws FileNotFoundException, IOException {
		String txt = GlobalConstants.CSVForms.ROUTE_BUSSTOP_TITLE;
		for(BmRoutNodeInfoVO vo : stopList) {
				txt += GlobalConstants.CSVForms.ROW_SEPARATOR +
					checkNull(vo.getNodeId()) 	+ GlobalConstants.CSVForms.COMMA +
					checkNull(vo.getNodeNm()) 	+ GlobalConstants.CSVForms.COMMA +
					checkNull(vo.getNodeType()) + GlobalConstants.CSVForms.COMMA +
					checkNull(vo.getRange())	+ GlobalConstants.CSVForms.COMMA +
					checkNull(vo.getX()) 		+ GlobalConstants.CSVForms.COMMA +
					checkNull(vo.getY()) 		+ GlobalConstants.CSVForms.COMMA +
					checkNull(vo.getNodeEname());
		}
		
		String path = Paths.get(getRootLocalPath(), getRoutePath()).toString();
		File file = new File(path + "/" + fileName);
		
		try {
			Utils.createCSV(file, txt);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	//node_version.csv 생성
	public void uploadNodeList(List<BmRoutNodeInfoVO> nodeList, String fileName) throws FileNotFoundException, IOException {
		String txt = GlobalConstants.CSVForms.ROUTE_NODELIST_TITLE;
		for(BmRoutNodeInfoVO vo : nodeList) {
				txt += GlobalConstants.CSVForms.ROW_SEPARATOR +
					checkNull(vo.getNodeId()) 	+ GlobalConstants.CSVForms.COMMA +
					checkNull(vo.getNodeNm()) 	+ GlobalConstants.CSVForms.COMMA +
					checkNull(vo.getRange())	+ GlobalConstants.CSVForms.COMMA +
					checkNull(vo.getX()) 		+ GlobalConstants.CSVForms.COMMA +
					checkNull(vo.getY())		;
		}
		
		String path = Paths.get(getRootLocalPath(), getRoutePath()).toString();
		File file = new File(path + "/" + fileName);
		
		try {
			Utils.createCSV(file, txt);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	//routelist.csv 생성
	public void uploadRouteList(List<BmRoutInfoVO> routeList, String fileName) {
		
		String txt = "";
		for(BmRoutInfoVO vo : routeList) {
			if(vo.getFileName() != null) {
				txt += vo.getFileName() + GlobalConstants.CSVForms.ROW_SEPARATOR;
			}
		}
		
		String path = Paths.get(getRootLocalPath(), getRoutePath()).toString();
		File file = new File(path + "/" + fileName);
		
		try {
			Utils.createCSV(file, txt);
			//FileUtils.writeStringToFile(file, txt, Charset.forName("CP949"));
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	//노선별 노드리스트.csv생성
	public void uploadRouteNodeList(List<BmRoutInfoVO> routeList) {
		String path = Paths.get(getRootLocalPath(), getRoutePath()).toString();
		for(BmRoutInfoVO vo : routeList) {
			if(vo.getFileName() == null) {
				continue;
			}
			String txt = GlobalConstants.CSVForms.ROUTE_TITLE;
			String fileName = vo.getFileName();
			
			for(BmRoutNodeInfoVO node : vo.getNodeList()) {
				txt += GlobalConstants.CSVForms.ROW_SEPARATOR + node.getNodeId();
			}
			
			File file = new File(path + "/" + fileName);
			
			try {
				Utils.createCSV(file, txt);
			} catch (Exception e) {
				e.printStackTrace();
			}
			
		}
	}
	
	//BMP파일 write
	public boolean writeBmp(String fileName, MultipartFile file) {
		String path = Paths.get(getRootLocalPath(), getDestinationPath(), getDestinationImagesPath()).toString();
		
		File saveFile = Paths.get(path, "/" ,fileName).toFile();
		try {
			FileUtils.writeByteArrayToFile(saveFile, file.getBytes());
			processSynchronize();
			return true;
		} catch(Exception e) {
			e.printStackTrace();
			return false;
		}
		
	}
	
	//SCH파일 read
	public List<DestinationVO> readSCH(String fileName) throws IOException {
		String path = Paths.get(getRootLocalPath(), getDestinationPath(), getDestinationImagesPath()).toString();
		
		File file = new File(path + "/" + fileName);
		FileReader fr = null;
		List<DestinationVO> list = new ArrayList<>();
		try {
			fr = new FileReader(file);
		} catch (FileNotFoundException e) {
			createSCH(fileName);
			fr = new FileReader(file);
		}
        //입력 버퍼 생성
        BufferedReader br = new BufferedReader(fr);
        String line = "";
        String[] tmp = null;
        
        while((line = br.readLine()) != null){
        	DestinationVO vo = new DestinationVO();
        	tmp = line.split("\t");
        	
        	vo.setFrameNo(tmp[0]);
        	vo.setEffType(tmp[1]);
        	vo.setEffSpeed(tmp[2]);
        	vo.setShowTime(tmp[3]);
        	
        	list.add(vo);
        }
        br.close();
        
        return list;
		
	}
	
	public boolean createSCH(String fileName) {
		List<DestinationVO> realList = new ArrayList<>();
		
		for(int i = 0; i < 10; i ++) {
			DestinationVO vo = new DestinationVO();
			int seq = i + 1;
			vo.setFrameNo("FRAME" + seq);
			vo.setEffType("01");
			vo.setEffSpeed("05");
			vo.setShowTime("0000");
			realList.add(vo);
		}
		
		return writeSCH(realList, fileName);
	}
	
	//SCH파일 write
	public boolean writeSCH(List<DestinationVO> list, String fileName) {
		String path = Paths.get(getRootLocalPath(), getDestinationPath(), getDestinationImagesPath()).toString();
		String txt = "";
		
		for(int i = 0; i < list.size(); i++) {
			if(i == 0) {
				txt += list.get(i).getFrameNo() + GlobalConstants.SCH.TAB + list.get(i).getEffType() + GlobalConstants.SCH.TAB + String.format("%02d", Integer.valueOf(list.get(i).getEffSpeed())) + GlobalConstants.SCH.TAB + String.format("%04d", Integer.valueOf(list.get(i).getShowTime()));
			}else {
				
				txt += GlobalConstants.CSVForms.ROW_SEPARATOR
						+ list.get(i).getFrameNo() + GlobalConstants.SCH.TAB + list.get(i).getEffType() + GlobalConstants.SCH.TAB + String.format("%02d", Integer.valueOf(list.get(i).getEffSpeed())) + GlobalConstants.SCH.TAB + String.format("%04d", Integer.valueOf(list.get(i).getShowTime()));
			}
			
			
		}
		
		File file = new File(path + "/" + fileName);
		
		try {
			Utils.createCSV(file, txt);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
	
	/*
	// 노선선택별 음성 저장 시 재생 리스트 저장
	public boolean uploadBM0404(VoiceInfoVO vo) {
		try {
			SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
			String id = vo.getVocId();
			String playStDate = format.format(format.parse(vo.getPlayStDate()));
			String playEdDate = format.format(format.parse(vo.getPlayEdDate()));
			String routeId = vo.getRoutId();
			
			File playList = new File(Paths.get(getRootLocalPath(), "/route", routeId, "/playlist/AG0000000.csv").toString());
			
			String content =
				GlobalConstants.CSVForms.VOICE_PLAYLIST_TITLE + "1," + GlobalConstants.PlayListVoiceTypes.ROUTE + "," + id + GlobalConstants.VoiceTypes.RT + ".wav," + playStDate + "," + playEdDate + ",";
		
			Utils.createCSV(playList, content);
		} catch(Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	//*/
	
	// 음성파일(WAV, TTS) 업로드
	public boolean uploadVoice(VoiceInfoVO vo) {
    	if(vo.getPlayType().equals("TTS")) {
    		return uploadVoiceTTS(vo);
    	} else if(vo.getPlayType().equals("WAV")) {
    		if(vo.getWavFile() != null && vo.getWavFile().getSize() != 0) {
    			return uploadVoiceWAV(vo);
    		}
    	}
		return true;
    }
	
	// 음성파일(WAV) 업로드
	public boolean uploadVoiceWAV(VoiceInfoVO vo) {
		String id = vo.getVocId();
		MultipartFile file = vo.getWavFile();
		
		String dir = Paths.get(getRootLocalPath(), getCommonAudioPath()).toString();
		String fileName = id +  GlobalConstants.VoiceTypes.US + "." + FilenameUtils.getExtension(file.getOriginalFilename());
		String fileNameKr = id + GlobalConstants.VoiceTypes.KR + ".wav";
		String fileNameEn = id + GlobalConstants.VoiceTypes.EN + ".wav";
		
		// 노선 선택별 음성일 경우
		String routId = vo.getRoutId();
		if(routId != null && !routId.equals("")) {
			dir = Paths.get(getRootLocalPath(), getRouteAudioPath()).toString(); 
			fileName = routId + ".wav";
		}
		
		File saveFile = Paths.get(dir, fileName).toFile();
		File ttsKrFile = Paths.get(dir, fileNameKr).toFile();
		File ttsEnFile = Paths.get(dir, fileNameEn).toFile();
		try {
			FileUtils.writeByteArrayToFile(saveFile, file.getBytes());
			
			vo.setPlayTm(Utils.getAudioTotalTime(saveFile));
			
			if(ttsKrFile.exists()) {
				ttsKrFile.delete();
			}
			
			if(ttsEnFile.exists()) {
				ttsEnFile.delete();
			}
			
			processSynchronize();
		} catch(Exception e) {
			e.printStackTrace();
			return false;
		}
		
		return true;
	}
	
	// 음성 TEMP파일(WAV) MP3로 업로드
	public void uploadWavTemp(MultipartFile file) {
		String dir = Paths.get(getRootLocalPath(), "/temp/wav_temp.wav").toString();
		File saveFile = Paths.get(dir).toFile();
		File tempFile = Paths.get(getRootLocalPath(), "/temp/wav_temp.mp3").toFile();
		
		try {
			FileUtils.writeByteArrayToFile(saveFile, file.getBytes());
			Utils.wavToMp3(saveFile, tempFile);
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	// 음성파일(TTS) 업로드
	public boolean uploadVoiceTTS(VoiceInfoVO vo) {
		String id = vo.getVocId();
		String krText = vo.getKrTts();
		String enText = vo.getEnTts();
		String chimeYn = vo.getChimeYn();
		
		String dir = Paths.get(getRootLocalPath(), getCommonAudioPath()).toString();
		String fileName = id + GlobalConstants.VoiceTypes.US + ".wav";
		String fileNameKr = id + GlobalConstants.VoiceTypes.KR + ".wav";
		String fileNameEn = id + GlobalConstants.VoiceTypes.EN + ".wav";
		
		String routId = vo.getRoutId();
		if(routId != null && !routId.equals("")) {
			dir = Paths.get(getRootLocalPath(), getRouteAudioPath()).toString(); 
			fileName = routId + ".wav";
			fileNameKr = routId + ".wav";
		}
		
		int ttsKrPlayTm = 0;
		int ttsEnPlayTm = 0;
		
		File ttsKrFile = new File(Paths.get(dir, fileNameKr).toString());
		File ttsEnFile = new File(Paths.get(dir, fileNameEn).toString());
		File file = new File(Paths.get(dir, fileName).toString());
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
			if(file.exists()) {
				file.delete();
			}
			
			processSynchronize();
		} catch(Exception e) {
			e.printStackTrace();
			return false;
		}
		
		return true;
	}
	
	// 음성 삭제시 저장된 음성파일 삭제
	public void deleteVoice(VoiceInfoVO vo) {
		String playType = vo.getPlayType();
		String id = vo.getVocId();
		String fileName = id + GlobalConstants.VoiceTypes.US + ".wav";
		String fileNameKr = id + GlobalConstants.VoiceTypes.KR + ".wav";
		String fileNameEn = id + GlobalConstants.VoiceTypes.EN + ".wav";
		String dir = Paths.get(getRootLocalPath(), getCommonAudioPath()).toString();
		
		String routId = vo.getRoutId();
		
		try {
			if(routId != null && !routId.equals("")) {
				File file = Paths.get(getRouteAudioPath(), routId + ".wav").toFile();
				
				if(file.exists()) {
					file.delete();
				}
			} else if(playType.equals("TTS")) {
				File ttsKrFile = Paths.get(dir, fileNameKr).toFile();
				File ttsEnFile = Paths.get(dir, fileNameEn).toFile();
				
				if(ttsKrFile.exists()) {
					ttsKrFile.delete();
				}
				
				if(ttsEnFile.exists()) {
					ttsEnFile.delete();
				}
			} else if(playType.equals("WAV")) {
				File file = Paths.get(dir, fileName).toFile();
				
				if(file.exists()) {
					file.delete();
				}
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
		
		ROOT_LOCAL_DIRECTORY = new File(getRootLocalPath());
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
		ignoreList = new ArrayList<String>();
		
		ignoreList.add("temp");
		ignoreList.add("chime");
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
		
		for(int i = 0; i < localList.length; i++) {
			// 동기화 체크용 플래그
			boolean check = false;
			
			for(String ignoreFile : ignoreList) {
				if(localList[i].getName().contains(ignoreFile)) {
					check = true;
					break;
				}
			}
			
			// 동기화하지 않을 파일일 경우 continue
			if(check) {
				continue;
			}
			
			if(localList[i].isDirectory()){
				if(!checkFolder(localList[i], serverDir)) {
					newFileMaster(localList[i], serverDir);
				}
				
				// 재귀 돌면서 디렉토리 구조 동기화
				synchronize(localList[i], serverDir + "/" + localList[i].getName());
			} else {
				checkFile(localList[i], serverDir);
			}
			deleteFromLists(localList[i].getName());
		}
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
		if(SystemUtils.IS_OS_WINDOWS) {
			return ROOT_WINDOWS_LOCAL_PATH;
		} else if(SystemUtils.IS_OS_LINUX) {
			return ROOT_LINUX_LOCAL_PATH;
		} else {
			return ROOT_LINUX_LOCAL_PATH;
		}
	}
	
	public String getCommonAudioPath() {
		return COMMON_AUDIO_PATH;
	}
	
	public String getRouteAudioPath() {
		return ROUTE_AUDIO_PATH;
	}
	
	public String getRoutePath() {
		return ROUTE_PATH;
	}
	
	public String getDestinationPath() {
		return DESTINATION_PATH;
	}
	
	public String getDestinationImagesPath() {
		return DESTINATION_IMAGES_PATH;
	}
	
	public String getDestinationListPath() {
		return DESTINATION_LIST_PATH;
	}
}
