import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../../services/upload-file.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styles: []
})
export class UploadFileComponent implements OnInit {

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  duration =0;
  message = '';
  errorMsg = '';
  url ='';

  constructor(private uploadService: UploadFileService) {
  }

  ngOnInit(): void {
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    // @ts-ignore
    // to get url src of video for preview and metadata
    const file: File | null = this.selectedFiles.item(0);
    if(this.selectedFiles){
      const reader = new FileReader();
      if(file) {
        reader.readAsDataURL(file);
        reader.onload = (event: any) => {
          this.url = event.target.result;
        };
      }
    }

  }

  upload(): void {
    this.errorMsg = '';
    this.message = '';
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;
        this.uploadService.upload(this.currentFile, this.duration.toString()).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
              if(this.progress==100){
                this.progress = 0 ;
              }

            } else if (event instanceof HttpResponse) {
              console.log(event);
              this.message = event.body;
            }
          },
          (err: any) => {
            console.log(err);

            if (err.error && err.error.responseMessage) {
              this.errorMsg = err.error.responseMessage;
            } else {
              this.errorMsg = 'Error occurred while uploading a file!';
            }

            this.currentFile = undefined;
          });
      }

      this.selectedFiles = undefined;
    }
  }

  onMetadata(event: Event, video: HTMLVideoElement) {
    console.log('metadata: ',event);
    console.log('duration:', this.duration=video.duration);
  }
}
