import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CardButtonComponent } from './lib/card-button/card-button.component';
import { FileDisplayComponent } from './lib/file-display/text-list-display.component';
import { LoadingSpinnerComponent } from './lib/loading-spinner/loading-spinner.component';
import { MultipleExcelFileUploadComponent } from './multiple-excel-file-upload/multiple-excel-file-upload.component';
import { AddRecordsPageComponent } from './pages/add-records-page/add-records-page.component';
import { BrowseRecordPageComponent } from './pages/browse-record-page/browse-record-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DatePipe } from '@angular/common';

@NgModule({
  providers: [DatePipe],
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
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
