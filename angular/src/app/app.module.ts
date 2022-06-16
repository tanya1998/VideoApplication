import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import {UploadFileService} from "./services/upload-file.service";
import {GetFileComponent} from "./components/get-file/get-file.component";
import {GetFileDetailComponent} from "./components/get-file/get-file-detail.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    UploadFileComponent,
    GetFileComponent,
    GetFileDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'files' },
      { path: 'uploadfiles', component: UploadFileComponent },
      {path: 'files', component: GetFileComponent},
      {path: '**', pathMatch: 'full', redirectTo: 'files' },
      {path: 'fileDetails/:id', component: GetFileDetailComponent }

    ])
  ],
  exports:[RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
