import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MultipleExcelFileUploadComponent } from './multiple-excel-file-upload/multiple-excel-file-upload.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CardButtonComponent } from './lib/card-button/card-button.component';
import { FileDisplayComponent } from './lib/file-display/file-display.component';
import { LoadingSpinnerComponent } from './lib/loading-spinner/loading-spinner.component';
import { AddRecordsPageComponent } from './pages/add-records-page/add-records-page.component';
import { BrowseRecordPageComponent } from './pages/browse-record-page/browse-record-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

@NgModule({
  providers: [],
  declarations: [
    AppComponent,
    MultipleExcelFileUploadComponent,
    HeaderComponent,
    FooterComponent,
    CardButtonComponent,
    AddRecordsPageComponent,
    BrowseRecordPageComponent,
    HomePageComponent,
    LoadingSpinnerComponent,
    FileDisplayComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
