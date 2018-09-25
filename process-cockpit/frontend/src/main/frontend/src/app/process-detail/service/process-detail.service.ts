import { Injectable } from '@angular/core';
import {SettingsService} from "../../settings/service/settings.service";
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProcessDetailService {
  private endpointXML : string =  'process-definition/{id}/xml';

  private endpointToken : string = 'process-definition/{id}/statistics?incidents=true';

  private endpointActivityHistory : string = 'history/activity-instance?processDefinitionId={id}';

  private endpointAllVersions : string = 'process-definition?key={key}';

  constructor(private http: HttpClient, private SettingsService:SettingsService) { }

  public getProcessXML(processDefinitionId) {
    return this.http.get(this.SettingsService.getRestCallUrl(this.endpointXML.replace('{id}',processDefinitionId)));
  }

  public getProcessTokens(processDefinitionId) {
    return this.http.get(this.SettingsService.getRestCallUrl(this.endpointToken.replace('{id}',processDefinitionId)));
  }

  public getActivityHistory(processDefinitionId){
    return this.http.get(this.SettingsService.getRestCallUrl(this.endpointActivityHistory.replace('{id}',processDefinitionId)));
  }

  public getAllVersions(processDefinitionKey){
    return this.http.get(this.SettingsService.getRestCallUrl(this.endpointAllVersions.replace('{key}',processDefinitionKey)));
  }

}
