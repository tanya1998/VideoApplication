package com.example.videoapp.entity;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@Table(name="VIDEO")
public class Video {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column(name="GivenName")
    private String givenName;
    @Lob
    @Column(name="Data")
    private byte[] data;

    @Column(name="Size")
    private int size;

    @Column(name="uploadDate")
    private Date uploadDate;

    @Column(name="duration")
    private double duration;



    public Video(String givenName,byte[] data, double duration )
    {
        this.givenName = givenName;
        this.data = data;
        this.size=data.length;
        this.uploadDate = new Date();
        this.duration=duration;
    }
}
