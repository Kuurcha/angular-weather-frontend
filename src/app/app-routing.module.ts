import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AddRecordsPageComponent } from './add-records-page/add-records-page.component';
import { BrowseRecordPageComponent } from './browse-record-page/browse-record-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'add-records', component: AddRecordsPageComponent },
  { path: 'browse-records', component: BrowseRecordPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
