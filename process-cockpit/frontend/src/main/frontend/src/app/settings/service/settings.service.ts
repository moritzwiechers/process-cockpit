import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  server : string;
  cORS : boolean;

  constructor() {
    this.server = "192.168.34.74/prozesse-webapp/camunda-rest/";
    this.cORS = true;
  }

  setServer(server:string):void{
    this.server = server;
  }

  getServer():string{
    return this.server;
  }

  setCORS(cORS:boolean):void {
    this.cORS = cORS;
  }

  getCORS():boolean {
    return this.cORS;
  }

  getRestCallUrl(endpoint:string) : string{
    return this.getCORS() ? './rest/cors?restCall=' + this.getServer() + endpoint.replace('?','---').replace('&','-U-') : 'http://'+this.getServer() + endpoint;
  }
}