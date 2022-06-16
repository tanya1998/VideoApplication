import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse, HttpEventType, HttpResponse} from '@angular/common/http';
import {GetFileService} from "../../services/get-file.service";
import {Video} from "../../Video";
import { saveAs} from 'file-saver';



@Component({
  selector: 'app-get-file',
  templateUrl: './get-file.component.html',
  styles: []
})
export class GetFileComponent implements OnInit {
  videos?: Video[];
  SearchName='';
  more_than='';
  less_than='';


  constructor(private FileService: GetFileService) {
  }

  ngOnInit(): void {
    this.getVideos();

  }


  public getVideos():void{
    this.FileService.getVideos().subscribe(
      (response: Video[]) =>{
        this.videos=response;
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }


  public getVideo(fileId: String):void{
    this.FileService.getVideo(fileId).subscribe(
      (response:any) =>{
        console.log(response);
        const name = response.headers.get('content-disposition').split(";")[1].split("=")[1].split('"')[1];
        console.log(name);
        const blob = response.body;
        console.log(blob);
        var FileSaver = require("file-saver");
        FileSaver.saveAs(blob,name);
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }
  public getVideoByDuration(more_than: String, less_than:String):void{
         this.FileService.getVideoByDuration(more_than, less_than).subscribe(
           (response:Video[]) =>{
             console.log(response)
             this.videos=response;
           },
           (error: HttpErrorResponse)=>{
             alert(error.message);
           }
         );
     }

  public getVideoByName(name: String):void{
           this.FileService.getVideoByName(name).subscribe(
             (response:Video[]) =>{
               console.log(response)
               this.videos=response;
             },
             (error: HttpErrorResponse)=>{
               alert(error.message);
             }
           );
       }


  public deleteVideo(fileId: String):void{
      this.FileService.deleteVideo(fileId).subscribe(
        (response:any) =>{
          console.log(response);
        },
        (error: HttpErrorResponse)=>{
          alert(error.message);
        }
      );
      this.getVideos();
    }

}
