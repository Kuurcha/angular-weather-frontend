import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MultipleExcelFileUploadComponent } from './multiple-excel-file-upload/multiple-excel-file-upload.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CardButtonComponent } from './card-button/card-button.component';
import { AddRecordsPageComponent } from './add-records-page/add-records-page.component';
import { BrowseRecordPageComponent } from './browse-record-page/browse-record-page.component';
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
  declarations: [AppComponent, MultipleExcelFileUploadComponent, HeaderComponent, FooterComponent, CardButtonComponent, AddRecordsPageComponent, BrowseRecordPageComponent, HomePageComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
