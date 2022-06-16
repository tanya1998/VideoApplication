package com.example.videoapp.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
public class FileTypeException  extends RuntimeException{
    public FileTypeException(String exception)
    {
        super(exception);
    }
}
