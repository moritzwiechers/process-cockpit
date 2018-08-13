import { Component, OnInit } from '@angular/core';
import {SettingsService} from "./service/settings.service";


@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  constructor(private SettingsService:SettingsService) { }

  setServer(server:string):void{
    this.SettingsService.setServer(server);
  }
  getServer():string{
    return this.SettingsService.getServer();
  }

  getCORS():boolean{
    return this.SettingsService.getCORS();
  }

  setCORS(cORS:boolean):void{
    this.SettingsService.setCORS(cORS);
  }

}
