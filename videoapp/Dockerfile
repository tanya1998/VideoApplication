#### Stage 1: Build the application
FROM openjdk:18-jdk
#RUN mvn clean package
COPY target/videoapp-0.0.1-SNAPSHOT.jar videoapp-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","videoapp-0.0.1-SNAPSHOT.jar"]