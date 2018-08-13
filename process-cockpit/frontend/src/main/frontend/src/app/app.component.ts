import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public language : string = 'de';

  constructor(private translate: TranslateService) {
    translate.setDefaultLang(this.language);
  }
  ngOnInit(): void {
  }
  useLanguage(language: string) {
    this.language = language;
    this.translate.use(language);
  }
}
