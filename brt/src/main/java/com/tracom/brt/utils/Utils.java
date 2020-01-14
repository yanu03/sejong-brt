package com.tracom.brt.utils;

import java.io.File;

import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;

public class Utils {
	public static boolean checkIe(String userAgent) {
		return userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident") > -1;
	}
	
	public static boolean checkChrome(String userAgent) {
		return userAgent.indexOf("Chrome") > -1;
	}
	
	public static boolean checkOpera(String userAgent) {
		return userAgent.indexOf("Opera") > -1;
	}
	
	public static int getAudioTotalTime(File file) throws Exception {
		AudioInputStream audioInputStream = AudioSystem.getAudioInputStream(file);
		AudioFormat format = audioInputStream.getFormat();
		long audioFileLength = file.length();
		int frameSize = format.getFrameSize();
		float frameRate = format.getFrameRate();
		float durationInSeconds = (audioFileLength / (frameSize * frameRate));
		
		return (int)durationInSeconds;
	}
}
