package com.tracom.brt.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;

@Configuration
public class SftpConfig {
	@Value("${sftp.host}")
    private String sftpHost;
 
    @Value("${sftp.port}")
    private int sftpPort;
 
    @Value("${sftp.user}")
    private String sftpUser;
 
    @Value("${sftp.password}")
    private String sftpPasword;
    
    @Bean
    public ChannelSftp sftpChannel() {
    	JSch jsch = new JSch();
    	Channel channel = null;
    	ChannelSftp channelSftp = null;
    	
    	try {
			Session session = jsch.getSession(sftpUser, sftpHost, sftpPort);
			session.setPassword(sftpPasword);
			session.setConfig("StrictHostKeyChecking", "no");
			
			session.connect();
			channel = session.openChannel("sftp");
			channel.connect();
			channelSftp = (ChannelSftp) channel;
		} catch (JSchException e) {
			e.printStackTrace();
		}
    	
    	return channelSftp;
    }
}
