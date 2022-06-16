import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse, HttpEventType, HttpResponse} from '@angular/common/http';
import {GetFileService} from "../../services/get-file.service";
import {Video} from "../../Video";
import { saveAs} from 'file-saver';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-get-file-detail',
  templateUrl: './get-file-detail.component.html',
  styles: []
})
export class GetFileDetailComponent implements OnInit {
  url=''
  id=''

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  public getVideoDetail():void{
    this.FileService.getVideoDetail(this.id).subscribe(
      (response:any) =>{
        console.log(response);
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }

}
