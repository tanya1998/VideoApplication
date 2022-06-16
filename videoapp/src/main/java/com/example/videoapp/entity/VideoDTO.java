package com.example.videoapp.entity;

import lombok.*;

import java.util.Date;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VideoDTO {

    private Integer fileId ;

    private String givenName ;

    private double duration;

    private Date uploadDate;

}
