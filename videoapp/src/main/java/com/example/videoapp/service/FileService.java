package com.example.videoapp.service;

import com.example.videoapp.entity.Video;
import com.example.videoapp.entity.VideoDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FileService {
    void save(MultipartFile file, String duration);
    Video get(String id);
    void delete(String name);

    List<VideoDTO> getAll();
}
