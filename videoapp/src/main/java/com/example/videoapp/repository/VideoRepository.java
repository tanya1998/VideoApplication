package com.example.videoapp.repository;

import com.example.videoapp.entity.Video;
import com.example.videoapp.entity.VideoDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideoRepository extends JpaRepository<Video,String> {
    Video findByGivenName(String GivenName);

    @Query("select new com.example.videoapp.entity.VideoDTO(v.id, v.givenName) from Video v")
    List<VideoDTO> findAllIdAndName();

    Video findById(Integer Id);

    List<VideoDTO> findAllByGivenNameContainsIgnoreCase(String GivenName);


}
