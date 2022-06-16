import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GetFileComponent} from "./components/get-file/get-file.component";
import {UploadFileComponent} from "./components/upload-file/upload-file.component";
import {GetFileDetailComponent} from "./components/get-file/get-file-detail.component";

const routes: Routes = [
  {path: '',pathMatch: 'full', redirectTo: 'files'},
  {path: 'files', component: GetFileComponent},
  {path: 'uploadfiles', component: UploadFileComponent},
  {path: 'fileDetails/:id', component: GetFileDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {  }
