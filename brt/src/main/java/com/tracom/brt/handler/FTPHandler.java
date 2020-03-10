package com.tracom.brt.handler;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.ChannelSftp.LsEntry;
import com.jcraft.jsch.SftpATTRS;
import com.jcraft.jsch.SftpException;
import com.tracom.brt.code.GlobalConstants;
import com.tracom.brt.domain.BM0104.BmRoutNodeInfoVO;
import com.tracom.brt.domain.BM0405.VoiceOrganizationVO;
import com.tracom.brt.domain.BM0501.DestinationVO;
import com.tracom.brt.domain.BM0503.RoutRsvVO;
import com.tracom.brt.domain.BM0605.VideoInfoVO;
import com.tracom.brt.domain.BM0607.BM0607Mapper;
import com.tracom.brt.domain.BM0607.VdoRsvVO;
import com.tracom.brt.domain.BM0608.BmScrInfoVO;
import com.tracom.brt.domain.BM0609.BM0609Service;
import com.tracom.brt.domain.BM0609.ScrRsvVO;
import com.tracom.brt.domain.BM0801.BM0801Mapper;
import com.tracom.brt.domain.SM0105.SM0105Mapper;
import com.tracom.brt.domain.routeReservation.RoutListCSVVO;
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
	
	@Value("${sftp.employee.directory}")
	private String COMMON_EMPLOYEE_PATH;
	
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
	
	@Value("${sftp.routeori.directory}")
	private String ROUTE_ORI;
	
	@Value("${sftp.device.firmware.directory}")
	private String DEVICE_FIRMWARE_PATH;
	
	@Value("${sftp.vehicle.directory}")
	private String VEHICLE_PATH;
	
	@Value("${sftp.device.directory}")
	private String DEVICE_PATH;
	
	@Value("${sftp.device.config.directory}")
	private String DEVICE_CONFIG_PATH;
	
	@Value("${sftp.device.passenger.directory}")
	private String DEVICE_PASSENGER_PATH;
	
	@Value("${sftp.device.elecrouter.directory}")
	private String DEVICE_ELECROUTER_PATH;
	
	@Value("${sftp.device.log.directory}")
	private String DEVICE_LOG_PATH;
	
	@Value("${sftp.playlist.directory}")
	private String PLAYLIST_PATH;
	
	@Inject
	private ChannelSftp sftpChannel;
	
	@Inject
	private VoiceService voiceService;
    
	@Inject
	private SM0105Mapper SM0105Mapper;
	
	@Inject
	private BM0607Mapper BM0607Mapper;
	
	@Inject
	private BM0609Service BM0609Service;
	
	@Inject
	private BM0801Mapper BM0801Mapper;
	
	private ArrayList<String> serverContentList;
	private ArrayList<String> pathList;
	private ArrayList<String> ignoreList;
	
	// 승무사원 관리 승무사원 사진 업로드
	public void uploadBM0108(String fileName, MultipartFile file) {
		String dir1 = Paths.get(getRootLocalPath(), getCommonEmployeePath()).toString();
		
		File saveFile = Paths.get(dir1, fileName).toFile();
		try {
			FileUtils.writeByteArrayToFile(saveFile, file.getBytes());
			
			processSynchronize(getRootLocalPath() + getCommonEmployeePath(), getRootServerPath() + getCommonEmployeePath());
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	//BM0205 펌웨어파일 업로드
	public void uploadBM0205(String id, MultipartFile file) {
		String path;
		//가지고온 관리id값이 통플인지 아닌지 비교
		if(id.length() > 10) {
			path = "/vehicle/" + id.substring(0, 10) + "/device/" + id.substring(10, 16) + "/firmware";
		} else {
			path = "/vehicle/" + id.substring(0, 10) + "/firmware";
		}
		String dir = Paths.get(getRootLocalPath() , path).toString();
		String ext = FilenameUtils.getExtension(file.getOriginalFilename());
		String fileName;
		
		//행선지안내기
		if(id.substring(10, 12).equals("RD")) {
			fileName = "SF2016." + ext.toUpperCase();
		//키패드
		}else if(id.substring(10, 12).equals("RK")){
			fileName = "MANAGERV3." + ext.toUpperCase();
		//다른장비
		}else {
			fileName = "firmware." + ext;
		}
		
		File saveFile = Paths.get(dir, fileName).toFile();
		try {
			FileUtils.writeByteArrayToFile(saveFile, file.getBytes());
			
			processSynchronize(getRootLocalPath() + path, getRootServerPath() + path);
		} catch(Exception e){
			e.printStackTrace();
		}
		
	}
	
	//BM0201에서 device 생성시 folder 생성
	public void deviceFolder(String id) {
		String path;
		String configDir = getDeviceConfigPath();
		String firmwareDir = getFirmwarePath();
		String playlistDir = getPlayListPath();
		String logDir = getDeviceLogPath();
		String deviceDir = getDevicePath();
		String passengerDir = getDevicePassengerPath();
		String elecrouterDir = getDeviceElecRouterPath();
		String vehicleDir = getVehiclePath();
		String impId = id.substring(0, 10).toUpperCase();
		
		try {
			//가지고온 관리id값이 통플인지 아닌지 비교
			if(id.length() > 10) {
				String deviceId = id.substring(10, 16).toUpperCase();
				path = vehicleDir + "/" + impId + getDevicePath() + "/" + deviceId;
				
				String localDir = getRootLocalPath() + path;
				String serverDir = getRootServerPath() + path;
				
				File dirPathConfig = new File(localDir + configDir);
				File dirPathFirmware = new File(localDir + firmwareDir);
				File dirPathPlaylist = new File(localDir + playlistDir);
				
				if(!dirPathConfig.isDirectory()) {
					dirPathConfig.mkdirs();
				}
				if(!dirPathFirmware.isDirectory()) {
					dirPathFirmware.mkdirs();
				}
				if(!dirPathPlaylist.isDirectory()) {
					dirPathPlaylist.mkdirs();
				}	
				
				createFtpDirectory(serverDir + configDir);
				createFtpDirectory(serverDir + firmwareDir);
				createFtpDirectory(serverDir + playlistDir);
			}else if(id.length() == 10){
				path = vehicleDir + "/" + impId;
				
				String localDir = getRootLocalPath() + path;
				String serverDir = getRootServerPath() + path;
				
				File dirObeFirmware = new File(localDir + firmwareDir);
				File dirObeLog = new File(localDir + logDir);
				File dirPassenger = new File(localDir + deviceDir + passengerDir);
				File dirElecrouter = new File(localDir + deviceDir + elecrouterDir);
				
				if(!dirObeFirmware.isDirectory()) {
					dirObeFirmware.mkdirs();
				}
				if(!dirObeLog.isDirectory()) {
					dirObeLog.mkdirs();
				}
				if(!dirPassenger.isDirectory()) {
					dirPassenger.mkdirs();
				}
				if(!dirElecrouter.isDirectory()) {
					dirElecrouter.mkdirs();
				}
				
				createFtpDirectory(serverDir + firmwareDir);
				createFtpDirectory(serverDir + logDir);
				createFtpDirectory(serverDir + deviceDir + passengerDir);
				createFtpDirectory(serverDir + deviceDir + elecrouterDir);
			}
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	

	//BM0606 영상, 이미지파일 업로드
	public void uploadBM0605(String id, MultipartFile file, String type) {
		String dir = Paths.get(getRootLocalPath(), "/video").toString();
		
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
			ext = FilenameUtils.getExtension(file.getOriginalFilename());
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
		String path = Paths.get(getRootLocalPath(), "/video").toString();
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

	public void copyFile(File fFile, File tFile) throws IOException {
		FileInputStream fis = new FileInputStream(fFile);
		FileOutputStream fos = new FileOutputStream(tFile);
		
		int fileByte = 0;
		while((fileByte = fis.read()) != -1){
			fos.write(fileByte);
		}
		
		fis.close();
		fos.close();
	}
	
	//BM0607 영상예약
	public void reserveVideo(VdoRsvVO vo) throws Exception {
		String videoPath = "/vehicle/" + vo.getImpId() + "/device/" + vo.getDvcId() + "/playlist";
		String path = Paths.get(getRootLocalPath(), videoPath).toString();
		String fromPath = Paths.get(getRootLocalPath(), "/video").toString();
		String toPath = Paths.get(getRootLocalPath(), "/vehicle", "/", vo.getImpId(), "/device/passenger").toString();
		String fPath = getRootServerPath() + "/vehicle/" + vo.getImpId() + "/device/passenger";
		
		String vfPath = getRootServerPath() + "/vehicle/" + vo.getImpId() + "/device/" + vo.getDvcId() + "/playlist";
		File dir = new File(toPath);
		File listDir = new File(path);
		
		if(!dir.isDirectory()) {
			dir.mkdirs();
		}
		
		if(!listDir.isDirectory()) {
			listDir.mkdirs();
		}
		
		createFtpDirectory(fPath);
		createFtpDirectory(vfPath);
		
		
		
		String txt = GlobalConstants.CSVForms.VIDEO_PLAY_LIST;
		
		
		List<VdoRsvVO> voList = BM0607Mapper.makePlayList(vo.getOrgaId());
		for(int i = 0; i < voList.size(); i++) {
			String row = GlobalConstants.CSVForms.ROW_SEPARATOR
					+ (i+1) + GlobalConstants.CSVForms.COMMA
					+ voList.get(i).getVideoType() + GlobalConstants.CSVForms.COMMA
					+ voList.get(i).getVideoFile() + GlobalConstants.CSVForms.COMMA
					+ voList.get(i).getPlayStDate() + GlobalConstants.CSVForms.COMMA
					+ voList.get(i).getPlayEdDate() + GlobalConstants.CSVForms.COMMA
					+ voList.get(i).getRunTime();
			txt += row;
			
			File fFile = new File(fromPath + "/" + voList.get(i).getVideoFile());
			File tFile = new File(toPath + "/" + voList.get(i).getVideoFile());
			
			copyFile(fFile, tFile);

		}
		
		File file = new File(path + "/playlist.csv");

		
		try {
			Utils.createCSV(file, txt);
			processSynchronize(toPath, fPath);
			processSynchronize(path, vfPath);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	//BM0609 화면예약
	public void reserveScreen(ScrRsvVO vo) throws Exception {
		String path = Paths.get(getRootLocalPath(), "/vehicle", "/" , vo.getImpId(), "/device" , "/", vo.getDvcId(), "/config").toString();
		String fromPath = Paths.get(getRootLocalPath(), "/template/", vo.getSetId()).toString();
		String fPath = getRootServerPath() + "/vehicle/" + vo.getImpId() + "/device/" + vo.getDvcId() + "/config/";
		
		String txt = "";
		
		List<ScrRsvVO> voList = BM0609Service.makeConfig(vo);
		
		for(int i = 0; i < voList.size(); i++) {
			String row = voList.get(i).getCol1() + GlobalConstants.CSVForms.COMMA + voList.get(i).getCol2();
			if(i < voList.size() - 1) {
				row += GlobalConstants.CSVForms.ROW_SEPARATOR;
			}
			
			txt += row;
		}
		File file = new File(path + "/config.csv");
		Utils.createCSV(file, txt);
		
		File fFile1 = new File(fromPath + "/background.png");
		File tFile1 = new File(path + "/background.png");
		File fFile2 = new File(fromPath + "/land.png");
		File tFile2 = new File(path + "/land.png");
		File fFile3 = new File(fromPath + "/nextstopbg.png");
		File tFile3 = new File(path + "/nextstopbg.png");
		
		copyFile(fFile1, tFile1);
		copyFile(fFile2, tFile2);
		copyFile(fFile3, tFile3);
		
		
		try {
			processSynchronize(path, fPath);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	//BM0503 행선지안내기 예약(파일이동)
	public void reserveDst(RoutRsvVO vo) throws Exception {
		String path = Paths.get(getRootLocalPath(), "/temp/destination/images").toString();
		String toPath = Paths.get(getRootLocalPath(), "/destination", "/images").toString();
		String fPath = getRootServerPath() + "/destination/images/";
		
		List<RoutRsvVO> voList = vo.getRsvList();
		File fFileFLOGOBMP = new File(path + "/FLOGO.BMP");
		File tFileFLOGOBMP = new File(toPath + "/FLOGO.BMP");
		
		File fFileFLOGOSCH = new File(path + "/FLOGO.SCH");
		File tFileFLOGOSCH = new File(toPath + "/FLOGO.SCH");
		
		File fFileSLOGOBMP = new File(path + "/SLOGO.BMP");
		File tFileSLOGOBMP = new File(toPath + "/SLOGO.BMP");
		
		File fFileSLOGOSCH = new File(path + "/SLOGO.SCH");
		File tFileSLOGOSCH = new File(toPath + "/SLOGO.SCH");
		
		copyFile(fFileFLOGOBMP, tFileFLOGOBMP);
		copyFile(fFileFLOGOSCH, tFileFLOGOSCH);
		copyFile(fFileSLOGOBMP, tFileSLOGOBMP);
		copyFile(fFileSLOGOSCH, tFileSLOGOSCH);
		
		for(RoutRsvVO v : voList) {
			File fFile1 = new File(path + "/F" + v.getDvcName() + ".SCH");
			File tFile1 = new File(toPath + "/F" + v.getDvcName() + ".SCH");
			File fFile2 = new File(path + "/F" + v.getDvcName() + ".BMP");
			File tFile2 = new File(toPath + "/F" + v.getDvcName() + ".BMP");
			
			File fFile3 = new File(path + "/S" + v.getDvcName() + ".SCH");
			File tFile3 = new File(toPath + "/S" + v.getDvcName() + ".SCH");
			File fFile4 = new File(path + "/S" + v.getDvcName() + ".BMP");
			File tFile4 = new File(toPath + "/S" + v.getDvcName() + ".BMP");
			
			copyFile(fFile1, tFile1);
			copyFile(fFile2, tFile2);
			copyFile(fFile3, tFile3);
			copyFile(fFile4, tFile4);
			
		}
		processSynchronize(toPath, fPath);
		
		
	}
	
	//BM0503행선지안내기 예약(list 생성)
	public void makeDstConfig(List<RoutRsvVO> rsvVO) throws Exception {
		String txt = "";
		txt += "FLOGO.BMP" + GlobalConstants.CSVForms.COMMA + "A" + GlobalConstants.CSVForms.ROW_SEPARATOR + 
				"FLOGO.SCH" + GlobalConstants.CSVForms.COMMA + "A" + GlobalConstants.CSVForms.ROW_SEPARATOR +
				"SLOGO.BMP" + GlobalConstants.CSVForms.COMMA + "A" + GlobalConstants.CSVForms.ROW_SEPARATOR +
				"SLOGO.SCH" + GlobalConstants.CSVForms.COMMA + "A";
		for(int i = 0; i < rsvVO.size(); i ++) {
			txt +=  GlobalConstants.CSVForms.ROW_SEPARATOR + "F" + rsvVO.get(i).getDvcName() + ".BMP" + GlobalConstants.CSVForms.COMMA + "A" + 
					GlobalConstants.CSVForms.ROW_SEPARATOR + "F" + rsvVO.get(i).getDvcName() + ".SCH" + GlobalConstants.CSVForms.COMMA + "A" +
					GlobalConstants.CSVForms.ROW_SEPARATOR + "S" + rsvVO.get(i).getDvcName() + ".BMP" + GlobalConstants.CSVForms.COMMA + "A" + 
					GlobalConstants.CSVForms.ROW_SEPARATOR + "S" + rsvVO.get(i).getDvcName() + ".SCH" + GlobalConstants.CSVForms.COMMA + "A";
			
		}

		String path = Paths.get(getRootLocalPath(), "/destination/list").toString();
		String fPath = getRootServerPath() + "/destination/list/";
		File file = new File(path + "/list.csv");
		Utils.createCSV(file, txt);
		processSynchronize(path, fPath);
	}
	
	
	//템플릿 배경 파일 업로드
	public boolean uploadBM0608(BmScrInfoVO vo) {
		String dir = Paths.get(getRootLocalPath(), "/template" + "/" + vo.getSetId()).toString();

		String background = "background.png";
		String land = "land.png";
		String nextstopbg = "nextstopbg.png";
		
		File backgroundFile = Paths.get(dir, background).toFile();			
		File landFile = Paths.get(dir, land).toFile();
		File nextstopbgFile = Paths.get(dir, nextstopbg).toFile();
		try {
			if(!vo.getBackground().isEmpty()) {
				FileUtils.writeByteArrayToFile(backgroundFile, vo.getBackground().getBytes());				
			}
			if(!vo.getLand().isEmpty()) {
				FileUtils.writeByteArrayToFile(landFile, vo.getLand().getBytes());				
			}
			if(!vo.getNextstopbg().isEmpty()) {
				FileUtils.writeByteArrayToFile(nextstopbgFile, vo.getNextstopbg().getBytes());				
			}
			
			return true;
		} catch(Exception e) {
			e.printStackTrace();
			return false;
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
	
	/**200226 디렉토리 생성**/
	public void makeDir(String routId) {
		String path = Paths.get(getRootLocalPath(), getRouteOriPath()).toString();
		File dir = new File(path + "/" + routId);
		if(!dir.isDirectory()) {
			dir.mkdir();
		}
	}
	
	/**200226 busstop.csv **/
	public void uploadBusstop(List<BmRoutNodeInfoVO> stopList, String fileName, String routVer) throws FileNotFoundException, IOException {
		String txt = GlobalConstants.CSVForms.ROUTE_VERSION + routVer + GlobalConstants.CSVForms.ROW_SEPARATOR;
		txt += GlobalConstants.CSVForms.ROUTE_BUSSTOP_TITLE;
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
	
	/**200226 node.csv**/
	public void uploadNodeList(List<BmRoutNodeInfoVO> nodeList, String fileName, String routVer) throws FileNotFoundException, IOException {
		String txt = GlobalConstants.CSVForms.ROUTE_VERSION + routVer + GlobalConstants.CSVForms.ROW_SEPARATOR;
		txt += GlobalConstants.CSVForms.ROUTE_NODELIST_TITLE;
		
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
	
	/** routelist.csv 파일을 읽어옴 **/
	public List<RoutListCSVVO> readRouteList(String fileName) throws IOException {
		String path = Paths.get(getRootLocalPath(), getRoutePath()).toString();
		
		File file = new File(path + "/" + fileName);
		
		List<RoutListCSVVO> list = new ArrayList<>();
		
        //입력 버퍼 생성
        BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(file), "CP949"));
        String line = "";
        String[] tmp = null;
        
        int lineNum = 0;
        while((line = br.readLine()) != null){
        	lineNum++;
        	if(lineNum <= 2) {
        		continue;
        	}else {        		
        	RoutListCSVVO vo = new RoutListCSVVO();
        	
        	tmp = line.split(",");
        	
        	vo.setFileName(tmp[0]);
        	vo.setRoutVersion(tmp[1]);
        	vo.setRoutNo(tmp[2]);
        	vo.setRoutNmKo(tmp[3]);
        	vo.setRoutNmEn(tmp[4]);
        	
        	list.add(vo);
        	}
        }
        br.close();
        
        return list;
	}

	//routelist.csv 생성
	public void uploadRouteList(String routeListRow, String fileName, String routVer, String maxVer, RoutListCSVVO newRow) throws IOException{
		String path = Paths.get(getRootLocalPath(), getRoutePath()).toString();
		
		File file = new File(path + "/" + fileName);
		List<RoutListCSVVO> list = new ArrayList<>();
		if(file.exists()) {
			list = readRouteList("routelist.csv");
		}else {
			
		}
		
		if(list.size() > 0) {
			//기존에 정보가 있으면 업데이트, 없으면 인서트
			int seq = 0;
			boolean flag = false;
			
			loop:
			for(int i = 0; i < list.size(); i++) {
				if(list.get(i).getFileName().equals(newRow.getFileName())) {
					flag = true;
					seq = i;
					break loop;
				}			
			}
			
			if(flag) {
				list.get(seq).setRoutVersion(newRow.getRoutVersion());
				list.get(seq).setRoutNo(newRow.getRoutNo());
				list.get(seq).setRoutNmKo(newRow.getRoutNmKo());
				list.get(seq).setRoutNmEn(newRow.getRoutNmEn());
			}else {
				list.add(newRow);
			}
			
		}else {
			list.add(newRow);
		}
					
		String txt = "";
		txt += GlobalConstants.CSVForms.ROUTE_VERSION + maxVer + GlobalConstants.CSVForms.ROW_SEPARATOR;
		txt += GlobalConstants.CSVForms.ROUTE_LIST;
		
		for(RoutListCSVVO vo : list) {
			txt += GlobalConstants.CSVForms.ROW_SEPARATOR;
			txt += vo.getFileName() 
					+ GlobalConstants.CSVForms.COMMA + vo.getRoutVersion() 
					+ GlobalConstants.CSVForms.COMMA + vo.getRoutNo() 
					+ GlobalConstants.CSVForms.COMMA + vo.getRoutNmKo()
					+ GlobalConstants.CSVForms.COMMA + vo.getRoutNmEn();
		}
		
		try {
			Utils.createCSV(file, txt);
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	//노선별 노드리스트.csv생성
	public void uploadRouteNodeList(List<BmRoutNodeInfoVO> routeList, String routId, String routVer) {
		String path = Paths.get(getRootLocalPath(), getRoutePath()).toString();
		
		String txt = GlobalConstants.CSVForms.ROUTE_VERSION + routVer + GlobalConstants.CSVForms.ROW_SEPARATOR;		
		txt += GlobalConstants.CSVForms.ROUTE_TITLE;
		
		String fileName = routId + ".csv";
		
			
		for(BmRoutNodeInfoVO node : routeList) {
			txt += GlobalConstants.CSVForms.ROW_SEPARATOR + node.getNodeId();
		}
		
		File file = new File(path + "/" + fileName);
		
		try {
			Utils.createCSV(file, txt);
		} catch (Exception e) {
			e.printStackTrace();
		}
			
	}
	
	//BMP파일 write
	public boolean writeBmp(String fileName, MultipartFile file) {
		//String path = Paths.get(getRootLocalPath(), getDestinationPath(), getDestinationImagesPath()).toString();
		String path = Paths.get(getRootLocalPath(), "/temp/destination/images").toString();
		
		File saveFile = Paths.get(path, "/" ,fileName).toFile();
		try {
			FileUtils.writeByteArrayToFile(saveFile, file.getBytes());
			return true;
		} catch(Exception e) {
			e.printStackTrace();
			return false;
		}
		
	}
	
	//SCH파일 read
	public List<DestinationVO> readSCH(String fileName) throws IOException {
		String path = Paths.get(getRootLocalPath(), "/temp/destination/images").toString();
		
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
        	vo.setEffType(SM0105Mapper.SM0105G3S1(tmp[1]));
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
			vo.setEffType("화면그대로 표출");
			vo.setEffSpeed("05");
			vo.setShowTime("0000");
			realList.add(vo);
		}
		
		return writeSCH(realList, fileName);
	}
	
	//SCH파일 write
	public boolean writeSCH(List<DestinationVO> list, String fileName) {
		String path = Paths.get(getRootLocalPath(), "/temp/destination/images").toString();
		String txt = "";
		
		for(int i = 0; i < list.size(); i++) {
			if(i == 0) {
				txt += list.get(i).getFrameNo() + GlobalConstants.SCH.TAB + SM0105Mapper.SM0105G3S0(list.get(i).getEffType()) + GlobalConstants.SCH.TAB + String.format("%02d", Integer.valueOf(list.get(i).getEffSpeed())) + GlobalConstants.SCH.TAB + String.format("%04d", Integer.valueOf(list.get(i).getShowTime()));
			}else {
				txt += GlobalConstants.CSVForms.ROW_SEPARATOR
						+ list.get(i).getFrameNo() + GlobalConstants.SCH.TAB + SM0105Mapper.SM0105G3S0(list.get(i).getEffType()) + GlobalConstants.SCH.TAB + String.format("%02d", Integer.valueOf(list.get(i).getEffSpeed())) + GlobalConstants.SCH.TAB + String.format("%04d", Integer.valueOf(list.get(i).getShowTime()));
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
    		uploadVoiceTTS(vo);
    	} else if(vo.getPlayType().equals("WAV")) {
    		if(vo.getWavFile() != null && vo.getWavFile().getSize() != 0) {
    			uploadVoiceWAV(vo);
    		}
    	}
    	
    	// 노선별 선택 음성일 경우 바로 FTP Sync
    	String routId = vo.getRoutId();
		if(routId != null && !routId.equals("")) {
			try {
				processSynchronize(getRootLocalPath() + getRouteAudioPath(), getRootServerPath() + getRouteAudioPath());
			} catch (Exception e) {
				e.printStackTrace();
				return false;
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
			
			// 노선별 선택음성이 아닐경우 기존 WAV 업로드 삭제
			if((routId == null || routId.equals("")) && file.exists()) {
				file.delete();
			}
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
				File file = Paths.get(getRootLocalPath(), getRouteAudioPath(), routId + ".wav").toFile();
				
				if(file.exists()) {
					file.delete();
				}
				
				processSynchronize(getRootLocalPath() + getRouteAudioPath(), getRootServerPath() + getRouteAudioPath());
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
	
	// 음성 Playlist 업로드
	public boolean uploadVoicePlayList(String routId, List<VoiceOrganizationVO> orgaList) {
		String routePath = "/route/" + routId + "/playlist";
		String playListPath = Paths.get(getRootLocalPath(), routePath).toString();
		
		try {
			FileUtils.deleteDirectory(new File(playListPath));
			FileUtils.forceMkdir(new File(playListPath));
			
			for(VoiceOrganizationVO orgaVO : orgaList) {
				String fileName = orgaVO.getOrgaId() + ".csv";
				StringBuilder csvContent = new StringBuilder();
				csvContent.append(GlobalConstants.CSVForms.VOICE_PLAYLIST_TITLE);
				
				for(VoiceInfoVO v : orgaVO.getPlayList()) {
		    		if(v.getPlayType().equals("TTS")) {
		    			if(v.getVocCode() == GlobalConstants.PlayListVoiceTypes.BUS_KR) {
			    			// 한국어
			    			csvContent.append(
					    			v.getSeq() + GlobalConstants.CSVForms.COMMA
					    			+ GlobalConstants.PlayListVoiceTypes.BUS_KR + GlobalConstants.CSVForms.COMMA
					    			+ v.getVocId() + GlobalConstants.VoiceTypes.KR + ".wav" + GlobalConstants.CSVForms.COMMA 
					    			+ v.getPlayStDate() + GlobalConstants.CSVForms.COMMA 
					    			+ v.getPlayEdDate() + GlobalConstants.CSVForms.COMMA
					    			+ v.getScrTxt() + GlobalConstants.CSVForms.ROW_SEPARATOR);
			    			
			    			// 영어
			    			csvContent.append(
					    			v.getSeq() + GlobalConstants.CSVForms.COMMA
					    			+ GlobalConstants.PlayListVoiceTypes.BUS_EN + GlobalConstants.CSVForms.COMMA
					    			+ v.getVocId() + GlobalConstants.VoiceTypes.EN + ".wav" + GlobalConstants.CSVForms.COMMA 
					    			+ v.getPlayStDate() + GlobalConstants.CSVForms.COMMA 
					    			+ v.getPlayEdDate() + GlobalConstants.CSVForms.COMMA
					    			+ v.getScrTxtEn());
			    		} else {
			    			// 기타 다른음성들
			    			csvContent.append(
					    			v.getSeq() + GlobalConstants.CSVForms.COMMA
					    			+ v.getVocCode() + GlobalConstants.CSVForms.COMMA
					    			+ v.getVocId() + GlobalConstants.VoiceTypes.KR + ".wav" + GlobalConstants.CSVForms.COMMA 
					    			+ v.getPlayStDate() + GlobalConstants.CSVForms.COMMA 
					    			+ v.getPlayEdDate() + GlobalConstants.CSVForms.COMMA
					    			+ v.getScrTxt());
			    		}
		    		} else {
		    			// WAV 업로드 음성
		    			csvContent.append(
				    			v.getSeq() + GlobalConstants.CSVForms.COMMA
				    			+ v.getVocCode() + GlobalConstants.CSVForms.COMMA
				    			+ v.getVocId() + GlobalConstants.VoiceTypes.US + ".wav" + GlobalConstants.CSVForms.COMMA 
				    			+ v.getPlayStDate() + GlobalConstants.CSVForms.COMMA 
				    			+ v.getPlayEdDate() + GlobalConstants.CSVForms.COMMA
				    			+ v.getScrTxt());
		    		}
		    		csvContent.append(GlobalConstants.CSVForms.ROW_SEPARATOR);
		    	}
				
				Utils.createCSV(Paths.get(playListPath, fileName).toFile(), csvContent.toString());
			}
			
			processSynchronize(playListPath, getRootServerPath() + routePath);
			processSynchronize(getRootLocalPath() + getRoutePath(), getRootServerPath() + getRoutePath());
			processSynchronize(getRootLocalPath() + getCommonAudioPath(), getRootServerPath() + getCommonAudioPath());
			
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
    	return true;
	}
	
	// Read FTP 로그파일
	@SuppressWarnings("unchecked")
	@Transactional
	public void processAdLog() throws Exception {
		String path = getRootServerPath() + getVehiclePath();
		sftpChannel.cd(path);
		
		Vector<LsEntry> vehicleList = sftpChannel.ls(path);
		
		for(LsEntry vehicle : vehicleList){
			if(!vehicle.getFilename().startsWith(".")) {
				String vehiclePath = path + "/" + vehicle.getFilename() + "/log";
				String vehicleId = vehicle.getFilename();
				
				Vector<LsEntry> logList = sftpChannel.ls(vehiclePath);
				
				for(LsEntry log : logList) {
					if(!log.getFilename().startsWith(".")) {
						String logFilePath = vehiclePath + "/" + log.getFilename();
						BufferedReader io = new BufferedReader(new InputStreamReader(sftpChannel.get(logFilePath)));
						
						List<Map<String, Object>> dataList = new ArrayList<>();
						
						String line;
						while((line = io.readLine()) != null) {
							String[] parseStr = line.split(" ");
							String[] fileName = parseStr[2].split("/");
							String id = FilenameUtils.removeExtension(fileName[fileName.length - 1]);
							String playDate = parseStr[0] + " "+ parseStr[1];
							
							Map<String, Object> data = new HashMap<String, Object>();
							data.put("playDate", playDate);
							data.put("mngId", vehicleId);
							data.put("id", id);
							
							dataList.add(data);
						}
						
						io.close();
						
						// 데이터 insert
						Map<String, Object> param = new HashMap<String, Object>();
						param.put("list", dataList);
						BM0801Mapper.insertAdLog(param);
						
						// insert 완료 후 파일 삭제
						sftpChannel.rm(logFilePath);
					}
				}
			}
		}
	}
	
	// 서버FTP와 Synchronization
	private void processSynchronize(String localPath, String serverPath) throws Exception {
		System.out.println("fileSync: " + localPath + ", " + serverPath);
		setServerDirectory(localPath, serverPath);
		synchronize(new File(localPath), serverPath);
	}
	
	/************************************************************************ FTP 공통 모듈 *****************************************************************************************/
	private void createFtpDirectory(String ftpPath) throws SftpException {
		// 최상위 폴더 이동
		sftpChannel.cd("/");
		try{
			sftpChannel.cd(ftpPath);
		}catch(Exception e){
			System.out.println(ftpPath + " don't exist on your server!");
			
			String[] pathList = ftpPath.split("/");
			
			for(int i = 1; i < pathList.length; i++) {
				String path = pathList[i];
				
				SftpATTRS attrs = null;
				
				try {
				    attrs = sftpChannel.stat(path);
				} catch (Exception ee) {
				    System.out.println(path + " not found");
				}

				if (attrs != null) {
				    System.out.println("Directory exists IsDir=" + attrs.isDir());
				} else {
				    System.out.println("Creating dir " + path);
				    sftpChannel.mkdir(path);
				}
				sftpChannel.cd(path);
			}
		}
	}
	
	// 초기 디렉토리 셋팅
	private void setServerDirectory(String localPath, String serverPath) throws SftpException {
		createFtpDirectory(serverPath);
		
		File localDirectory = new File(localPath);
		String serverFolder = serverPath.substring(serverPath.lastIndexOf('/') + 1, serverPath.length());
		if(!localDirectory.getName().equals(serverFolder)){
			try{
				sftpChannel.mkdir(localDirectory.getName());
				sftpChannel.cd(localDirectory.getName());
			} catch (Exception e){
				sftpChannel.cd(localDirectory.getName());
			}
			serverPath = serverPath + "/" + localDirectory.getName();
		}
		
		serverContentList = new ArrayList<String>();
		pathList = new ArrayList<String>();
		ignoreList = new ArrayList<String>();
		
		ignoreList.add("temp");
		ignoreList.add("chime");
		ignoreList.add("video");
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
	
	public String getRouteOriPath() {
		return ROUTE_ORI;
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
	
	public String getCommonEmployeePath() {
		return COMMON_EMPLOYEE_PATH;
	}
	
	public String getFirmwarePath() {
		return DEVICE_FIRMWARE_PATH;
	}
	
	public String getVehiclePath() {
		return VEHICLE_PATH;
	}
	
	public String getDevicePath() {
		return DEVICE_PATH;
	}
	
	public String getDeviceConfigPath() {
		return DEVICE_CONFIG_PATH;
	}
	
	public String getDevicePassengerPath() {
		return DEVICE_PASSENGER_PATH;
	}
	
	public String getDeviceElecRouterPath() {
		return DEVICE_ELECROUTER_PATH;
	}
	
	public String getDeviceLogPath() {
		return DEVICE_LOG_PATH;
	}
	
	public String getPlayListPath() {
		return PLAYLIST_PATH;
	}
}
