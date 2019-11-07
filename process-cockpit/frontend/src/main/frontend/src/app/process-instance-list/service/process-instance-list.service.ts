import { Injectable } from '@angular/core';
import {SettingsService} from "../../settings/service/settings.service";
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProcessInstanceListService {
  private processesEndpoint : string =  'process-instance';
  private historicProcessesEndpoint : string =  'history/process-instance';

  constructor(private http: HttpClient, private SettingsService:SettingsService) { }

  public getInstances(searchRequest : any) {
    return this.http.post(this.SettingsService.getRestCallUrl(this.processesEndpoint),searchRequest);
  }

    public getHistoricInstances(searchRequest : any) {
        return this.http.post(this.SettingsService.getRestCallUrl(this.historicProcessesEndpoint),searchRequest);
    }
}
