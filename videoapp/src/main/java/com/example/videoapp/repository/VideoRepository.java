package com.example.videoapp.repository;

import com.example.videoapp.entity.Video;
import com.example.videoapp.entity.VideoDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface VideoRepository extends JpaRepository<Video,Integer> {
    Video findByGivenName(String GivenName);

    @Query("select new com.example.videoapp.entity.VideoDTO(v.id, v.givenName, v.duration,v.uploadDate) from Video v")
    List<VideoDTO> findAllIdAndName();
    @Query("select new com.example.videoapp.entity.VideoDTO(v.id, v.givenName, v.duration,v.uploadDate) from Video v where v.duration>=:duration1 and v.duration<=:duration2 ")
    List<VideoDTO> findAllByDurationBetweenOrderByDuration(Double duration1, Double duration2);

    @Query("select new com.example.videoapp.entity.VideoDTO(v.id, v.givenName, v.duration,v.uploadDate) from Video v where lower(v.givenName) like %:GivenName%")
    List<VideoDTO> findAllByGivenNameContainsIgnoreCase(String GivenName);

    @Query("select new com.example.videoapp.entity.VideoDTO(v.id, v.givenName, v.duration,v.uploadDate) from Video v where v.uploadDate=:uploadDate ")
    List<VideoDTO> findAllByUploadDateOrderByUploadDate(LocalDate uploadDate);

}
