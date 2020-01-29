package com.tracom.brt.domain.image;

import java.awt.Graphics;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;

import javax.imageio.ImageIO;

import org.springframework.stereotype.Service;

@Service
public class imageService {
//미완성
	public File resizeImg(File file, String path) {
		String imgTargetPath = path; // 새 이미지 파일명
		String imgFormat = "jpg"; // 새 이미지 포맷. jpg, gif 등
		int newWidth = 140; // 변경 할 넓이
		int newHeight = 140; // 변경 할 높이
		String mainPosition = "X"; // W:넓이중심, H:높이중심, X:설정한 수치로(비율무시)

		Image image;
		int imageWidth;
		int imageHeight;
		double ratio;
		int w;
		int h;

		try {
			// 원본 이미지 가져오기
			image = ImageIO.read(file);

			// 원본 이미지 사이즈 가져오기
			imageWidth = image.getWidth(null);
			imageHeight = image.getHeight(null);

			w = newWidth;
			h = newHeight;
			// 이미지 리사이즈
			// Image.SCALE_DEFAULT : 기본 이미지 스케일링 알고리즘 사용
			// Image.SCALE_FAST : 이미지 부드러움보다 속도 우선
			// Image.SCALE_REPLICATE : ReplicateScaleFilter 클래스로 구체화 된 이미지 크기 조절 알고리즘
			// Image.SCALE_SMOOTH : 속도보다 이미지 부드러움을 우선
			// Image.SCALE_AREA_AVERAGING : 평균 알고리즘 사용
			Image resizeImage = image.getScaledInstance(w, h, Image.SCALE_AREA_AVERAGING);

			// 새 이미지 저장하기
			
			 BufferedImage newImage = new BufferedImage(w, h, BufferedImage.TYPE_INT_RGB);
			 Graphics g = newImage.getGraphics(); g.drawImage(resizeImage, 0, 0, null);
			 g.dispose(); ImageIO.write(newImage, imgFormat, new File(imgTargetPath));
			 
		} catch (Exception e) {

			e.printStackTrace();

		}
		return null;
	}

}