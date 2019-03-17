import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  server : string;
  cORS : boolean;

  constructor() {
    this.server = !localStorage.getItem("server") ? "localhost:8090/rest/" : localStorage.getItem("server");
    this.cORS = !localStorage.getItem("cors") ? true : (localStorage.getItem("cors") == "true");
  }

  setServer(server:string):void{
    this.server = server;
    localStorage.setItem('server', server);
  }

  getServer():string{
    return this.server;
  }

  setCORS(cORS):void {
    this.cORS = cORS;
    localStorage.setItem('cors', cORS);
  }

  getCORS():boolean {
    return this.cORS;
  }

  getRestCallUrl(endpoint:string) : string{
    return this.getCORS() ? './rest/cors?restCall=' + this.getServer() + endpoint.replace('?','---').replace('&','-U-').replace('&','-U-').replace('&','-U-').replace('&','-U-') : 'http://'+this.getServer() + endpoint;
  }
}
