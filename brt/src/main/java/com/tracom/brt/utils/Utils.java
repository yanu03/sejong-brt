package com.tracom.brt.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.ContentHandler;

import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;

import org.apache.tika.metadata.Metadata;
import org.apache.tika.parser.ParseContext;
import org.apache.tika.parser.mp4.MP4Parser;
import org.apache.tika.sax.BodyContentHandler;
import org.apache.tika.sax.WriteOutContentHandler;
import org.springframework.web.multipart.MultipartFile;

import ws.schild.jave.AudioAttributes;
import ws.schild.jave.Encoder;
import ws.schild.jave.EncodingAttributes;
import ws.schild.jave.MultimediaObject;

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
	
	public static void wavToMp3(File source, File target) throws Exception {
		AudioAttributes audio = new AudioAttributes();
		audio.setCodec("libmp3lame");
		audio.setBitRate(new Integer(128000));
		audio.setChannels(new Integer(1));
		audio.setSamplingRate(new Integer(44100));
		
		EncodingAttributes attrs = new EncodingAttributes();
		attrs.setFormat("mp3");
		attrs.setAudioAttributes(audio);
		
		Encoder encoder = new Encoder();
		encoder.encode(new MultimediaObject(source), target, attrs);
	}

	
	public static void getRunningTime(MultipartFile file, String fileName, String filePath) throws Exception {
	
		BodyContentHandler handler = new BodyContentHandler();
		
		Metadata metadata = new Metadata();
		FileInputStream inputStream = new FileInputStream(new File(filePath+fileName));
		
		System.out.println("-----------------------");
		System.out.println(filePath+fileName);
		System.out.println(inputStream);
		
		ParseContext pcontext = new ParseContext();
		
		MP4Parser MP4Parser = new MP4Parser();
		MP4Parser.parse(inputStream, handler, metadata, pcontext);
		
		String[] metadataNames = metadata.names();
		
		for(String name : metadataNames) {
			System.out.println(name + ": " + metadata.get(name));
		}
		
	}

}
