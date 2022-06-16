import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import {UploadFileService} from "./services/upload-file.service";
import {GetFileComponent} from "./components/get-file/get-file.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    UploadFileComponent,
    GetFileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'uploadfiles' },
      { path: 'uploadfiles', component: UploadFileComponent },
      {path: 'files-all', component: GetFileComponent},
      {path: '**', pathMatch: 'full', redirectTo: 'uploadfiles' }

    ])
  ],
  exports:[RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
