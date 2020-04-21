package com.tracom.brt.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.SystemUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.tracom.brt.domain.BM0104.BmRoutNodeInfoVO;
import com.tracom.brt.domain.BM0109.BM0109Service;

@Component
public class ExcelUtils {
	
	@Value("${sftp.remote.directory}")
	private String ROOT_SERVER_PATH;
	
	@Value("${sftp.linux.local.directory}")
	private String ROOT_LINUX_LOCAL_PATH;
	
	@Value("${sftp.windows.local.directory}")
	private String ROOT_WINDOWS_LOCAL_PATH;
	
	
	@Inject
	BM0109Service BM0109Service;
	
	public void downExcel(MultipartFile file) throws IOException {
		String path = Paths.get(getRootLocalPath(), "/temp").toString();
		String fileName = "/temp.xlsx";
		File saveFile = Paths.get(path, fileName).toFile();
		FileUtils.writeByteArrayToFile(saveFile, file.getBytes());
	}
		
	public void readExcel(String type, String routId) throws FileNotFoundException, IOException {
		String path = Paths.get(getRootLocalPath(), "/temp").toString();
		String fileName = "/temp.xlsx";
		String fullPath = path + fileName;
		Workbook wb;
		
		if(fullPath.endsWith(".xls")) {
			wb = new HSSFWorkbook(new FileInputStream(fullPath));
		}
		else if(fullPath.endsWith(".xlsx")) {
			wb = new XSSFWorkbook(new FileInputStream(fullPath));
		}
		else {
			throw new IllegalAccessError("xls, xlsx 확장자를 입력해주세요");
		}
		
		Sheet sheet = wb.getSheetAt(0);
		
		switch(type) {
		case "BM0109" :
			List<BmRoutNodeInfoVO> voList = new ArrayList<>();
			List<BmRoutNodeInfoVO> staList = new ArrayList<>();
			
			String txt = "";
			for(Row row : sheet) {
				for(Cell cell : row) {
					txt += cellValueToString(cell)+",";
				}
				txt += "\n";
			}
			
			String[] rows = txt.split("\n");
			for(int i=0; i<rows.length; i++) {
				if(i>0) {
					String[] c = rows[i].split(",");
					BmRoutNodeInfoVO tmp = new BmRoutNodeInfoVO();
					//tmp.setRoutId(c[0]);
					tmp.setRoutId(routId);
					tmp.setSeq(Integer.valueOf(c[1]));
					if(c[2].equals("정류장") || c[2].equals("1")) {
						tmp.setNodeType(1);						
					}else if(c[2].equals("지점") || c[2].equals("30")) {
						tmp.setNodeType(30);
					}
					tmp.setNodeId(c[3]);
					tmp.setStaNo(c[4]);
					tmp.setNodeNm(c[5]);
					tmp.setKrNm(c[6]);
					tmp.setEnNm(c[7]);
					tmp.setLati(Float.valueOf(c[8]));
					tmp.setLongi(Float.valueOf(c[9]));
					
					voList.add(tmp);
					System.out.println(tmp);
				}
			}
			
			if(voList.size() > 0) {
				BmRoutNodeInfoVO ins = new BmRoutNodeInfoVO();
				
				ins.setRoutId(voList.get(0).getRoutId());
				ins.setVoList(voList);
				//인서트 할것이야
				
				BM0109Service.BM0109G1I0(ins);
			}
			
		}
	}
	
	
	public void writeExcel(String type, HttpServletResponse response) throws IOException {
		switch(type) {
		case "routNode" :
			writeExcelRoutNode(response);
			break;
		case "routResult" :
			writeExcelRoutResult(response);
		}
		//리스트만들것임
	}
	
	public void writeExcelRoutNode(HttpServletResponse response) throws IOException {
		Workbook wb = new XSSFWorkbook();
		Sheet sheet = wb.createSheet("노선연계");
		
		Row row = null;
		Cell cell = null;
		int rowNo = 0;
		
		row = sheet.createRow(rowNo++);
		//엑셀양식
		cell = row.createCell(0);
		cell.setCellValue("노선ID");
		cell = row.createCell(1);
		cell.setCellValue("노드명");
		cell = row.createCell(2);
		cell.setCellValue("위도");
		cell = row.createCell(3);
		cell.setCellValue("경도");
		
		//response에 추가할것임
		response.setContentType("ms-vnd/excel");
		response.setHeader("Content-Disposition", "attachment; filename=route.xlsx");
		wb.write(response.getOutputStream());
		wb.close();
	}
	
	public void writeExcelRoutResult(HttpServletResponse response) throws IOException {
		Workbook wb = new XSSFWorkbook();
		Sheet sheet = wb.createSheet("노선경로 관리");
		
		Row row = null;
		Cell cell = null;
		int rowNo = 0;
		
		row = sheet.createRow(rowNo++);
		//엑셀양식
		cell = row.createCell(0);
		cell.setCellValue("노선아이디(9고정)");
		cell = row.createCell(1);
		cell.setCellValue("순번(최대11)");
		cell = row.createCell(2);
		cell.setCellValue("노드타입(정류장:1,지점:30)");
		cell = row.createCell(3);
		cell.setCellValue("노드아이디(10고정)");
		cell = row.createCell(4);
		cell.setCellValue("정류장번호(5고정)");
		cell = row.createCell(5);
		cell.setCellValue("노드명(최대10)");
		cell = row.createCell(6);
		cell.setCellValue("국문표출명(최대10)");
		cell = row.createCell(7);
		cell.setCellValue("영문표출명(최대50)");
		cell = row.createCell(8);
		cell.setCellValue("위도(최대11)");
		cell = row.createCell(9);
		cell.setCellValue("경도(최대11)");
		
		
		//response에 추가할것임
		response.setContentType("ms-vnd/excel");
		response.setHeader("Content-Disposition", "attachment; filename=routeResult.xlsx");
		wb.write(response.getOutputStream());
		wb.close();
	}
	
	
	public String cellValueToString(Cell cell) {
		String value = "";
		if(cell == null) {
			return value;
		}
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		
		switch( cell.getCellType() ) {
		case STRING :
			value = (cell.getRichStringCellValue().getString()!=null? cell.getRichStringCellValue().getString(): "") ;
			break;

		case NUMERIC :
			if(DateUtil.isCellDateFormatted(cell)) {
			value = sdf.format(cell.getDateCellValue());
			} else {
				DataFormatter fmt = new DataFormatter();
				value = "" + fmt.formatCellValue(cell).toString();
			}
			break;

		case BOOLEAN :
			value = "" + cell.getBooleanCellValue();
			break;

		case FORMULA :
			value = "" + cell.getCellFormula();
			break;

		case BLANK :
			value = "";
			break;
			
		case ERROR :
			value = "";
			break;
			
		default:
			value = "";
			break;
		}
		
		return value;
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
}
