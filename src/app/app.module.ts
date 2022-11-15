import { NgModule ,APP_INITIALIZER} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslatePipe } from './services/translate.pipe';
import { TranslateService } from './services/translate.service';
// import { LanguagePipe } from './services/language.pipe';
import { HttpClientModule } from "@angular/common/http";

export function setupTranslateFactory(service: TranslateService): Function {
  return () => service.use(localStorage.getItem("language")??environment.language);
}

@NgModule({
  declarations: [
    AppComponent,
    // LanguagePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateFactory,
      deps: [ TranslateService ],
      multi: true
    } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
