import { Component, OnInit, SecurityContext } from '@angular/core';
import {HttpErrorResponse, HttpEventType, HttpResponse} from '@angular/common/http';
import {GetFileService} from "../../services/get-file.service";
import {Video} from "../../Video";
import { saveAs} from 'file-saver';
import { ActivatedRoute } from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-get-file-detail',
  templateUrl: './get-file-detail.component.html',
  styles: []
})
export class GetFileDetailComponent implements OnInit {
  url=''
  id?:String|null
  name=''
  duration=''
  uploadDate=''

  constructor(private sanitizer:DomSanitizer,private route: ActivatedRoute, private FileService:GetFileService) {
  }

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get('id'))
    {
        this.id = this.route.snapshot.paramMap.get('id');
    }
    this.getVideoDetail();
  }

  public getVideoDetail():void{
  if(this.id)
  {const id = this.id;
    this.FileService.getVideo(id).subscribe(
          (response:any) =>{
            console.log(response);
            console.log(response.body);
            //let url =this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(response.body)+'');
            let url =this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(response.body)));
            if(url)
             this.url =url
            console.log(this.url)
          },
          (error: HttpErrorResponse)=>{
            alert(error.message);
          }
        );
    this.FileService.getVideoDetail(id).subscribe(
      (response:any) =>{
        console.log(response);
        this.name=response.givenName;
        this.id=response.id;
        this.uploadDate=response.uploadDate;
        this.duration=response.duration;


      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }
  }

}
