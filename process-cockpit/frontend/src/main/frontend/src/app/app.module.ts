import {enableProdMode, NgModule} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from '../environments/environment';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {AppComponent} from './app.component';
import { ProcessCockpitHeaderComponent } from './process-cockpit-header/process-cockpit-header.component';
import { ProcessViewerComponent } from './process-viewer/process-viewer.component';
import {MaterialComponentsModule} from "./material-components/material-components.module";
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialComponentsModule,
    ReactiveFormsModule
  ],
  entryComponents: [AppComponent],
  declarations: [AppComponent,ProcessCockpitHeaderComponent,ProcessViewerComponent],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule {}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
