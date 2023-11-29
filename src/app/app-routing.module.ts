import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AddRecordsPageComponent } from './pages/add-records-page/add-records-page.component';
import { BrowseRecordPageComponent } from './pages/browse-record-page/browse-record-page.component';

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
