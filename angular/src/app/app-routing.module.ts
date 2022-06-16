import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GetFileComponent} from "./components/get-file/get-file.component";
import {UploadFileComponent} from "./components/upload-file/upload-file.component";

const routes: Routes = [
  {path: '',pathMatch: 'full', redirectTo: 'uploadfiles'},
  {path: 'files-all', component: GetFileComponent},
  {path: 'uploadfiles', component: UploadFileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {  }
