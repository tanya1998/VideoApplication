package com.example.videoapp.controller;

import com.example.videoapp.entity.Video;
import com.example.videoapp.entity.VideoDTO;
import com.example.videoapp.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController

//Upload a file
public class FilesController {
    @Autowired
    private FileService uploadService;
    @PostMapping("/files")
    public ResponseEntity<String> uploadFile( @RequestParam(name="data") MultipartFile video, @RequestParam(name="duration") String duration){
        try {
            System.out.println("Received Request");
            uploadService.save(video,duration);

        } catch (Exception e) {
            System.out.println("Exception");
//          return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Bad request");
            throw new RuntimeException(e);
        }
        System.out.println("Received Request");

        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-Control-Allow-Origin","'http://localhost:4200'");
        headers.add("type","String");
        headers.add("description","Created file location");
        return ResponseEntity.status(HttpStatus.OK).body("File Uploaded");

    }

    @GetMapping("/files")
    public ResponseEntity<List<VideoDTO>> downloadFiles(HttpServletRequest request) {
        List<VideoDTO> allVideos;
        System.out.println("REQUESTED");
        try {
            allVideos = uploadService.getAll();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        System.out.println("Size"+(allVideos.size()));
        return ResponseEntity.status(HttpStatus.OK).body(allVideos);
    }

    @CrossOrigin
    @GetMapping("/files/{fileid}")
    public ResponseEntity<Resource> downloadfile(@PathVariable String fileid, HttpServletRequest request) {
        Video video = null;
        try {
            video = uploadService.get(fileid);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        String contentType = request.getServletContext().getMimeType(video.getGivenName());
        System.out.println(contentType);
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.parseMediaType(contentType)).header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + video.getGivenName() + "\"").header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, HttpHeaders.CONTENT_DISPOSITION).body(new ByteArrayResource(video.getData()));
    }
    @DeleteMapping("/files/{fileid}")
    public ResponseEntity<String> deletefile(@PathVariable String fileid, HttpServletRequest request) {

        try {
            uploadService.delete(fileid);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("File was successfully removed");
    }


}
