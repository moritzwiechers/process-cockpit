import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsServiceService {

  server;
  processInstanceId;

  constructor() {
    this.server = "xx";
    this.processInstanceId = "";
  }

  setServer(server:string):void{
    this.server = server;
  }

  getServer():string{
    return this.server;
  }

  setProcessInstanceId(processInstanceId:string):void{
    this.processInstanceId = processInstanceId;
  }

  getProcessInstanceId():string{
    return this.processInstanceId;
  }

}
