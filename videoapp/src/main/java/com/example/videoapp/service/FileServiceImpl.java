package com.example.videoapp.service;

import com.example.videoapp.entity.Video;
import com.example.videoapp.entity.VideoDTO;
import com.example.videoapp.exceptions.BadRequestException;
import com.example.videoapp.exceptions.FileExistsException;
import com.example.videoapp.exceptions.FileNotException;
import com.example.videoapp.exceptions.FileTypeException;
import com.example.videoapp.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service
public class FileServiceImpl implements FileService {
;    @Value("${uripath}")
    private String uri;
    private VideoRepository videoRepository;

    public FileServiceImpl(VideoRepository videoRepository)
    {
        this.videoRepository = videoRepository;
    }
    public void save(MultipartFile video, String duration)
    {
            String name = video.getOriginalFilename();
            System.out.println(name);
            Video file =  videoRepository.findByGivenName(name);

            String type = video.getContentType().split("/")[1];
            System.out.println(type);
            try {
                if (!(type.equals("mp4") || type.equals("mpg4") || type.equals("mpg") || type.equals("mpeg"))) {
                    throw new Exception("Unsupported Media Type");
                }
                if(file!=null) {
                    throw new Exception("File Exists");
                }
                Video newVideo = new Video(video.getOriginalFilename(),video.getBytes(), Double.parseDouble(duration));
                videoRepository.save(newVideo);
            }
            catch(Exception e)
            {
                System.out.println(e.getMessage());
                if(e.getMessage().equals("Unsupported Media Type"))
                    throw new FileTypeException("Unsupported Media Type");
                else if(e.getMessage().equals("File Exists"))
                    throw new FileExistsException("File Exists");
                else
                    throw new BadRequestException("Bad Request");
            }


    }


    public Video get(String fileId) {
        Video file = null;
        try{
        file = videoRepository.findById(Integer.parseInt(fileId)).orElse(null);
        if(file==null)
            throw new Exception("File Not Found");
        }
        catch(Exception e)
        {
            System.out.println(e.getMessage());
            if(e.getMessage().equals("File Not Found"))
                throw new FileNotException("File Not Found");
            else
                throw new BadRequestException("Bad Request");
        }
        return file;
    }

    @Override
    public void delete(String id) {
        Video file = null;
        try{
            file = videoRepository.findById(Integer.parseInt(id)).orElse(null);
            if(file==null)
                throw new Exception("File Not Found");
            else
            {
                videoRepository.deleteById(Integer.parseInt(id));
            }

        }
        catch(Exception e)
        {
            if(e.getMessage().equals("File Not Found"))
                throw new FileNotException("File Not Found");
            else
            {
                System.out.println(e);
                throw new BadRequestException("Bad Request");
            }

        }

    }

    @Override
    public List<VideoDTO> getAllByName(String name) {
        return videoRepository.findAllByGivenNameContainsIgnoreCase(name);
    }

    @Override
    public List<VideoDTO> getAllByDuration(Double duration1, Double duration2) {
        return videoRepository.findAllByDurationBetweenOrderByDuration(duration1, duration2);
    }

    @Override
    public List<VideoDTO> getAllByDate(LocalDate date) {
        return videoRepository.findAllByUploadDateOrderByUploadDate(date);
    }

    @Override
    public List<VideoDTO> getAll() {

        return videoRepository.findAllIdAndName() ;
    }

}


