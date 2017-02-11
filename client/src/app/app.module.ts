import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { InstantSearchComponent } from './instant-search/instant-search.component';
import { ServerlessService } from "./services/serverless.service";

@NgModule({
  declarations: [
    AppComponent,
    InstantSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  providers: [ServerlessService],
  bootstrap: [AppComponent]
})
export class AppModule { }
