package com.tracom.brt.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

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

@Component
public class ExcelUtils {
	
	@Value("${sftp.remote.directory}")
	private String ROOT_SERVER_PATH;
	
	@Value("${sftp.linux.local.directory}")
	private String ROOT_LINUX_LOCAL_PATH;
	
	@Value("${sftp.windows.local.directory}")
	private String ROOT_WINDOWS_LOCAL_PATH;
	
	public void downExcel(MultipartFile file) throws IOException {
		String path = Paths.get(getRootLocalPath(), "/temp").toString();
		String fileName = "/temp.xlsx";
		File saveFile = Paths.get(path, fileName).toFile();
		FileUtils.writeByteArrayToFile(saveFile, file.getBytes());
	}
		
	public void readExcel(String type) throws FileNotFoundException, IOException {
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
					tmp.setNodeId(c[0]);
					tmp.setNodeNm(c[1]);
					tmp.setLati(Float.valueOf(c[2]));
					tmp.setLongi(Float.valueOf(c[3]));
					tmp.setSeq(Integer.valueOf(c[4]));
					tmp.setRoutId(c[5]);
					tmp.setNodeType(Integer.valueOf(c[6]));
					
					System.out.println(tmp);
					voList.add(tmp);
				}
			}
			
			
			
			
		}
	}
	
	
	public void writeExcel(String type, HttpServletResponse response) throws IOException {
		System.out.println(type);
		switch(type) {
		case "routNode" :
			writeExcelRoutNode(response);
			break;
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
