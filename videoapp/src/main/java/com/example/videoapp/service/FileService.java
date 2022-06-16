package com.example.videoapp.service;

import com.example.videoapp.entity.Video;
import com.example.videoapp.entity.VideoDTO;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface FileService {
    void save(MultipartFile file, String duration);
    Video get(String id);
    void delete(String name);

    List<VideoDTO> getAllByName(String name);
    List<VideoDTO> getAllByDuration(Double duration1, Double duration2);
    List<VideoDTO> getAllByDate(LocalDate date);

    List<VideoDTO> getAll();
}
