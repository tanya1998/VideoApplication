import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  private apiServerUrl = environment.baseUrl;
  constructor(private http: HttpClient) {
  }
  upload(video:File, duration:string):Observable<HttpEvent<any>>{
    const formData:FormData = new FormData();
    formData.append("duration",duration);
    formData.append("data",video);
    const header = new HttpHeaders();
    header.append("Access-Control-Allow-Origin","*");
    const r = new HttpRequest("POST","http://localhost:8081/files",formData,
    {
      headers:header,
      reportProgress: true,
      responseType: 'text',

    });

    return this.http.request(r);


  }
}
