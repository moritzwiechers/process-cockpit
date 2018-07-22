import { Component, OnInit } from '@angular/core';
import {SettingsServiceService} from "../settings-service.service";


@Component({
  selector: 'process-cockpit-header',
  templateUrl: './process-cockpit-header.component.html',
  styleUrls: ['./process-cockpit-header.component.css']
})
export class ProcessCockpitHeaderComponent implements OnInit {

  server;
  processInstanceId;

  constructor(private SettingsService:SettingsServiceService) { }

  ngOnInit() {
    this.server = this.SettingsService.getServer();
    this.processInstanceId = this.SettingsService.getProcessInstanceId();
  }

  setServer(server:string):void{
    this.SettingsService.setServer(server);
  }
  getServer():string{
    return this.SettingsService.getServer();
  }

  setProcessInstanceId(processInstanceId:string):void{
    this.SettingsService.setProcessInstanceId(processInstanceId);
  }
  getProcessInstanceId():string{
    return this.SettingsService.getProcessInstanceId();
  }

  loadModel(){
    //Model Service
  }

}
