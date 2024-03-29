import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest, HttpResponse} from '@angular/common/http';
import { Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Video} from "../Video";


@Injectable({
  providedIn: 'root'
})
export class GetFileService {
  private apiServerUrl = environment.baseUrl;
  constructor(private http: HttpClient) {
  }
  public getVideos():Observable<Video[]>{
    const header = new HttpHeaders();
    header.append("Access-Control-Allow-Origin","*");
    return this.http.get<Video[]>(`${this.apiServerUrl}/files`,{headers:header});


  }
  public getVideo(fileId: String): Observable<HttpResponse<Blob>>{
    const header = new HttpHeaders();
    header.append("Access-Control-Allow-Origin","*");
    return this.http.get<Blob>(`${this.apiServerUrl}/files/${fileId}`,{observe:'response',responseType:'blob' as 'json', headers:header});
  }

  public getVideoDetail(fileId: String): Observable<any>{
      const header = new HttpHeaders();
      header.append("Access-Control-Allow-Origin","*");
      return this.http.get(`${this.apiServerUrl}/files/details/${fileId}`,{headers:header});
   }

   public getVideoByDuration(more_than: String, less_than: String): Observable<Video[]>{
         const header = new HttpHeaders();
         header.append("Access-Control-Allow-Origin","*");
         return this.http.get<Video[]>(`${this.apiServerUrl}/files/duration/${more_than}/${less_than}`,{headers:header});
      }

   public getVideoByName(name: String): Observable<Video[]>{
         const header = new HttpHeaders();
         header.append("Access-Control-Allow-Origin","*");
         return this.http.get<Video[]>(`${this.apiServerUrl}/files/name/${name}`,{headers:header});
   }

  public deleteVideo(fileId: String): Observable<void>{
    const header = new HttpHeaders();
    header.append("Access-Control-Allow-Origin","*");
    return this.http.delete<void>(`${this.apiServerUrl}/files/${fileId}`,{headers:header});
  }
}
