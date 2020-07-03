FROM tomcat:9.0.34-jdk8-openjdk
ADD target/brt-*.war /usr/local/tomcat/webapps/ROOT.war
VOLUME [ "/local/brt", "/local/brtedu", "/brt", "/brtedu" ]
EXPOSE 8080
CMD ["catalina.sh", "run"]